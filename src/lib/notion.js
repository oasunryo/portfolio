import { Client } from '@notionhq/client';
import { mockProjects } from './mockData';

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

const notion = token ? new Client({ auth: token }) : null;

// 노션 API 동적 바인딩 및 정렬 함수
export async function getPortfolioItems() {
  if (!notion || !databaseId || token.includes('your_') || databaseId.includes('your_')) {
    console.warn("⚠️ Notion API Key 또는 Database ID가 설정되지 않았습니다. 데모 데이터를 표시합니다.");
    return mockProjects;
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    if (response.results.length === 0) return mockProjects;

    const parsedItems = response.results.map((page) => {
      const props = page.properties;

      // 1. 제목 (Title) 파싱
      let title = props.name?.title?.[0]?.plain_text || '제목 없음';
      if (title.endsWith(' :')) title = title.slice(0, -2);
      if (title.endsWith(' : ')) title = title.slice(0, -3);

      // 2. 카테고리 (Category / Type) 파싱 - 대분류 필터용
      // 노션 type 속성이 select 타입이므로 이를 기반으로 대분류 맵핑
      const rawType = props.type?.select?.name || props.Category?.select?.name || '기타';
      
      // 3. 소속 및 기관 (Organization) 파싱
      const role = props.organization?.rich_text?.[0]?.plain_text || '소속 정보 없음';

      // 4. 산업군 (Industry) 파싱 - 반도체 판별 핵심 속성
      const industry = props.industry?.select?.name || '기타';

      // 5. 진행 기간 (Period) 파싱
      const startDate = props['start date']?.date?.start || '';
      const endDate = props['end date']?.date?.start || '';
      
      let periodVal = '';
      if (startDate) {
        const startFormatted = startDate.replace(/-/g, '.');
        if (endDate) {
          const endFormatted = endDate.replace(/-/g, '.');
          const start = new Date(startDate);
          const end = new Date(endDate);
          const diffTime = end - start;
          const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
          periodVal = `${startFormatted} ~ ${endFormatted} (${diffDays}일)`;
        } else {
          periodVal = `${startFormatted} ~ 현재 진행 중`;
        }
      } else {
        periodVal = '현재 진행 중';
      }

      // 6. 설명 (Description) 파싱
      let description = props.description?.rich_text?.[0]?.plain_text || '';
      if (!description) {
        if (role !== '소속 정보 없음') {
          description = `${role}에서 진행한 반도체 공학 및 전문 역량 관련 활동입니다.`;
        } else {
          description = '자세한 연구 및 분석 상세 정보는 시뮬레이션 본문에서 확인하실 수 있습니다.';
        }
      }

      // 7. 관련 링크 (URL) 파싱
      const link = props.url?.url || '';

      // 8. 뱃지(Badge) 및 킬러 성과(Featured) 자동 판별 & 네온 배지 매핑 알고리즘
      let featured = false;
      let badge = '';
      const titleLower = title.toLowerCase();
      const roleLower = role.toLowerCase();

      // 반도체 PKG/Test/Process 산업군이거나 주요 키워드를 포함한 경우
      const isSemiconductor = 
        industry.includes('Semiconductor') || 
        titleLower.includes('semiconductor') || 
        titleLower.includes('spotfire') || 
        titleLower.includes('wafer') ||
        titleLower.includes('dicing') || 
        titleLower.includes('molding') ||
        titleLower.includes('hynix') ||
        titleLower.includes('hy-po') ||
        titleLower.includes('amkor') ||
        titleLower.includes('euv');

      if (!isSemiconductor) {
        return null; // 비반도체 프로젝트 전면 제외
      }

      featured = true;

      if (roleLower.includes('amkor') || titleLower.includes('amkor') || titleLower.includes('osat')) {
        badge = '🏆 OSAT 실무';
      } else if (titleLower.includes('spotfire') || titleLower.includes('defect')) {
        badge = '📊 YIELD DATA';
      } else if (titleLower.includes('hy-po') || roleLower.includes('hynix')) {
        badge = '🔥 SK HY-PO';
      } else if (titleLower.includes('euv') || titleLower.includes('resist') || titleLower.includes('review')) {
        badge = '🔬 RESEARCH';
      } else if (titleLower.includes('tester') || titleLower.includes('battery')) {
        badge = '⚡ TESTER DESIGN';
      } else if (titleLower.includes('bootcamp') || titleLower.includes('comento')) {
        badge = '💻 SILICON CAMP';
      } else if (rawType === 'Courses') {
        badge = '📚 COURSEWORK';
        featured = false; // 이수 과목은 Featured에서 제외하여 하단에 전공 기초로 깔끔하게 정리
      } else {
        badge = '⭐ CORE SEMI';
      }

      // 9. 기술 스택 (Tags) 동적 생성 및 최적화
      const tags = [];
      if (rawType && rawType !== '기타') tags.push(rawType);
      if (industry && industry !== '기타') {
        const cleanIndustry = industry.includes('Semiconductor') ? 'Semiconductor' : industry;
        tags.push(cleanIndustry);
      }
      
      // 타이틀 내 주요 분석 도구 추출
      if (titleLower.includes('spotfire')) tags.push('Spotfire');
      if (titleLower.includes('python')) tags.push('Python');
      if (titleLower.includes('euv')) tags.push('EUV Lithography');
      if (titleLower.includes('tester')) tags.push('Hardware Design');

      return {
        id: page.id,
        title,
        category: rawType, // 노션의 type 대분류 (Projects, Career, Education, Courses, Licenses, Books)
        industry,
        period: periodVal,
        role,
        tags,
        description,
        link,
        badge,
        featured,
        rawSemiconductor: isSemiconductor // 반도체 후공정 연관성 체크 플래그
      };
    }).filter(Boolean);

    // 10. 효율적인 데이터 정렬 및 우선순위 필터링
    // - 정렬 우선순위:
    //   1. 반도체 후공정 핵심 프로젝트 (rawSemiconductor === true) 및 Featured 요소 최상단
    //   2. 최신순 정렬 (기본 노션 쿼리 순서 유지)
    return parsedItems.sort((a, b) => {
      if (a.rawSemiconductor && !b.rawSemiconductor) return -1;
      if (!a.rawSemiconductor && b.rawSemiconductor) return 1;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

  } catch (error) {
    console.error("❌ Notion API 호출 중 오류가 발생했습니다. 데모 데이터로 대체합니다:", error.message);
    return mockProjects;
  }
}

// 노션 페이지 본문 실시간 마크다운 변환 함수
export async function getPageMarkdown(pageId) {
  if (!notion || !databaseId) return '';

  try {
    const blocks = await notion.blocks.children.list({ block_id: pageId });
    
    let markdown = '';
    for (const block of blocks.results) {
      if (block.type === 'paragraph') {
        const text = block.paragraph.rich_text.map(t => t.plain_text).join('');
        markdown += text + '\n\n';
      } else if (block.type === 'heading_1') {
        const text = block.heading_1.rich_text.map(t => t.plain_text).join('');
        markdown += `# ${text}\n\n`;
      } else if (block.type === 'heading_2') {
        const text = block.heading_2.rich_text.map(t => t.plain_text).join('');
        markdown += `## ${text}\n\n`;
      } else if (block.type === 'heading_3') {
        const text = block.heading_3.rich_text.map(t => t.plain_text).join('');
        markdown += `### ${text}\n\n`;
      } else if (block.type === 'bulleted_list_item') {
        const text = block.bulleted_list_item.rich_text.map(t => t.plain_text).join('');
        markdown += `- ${text}\n`;
      } else if (block.type === 'numbered_list_item') {
        const text = block.numbered_list_item.rich_text.map(t => t.plain_text).join('');
        markdown += `1. ${text}\n`;
      } else if (block.type === 'quote') {
        const text = block.quote.rich_text.map(t => t.plain_text).join('');
        markdown += `> ${text}\n\n`;
      } else if (block.type === 'callout') {
        const text = block.callout.rich_text.map(t => t.plain_text).join('');
        markdown += `> 💡 ${text}\n\n`;
      }
    }
    return markdown;
  } catch (e) {
    console.error("⚠️ 페이지 본문 블록 가져오기 실패:", e.message);
    return '';
  }
}
