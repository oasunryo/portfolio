import { Client } from '@notionhq/client';
import { mockProjects } from './mockData';

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

const notion = token ? new Client({ auth: token }) : null;

export async function getPortfolioItems() {
  if (!notion || !databaseId || token.includes('your_') || databaseId.includes('your_')) {
    console.warn("⚠️ Notion API Key 또는 Database ID가 설정되지 않았습니다. 데모 데이터를 표시합니다.");
    return mockProjects;
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });

    if (response.results.length === 0) return mockProjects;

    return response.results.map((page) => {
      const props = page.properties;

      // 사용자 데이터베이스 스키마 실시간 동적 대조 및 안전한 파싱
      let title = props.name?.title?.[0]?.plain_text || '제목 없음';
      const category = props.type?.select?.name || '기타';
      
      // 진행 기간 포맷팅 (시작일 ~ 종료일 + 수식으로 계산된 기간 문자열 조합)
      const startDate = props['start date']?.date?.start || '';
      const endDate = props['end date']?.date?.start || '';
      const duration = props.period?.formula?.string || '';
      
      let periodVal = '';
      if (startDate) {
        periodVal = startDate;
        if (endDate) periodVal += ` ~ ${endDate}`;
        if (duration) periodVal += ` (${duration})`;
      } else {
        periodVal = duration || '진행 기간 없음';
      }

      const role = props.organization?.rich_text?.[0]?.plain_text || '소속 정보 없음';
      
      // 설명 필드가 빈 경우 스마트한 대체 메시지 출력
      let description = props.description?.rich_text?.[0]?.plain_text || '';
      if (!description) {
        if (props.organization?.rich_text?.[0]?.plain_text) {
          description = `${props.organization?.rich_text?.[0]?.plain_text} 에서 진행한 활동입니다.`;
        } else {
          description = '상세 정보는 본문에서 확인하실 수 있습니다.';
        }
      }

      // 태그 컬렉션 동적 생성 (분류 유형 + 산업 분야 조합)
      const tags = [];
      if (props.type?.select?.name) tags.push(props.type.select.name);
      if (props.industry?.select?.name) tags.push(props.industry.select.name);

      const link = props.url?.url || '';

      // 🏆 킬러 성과(Featured) 자동 판별 알고리즘
      let featured = false;
      let badge = '';
      const titleLower = title.toLowerCase();
      
      if (
        titleLower.includes('grand prize') || 
        titleLower.includes('대상') || 
        titleLower.includes('spotfire') || 
        titleLower.includes('thermoptic') || 
        titleLower.includes('hackerthon') || 
        titleLower.includes('해커톤') || 
        titleLower.includes('battery capacity tester') || 
        titleLower.includes('bima') ||
        titleLower.includes('hy-po') ||
        titleLower.includes('irex')
      ) {
        featured = true;
        
        // 커스텀 네온 엠블럼 매핑
        if (titleLower.includes('grand prize') || titleLower.includes('대상') || titleLower.includes('bima')) {
          badge = '🏆 GRAND PRIZE';
        } else if (titleLower.includes('spotfire') || titleLower.includes('thermoptic') || titleLower.includes('battery')) {
          badge = '💻 CORE TECH';
        } else if (titleLower.includes('hackerthon') || titleLower.includes('해커톤') || titleLower.includes('hy-po')) {
          badge = '🔥 FELLOWSHIP';
        } else {
          badge = '⭐ KEY ARCHIVE';
        }
      }

      // 제목 특수 기호 정리
      if (title.endsWith(' :')) {
        title = title.slice(0, -2);
      } else if (title.endsWith(' : ')) {
        title = title.slice(0, -3);
      } else if (title.endsWith(' (')) {
        title = title.slice(0, -2);
      }

      return {
        id: page.id,
        title,
        category,
        period: periodVal,
        role,
        tags,
        description,
        link,
        badge,
        featured
      };
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
