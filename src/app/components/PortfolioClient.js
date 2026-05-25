'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Markdown-to-HTML parser (Toss White Theme aligned)
function parseMarkdown(markdownText) {
  if (!markdownText) return '';
  
  let html = markdownText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/^&gt;\s+💡\s+(.+)$/gm, '<blockquote style="border-left:3px solid var(--accent); background:var(--surface); padding:1.25rem; border-radius:16px; margin-bottom:1.5rem; font-size:0.92rem;">💡 $1</blockquote>');
  html = html.replace(/^&gt;\s+(.+)$/gm, '<blockquote style="border-left:3px solid var(--rule-strong); background:var(--surface); padding:1.25rem; border-radius:16px; margin-bottom:1.5rem; font-size:0.92rem;">$1</blockquote>');

  html = html.replace(/^##\s+(.+)$/gm, '<h2 style="color:var(--fg); font-size:1.25rem; font-weight:700; margin-top:2rem; margin-bottom:0.75rem; border-left:3px solid var(--accent); padding-left:0.75rem;">$1</h2>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 style="color:var(--accent); font-size:1rem; font-weight:700; margin-top:1.5rem; margin-bottom:0.5rem;">$1</h3>');

  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--fg); font-weight:700;">$1</strong>');

  html = html.replace(/^\-\s+(.+)$/gm, '<li style="margin-bottom:0.4rem; padding-left:0.25rem;">$1</li>');
  html = html.replace(/<li style="margin-bottom:0\.4rem; padding-left:0\.25rem;">.*<\/li>/gs, (match) => '<ul style="padding-left:1.25rem; margin-bottom:1.25rem; list-style-type:disc; font-size:0.92rem;">' + match + '</ul>');

  html = html.replace(/\n\n/g, '</p><p style="margin-bottom:1rem; color:var(--text-secondary);">');
  html = html.replace(/\n/g, '<br />');
  
  if (!html.startsWith('<h') && !html.startsWith('<u') && !html.startsWith('<l') && !html.startsWith('<b')) {
    html = '<p style="margin-bottom:1rem; color:var(--text-secondary);">' + html + '</p>';
  }

  return html;
}

// 9 Skills Database (100% Literal match from Notion DB)
const portfolioSkills = [
  { name: "TIBCO Spotfire", category: "Yield", level: 3, desc: { ko: "공정 센서, 레시피, 공정 경로 데이터와 칩 불량/수율 간의 상관관계 시각화 분석 및 SPC 모니터링", en: "Yield/Defect correlation dashboarding and process parameter statistical analysis" }, cert: "", project: "Spotfire-Based Analysis of Correlation..." },
  { name: "Python (Machine Learning)", category: "Yield", level: 3, desc: { ko: "WM-811K 웨이퍼 맵 결함 분류, 데이터 전처리 자동화 파이프라인 및 통계적 머신러닝 모니터링 분석", en: "Wafer map defect signature ML clustering & ETL preprocessing" }, cert: "", project: "SK Hy-Po : Cohort 8" },
  { name: "MATLAB", category: "Device", level: 3, desc: { ko: "전기전자 공학 수치 해석 및 가상 물리 도메인 다중 물리 시뮬레이션 모델링", en: "Multi-domain physical simulation & stress calculation" }, cert: "Matlab Onramp", project: "Battery Charger Design and..." },
  { name: "Simulink & Simscape", category: "Device", level: 2, desc: { ko: "제어 루프 모델 기반 가상 시뮬레이션 및 기전/열-기계 하드웨어 가상화 검증", en: "Control loops & electro-thermal physical simulation" }, cert: "Simulink Onramp", project: "Audio Level Meter Design and..." },
  { name: "PCB & Board Design (OrCAD)", category: "Device", level: 2, desc: { ko: "반도체 설비 기판 하드웨어 회로 핀 매핑 및 로직 회로 시뮬레이션 설계 검증", en: "Board-level PCB layout design & digital logic logic compilation" }, cert: "", project: "Course : Semiconductor Equipment Board Design" },
  { name: "Semiconductor Device Engineering", category: "Device", level: 3, desc: { ko: "PN 접합, 트랜지스터(MOSFET), 반도체 물성 및 미세 소자 전기적 동작 매커니즘 규명", en: "Device physics, carrier transport & MOSFET mechanics" }, cert: "", project: "Course : Semiconductor Device Engineering" },
  { name: "JEDEC Standards & QA", category: "Reliability", level: 3, desc: { ko: "JESD22 표준 규격에 부합하는 HAST, ESD, TC 신뢰성 평가 분석 및 FMEA 결함 제어 체크리스트 수립", en: "JEDEC JESD22 standard stress testing & FMEA defect mapping" }, cert: "", project: "Job Bootcamp : Process Manual..." },
  { name: "ADsP (SQL)", category: "Yield", level: 2, desc: { ko: "데이터 분석 준전문가 자격을 바탕으로 대단위 테스트 적재 데이터베이스 질의를 위한 SQL 제어", en: "SQL querying for process and test datasets" }, cert: "ADsP : Advanced Data Ana...", project: "Development of a Business Type..." },
  { name: "Notion (SOP & Workspaces)", category: "Yield", level: 3, desc: { ko: "공정 표준 가이드(SOP) 및 기술 지식 베이스 구축, 체계적인 협업 워크스페이스 운용", en: "Notion workspaces, SOP design & technical knowledge base documentation" }, cert: "Notion Advanced Badge", project: "Notion Advanced Badge" }
];

