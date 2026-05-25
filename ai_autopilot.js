const fs = require('fs');
const path = require('path');
const { Client } = require('@notionhq/client');

// 1. .env.local에서 환경 변수 안전하게 로드
let notionToken = '';
let notionDatabaseId = '';
let geminiApiKey = '';

try {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const tokenMatch = envContent.match(/NOTION_TOKEN=(.*)/);
    const dbMatch = envContent.match(/NOTION_DATABASE_ID=(.*)/);
    const geminiMatch = envContent.match(/GEMINI_API_KEY=(.*)/);
    
    if (tokenMatch) notionToken = tokenMatch[1].trim();
    if (dbMatch) notionDatabaseId = dbMatch[1].trim();
    if (geminiMatch) geminiApiKey = geminiMatch[1].trim();
  }
} catch (e) {
  console.error("❌ 환경 변수 로드 중 오류 발생:", e.message);
}

// 2. Notion API 클라이언트 초기화
const notion = notionToken ? new Client({ auth: notionToken }) : null;

// 3. Gemini API 호출 함수 (가볍고 빠른 REST API 방식 사용)
async function callGemini(prompt, retries = 5, delayMs = 35000) {
  if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY가 .env.local 파일에 설정되어 있지 않습니다.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
  
  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (response.status === 429) {
      if (retries > 0) {
        console.warn(`\n⚠️ [Gemini Rate Limit 429] 1분당 호출 한도가 초과되었습니다.`);
        console.log(`⏰ API 제한 해제를 위해 ${delayMs / 1000}초 대기 후 자동으로 다시 시도합니다... (남은 재시도: ${retries}회)`);
        await new Promise(r => setTimeout(r, delayMs));
        return await callGemini(prompt, retries - 1, delayMs);
      } else {
        throw new Error("Gemini API 호출 한도 초과 및 모든 재시도 실패.");
      }
    }

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API 호출 실패: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return JSON.parse(rawText.trim());
  } catch (err) {
    // 네트워크 혹은 429 통신 에러 우회용 재시도
    if ((err.message.includes('429') || err.message.includes('fetch')) && retries > 0) {
      console.warn(`\n⚠️ [네트워크 지연] 통신 일시 장애 또는 한도 한계로 인해 ${delayMs / 1000}초 대기 후 재시도합니다...`);
      await new Promise(r => setTimeout(r, delayMs));
      return await callGemini(prompt, retries - 1, delayMs);
    }
    throw err;
  }
}

// 4. 노션 페이지 내 본문 블록 전부 삭제 함수 (업데이트 시 중복 방지)
async function clearPageContent(pageId) {
  try {
    const blocks = await notion.blocks.children.list({ block_id: pageId });
    for (const block of blocks.results) {
      await notion.blocks.delete({ block_id: block.id });
    }
  } catch (e) {
    // 블록이 없는 경우 통과
  }
}

// 5. 노션 페이지 내 마크다운 텍스트를 노션 블록으로 변환하여 쓰는 함수
async function writeMarkdownToPage(pageId, markdownText) {
  await clearPageContent(pageId);

  const lines = markdownText.split('\n');
  const children = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.startsWith('# ')) {
      children.push({
        object: 'block',
        type: 'heading_1',
        heading_1: { rich_text: [{ type: 'text', text: { content: line.slice(2) } }] }
      });
    } else if (line.startsWith('## ')) {
      children.push({
        object: 'block',
        type: 'heading_2',
        heading_2: { rich_text: [{ type: 'text', text: { content: line.slice(3) } }] }
      });
    } else if (line.startsWith('### ')) {
      children.push({
        object: 'block',
        type: 'heading_3',
        heading_3: { rich_text: [{ type: 'text', text: { content: line.slice(4) } }] }
      });
    } else if (line.startsWith('- ')) {
      children.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ type: 'text', text: { content: line.slice(2) } }] }
      });
    } else if (line.startsWith('> ')) {
      children.push({
        object: 'block',
        type: 'quote',
        quote: { rich_text: [{ type: 'text', text: { content: line.slice(2) } }] }
      });
    } else {
      children.push({
        object: 'block',
        type: 'paragraph',
        paragraph: { rich_text: [{ type: 'text', text: { content: line } }] }
      });
    }
  }

  // 10개씩 청크 분할하여 노션에 안전하게 삽입 (API 제한 회피)
  for (let i = 0; i < children.length; i += 10) {
    const chunk = children.slice(i, i + 10);
    await notion.blocks.children.append({
      block_id: pageId,
      children: chunk
    });
  }
}

