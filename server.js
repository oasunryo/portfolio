const http = require('http');
const fs = require('fs');
const path = require('path');
const { Client } = require('@notionhq/client');

// 1. .env.local 파일에서 환경변수 로드
let notionToken = '';
let notionDatabaseId = '';

try {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const tokenMatch = envContent.match(/NOTION_TOKEN=(.*)/);
    const dbMatch = envContent.match(/NOTION_DATABASE_ID=(.*)/);
    if (tokenMatch) notionToken = tokenMatch[1].trim();
    if (dbMatch) notionDatabaseId = dbMatch[1].trim();
  }
} catch (e) {
  console.log("⚠️ .env.local 로딩 실패, 기본 모의 데이터를 제공합니다.");
}

// 2. 모의 데이터 정의 (Mock Data) - API 에러 또는 미설정 시 백업
const mockProjects = [
  {
    id: "mock-1",
    title: "AI 기반 스마트 할 일 관리 플랫폼 (Tako)",
    category: "개발",
    period: "2026.01 - 2026.04 (4개월)",
    role: "Fullstack Developer (1인 개발)",
    tags: ["React", "Next.js", "Node.js", "MongoDB"],
    description: "사용자의 업무 패턴과 작성 습관을 분석하여 우선순위를 제안하고, 완료 시간을 예측해 주는 개인화 비서 플랫폼입니다.",
    content: "## 📌 프로젝트 소개\n개인 생산성 향상을 극대화하기 위해 개발한 AI 연동 플래너 웹 서비스입니다.",
    link: "https://github.com",
    badge: "Featured"
  }
];