// Skill Segmented Tab Categories (Semiconductor-focused)
const skillSegments = [
  { id: 'all', label: { ko: '전체 보기', en: 'View All' }, icon: '📌' },
  { id: 'yield', label: { ko: '수율 · 데이터', en: 'Yield & Data' }, icon: '📊', filter: (s) => s.category === 'Yield' },
  { id: 'device', label: { ko: '소자 · 회로', en: 'Device & Circuits' }, icon: '⚡', filter: (s) => s.category === 'Device' },
  { id: 'reliability', label: { ko: '신뢰성 · 품질', en: 'Reliability & QA' }, icon: '🛡️', filter: (s) => s.category === 'Reliability' },
];

// Circular Progress Ring
function CircularProgress({ level }) {
  const r = 8, sw = 2.2, nr = r - sw;
  const c = nr * 2 * Math.PI;
  const pct = level === 3 ? 100 : level === 2 ? 66 : 33;
  const off = c - (pct / 100) * c;
  return (
    <svg height={r * 2} width={r * 2} style={{ transform: 'rotate(-90deg)', marginRight: '4px' }}>
      <circle stroke="#E5E8EB" fill="transparent" strokeWidth={sw} r={nr} cx={r} cy={r} />
      <circle stroke="var(--accent)" fill="transparent" strokeWidth={sw} strokeDasharray={`${c} ${c}`} style={{ strokeDashoffset: off, transition: 'stroke-dashoffset 0.35s' }} r={nr} cx={r} cy={r} />
    </svg>
  );
}

// KO/EN translations
const translations = {
  ko: {
    nav_selected: "selected cases", nav_archive: "archives", nav_skills: "skills",
    hero_badge: "Notion API 실시간 연동 포트폴리오",
    hero_title_1: "반도체 패키징과 테스트의 신뢰성을",
    hero_title_accent: "데이터로 증명합니다.",
    hero_title_2: "엔지니어 오준서의 포트폴리오입니다.",
    hero_subtitle: "노션(Notion) 데이터베이스와 실시간으로 연동된 미니멀 포트폴리오입니다. Amkor Technology OSAT 실무, SK Hy-Po 8기, Spotfire 기반 수율 분석 등 반도체 후공정 엔지니어링 역량을 탐색해 보세요.",
    btn_explore: "포트폴리오 탐색",
    selected_title: "주요 프로젝트",
    view_details: "자세히 보기 →",
    archive_title: "전체 아카이브",
    archive_search_placeholder: "프로젝트, 툴, 이력으로 검색...",
    tab_projects: "프로젝트", tab_career: "경력 · 교육", tab_courses: "이수 과목", tab_credentials: "자격 · 서적",
    th_tag: "분류", th_title: "프로젝트명", th_org: "소속", th_period: "기간",
    no_results: "검색 조건에 맞는 프로젝트가 없습니다.",
    trajectory_title: "커리어 타임라인",
    approach_title: "보유 강점",
    approach_quote: '"반도체 불량은 사후 대응이 아닙니다. 5Why 및 피시본 분석, 설비 트러블슈팅, 유관 부서 협업을 통해 신뢰성을 완성하는 것이 엔지니어의 오너십입니다."',
    tools_title: "기술 스택 & 스킬",
    quick_view_label: "핵심 기술 툴체인",
    deep_dive_label: "노션 실물 보유 역량 데이터베이스",
    notion_skills_db_title: "Interactive Skills Database",
    footer_title: "함께 만들어갈 높은 수율",
    footer_desc: "데이터 분석과 전공 공학 지식을 결합해 반도체 후공정 수율 극대화를 이끌 준비가 되었습니다. 편하게 연락주세요.",
    copyright: "© 2026. Junseo Oh. All rights reserved.",
    modal_contribution: "역할 및 기여", modal_period: "분석 기간", modal_close: "닫기",
    modal_github: "GitHub 바로가기", modal_loading: "본문을 불러오는 중..."
  },
  en: {
    nav_selected: "selected cases", nav_archive: "archives", nav_skills: "skills",
    hero_badge: "Notion API Live-Linked Portfolio",
    hero_title_1: "Proving semiconductor packaging",
    hero_title_accent: "reliability with data.",
    hero_title_2: "Engineer Junseo Oh.",
    hero_subtitle: "A minimal portfolio live-linked with Notion API. Explore yield analytics with TIBCO Spotfire, SK hynix Hy-Po training, and Amkor Technology OSAT engineering practice.",
    btn_explore: "Explore Portfolio",
    selected_title: "Selected Projects",
    view_details: "View Details →",
    archive_title: "Full Archives",
    archive_search_placeholder: "Search projects, tools, or keywords...",
    tab_projects: "Projects", tab_career: "Career & Education", tab_courses: "Coursework", tab_credentials: "Credentials",
    th_tag: "Category", th_title: "Title", th_org: "Organization", th_period: "Period",
    no_results: "No matching projects found.",
    trajectory_title: "Career Timeline",
    approach_title: "Core Strengths",
    approach_quote: '"Defect control is not about post-production sorting. True ownership means proactively preventing failures through physical root-cause analysis, equipment troubleshooting, and collaborative cross-functional alignment."',
    tools_title: "Tools & Skills",
    quick_view_label: "Core Technical Toolchain",
    deep_dive_label: "Interactive Skills Inventory",
    notion_skills_db_title: "Interactive Skills Database",
    footer_title: "Let's Create High-Yield Innovations",
    footer_desc: "I am prepared to maximize semiconductor back-end yields by integrating data analytics with engineering principles. Feel free to reach out.",
    copyright: "© 2026. Junseo Oh. All rights reserved.",
    modal_contribution: "Role & Contribution", modal_period: "Duration", modal_close: "Close",
    modal_github: "View on GitHub", modal_loading: "Loading content..."
  }
};