// 6. 단일 포트폴리오 항목 최적화 연산 함수
async function optimizeSingleItem(page) {
  const props = page.properties;
  
  const originalTitle = props.name?.title?.[0]?.plain_text || '제목 없음';
  const category = props.type?.select?.name || '기타';
  const originalDesc = props.description?.rich_text?.[0]?.plain_text || '';
  const organization = props.organization?.rich_text?.[0]?.plain_text || '';
  const period = props.period?.formula?.string || '';

  // 학술 과목이나 면허증 등 단순 목록은 고도화에서 제외하여 노션 API 호출 절약
  if (category === 'Courses' || category === 'Licenses' || originalTitle.toLowerCase().startsWith('course')) {
    console.log(`⏩ [패스] 단순 과목/자격증 항목은 요약 형태로 유지합니다: "${originalTitle}"`);
    return;
  }

  // 1. 기존 노션 페이지의 본문(마크다운) 조회하여 보존 전략 수립
  let originalContent = '';
  try {
    originalContent = await getPageMarkdown(page.id);
  } catch (e) {
    // 본문 조회 에러시 패스
  }

  console.log(`🤖 [AI 분석 중] "${originalTitle}" 항목을 반도체 공정 엔지니어 관점으로 재조명하는 중...`);

  const prompt = `
당신은 글로벌 반도체 대기업(삼성전자, SK하이닉스, TSMC 등)의 수석 공정/설계 엔지니어이자 커리어 컨설턴트입니다.
사용자의 아래 포트폴리오 항목을 '글로벌 반도체 공정 엔지니어' 직무에 강력하게 어필할 수 있도록 엔지니어링 전문 용어와 STAR 기법을 활용해 고도화해 주세요.

[중요 보존 지침]
- 기존 본문 내용(기존 본문 내용 필드)에 이미 사용자가 작성한 상세한 이야기, 수치, 활동 기록 등이 있는 경우, 절대로 이를 지우거나 내용을 축소하지 마십시오!
- 사용자의 원래 소중한 기여도와 에피소드를 100% 보존하고 살리면서, 이를 더 세련되고 전문적인 반도체 공정 용어와 구조(STAR 기법)로 다듬고 보완하는 형태로 작성해 주세요.

[핵심 반영 사항]
1. 반도체 공정 엔지니어가 중요하게 생각하는 수율(Yield), 데이터 분석(Spotfire, MATLAB), 문제해결 과정, 품질 관리, 결함(Defect) 제어, 협업 소통 능력을 문맥에 맞게 강조해 주세요.
2. 제목은 깔끔하게 정리하되 직관적인 엔지니어링 느낌을 주세요 (예: 'Research Paper review : High NA-EUV' -> 'Research Paper review: High-NA EUV 노광 공정 기술 연구 분석').
3. 설명(description)은 면접관이 단번에 흥미를 가질 수 있도록 2줄 내외의 압축적이고 매력적인 성과형 설명으로 다듬어 주세요.
4. 본문 내용(content)은 모달에 상세하게 뿌려질 수 있도록 마크다운 형식으로 풍부하게 가공해 주세요. 구조는 반드시 '## 📌 활동 개요', '## 🛠️ 공정 엔지니어링 수행 역할 (STAR 기법 적용)', '## 📈 핵심 공정 성과 & 배운 점' 세 영역으로 구성해 주세요.

[입력 데이터]
- 원본 제목: ${originalTitle}
- 카테고리: ${category}
- 소속/기관: ${organization}
- 진행 기간: ${period}
- 원본 요약: ${originalDesc}
- 기존 본문 내용: ${originalContent || '없음'}

출력 형식은 반드시 아래의 JSON 포맷으로만 반환해 주세요 (코드 블록이나 설명글 없이 JSON 텍스트 자체만 반환할 것):
{
  "title": "수정된 제목",
  "description": "수정된 요약 설명",
  "content": "마크다운 형식의 본문 텍스트"
}
`;

  try {
    const aiResult = await callGemini(prompt);

    // Notion Page Properties 업데이트
    await notion.pages.update({
      page_id: page.id,
      properties: {
        name: {
          title: [{ type: 'text', text: { content: aiResult.title } }]
        },
        description: {
          rich_text: [{ type: 'text', text: { content: aiResult.description } }]
        }
      }
    });

    // Notion Page 본문 블록에 마크다운 기입
    await writeMarkdownToPage(page.id, aiResult.content);
    console.log(`✅ [업데이트 성공] "${aiResult.title}" (으)로 노션 DB 갱신 완료!`);
  } catch (err) {
    console.error(`❌ "${originalTitle}" 고도화 실패:`, err.message);
  }
}