// 3. Notion 데이터 취득 및 세밀화된 가공 로직
async function getNotionData() {
  if (!notionToken || !notionDatabaseId || notionToken.includes('your_') || notionDatabaseId.includes('your_')) {
    console.log("ℹ️ 노션 토큰이 설정되지 않았거나 기본값입니다. 데모 데이터를 사용합니다.");
    return mockProjects;
  }

  try {
    const notion = new Client({ auth: notionToken });
    const response = await notion.databases.query({
      database_id: notionDatabaseId,
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

      // 컬럼 매핑 및 전처리
      let title = props.name?.title?.[0]?.plain_text || '제목 없음';
      const category = props.type?.select?.name || '기타';
      
      // 날짜 및 기간 포맷팅
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
      
      // 요약 설명 처리 (비어있는 경우 자동 보정)
      let description = props.description?.rich_text?.[0]?.plain_text || '';
      if (!description) {
        if (props.organization?.rich_text?.[0]?.plain_text) {
          description = `${props.organization?.rich_text?.[0]?.plain_text} 에서 진행한 활동입니다.`;
        } else {
          description = '상세 정보는 본문에서 확인하실 수 있습니다.';
        }
      }

      // 태그 자동 수집 (이수 과목, 자격증 외 프로젝트 전용)
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

      // 제목 특수 기호 정리 (콜론 또는 괄호로 끝나는 불완전 제목 정리)
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
  } catch (err) {
    console.error("⚠️ 노션 API 통신 중 오류가 발생하여 데모 데이터로 대체합니다:", err.message);
    return mockProjects;
  }
}

// 4. 노션 페이지 본문 실시간 마크다운 변환 함수
async function getPageMarkdown(pageId) {
  if (!notionToken || !notionDatabaseId) return '';

  try {
    const notion = new Client({ auth: notionToken });
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

// 5. HTTP 서버 구동
const server = http.createServer(async (req, res) => {
  // Static CSS file serve
  if (req.url === '/globals.css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    const cssPath = path.join(__dirname, 'src', 'app', 'globals.css');
    res.end(fs.readFileSync(cssPath, 'utf8'));
    return;
  }

  // API endpoint for dynamic items
  if (req.url === '/api/projects') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    const items = await getNotionData();
    res.end(JSON.stringify(items));
    return;
  }

  // API endpoint for dynamic block content (On-demand)
  if (req.url.startsWith('/api/project-content')) {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const id = urlObj.searchParams.get('id');
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    
    if (!id) {
      res.end(JSON.stringify({ content: '' }));
      return;
    }

    const md = await getPageMarkdown(id);
    res.end(JSON.stringify({ content: md || '상세 소개 내용이 작성되지 않은 포트폴리오 항목입니다. 노션 페이지 내부에 텍스트를 입력해 보세요!' }));
    return;
  }

  // Home Page HTML Render
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    const items = await getNotionData();

    // Generate stunning HTML dynamic page
    const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>나만의 독창적인 포트폴리오 | Notion Live Server</title>
  <link rel="stylesheet" href="/globals.css">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* 추가적인 고급 고도화 디자인 CSS 주입 */
    .featured-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem 4rem 2rem;
    }
    .featured-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 2rem;
    }
    .featured-card {
      background: linear-gradient(135deg, rgba(20, 15, 38, 0.6) 0%, rgba(10, 15, 28, 0.6) 100%);
      border: 1px solid rgba(139, 92, 246, 0.3) !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4),
                  0 0 20px rgba(139, 92, 246, 0.08) !important;
    }
    .featured-card:hover {
      border-color: hsl(263, 90%, 62%) !important;
      box-shadow: 0 15px 45px rgba(0, 0, 0, 0.5),
                  0 0 30px rgba(139, 92, 246, 0.25) !important;
    }
    .featured-badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.3rem 0.85rem;
      border-radius: 9999px;
      color: hsl(190, 95%, 50%);
      background: rgba(6, 182, 212, 0.1);
      border: 1px solid rgba(6, 182, 212, 0.3);
      box-shadow: 0 0 10px rgba(6, 182, 212, 0.1);
    }
    
    /* 학술 이수과목 & 자격증 전용 패널 */
    .credentials-section {
      max-width: 1200px;
      margin: 4rem auto 0 auto;
      padding: 5rem 2rem 1rem 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    .credentials-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }
    @media (max-width: 768px) {
      .credentials-grid {
        grid-template-columns: 1fr;
      }
    }
    .credentials-panel {
      background: rgba(15, 18, 30, 0.3);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.04);
      padding: 2.5rem;
      border-radius: 24px;
    }
    .panel-title {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: hsl(var(--foreground));
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .course-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
    .course-pill {
      font-size: 0.82rem;
      font-weight: 500;
      color: hsl(var(--muted));
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 0.5rem 1rem;
      border-radius: 12px;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .course-pill:hover {
      background: rgba(139, 92, 246, 0.08);
      border-color: rgba(139, 92, 246, 0.3);
      color: hsl(var(--foreground));
      transform: translateY(-2px);
    }
    .cert-list {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }
    .cert-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1.25rem;
      background: rgba(255, 255, 255, 0.01);
      border: 1px solid rgba(255, 255, 255, 0.03);
      border-radius: 12px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: var(--transition-fast);
    }
    .cert-item:hover {
      background: rgba(6, 182, 212, 0.05);
      border-color: rgba(6, 182, 212, 0.2);
    }
    .cert-name {
      font-weight: 600;
      color: hsl(var(--foreground));
    }
    .cert-badge {
      font-size: 0.75rem;
      font-weight: 700;
      color: hsl(var(--accent-secondary));
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div id="app">
    <!-- Ambient backgrounds -->
    <div class="ambient-glow-1"></div>
    <div class="ambient-glow-2"></div>

    <!-- Navigation -->
    <header>
      <div class="nav-container">
        <div class="logo" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })">
          PORTFOLIO.
        </div>
        <nav class="nav-links">
          <a class="nav-link" onclick="document.getElementById('featured').scrollIntoView({ behavior: 'smooth' })">Featured</a>
          <a class="nav-link" onclick="document.getElementById('works').scrollIntoView({ behavior: 'smooth' })">Works</a>
          <a class="nav-link" onclick="document.getElementById('credentials').scrollIntoView({ behavior: 'smooth' })">Qualifications</a>
          <a class="nav-link" onclick="document.getElementById('about').scrollIntoView({ behavior: 'smooth' })">About</a>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-badge">Notion API Premium Dynamic Resume</div>
      <h1 class="hero-title">
        안녕하세요, 저의 <span>경험과 도전</span>을<br>소개하는 공간입니다.
      </h1>
      <p class="hero-subtitle">
        이 웹사이트는 노션 데이터베이스와 실시간으로 연동되어 있습니다. 제가 노션에서 포트폴리오 정보를 업데이트하면 언제든 실시간으로 갱신됩니다.
      </p>
      <div class="hero-buttons">
        <button class="btn-primary" onclick="document.getElementById('featured').scrollIntoView({ behavior: 'smooth' })">
          포트폴리오 구경하기
        </button>
        <a href="https://github.com" target="_blank" class="btn-secondary">
          GitHub
        </a>
      </div>
    </section>

    <!-- 🏆 1. Featured Achievements Section (추천 핵심 성과) -->
    <section id="featured" class="featured-section">
      <div class="section-header">
        <h2 class="section-title" style="color: hsl(263, 90%, 62%);">🏆 Featured Achievements</h2>
        <p class="section-desc">가장 자랑하고 싶고 성과가 높았던 핵심 프로젝트 및 공모전 수상작 모음입니다.</p>
      </div>
      <div class="featured-grid" id="featured-grid">
        <!-- JS로 Featured로 판정된 카드가 삽입됩니다 -->
      </div>
    </section>

    <!-- 📋 2. Works Section (일반 프로젝트 그리드 - 학술/자격증 필터링됨) -->
    <section id="works" class="portfolio">
      <div class="section-header">
        <h2 class="section-title">My Projects &amp; Careers</h2>
        <p class="section-desc">학술 이수 과목과 기본 자격증은 분리하여 정리하고, 핵심 대내외 활동만 모아두어 가독성을 극대화했습니다.</p>
      </div>

      <!-- Search Bar -->
      <div style="max-width: 600px; margin: 0 auto 2.5rem auto; position: relative;">
        <input
          type="text"
          id="search-input"
          placeholder="프로젝트 제목, 태그 또는 설명으로 검색하세요..."
          style="width: 100%; padding: 1rem 1.5rem; border-radius: 9999px; border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(15, 18, 30, 0.5); color: #fff; fontSize: 0.95rem; outline: none; transition: all 0.3s ease; backdrop-filter: blur(10px);"
        />
      </div>

      <!-- Filter Categories -->
      <div class="filter-container" id="category-filters">
        <!-- JS로 동적 생성 -->
      </div>

      <!-- Grid List -->
      <div class="grid" id="projects-grid">
        <!-- JS로 동적 생성 -->
      </div>
    </section>

    <!-- 🎓 3. Academic & Credentials Section (이수과목 & 자격증 최적화 요약본) -->
    <section id="credentials" class="credentials-section">
      <div class="section-header">
        <h2 class="section-title">🎓 Qualifications &amp; Studies</h2>
        <p class="section-desc">이수한 전공 과목과 보유 자격증 목록을 깔끔한 태그와 그룹으로 모아두었습니다.</p>
      </div>
      <div class="credentials-grid">
        <!-- 이수과목 패널 -->
        <div class="credentials-panel">
          <h3 class="panel-title">📚 Relevant Coursework</h3>
          <div class="course-list" id="course-list">
            <!-- JS로 이수 과목 태그 주입 -->
          </div>
        </div>
        <!-- 자격증 패널 -->
        <div class="credentials-panel">
          <h3 class="panel-title">🎫 Licenses &amp; Certificates</h3>
          <div class="cert-list" id="cert-list">
            <!-- JS로 자격증 주입 -->
          </div>
        </div>
      </div>
    </section>

    <!-- About & Contact Section -->
    <footer id="about">
      <div class="footer-container">
        <h2 class="footer-title">Let's Create Something Great</h2>
        <p class="footer-desc">
          노션을 활용하여 더 창의적이고 실용적인 웹 환경을 만드는 데 관심이 많습니다. 협업 요청이나 질문이 있으시면 언제든지 편하게 이메일로 연락주세요!
        </p>
        <a href="mailto:youremail@example.com" class="contact-email">
          youremail@example.com
        </a>
        <p class="footer-copy">
          &copy; 2026. Custom Notion Portfolio. All rights reserved.
        </p>
      </div>
    </footer>

    <!-- Details Modal -->
    <div id="modal-container"></div>
  </div>

  <script>
    // 1. 데이터 주입 및 분리 필터링
    const rawData = ${JSON.stringify(items)};

    // 분류 1: Featured 킬러 성과
    const featuredProjects = rawData.filter(p => p.featured);
    
    // 분류 2: 학부 이수 과목 (Courses)
    const courses = rawData.filter(p => p.category === 'Courses' || p.title.toLowerCase().startsWith('course'));
    
    // 분류 3: 자격증 & 도서 & 뱃지 (Licenses, Books)
    const certificates = rawData.filter(p => p.category === 'Licenses' || p.category === 'Books' || p.title.toLowerCase().includes('badge') || p.title.toLowerCase().includes('certificate of'));
    
    // 분류 4: 일반 포트폴리오 리스트 (나머지 핵심 활동들)
    const projects = rawData.filter(p => {
      // featured도 일반 리스트에 필터링해 보일 수 있게 하며, Course와 License류는 완전 제거
      const isCourse = p.category === 'Courses' || p.title.toLowerCase().startsWith('course');
      const isLicense = p.category === 'Licenses' || p.category === 'Books' || p.title.toLowerCase().includes('badge') || p.title.toLowerCase().includes('certificate of');
      return !isCourse && !isLicense;
    });

    let activeCategory = '전체';
    let searchQuery = '';

    // 고유 카테고리 (일반 프로젝트 기준)
    const categories = ['전체', ...new Set(projects.map(p => p.category))];

    function parseMarkdown(md) {
      if (!md) return '';
      let html = md.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      
      // 인용문 변환
      html = html.replace(/^>\s+💡\s+(.+)$/gm, '<blockquote style="border-left:4px solid hsl(190, 95%, 50%); background:rgba(6,182,212,0.05); padding:1rem; border-radius:8px;">💡 $1</blockquote>');
      html = html.replace(/^>\s+(.+)$/gm, '<blockquote style="border-left:4px solid hsl(263, 90%, 62%); background:rgba(139,92,246,0.05); padding:1rem; border-radius:8px;">$1</blockquote>');
      
      // 헤더 변환
      html = html.replace(/^##\\s+(.+)$/gm, '<h2>$1</h2>');
      html = html.replace(/^###\\s+(.+)$/gm, '<h3>$1</h3>');
      
      // 볼드 변환
      html = html.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');
      
      // 리스트 변환
      html = html.replace(/^\\-\\s+(.+)$/gm, '<li>$1</li>');
      html = html.replace(/(<li>.*<\\/li>)/gs, '<ul>$1</ul>');
      html = html.replace(/<\\/ul>\\s*<ul>/g, '');
      
      // 줄바꿈 변환
      html = html.replace(/\\n\\n/g, '</p><p>');
      html = html.replace(/\\n/g, '<br>');
      
      if (!html.startsWith('<h') && !html.startsWith('<u') && !html.startsWith('<l') && !html.startsWith('<b')) {
        html = '<p>' + html + '</p>';
      }
      return html;
    }

    // 🏆 Featured Achievements 렌더링
    function renderFeatured() {
      const grid = document.getElementById('featured-grid');
      grid.innerHTML = featuredProjects.map(p => \`
        <div class="card featured-card" onclick="openModal('\${p.id}')">
          <div class="card-top">
            <div class="card-header">
              <span class="card-category">\${p.category}</span>
              <span class="featured-badge">\${p.badge}</span>
            </div>
            <h3 class="card-title" style="color:hsl(var(--foreground)); font-size:1.6rem;">\${p.title}</h3>
            <p class="card-desc">\${p.description}</p>
          </div>
          <div class="card-meta">
            <div class="card-tags">
              \${p.tags.map(t => \`<span class="tag">\${t}</span>\`).join('')}
            </div>
            <div class="card-footer">
              <span class="card-period">\${p.period || '진행 기간 없음'}</span>
              <span class="card-arrow" style="color:hsl(263, 90%, 62%);">자세히 보기 &rarr;</span>
            </div>
          </div>
        </div>
      \`).join('');
    }

    // 📋 일반 프로젝트 리스트 렌더링
    function renderFilters() {
      const container = document.getElementById('category-filters');
      container.innerHTML = categories.map(cat => \`
        <button class="filter-btn \${activeCategory === cat ? 'active' : ''}" onclick="setCategory('\${cat}')">
          \${cat}
        </button>
      \`).join('');
    }

    function renderGrid() {
      const grid = document.getElementById('projects-grid');
      const filtered = projects.filter(p => {
        const matchesCategory = activeCategory === '전체' || p.category === activeCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        grid.innerHTML = \`
          <div style="grid-column: 1/-1; text-align: center; padding: 5rem 0; color: hsl(var(--muted));">
            검색 조건에 맞는 프로젝트가 존재하지 않습니다.
          </div>
        \`;
        return;
      }

      grid.innerHTML = filtered.map(p => \`
        <div class="card" onclick="openModal('\${p.id}')">
          <div class="card-top">
            <div class="card-header">
              <span class="card-category">\${p.category}</span>
            </div>
            <h3 class="card-title">\${p.title}</h3>
            <p class="card-desc">\${p.description}</p>
          </div>
          <div class="card-meta">
            <div class="card-tags">
              \${p.tags.map(t => \`<span class="tag">\${t}</span>\`).join('')}
            </div>
            <div class="card-footer">
              <span class="card-period">\${p.period || '진행 기간 없음'}</span>
              <span class="card-arrow">자세히 보기 &rarr;</span>
            </div>
          </div>
        </div>
      \`).join('');
    }

    // 🎓 이수 과목 및 자격증 렌더링
    function renderCredentials() {
      const courseContainer = document.getElementById('course-list');
      const certContainer = document.getElementById('cert-list');

      // 이수과목 주입 (태그형태)
      courseContainer.innerHTML = courses.map(c => {
        // "Course : " 제거 후 타이틀 추출
        const cleanName = c.title.replace(/^course\s*:\s*/i, '');
        return \`<span class="course-pill" onclick="openModal('\${c.id}')">\${cleanName}</span>\`;
      }).join('');

      // 자격증 주입 (리스트형태)
      certContainer.innerHTML = certificates.map(c => \`
        <div class="cert-item" onclick="openModal('\${c.id}')">
          <span class="cert-name">\${c.title}</span>
          <span class="cert-badge">\${c.category}</span>
        </div>
      \`).join('');
    }

    window.setCategory = function(cat) {
      activeCategory = cat;
      renderFilters();
      renderGrid();
    }

    window.openModal = async function(id) {
      // rawData 전체에서 검색 (Featured, Course, License 모두 조회 가능)
      const p = rawData.find(item => item.id === id);
      if (!p) return;

      const container = document.getElementById('modal-container');
      
      // 모달 즉시 렌더링 (로딩 상태)
      container.innerHTML = \`
        <div class="modal-overlay" onclick="closeModal()">
          <div class="modal-content" onclick="event.stopPropagation()">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <span class="modal-category">\${p.category}</span>
            <h2 class="modal-title">\${p.title}</h2>
            
            <div class="modal-meta-grid">
              <div class="modal-meta-item">
                <span>기관 / 소속</span>
                <p>\${p.role || '소속 정보 없음'}</p>
              </div>
              <div class="modal-meta-item">
                <span>진행 기간</span>
                <p>\${p.period || '기간 정보 없음'}</p>
              </div>
            </div>

            <div class="modal-body" id="modal-body-content">
              <div style="text-align:center; padding: 2rem 0; color: hsl(var(--accent-secondary));">
                <div class="spinner" style="display:inline-block; width: 30px; height: 30px; border:3px solid rgba(255,255,255,0.05); border-top-color: hsl(190, 95%, 50%); border-radius:50%; animation: spin 1s infinite linear;"></div>
                <p style="margin-top: 1rem; font-size:0.9rem; color:hsl(var(--muted));">노션 페이지 본문을 불러오는 중입니다...</p>
              </div>
            </div>

            <div class="modal-footer">
              \${p.link ? \`<a href="\${p.link}" target="_blank" class="btn-primary" style="font-size: 0.9rem; padding: 0.6rem 1.5rem;">관련 링크 바로가기</a>\` : ''}
              <button class="btn-secondary" onclick="closeModal()" style="font-size: 0.9rem; padding: 0.6rem 1.5rem;">닫기</button>
            </div>
          </div>
        </div>
      \`;

      // CSS keyframe for spinner inject if not exist
      if (!document.getElementById('spinner-style')) {
        const style = document.createElement('style');
        style.id = 'spinner-style';
        style.innerHTML = \`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        \`;
        document.head.appendChild(style);
      }

      // 실시간으로 노션 본문 블록 데이터 가져오기
      try {
        const res = await fetch(\`/api/project-content?id=\${id}\`);
        const data = await res.json();
        document.getElementById('modal-body-content').innerHTML = parseMarkdown(data.content);
      } catch (err) {
        document.getElementById('modal-body-content').innerHTML = '<p>상세 내용을 불러오지 못했습니다. 다시 시도해 주세요.</p>';
      }
    }

    window.closeModal = function() {
      document.getElementById('modal-container').innerHTML = '';
    }

    // 4. 이벤트 및 최초 로딩
    document.getElementById('search-input').addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderGrid();
    });

    renderFeatured();
    renderFilters();
    renderGrid();
    renderCredentials();
  </script>
</body>
</html>
`;
    res.end(html);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Notion Dynamic Live Server가 구동되었습니다!`);
  console.log(`💻 아래 브라우저 주소를 클릭하여 확인하세요:`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