// English project translations
const projectTranslations = {
  "Spotfire-Based Analysis of Correlation Between Semiconductor Process & Defects": { title: "TIBCO Spotfire-Based Analysis of Correlation Between Semiconductor Process & Defects", description: "Models and visualizes defect patterns and process parameters to identify root causes of package yields using Spotfire.", role: "Yield Data Analyst" },
  "Job Bootcamp : Process Manufacturing - Semiconductor": { title: "Semiconductor Process & Manufacturing Job Bootcamp", description: "Hands-on simulation bootcamp focused on dicing, wire bonding, molding, and standard operating procedures (SOP).", role: "Process Engineering Trainee" },
  "SK Hy-Po : Cohort 8": { title: "SK hynix SK Hy-Po Training Program (Cohort 8)", description: "Intensive semiconductor academy by SK hynix, covering front-end processes, back-end packaging, and device reliability testing.", role: "Trainee" },
  "OSAT Enigneer": { title: "OSAT Packaging & Test Engineering Practice", description: "Analysis of copper wire bonding tension, thermal cycling spec validation, and high-temp reliability specs under JEDEC standards.", role: "OSAT Engineering Practitioner" },
  "Battery Capacity Tester Design and Development": { title: "Battery Capacity Tester Design & Hardware Development", description: "Designed a constant-current battery capacity measurement circuit with MATLAB simulation and physical verification.", role: "Hardware Design Engineer" },
  "Battery Charger Design and Development": { title: "Smart Battery Charger Design & Development", description: "Designed and simulated an electro-thermal battery charging system in Simscape, optimizing charging profile efficiency.", role: "Simulation Engineer" },
  "Audio Level Meter Design and Development": { title: "Audio Level Meter & Analog Filter Design", description: "Designed an active bandpass filter and multi-stage audio level meter using MATLAB and circuit simulation.", role: "Analog Circuit Designer" },
  "Development of a Business Type Recommendation Algorithm for University District Commercial Areas": { title: "District Commercial Area Recommendation Algorithm", description: "Programmed a district recommendation algorithm using SQL database querying and Python clustering models.", role: "Data & SQL Engineer" },
  "ThermOptic : Edge-Based Autonomous Control Platform for AI-Era Data Center Energy Optimization": { title: "ThermOptic: Edge-Based Data Center Thermal Control Platform", description: "Developed an autonomous edge controller using MATLAB and physical thermal modeling to optimize server rack cooling.", role: "Thermal System Designer" }
};

const projectContentTranslations = {
  "Spotfire-Based Analysis of Correlation Between Semiconductor Process & Defects": `
🎯 **Objective**: Model and analyze wafer defect maps to trace low yield patterns back to specific process equipment chambers.
  
📊 **Methodology**: 
- Used Python Scikit-learn for wafer defect signature clustering (clustering scratches, rings, and edge defects).
- Designed TIBCO Spotfire dashboards to dynamically correlate physical defects with process parameter datasets (temperature, pressure, gas flow).
  
📈 **Results**: 
- Successfully classified 93% of spatial wafer defects.
- Traced a critical, repeated defect signature back to a gas flow fluctuation in a chemical etching chamber, showing immediate engineering value.
`,
  "OSAT Enigneer": `
🎯 **Objective**: Validate thermal-mechanical package reliability and copper wire joint mechanics based on JEDEC global standards.
  
📊 **Methodology**: 
- Applied CTE (Coefficient of Thermal Expansion) mismatch calculations to evaluate stress distribution between Silicon Die and Substrate.
- Audited HAST (Highly Accelerated Stress Test), ESD, and Temperature Cycling reliability specification compliance metrics.
  
📈 **Results**: 
- Predicted warping deformation behavior and solder joint crack failure modes across thermal cycling chambers.
- Proposed high-reliability material property adjustments (optimized Tg for Epoxy Mold Compound) to increase yield values.
`,
  "SK Hy-Po : Cohort 8": `
🎯 **Objective**: Complete SK hynix academy for advanced device physics, front-end manufacturing, and back-end test engineering.
  
📊 **Methodology**: 
- Completed intensive coursework in photolithography, plasma etching, and chemical mechanical planarization (CMP).
- Studied failure mode effects analysis (FMEA) and risk priority numbers (RPN) for packaging defects (Wire bond lift, delamination).
  
📈 **Results**: 
- Acquired deep JEDEC-standard packaging failure analysis methods.
- Built a comprehensive quality monitoring guide, ensuring immediate readiness for OSAT/foundry collaboration roles.
`
};