// 7. 메인 오토파일럿 제어 함수
async function runAutopilot() {
  if (!notion || !notionDatabaseId) {
    console.error("❌ 노션 API 토큰 또는 데이터베이스 ID를 먼저 설정해 주세요.");
    return;
  }
  if (!geminiApiKey) {
    console.error("❌ .env.local 파일에 'GEMINI_API_KEY=...' 를 추가해 주세요.");
    return;
  }

  const args = process.argv.slice(2);
  const mode = args[0];

  // 모드 A: 일괄 자동 고도화
  if (mode === '--bulk-optimize') {
    console.log("🚀 [AI 포트폴리오 오토파일럿] 전체 노션 DB 일괄 고도화를 시작합니다...");
    
    try {
      const response = await notion.databases.query({ database_id: notionDatabaseId });
      const pages = response.results;
      
      console.log(`📂 총 ${pages.length}개의 포트폴리오 데이터를 스캔했습니다.`);
      
      // 노션 API 초당 요청 제한(Rate Limit)을 피하기 위해 순차적으로 처리
      for (const page of pages) {
        await optimizeSingleItem(page);
        // API 호출 간 1.5초 휴지기 부여 (안전장치)
        await new Promise(r => setTimeout(r, 1500));
      }
      
      console.log("\n✨ [고도화 완료] 모든 포트폴리오 항목이 반도체 대기업 공정 엔지니어 관점으로 환골탈태했습니다! 웹사이트를 새로고침 해보세요!");
    } catch (e) {
      console.error("일괄 고도화 실패:", e.message);
    }
  } 
  // 모드 B: 단일 제목 + 링크 + 사진 퀵 생성 자동 기입
  else if (mode === '--create') {
    const title = args[1];
    const link = args[2] || '';
    
    if (!title) {
      console.log("💡 사용법: node ai_autopilot.js --create \"활동제목\" \"관련링크(선택)\"");
      return;
    }

    console.log(`🤖 [AI 신규 작성] "${title}" 주제로 가장 완벽한 반도체 엔지니어형 포트폴리오를 자동 제작 중...`);

    const prompt = `
당신은 글로벌 반도체 대기업의 공정 엔지니어 채용 팀장입니다.
지원자가 제공한 단서 "${title}" 와 관련 링크 "${link}"를 기반으로, 반도체 대기업 공정/설계 엔지니어 자소서 및 포트폴리오에 어울리는 최상급 프로젝트 카드를 만드세요.

[작성 조건]
1. 제목은 기술적 키워드가 매끄럽게 포함된 전문적인 엔지니어형 제목으로 확장해 주세요.
2. 분류(category)는 반드시 'Projects', 'Career', 'Volunteer', 'Scholarships' 중 가장 적합한 하나를 골라주세요.
3. 소속기관(organization) 및 진행 기간(period)은 상상력을 동원하되, 엔지니어 지원자에게 현실적이고 어울리는 기관으로 채워주세요.
4. 설명(description)은 2줄 내외로 압축적인 핵심 성과 형태로 작성하세요.
5. 본문(content)은 STAR 기법을 정밀 적용하여 구체적인 공정 장비 제어, 데이터 분석(Spotfire/MATLAB), 수율 제어, 트러블슈팅 행동이 묘사된 매력적인 본문으로 마크다운 설계하세요.

출력 형식은 반드시 아래의 JSON 포맷으로만 반환해 주세요 (다른 텍스트 금지):
{
  "title": "확장된 기술형 제목",
  "category": "분류명",
  "organization": "예상 소속 기관명",
  "period": "2026.01 - 2026.02 (1M)",
  "description": "성과 중심 요약",
  "content": "상세한 마크다운 형식의 STAR 본문"
}
`;

    try {
      const aiResult = await callGemini(prompt);

      // 노션에 새로운 페이지 생성
      const newPage = await notion.pages.create({
        parent: { database_id: notionDatabaseId },
        properties: {
          name: {
            title: [{ type: 'text', text: { content: aiResult.title } }]
          },
          type: {
            select: { name: aiResult.category }
          },
          organization: {
            rich_text: [{ type: 'text', text: { content: aiResult.organization } }]
          },
          Period: {
            rich_text: [{ type: 'text', text: { content: aiResult.period } }]
          },
          description: {
            rich_text: [{ type: 'text', text: { content: aiResult.description } }]
          },
          url: link ? { url: link } : undefined
        }
      });

      // 상세 마크다운 글 기입
      await writeMarkdownToPage(newPage.id, aiResult.content);
      console.log(`\n🎉 [포트폴리오 생성 완료] 노션 DB에 성공적으로 저장되었습니다!`);
      console.log(`- 제목: ${aiResult.title}`);
      console.log(`- 소속: ${aiResult.organization} (${aiResult.period})`);
      console.log(`- 분류: ${aiResult.category}`);
      console.log(`- 링크: ${link || '없음'}`);
      console.log(`\n👉 웹 브라우저 창에서 새로고침 하시면 방금 생성된 최우수 포트폴리오 카드가 바로 나타납니다!`);
    } catch (e) {
      console.error("신규 생성 실패:", e.message);
    }
  } else {
    console.log("======================================================");
    console.log("🚀 [Notion AI Autopilot] 구동 옵션을 입력해 주세요:");
    console.log("======================================================");
    console.log("1️⃣ 기존 노션 카드들을 반도체 공정 엔지니어 맞춤형으로 일괄 리라이팅:");
    console.log("   👉 node ai_autopilot.js --bulk-optimize\n");
    console.log("2️⃣ 간단한 단서만 던져서 완벽한 포트폴리오 카드를 노션에 자동 생성 및 삽입:");
    console.log("   👉 node ai_autopilot.js --create \"활동제목\" \"관련링크(선택)\"");
    console.log("======================================================");
  }
}

runAutopilot();