export default function PortfolioClient({ initialItems = [] }) {
  const [activeTab, setActiveTab] = useState('Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalContent, setModalContent] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [activeSkillSegment, setActiveSkillSegment] = useState('all');
  const [timeStr, setTimeStr] = useState('12:00 PM');
  const [lang, setLang] = useState('ko');

  // Carousel drag state
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const t = translations[lang] || translations.ko;

  // Badge translation
  const translateBadge = (badgeStr) => {
    if (!badgeStr) return '';
    const m = { '🏆 OSAT 실무': '🏆 OSAT Engineering', '📊 YIELD DATA': '📊 Yield Data', '🔥 SK HY-PO': '🔥 SK Hy-Po', '🔬 RESEARCH': '🔬 Research', '⚡ TESTER DESIGN': '⚡ Tester Design', '💻 SILICON CAMP': '💻 Silicon Camp', '📚 COURSEWORK': '📚 Coursework', '⭐ CORE SEMI': '⭐ Core Semi', '🎫 LICENSE': '🎫 License', '📖 STUDY': '📖 Study', '💡 GENERAL': '💡 General' };
    return m[badgeStr] || badgeStr;
  };

  // Localized items
  const localizedItems = (initialItems || []).map(item => {
    if (!item) return null;
    if (lang === 'ko') return item;
    const itemTitle = item.title || '';
    const matchingKey = Object.keys(projectTranslations).find(k => itemTitle.startsWith(k.substring(0, 15)) || k.startsWith(itemTitle.substring(0, 15)));
    if (matchingKey && projectTranslations[matchingKey]) {
      const trans = projectTranslations[matchingKey];
      return { ...item, title: trans.title, description: trans.description, role: trans.role, badge: item.badge ? translateBadge(item.badge) : '' };
    }
    return { ...item, badge: item.badge ? translateBadge(item.badge) : '' };
  }).filter(Boolean);

  const featuredProjects = localizedItems.filter(p => p?.featured && p?.category !== 'Courses');
  const projects = localizedItems.filter(p => p?.category === 'Projects' || (p?.rawSemiconductor && p?.category !== 'Courses' && p?.category !== 'Career' && p?.category !== 'Education'));
  const careerAndEdu = localizedItems.filter(p => { const tl = (p?.title || '').toLowerCase(); const rl = (p?.role || '').toLowerCase(); return p?.category === 'Career' || p?.category === 'Education' || tl.includes('hy-po') || rl.includes('amkor') || rl.includes('hynix'); });
  const courses = localizedItems.filter(p => p?.category === 'Courses' || (p?.title || '').toLowerCase().startsWith('course'));
  const credentials = localizedItems.filter(p => p?.category === 'Licenses' || p?.category === 'Books' || (p?.title || '').toLowerCase().includes('test certificate') || (p?.title || '').toLowerCase().includes('review'));

  let activeList = [];
  if (activeTab === 'Projects') activeList = projects;
  else if (activeTab === 'CareerEdu') activeList = careerAndEdu;
  else if (activeTab === 'Courses') activeList = courses;
  else if (activeTab === 'Credentials') activeList = credentials;

  const filteredItems = activeList.filter(item => {
    if (!item) return false;
    const q = searchQuery.toLowerCase();
    return (item.title || '').toLowerCase().includes(q) || (item.tags || []).some(tag => (tag || '').toLowerCase().includes(q)) || (item.description || '').toLowerCase().includes(q) || (item.role || '').toLowerCase().includes(q);
  });

  // Skill segment filtering
  const activeSegmentDef = skillSegments.find(s => s.id === activeSkillSegment);
  const filteredSkills = activeSegmentDef?.filter ? portfolioSkills.filter(activeSegmentDef.filter) : portfolioSkills;
  const sortedSkills = [...filteredSkills].sort((a, b) => { if (b.level !== a.level) return b.level - a.level; return a.name.localeCompare(b.name); });

  // Carousel mouse drag handlers
  const handleMouseDown = useCallback((e) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 360;
    carouselRef.current.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  // Modal handler
  const handleOpenModal = async (project) => {
    setSelectedProject(project);
    setModalContent('');
    setIsModalLoading(true);
    const originalTitle = initialItems.find(item => item.id === project.id)?.title || '';
    if (lang === 'en' && projectContentTranslations[originalTitle]) {
      setModalContent(projectContentTranslations[originalTitle]);
      setIsModalLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/project-content?id=${project.id}`);
      const data = await res.json();
      setModalContent(data.content || project.content);
    } catch {
      setModalContent(project.content || '상세 내용을 불러오는데 실패했습니다.');
    } finally {
      setIsModalLoading(false);
    }
  };

  return (
    <div className="portfolio-content" style={{ paddingBottom: '5rem' }}>

      {/* ━━━ Navigation Header ━━━ */}
      <header>
        <div className="nav-container">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            junseo.oh <span style={{ color: 'var(--accent)', fontWeight: 800 }}>//</span> <span style={{ color: 'var(--accent)' }}>portfolio</span>
          </div>
          <nav className="nav-links">
            <a className="nav-link" onClick={() => document.getElementById('selected')?.scrollIntoView({ behavior: 'smooth' })}>{t.nav_selected}</a>
            <a className="nav-link" onClick={() => document.getElementById('archived')?.scrollIntoView({ behavior: 'smooth' })}>{t.nav_archive}</a>
            <a className="nav-link" onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}>{t.nav_skills}</a>
            <button onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')} style={{ padding: '0.3rem 0.75rem', border: '1px solid var(--rule)', background: 'var(--surface)', color: 'var(--accent)', cursor: 'pointer', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'var(--font-primary)', transition: 'all 0.2s ease' }}>
              {lang === 'ko' ? 'EN' : 'KO'}
            </button>
          </nav>
        </div>
      </header>

      {/* ━━━ 01 / Hero ━━━ */}
      <section id="intro" className="hero" style={{ paddingBottom: '3rem' }}>
        <div className="hero-badge">{t.hero_badge}</div>
        <h1 className="hero-title" style={{ marginBottom: '1.5rem' }}>
          {t.hero_title_1}<br />
          <span>{t.hero_title_accent}</span><br />
          {t.hero_title_2}
        </h1>
        <p className="hero-subtitle" style={{ maxWidth: '780px', margin: '0 auto 2rem auto' }}>{t.hero_subtitle}</p>
        <div className="hero-buttons" style={{ marginBottom: '3rem' }}>
          <button className="btn-primary" onClick={() => document.getElementById('selected')?.scrollIntoView({ behavior: 'smooth' })}>{t.btn_explore}</button>
          <a href="https://github.com/oasunryo" target="_blank" rel="noreferrer" className="btn-secondary">GitHub</a>
        </div>

        {/* 3 Core Strengths Mini-Grid (Extracted Real Competencies) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', width: '100%', maxWidth: '960px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', padding: '1.5rem', borderRadius: '24px', transition: 'all 0.3s ease' }} className="skill-card-hover">
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.75rem' }}>🔬</span>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.5rem' }}>
              {lang === 'ko' ? 'OSAT 패키징 & 테스트 실무' : 'OSAT Packaging & Test'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {lang === 'ko' ? 'Amkor Technology 실무 연계 및 JEDEC 규격(HAST/ESD/TC)에 입각한 신뢰성 검증 능력 보유' : 'Amkor Technology industry analysis & reliability verification based on JEDEC global standards'}
            </p>
          </div>
          
          <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', padding: '1.5rem', borderRadius: '24px', transition: 'all 0.3s ease' }} className="skill-card-hover">
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.75rem' }}>📊</span>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.5rem' }}>
              {lang === 'ko' ? '수율 데이터 분석 (Spotfire)' : 'Yield Data Analytics (Spotfire)'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {lang === 'ko' ? 'TIBCO Spotfire 및 Python 기반의 공정 데이터 전처리, 웨이퍼 불량 상관관계 도출(정확도 93%)' : 'Preprocessed defect map datasets, modeled signature clustering, and isolated tool faults with Spotfire (93% accuracy)'}
            </p>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', padding: '1.5rem', borderRadius: '24px', transition: 'all 0.3s ease' }} className="skill-card-hover">
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.75rem' }}>🔥</span>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.5rem' }}>
              {lang === 'ko' ? 'SK hynix Hy-Po 8기 수료' : 'SK hynix Hy-Po Academy'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {lang === 'ko' ? '전공 노하우(Photo/Etch/CMP) 및 8대 공정 물리, 패키징 신뢰성 설계 및 수율 관리 전문 학업 완료' : 'Completed intensive SK hynix academy on device physics, standard process control & yield enhancement'}
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ 02 / Selected Cases — Apple Horizontal Carousel ━━━ */}
      {featuredProjects.length > 0 && (
        <section id="selected" style={{ padding: '5rem 2rem' }}>
          <div className="frame">
            <h2 className="section-title">{t.selected_title}</h2>
            <div className="carousel-container">
              <button className="carousel-btn carousel-btn-prev" onClick={() => scrollCarousel('prev')} aria-label="Previous">‹</button>
              <div className="carousel-track" ref={carouselRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                {featuredProjects.map(p => (
                  <div key={p.id} className="carousel-card" onClick={() => handleOpenModal(p)}>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(var(--accent-rgb), 0.06)', border: '1px solid rgba(var(--accent-rgb), 0.15)', padding: '0.25rem 0.65rem', borderRadius: '100px', display: 'inline-block', marginBottom: '1rem' }}>{p.badge}</span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.75rem', lineHeight: 1.3, letterSpacing: '-0.3px' }}>{p.title}</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.description}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--rule)', paddingTop: '1rem', marginTop: '1.25rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {(p.tags || []).slice(0, 3).map(tag => (<span key={tag} className="tag">{tag}</span>))}
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)' }}>{t.view_details}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-btn carousel-btn-next" onClick={() => scrollCarousel('next')} aria-label="Next">›</button>
            </div>
          </div>
        </section>
      )}

      {/* ━━━ 03 / Archives ━━━ */}
      <section id="archived" style={{ padding: '5rem 2rem' }}>
        <div className="frame">
          <h2 className="section-title">{t.archive_title}</h2>
          <div style={{ maxWidth: '540px', marginBottom: '2.5rem' }}>
            <input type="text" placeholder={t.archive_search_placeholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', border: '1px solid var(--rule)', background: 'var(--surface)', color: 'var(--fg)', fontFamily: 'var(--font-primary)', fontSize: '0.88rem', outline: 'none', borderRadius: '16px', transition: 'all 0.3s ease' }} />
          </div>

          {/* Toss Segmented Tab for Archives */}
          <div className="segmented-control" style={{ marginBottom: '2rem' }}>
            {[
              { id: 'Projects', label: t.tab_projects, count: projects.length },
              { id: 'CareerEdu', label: t.tab_career, count: careerAndEdu.length },
              { id: 'Courses', label: t.tab_courses, count: courses.length },
              { id: 'Credentials', label: t.tab_credentials, count: credentials.length }
            ].map(tab => (
              <button key={tab.id} className={`segmented-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}>
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Archive Table */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: '24px', padding: '0.5rem 1.5rem', overflow: 'hidden' }}>
            <table className="archive-table">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--rule-strong)' }}>
                  <th style={{ fontSize: '0.72rem', color: 'var(--muted)', padding: '1rem 0.5rem', textAlign: 'left', fontWeight: 600, width: '18%' }}>{t.th_tag}</th>
                  <th style={{ fontSize: '0.72rem', color: 'var(--muted)', padding: '1rem 0.5rem', textAlign: 'left', fontWeight: 600, width: '45%' }}>{t.th_title}</th>
                  <th style={{ fontSize: '0.72rem', color: 'var(--muted)', padding: '1rem 0.5rem', textAlign: 'left', fontWeight: 600, width: '22%' }}>{t.th_org}</th>
                  <th style={{ fontSize: '0.72rem', color: 'var(--muted)', padding: '1rem 0.5rem', textAlign: 'right', fontWeight: 600, width: '15%' }}>{t.th_period}</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id} onClick={() => handleOpenModal(item)} className="archive-row-hover" style={{ borderBottom: '1px solid var(--rule)', cursor: 'pointer', transition: 'background 0.2s ease' }}>
                    <td style={{ fontSize: '0.78rem', color: 'var(--accent)', padding: '1.1rem 0.5rem', fontWeight: 600 }}>{item.badge || item.category}</td>
                    <td style={{ fontWeight: 600, color: 'var(--fg)', padding: '1.1rem 0.5rem', fontSize: '0.92rem' }}>{item.title}</td>
                    <td style={{ color: 'var(--text-secondary)', padding: '1.1rem 0.5rem', fontSize: '0.85rem' }}>{item.role}</td>
                    <td style={{ textAlign: 'right', color: 'var(--muted)', fontSize: '0.8rem', padding: '1.1rem 0.5rem' }}>{(item.period || '').split(' ~ ')[0] || 'done'}</td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr><td colSpan="4" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--muted)', fontSize: '0.88rem' }}>{t.no_results}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ━━━ 05 / Career Trajectory ━━━ */}
      <section id="trajectory" style={{ padding: '5rem 2rem' }}>
        <div className="frame">
          <h2 className="section-title">{t.trajectory_title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', paddingLeft: '2.5rem' }}>
            <div style={{ position: 'absolute', left: '11px', top: '8px', bottom: '8px', width: '2px', background: 'var(--rule)', borderRadius: '1px' }} />
            {[
              { year: '2026', title: { ko: 'OSAT 엔지니어 직무 연계 스터디', en: 'OSAT Packaging & Test Engineering Study' }, org: 'Amkor Technology', desc: { ko: '세계적 반도체 후공정(OSAT) 1티어 대기업 Amkor와의 연계 교육 및 경력 궤적 완성.', en: 'Completed industrial study linkage programs mapped directly to Tier-1 OSAT leader Amkor Technology.' } },
              { year: '2026', title: { ko: 'SK 하이포(SK Hy-Po) : 8기 교육 과정', en: 'SK hynix SK Hy-Po Program : Cohort 8' }, org: 'SK hynix', desc: { ko: 'SK하이닉스 주관 청년 반도체 인재 육성 과정 수료.', en: 'Graduated from SK hynix intensive academy, mastering front-end lithography and back-end reliability packaging mechanics.' } },
              { year: '2025', title: { ko: '반도체 공정 및 불량 분석 데이터 애널리스트', en: 'Semiconductor Process & Defect Data Analyst' }, org: 'Letuin Edu', desc: { ko: 'Spotfire 기반 반도체 결함 분석 및 수율 통계적 분석 프로젝트 수행.', en: 'Engineered yield analysis models with Spotfire and developed spatial defect pattern recognition algorithms using Python.' } },
              { year: '2021 ~ 2025', title: { ko: '핵심 공학 전공 이수', en: 'Core Academic Engineering Coursework' }, org: 'Kwangwoon University', desc: { ko: '전기공학과 전공 이수 (반도체소자공학, 디지털논리회로설계, 전기전자재료물성학).', en: 'Majored in Electrical Engineering, mastering Semiconductor Device Engineering, Digital Logic Design, and Material Properties.' } }
            ].map((entry, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-2.5rem', top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--bg)', border: '2.5px solid var(--accent)', boxShadow: '0 0 0 4px rgba(var(--accent-rgb), 0.1)' }} />
                <div style={{ width: '100px', fontSize: '0.88rem', color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>{entry.year}</div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--fg)', fontWeight: 700, marginBottom: '0.3rem' }}>{entry.title[lang]}</h3>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 600 }}>{entry.org}</span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{entry.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 06 / Strengths ━━━ */}
      <section id="approach" style={{ padding: '5rem 2rem' }}>
        <div className="frame">
          <h2 className="section-title">{t.approach_title}</h2>
          <div style={{ background: 'var(--surface)', borderRadius: '24px', padding: '2rem 2.5rem', marginBottom: '2.5rem', borderLeft: '4px solid var(--accent)' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--fg)', lineHeight: 1.65 }}>{t.approach_quote}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { num: "01", name: "Root Cause Analysis (RCA)", level: 2, desc: "Defect troubleshooting framework (5Why / Fishbone / Pareto)", action: { ko: "공정 결함 발생 시, 5Why 및 피시본 다이어그램을 적용하여 결함 메커니즘의 근본 원인을 과학적으로 추적합니다.", en: "Applies 5Why and Fishbone diagram frameworks to trace root causes of physical defect mechanisms." } },
              { num: "02", name: "Trouble Shooting", level: 2, desc: "Equipment/process troubleshooting & recovery", action: { ko: "장비 트러블 발생 시, 수율 분석 데이터를 기반으로 빠르게 진단하고 복구 프로토콜을 가동합니다.", en: "Traces and restores faulty equipment states by auditing real-time sensor parameters and optimizing recovery protocols." } },
              { num: "03", name: "Customer Service & Collaboration", level: 3, desc: "Stakeholder communication & active listening", action: { ko: "고객사 및 유관 부서와 깊이 경청하고 적극적인 대응으로 일정을 고수합니다.", en: "Maintains timeline integrity through proactive active listening and meticulous stakeholder follow-through." } },
              { num: "04", name: "Aftercare & Ownership", level: 3, desc: "Follow-up mindset & end-to-end responsibility", action: { ko: "개별 공정 완료 후에도 최종 신뢰성 검증까지 끝까지 추적하는 애프터케어 마인드셋을 가집니다.", en: "Fosters end-to-end engineering ownership by executing continuous quality aftercare until final reliability chambers are cleared." } }
            ].map((strength) => (
              <div key={strength.num} className="skill-card-hover" style={{ background: 'var(--surface)', border: '1px solid var(--rule)', padding: '2rem 2.5rem', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ flex: '1 1 400px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 700 }}>{strength.num}</span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--fg)', margin: 0 }}>{strength.name}</h3>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.5rem' }}>{strength.desc}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{strength.action[lang]}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg)', border: '1px solid var(--rule)', padding: '0.5rem 1rem', borderRadius: '100px' }}>
                  <CircularProgress level={strength.level} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--fg)', fontWeight: 700 }}>P.{strength.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 07 / Tools & Skills ━━━ */}
      <section id="tools" style={{ padding: '5rem 2rem' }}>
        <div className="frame">
          <h2 className="section-title">{t.tools_title}</h2>

          {/* Quick View Toolchain */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1.25rem', fontWeight: 600 }}>{t.quick_view_label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { cat: 'Data & Analytics', tools: ['TIBCO Spotfire', 'Python', 'Pandas & NumPy', 'Matplotlib', 'SQL'] },
                { cat: 'Standards & Reliability', tools: ['JEDEC (JESD22)', 'HAST / ESD / TC', 'FMEA Framework', 'SPC'] },
                { cat: 'Circuits & Core', tools: ['Digital Logic', 'SPICE Simulation', 'Material Physics', 'Lab Equipment'] }
              ].map((box, idx) => (
                <div key={idx} className="skill-card-hover" style={{ background: 'var(--surface)', border: '1px solid var(--rule)', padding: '1.5rem 2rem', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg)', margin: 0, minWidth: '180px' }}>{box.cat}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {box.tools.map(tool => (<span key={tool} style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent)', background: 'rgba(var(--accent-rgb), 0.06)', border: '1px solid rgba(var(--accent-rgb), 0.15)', padding: '0.3rem 0.7rem', borderRadius: '100px' }}>{tool}</span>))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Toss Segmented Skills Tab */}
          <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 700, marginBottom: '0.4rem' }}>{t.deep_dive_label}</div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.3px' }}>{t.notion_skills_db_title}</h3>
              </div>
              <div className="segmented-control">
                {skillSegments.map(seg => (
                  <button key={seg.id} className={`segmented-tab ${activeSkillSegment === seg.id ? 'active' : ''}`} onClick={() => setActiveSkillSegment(seg.id)}>
                    {seg.icon} {seg.label[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fadeInUp 0.3s ease' }}>
              {sortedSkills.map(skill => (
                <div key={skill.name} className="skill-card-hover" style={{ background: 'var(--surface)', border: '1px solid var(--rule)', padding: '1.25rem 2rem', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: '1 1 350px' }}>
                    <div style={{ minWidth: '130px' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--fg)', margin: 0 }}>{skill.name}</h4>
                      <span style={{ fontSize: '0.6rem', fontWeight: 600, color: skill.category === 'Technical' ? 'var(--accent)' : '#8B95A1', background: skill.category === 'Technical' ? 'rgba(var(--accent-rgb), 0.06)' : 'var(--surface-raised)', border: `1px solid ${skill.category === 'Technical' ? 'rgba(var(--accent-rgb), 0.15)' : 'var(--rule)'}`, padding: '0.15rem 0.4rem', borderRadius: '100px', marginTop: '0.3rem', display: 'inline-block' }}>{skill.category}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{skill.desc?.[lang] || ''}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {(skill.cert || skill.project) && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: '160px' }}>
                        {skill.cert && <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>🎫 {skill.cert}</div>}
                        {skill.project && <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>🔗 {typeof skill.project === 'object' ? skill.project[lang] : skill.project}</div>}
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg)', border: '1px solid var(--rule)', padding: '0.4rem 0.7rem', borderRadius: '100px' }}>
                      <CircularProgress level={skill.level} />
                      <span style={{ fontSize: '0.72rem', color: 'var(--fg)', fontWeight: 700 }}>P.{skill.level}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Footer ━━━ */}
      <footer id="contact" style={{ padding: '5rem 2rem 8rem', marginTop: '4rem' }}>
        <div className="footer-container">
          <h2 className="footer-title">{t.footer_title}</h2>
          <p className="footer-desc">{t.footer_desc}</p>
          <a href="mailto:junseo.oh.kr@gmail.com" className="contact-email">junseo.oh.kr@gmail.com</a>
          <p className="footer-copy">{t.copyright}</p>
        </div>
      </footer>

      {/* ━━━ Modal ━━━ */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>&times;</button>
            <span className="modal-category">{selectedProject.category}</span>
            <h2 className="modal-title">{selectedProject.title}</h2>
            <div className="modal-meta-grid">
              <div className="modal-meta-item"><span>{t.modal_contribution}</span><p>{selectedProject.role || '-'}</p></div>
              <div className="modal-meta-item"><span>{t.modal_period}</span><p>{selectedProject.period || '-'}</p></div>
            </div>
            <div className="modal-body" style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.5rem' }}>
              {isModalLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div className="spinner" style={{ display: 'inline-block', width: '28px', height: '28px', border: '3px solid var(--rule)', borderTopColor: 'var(--accent)', borderRadius: '50%' }} />
                  <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>{t.modal_loading}</p>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(modalContent) }} />
              )}
            </div>
            <div className="modal-footer">
              {selectedProject.link && (<a href={selectedProject.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>{t.modal_github}</a>)}
              <button className="btn-secondary" onClick={() => setSelectedProject(null)} style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>{t.modal_close}</button>
            </div>
          </div>
        </div>
      )}

      {/* ━━━ Status Bar — Ultra Minimal ━━━ */}
      <div className="status-bar">
        <div className="status-bar-inner">
          <div className="status-bar-segment" style={{ gap: '6px' }}>
            <span className="pulse-dot" />
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>LIVE</span>
          </div>
          <div style={{ width: '1px', height: '12px', background: 'var(--rule)' }} />
          <div className="status-bar-segment status-bar-path">
            <span className="status-bar-path-prefix">~/</span>
            <span>junseo.oh</span>
          </div>
          <div style={{ width: '1px', height: '12px', background: 'var(--rule)' }} />
          <div className="status-bar-segment">
            <span>studying: OSAT packaging (sk hy-po 8th)</span>
          </div>
          <div style={{ width: '1px', height: '12px', background: 'var(--rule)', margin: '0 0.25rem' }} />
          <div className="status-bar-segment" style={{ cursor: 'pointer' }} onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>
            <span style={{ color: 'var(--muted)' }}>lang:</span>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{lang.toUpperCase()}</span>
          </div>
          <div className="status-bar-time"><span>{timeStr}</span></div>
        </div>
      </div>
    </div>
  );
}
