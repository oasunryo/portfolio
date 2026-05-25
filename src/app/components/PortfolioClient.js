'use client';

import { useState, useEffect } from 'react';

// 간단한 Markdown-to-HTML 파서 함수 (네온 사이언 & 라임 그린 그라디언트 테마)
function parseMarkdown(markdownText) {
  if (!markdownText) return '';
  
  let html = markdownText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 인용구/캘아웃 변환 - 네온 시안 & 네온 라임 그라디언트 적용
  html = html.replace(/^>\s+💡\s+(.+)$/gm, '<blockquote style="border-left:4px solid hsl(188, 100%, 50%); background:rgba(0,240,255,0.04); padding:1rem; border-radius:8px; margin-bottom:1.25rem;">💡 $1</blockquote>');
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote style="border-left:4px solid hsl(108, 100%, 54%); background:rgba(57,255,20,0.04); padding:1rem; border-radius:8px; margin-bottom:1.25rem;">$1</blockquote>');

  // 헤더 변환 (h2, h3)
  html = html.replace(/^##\s+(.+)$/gm, '<h2 style="color:var(--fg); font-family:var(--font-sans); font-size:1.35rem; font-weight:600; margin-top:2rem; margin-bottom:0.75rem; border-left:3px solid hsl(188, 100%, 50%); padding-left:0.75rem; letter-spacing:-0.5px;">$1</h2>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 style="color:hsl(var(--accent-primary)); font-size:1.1rem; font-weight:600; margin-top:1.5rem; margin-bottom:0.5rem; font-family:var(--font-mono);">$1</h3>');

  // 볼드 텍스트 변환
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--fg); font-weight:700;">$1</strong>');

  // 리스트 변환 (ul / li)
  html = html.replace(/^\-\s+(.+)$/gm, '<li style="margin-bottom:0.4rem; padding-left:0.25rem;">$1</li>');
  html = html.replace(/(<li style="margin-bottom:0\.4rem; padding-left:0\.25rem;">.*<\/li>)/gs, '<ul style="padding-left:1.25rem; margin-bottom:1.25rem; list-style-type:square; font-size:0.95rem;">$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  // 줄바꿈을 문단(<p>) 혹은 <br>로 변경
  html = html.replace(/\n\n/g, '</p><p style="margin-bottom:1rem; color:var(--text-secondary);">');
  html = html.replace(/\n/g, '<br />');
  
  if (!html.startsWith('<h') && !html.startsWith('<u') && !html.startsWith('<l') && !html.startsWith('<b')) {
    html = '<p style="margin-bottom:1rem; color:var(--text-secondary);">' + html + '</p>';
  }

  return html;
}

// 5대 반도체 후공정 단계 로드맵 데이터
const roadmapSteps = [
  {
    num: "01",
    name: "Wafer Dicing",
    defects: "Chipping, Micro-cracks",
    desc: "웨이퍼상의 개별 칩(Die)을 다이아몬드 블레이드나 레이저를 이용해 초정밀 톱질하여 분리해내는 공정입니다. 칩의 손상을 극소화하는 것이 품질의 핵심입니다.",
    philosophy: "절단면 치핑(Chipping) 및 미세 균열 전수 시뮬레이션을 기반으로 초정밀 툴 마모도 감시 가이드 숙지"
  },
  {
    num: "02",
    name: "Die Attach",
    defects: "Voiding, Tilt, Delamination",
    desc: "분리된 실리콘 칩을 패키지 기판(Substrate) 위에 정밀 리퀴드 에폭시나 다이 에이태치 필름(DAF)으로 물리적 본딩을 진행하는 공정입니다.",
    philosophy: "접착 계면의 미세 기포(Void) 분석 및 실리콘 칩의 경사(Tilt) 방지를 위한 전공 공학 매커니즘 스터디"
  },
  {
    num: "03",
    name: "Wire Bonding",
    defects: "Lifted Weld, Neck Break",
    desc: "칩의 알루미늄/구리 패드와 기판의 리드(Lead) 사이를 수 마이크로미터 두께의 미세한 금선/구리선으로 연결하여 전기 신호 통로를 확보합니다.",
    philosophy: "와이어 텐션 균일화 및 접합부 기계적 신뢰성 테스트용 전단 강도(Shear Strength) 최적화 방법론 이해"
  },
  {
    num: "04",
    name: "Molding",
    defects: "Void, Wire Sweep, Incomplete Fill",
    desc: "외부의 충격, 열, 습기 및 정전기로부터 칩과 연결선을 보호하기 위해 에폭시 몰딩 컴파운드(EMC) 수지로 감싸 패키지를 밀봉하는 공정입니다.",
    philosophy: "EMC 고온 점도 변화로 인한 와이어 휩(Wire Sweep, 쏠림) 불량 방지를 위한 열응력 해석론 탐구"
  },
  {
    num: "05",
    name: "Package Test",
    defects: "Contact Failure, Parametric Drift",
    desc: "최종 생산된 패키지 반도체에 대해 실제 온도 챔버 환경과 고주파 테스터 장비(ATE)를 사용하여 전기 신호 정상 동작 여부를 판정합니다.",
    philosophy: "웨이퍼 맵 불량 패턴 통계 분석을 통해 불량 다발 유발 장비 역추적 및 수율 최적화 분석 역량 보유"
  }
];

// Notion "Portfolio Skills" 실물 데이터베이스 정밀 이식 (28개)
const portfolioSkills = [
  { name: "AI Prompting", category: "Technical", level: 3, desc: "Automation of documentation/analysis workflows", cert: "AIOF No.2 Career-Jump", project: "SK Hy-Po : Cohort 8" },
  { name: "Figma", category: "Technical", level: 3, desc: "Dashboard UX for monitoring (defect/uptime/KPI)", cert: "", project: "App UX/UI Improvement" },
  { name: "MATLAB", category: "Technical", level: 3, desc: "Model-based analysis/simulation", cert: "Matlab Onramp", project: "Audio Level Meter Design and..." },
  { name: "MS Office", category: "Technical", level: 3, desc: "Reporting basics (Excel/PowerPoint)", cert: "Word Processor Certificate", project: "Job Bootcamp : Process Manual..." },
  { name: "Notion", category: "Technical", level: 3, desc: "Knowledge base / documentation", cert: "Notion Advanced Badge", project: "2001runners, Do Run Seoul..." },
  { name: "Verilog HDL", category: "Technical", level: 3, desc: "Hardware description & digital logic design", cert: "", project: "Course : Semiconductor Equipment..." },
  { name: "Active Listening", category: "Interpersonal", level: 3, desc: "Cross-functional communication", cert: "", project: "" },
  { name: "Aftercare", category: "Interpersonal", level: 3, desc: "Follow-up mindset", cert: "", project: "" },
  { name: "Customer Service (CS)", category: "Interpersonal", level: 3, desc: "Stakeholder communication & follow-through", cert: "CS Leader Manager", project: "Job Bootcamp : Process Manual..." },
  { name: "LinkedIn", category: "Interpersonal", level: 3, desc: "Networking/branding", cert: "", project: "" },
  { name: "ModelSim", category: "Technical", level: 2, desc: "HDL simulation & verification tool (program usage)", cert: "", project: "Course : Semiconductor Equipment..." },
  { name: "Quartus II", category: "Technical", level: 2, desc: "FPGA design & synthesis tool (program usage)", cert: "", project: "Course : Semiconductor Equipment..." },
  { name: "Simscape", category: "Technical", level: 2, desc: "Physical modeling (electro-thermal systems)", cert: "Circuit Simulation Onramp", project: "Battery Charger Design and..." },
  { name: "Simulink", category: "Technical", level: 2, desc: "Control/system simulation (Model-based validation)", cert: "Simulink Onramp, Circuit Simulation...", project: "Audio Level Meter Design and..." },
  { name: "Spotfire", category: "Technical", level: 2, desc: "Process/Yield/Defect analytics (Visualization/Correlation)", cert: "", project: "Spotfire-Based Analysis of Core..." },
  { name: "Entrepreneurship", category: "Interpersonal", level: 2, desc: "Ownership/initiative", cert: "1st Asan Doers University", project: "Kazipon : Childcare and house..." },
  { name: "Root Cause Analysis (RCA)", category: "Interpersonal", level: 2, desc: "Defect troubleshooting framework (5Why/Fishbone/Pareto)", cert: "", project: "SK Hy-Po : Cohort 8" },
  { name: "Trouble Shooting", category: "Interpersonal", level: 2, desc: "Equipment/process troubleshooting & recovery", cert: "", project: "" },
  { name: "Battery System", category: "Technical", level: 1, desc: "Hardware systems understanding (measurement mindset)", cert: "", project: "Battery Capacity Tester Design..." },
  { name: "Circuit Design", category: "Technical", level: 1, desc: "Electronics fundamentals", cert: "", project: "Battery Capacity Tester Design..." },
  { name: "Github", category: "Technical", level: 1, desc: "Version control / evidence of work", cert: "", project: "Development of a Business Type..." },
  { name: "Mermaid", category: "Technical", level: 1, desc: "Process flow / logic diagram for SOP & RCA", cert: "", project: "" },
  { name: "Power System", category: "Technical", level: 1, desc: "Energy/power fundamentals (less direct to OSAT)", cert: "KPX : Electric Power Trans...", project: "ThermOptic : Edge-Based Auto..." },
  { name: "SQL", category: "Technical", level: 1, desc: "Data querying for test/process datasets", cert: "ADsP : Advanced Data Ana...", project: "Development of a Business Type..." },
  { name: "Tableau", category: "Technical", level: 1, desc: "KPI dashboarding (SPC-style reporting)", cert: "", project: "" },
  { name: "B2B", category: "Interpersonal", level: 1, desc: "Professional communication (business)", cert: "B2B Sales Short-term Pro...", project: "AI Solution Sales for Tenants..." },
  { name: "B2C", category: "Interpersonal", level: 1, desc: "General communication", cert: "", project: "Do Run Seoul, Development..." },
  { name: "Economics", category: "Interpersonal", level: 1, desc: "Business literacy", cert: "MaeKyung Economic Test...", project: "Techlog." }
];

// Notion-style P. (Proficiency) 레벨 원형 진행도 표시 컴포넌트
function getCircularProgress(level) {
  const radius = 8;
  const stroke = 2.2;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  // level 3: 100%, level 2: 66%, level 1: 33%
  const percentage = level === 3 ? 100 : level === 2 ? 66 : 33;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} style={{ transform: 'rotate(-90deg)', marginRight: '6px' }}>
      <circle
        stroke="rgba(255,255,255,0.08)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="hsl(var(--accent-secondary))"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.35s' }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
}

export default function PortfolioClient({ initialItems }) {
  // 사용자의 노션 데이터를 성격에 맞는 4가지 대분류 탭으로 효율적 매핑
  const [activeTab, setActiveTab] = useState('Projects'); // Projects, CareerEdu, Courses, Credentials
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalContent, setModalContent] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('intro'); // wayfinding nav 활성 섹션

  // 후공정 로드맵 선택 상태
  const [selectedRoadmapStep, setSelectedRoadmapStep] = useState(roadmapSteps[0]);

  // 스킬 인터랙티브 필터 및 정렬 상태
  const [skillCategoryFilter, setSkillCategoryFilter] = useState('All'); // All, Technical, Interpersonal
  const [skillSortOrder, setSkillSortOrder] = useState('Proficiency'); // Proficiency, Alphabetical


  // ==========================================
  // [데이터 레이어 분류 및 스마트 분류 알고리즘]
  // ==========================================
  
  // 1. 핵심 킬러 성과 Featured 프로젝트 (반도체 연관 프로젝트 및 핵심 경력 우선 배치)
  const featuredProjects = initialItems.filter(p => p.featured && p.category !== 'Courses');

  // 2. 탭 A: Projects (실무형 프로젝트 및 부트캠프)
  const projects = initialItems.filter(p => 
    p.category === 'Projects' || 
    (p.rawSemiconductor && p.category !== 'Courses' && p.category !== 'Career' && p.category !== 'Education')
  );

  // 3. 탭 B: Career & Education (앰코테크놀로지, SK Hy-Po, Schneider 등 대외 실무 및 교육)
  const careerAndEdu = initialItems.filter(p => 
    p.category === 'Career' || 
    p.category === 'Education' || 
    p.title.toLowerCase().includes('hy-po') ||
    p.role.toLowerCase().includes('amkor') ||
    p.role.toLowerCase().includes('hynix')
  );

  // 4. 탭 C: Relevant Coursework (학부 이수 과목)
  const courses = initialItems.filter(p => 
    p.category === 'Courses' || 
    p.title.toLowerCase().startsWith('course')
  );

  // 5. 탭 D: Credentials & Books (자격증, 서적 연구 분석 리뷰)
  const credentials = initialItems.filter(p => 
    p.category === 'Licenses' || 
    p.category === 'Books' || 
    p.title.toLowerCase().includes('test certificate') ||
    p.title.toLowerCase().includes('review')
  );

  // 현재 선택된 탭에 맞춰 활성 데이터 리스트 설정
  let activeList = [];
  if (activeTab === 'Projects') activeList = projects;
  else if (activeTab === 'CareerEdu') activeList = careerAndEdu;
  else if (activeTab === 'Courses') activeList = courses;
  else if (activeTab === 'Credentials') activeList = credentials;

  // 검색 쿼리에 따른 실시간 필터링 로직
  const filteredItems = activeList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // 필터링 및 정렬된 실물 스킬 리스트 가공
  const filteredSkills = portfolioSkills.filter(s => {
    if (skillCategoryFilter === 'All') return true;
    return s.category === skillCategoryFilter;
  }).sort((a, b) => {
    if (skillSortOrder === 'Proficiency') {
      if (b.level !== a.level) return b.level - a.level;
      return a.name.localeCompare(b.name);
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  // ==========================================
  // [Wayfinding Nav 스크롤 감지 로직]
  // ==========================================
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'selected', 'roadmap', 'archived', 'trajectory', 'approach', 'tools'];
      const scrollPos = window.scrollY + window.innerHeight / 2.5;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 모달 열기 핸들러
  const handleOpenModal = async (project) => {
    setSelectedProject(project);
    setModalContent('');
    setIsModalLoading(true);

    try {
      const res = await fetch(`/api/project-content?id=${project.id}`);
      const data = await res.json();
      setModalContent(data.content || project.content);
    } catch (err) {
      setModalContent(project.content || '상세 소개 내용을 불러오는데 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsModalLoading(false);
    }
  };

  return (
    <div className="portfolio-content">
      {/* Ambient backgrounds */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      {/* 🧭 Wayfinding Navigation 눈금 내비게이터 (Ozgur 스펙 준수) */}
      <nav className="wayfinding-nav hidden md:block" aria-label="Page sections">
        <ul className="wayfinding-list">
          {['intro', 'selected', 'roadmap', 'archived', 'trajectory', 'approach', 'tools'].map((sec) => {
            const isActive = activeSection === sec;
            const label = sec.toUpperCase();
            return (
              <li key={sec}>
                <a 
                  href={`#${sec}`} 
                  className={`wayfinding-link ${isActive ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(sec).scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="wayfinding-label">{label}</span>
                  <span className="wayfinding-tick"></span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Navigation Header */}
      <header className="rule-b">
        <div className="nav-container">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            SEMI_<span>BACKEND</span>.
          </div>
          <nav className="nav-links">
            <a className="nav-link" onClick={() => document.getElementById('selected').scrollIntoView({ behavior: 'smooth' })}>Selected</a>
            <a className="nav-link" onClick={() => document.getElementById('roadmap').scrollIntoView({ behavior: 'smooth' })}>Roadmap</a>
            <a className="nav-link" onClick={() => document.getElementById('archived').scrollIntoView({ behavior: 'smooth' })}>Archive</a>
          </nav>
        </div>
      </header>

      {/* 01 / Intro Section (히어로) */}
      <section id="intro" className="hero">
        <div className="hero-badge">Notion API Connected | Backend OSAT Portfolio</div>
        <h1 className="hero-title">
          미래 반도체의 완성을 책임지는<br />
          <span>반도체 후공정 (패키징 &amp; 테스트)</span><br />
          엔지니어 oasunryo 입니다.
        </h1>
        <p className="hero-subtitle">
          본 웹사이트는 노션(Notion) 데이터베이스와 연동된 프리미엄 다크 테마 대시보드입니다. 1티어 OSAT 앰코테크놀로지 직무 지식, SK하이닉스 SK Hy-Po 8기 교육 과정, 그리고 Spotfire를 활용한 공정/결함 통계 분석 리포트를 정밀 탐색하실 수 있습니다.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => document.getElementById('selected').scrollIntoView({ behavior: 'smooth' })}>
            포트폴리오 탐색 시작
          </button>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-secondary">
            GitHub
          </a>
        </div>
      </section>

      {/* 02 / Selected (핵심 킬러 성과 - 조준선 애니메이션 적용) */}
      {featuredProjects.length > 0 && (
        <section id="selected" className="section-indexed rule-t">
          <div className="frame">
            <span className="section-index-num">02 / SELECT CASES</span>
            <h2 className="section-title">Selected Case Studies.</h2>
            
            <div className="grid">
              {featuredProjects.map(p => (
                <div 
                  key={p.id} 
                  className="card reticule-link" 
                  onClick={() => handleOpenModal(p)}
                >
                  {/* 정밀 모서리 조준선 드로잉 마크업 */}
                  <svg className="reticule-box" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <rect x="0.5" y="0.5" width="99" height="99" pathLength="1" vector-effect="non-scaling-stroke"></rect>
                  </svg>
                  <span className="reticule-corners" aria-hidden="true">
                    <span></span><span></span><span></span><span></span>
                  </span>

                  <div className="card-top">
                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span className="card-category">{p.category}</span>
                      <span className="card-badge">{p.badge}</span>
                    </div>
                    <h3 className="card-title">{p.title}</h3>
                    <p className="card-desc">{p.description}</p>
                  </div>
                  <div className="card-meta">
                    <div className="card-tags">
                      {p.tags.map(t => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                    <div className="card-footer">
                      <span>{p.period || '진행 기간 없음'}</span>
                      <span className="card-arrow">&rarr; 자세히 보기</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 03 / Roadmap (반도체 후공정 5대 로드맵 섹션) */}
      <section id="roadmap" className="section-indexed rule-t">
        <div className="frame">
          <span className="section-index-num">03 / TECHNOLOGY</span>
          <h2 className="section-title">Back-end Process Roadmap.</h2>
          
          <div className="roadmap-container">
            <div className="roadmap-title">Process Flow &amp; Engineering Philosophy</div>
            
            <div className="roadmap-flow">
              <div className="roadmap-line"></div>
              {roadmapSteps.map((step) => {
                const isActive = selectedRoadmapStep.num === step.num;
                return (
                  <div 
                    key={step.num} 
                    className="roadmap-step" 
                    onClick={() => setSelectedRoadmapStep(step)}
                  >
                    <div className={`roadmap-node ${isActive ? 'roadmap-node-active' : ''}`}>
                      {step.num}
                    </div>
                    <div className={`roadmap-step-name ${isActive ? 'roadmap-step-name-active' : ''}`}>
                      {step.name}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="roadmap-details-box">
              <div className="roadmap-details-header">
                <div className="roadmap-details-step-title">
                  {selectedRoadmapStep.num}. {selectedRoadmapStep.name}
                </div>
                <div className="roadmap-details-defects-badge">
                  Key Defects: {selectedRoadmapStep.defects}
                </div>
              </div>
              <div className="roadmap-details-description">
                {selectedRoadmapStep.desc}
              </div>
              <div className="roadmap-details-philosophy">
                <strong>엔지니어 품질 철학:</strong> {selectedRoadmapStep.philosophy}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 / Archived (고효율 탭 분류 아카이브 대시보드) */}
      <section id="archived" className="section-indexed rule-t">
        <div className="frame">
          <span className="section-index-num">04 / ARCHIVES</span>
          <h2 className="section-title">Semiconductor Archives.</h2>
          
          {/* Search Box */}
          <div style={{ maxWidth: '600px', marginBottom: '3.5rem', position: 'relative' }}>
            <input
              type="text"
              placeholder="프로젝트, 툴(Python, JEDEC), 또는 이력으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                border: '1px solid var(--rule)',
                background: 'var(--surface-raised)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
            />
          </div>

          {/* 4대 대분류 정보 탭 필터 */}
          <div className="filter-container" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <button 
              className={`filter-btn ${activeTab === 'Projects' ? 'active' : ''}`}
              onClick={() => { setActiveTab('Projects'); setSearchQuery(''); }}
            >
              🔬 Projects ({projects.length})
            </button>
            <button 
              className={`filter-btn ${activeTab === 'CareerEdu' ? 'active' : ''}`}
              onClick={() => { setActiveTab('CareerEdu'); setSearchQuery(''); }}
            >
              🏆 Career &amp; Education ({careerAndEdu.length})
            </button>
            <button 
              className={`filter-btn ${activeTab === 'Courses' ? 'active' : ''}`}
              onClick={() => { setActiveTab('Courses'); setSearchQuery(''); }}
            >
              📚 Relevant Coursework ({courses.length})
            </button>
            <button 
              className={`filter-btn ${activeTab === 'Credentials' ? 'active' : ''}`}
              onClick={() => { setActiveTab('Credentials'); setSearchQuery(''); }}
            >
              🎫 Credentials &amp; Books ({credentials.length})
            </button>
          </div>

          {/* 격자형 슬림 테이블 렌더링 (Ozgur Archived Table 연출) */}
          <div className="table-container" style={{ overflowX: 'auto' }}>
            <table className="archive-table">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--rule-strong)' }}>
                  <th className="archive-cell label" style={{ width: '20%' }}>분류 / 태그</th>
                  <th className="archive-cell label" style={{ width: '45%' }}>프로젝트 및 활동명</th>
                  <th className="archive-cell label" style={{ width: '20%' }}>소속 / 기관</th>
                  <th className="archive-cell label" style={{ width: '15%', textAlign: 'right' }}>진행 기간</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr 
                    key={item.id} 
                    className="archive-row"
                    onClick={() => handleOpenModal(item)}
                  >
                    <td className="archive-cell archive-cell-badge">
                      {item.badge || item.category}
                    </td>
                    <td className="archive-cell archive-cell-title">
                      {item.title}
                    </td>
                    <td className="archive-cell" style={{ fontStyle: 'italic' }}>
                      {item.role}
                    </td>
                    <td className="archive-cell" style={{ textAlign: 'right', color: 'var(--muted)', fontSize: '0.85rem' }}>
                      {item.period.split(' ~ ')[0] || '진행 완료'}
                    </td>
                  </tr>
                ))}

                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--muted)' }}>
                      검색 조건에 맞는 프로젝트가 존재하지 않습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 05 / Trajectory (학술 및 경력 타임라인 연대표) */}
      <section id="trajectory" className="section-indexed rule-t">
        <div className="frame">
          <span className="section-index-num">05 / TRAJECTORY</span>
          <h2 className="section-title">Career Trajectory.</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '3rem', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '15px', top: '5px', bottom: '5px', width: '1px', background: 'var(--rule)' }}></div>
            
            {[
              { year: '2026', title: 'OSAT Engineer Experience', org: 'Amkor Technology', desc: '세계적 반도체 후공정(OSAT) 1티어 대기업 Amkor에서의 직무 연계 스터디 및 경력 궤적 완성.' },
              { year: '2026', title: 'SK Hy-Po : Cohort 8', org: 'SK hynix', desc: 'SK하이닉스 주관 청년 반도체 인재 육성 과정 수료. 전공 공정 기초 및 후공정 신뢰성 테스트 심화 정복.' },
              { year: '2025', title: 'Semiconductor Process & Defect Data Analyst', org: 'Letuin Edu', desc: 'Spotfire 기반 반도체 결함 분석 및 수율 통계적 분석 프로젝트 수행. Python 및 Pandas를 활용한 결함 감지 R&D 진행.' },
              { year: '2021 ~ 2025', title: 'Core Academic Engineering Coursework', org: 'Kwangwoon University', desc: '전기공학과 전공 이수 (반도체소자공학, 디지털논리회로설계, 전기전자재료물성학 및 회로이론 정복).' }
            ].map((t, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '2rem', position: 'relative', paddingLeft: '3rem' }}>
                <div style={{
                  position: 'absolute',
                  left: '10px',
                  top: '6px',
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: 'var(--bg)',
                  border: '2px solid hsl(var(--accent-primary))',
                  boxShadow: '0 0 8px hsl(var(--accent-primary))'
                }}></div>
                <div style={{ width: '15%', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'hsl(var(--accent-primary))', fontWeight: '600' }}>
                  {t.year}
                </div>
                <div style={{ width: '85%' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--fg)', fontWeight: '600', marginBottom: '0.4rem' }}>{t.title}</h3>
                  <span style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'hsl(var(--accent-secondary))', marginBottom: '0.75rem' }}>{t.org}</span>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 / Approach (엔지니어 핵심 강점 & 신뢰성 철학) */}
      <section id="approach" className="section-indexed rule-t">
        <div className="frame">
          <span className="section-index-num">06 / CORE STRENGTHS</span>
          <h2 className="section-title">Engineering Approach &amp; Strengths.</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', marginBottom: '4rem' }}>
            <p style={{
              fontSize: '1.35rem',
              fontWeight: 500,
              color: 'var(--fg)',
              lineHeight: '1.6',
              borderLeft: '3px solid hsl(var(--accent-primary))',
              paddingLeft: '1.5rem',
              fontStyle: 'italic',
              maxWidth: '850px'
            }}>
              "반도체 불량은 양산 후에 사후 대응하는 것이 아닙니다. 5Why 및 피시본(Fishbone) 다이어그램 기반의 정밀 분석 프레임워크와 설비 트러블슈팅 역량, 그리고 유관 부서와의 주도적인 협업을 통해 신뢰성을 완성하는 것이 엔지니어로서의 오너십입니다."
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {[
              {
                num: "01",
                name: "Root Cause Analysis (RCA)",
                level: 2,
                desc: "Defect troubleshooting framework (5Why / Fishbone / Pareto)",
                action: "공정 결함 및 수율 저하 발생 시, 단순 현상 기록을 넘어 5Why 및 피시본(Fishbone) 다이어그램 분석법을 적용하여 물리적 결함 유발의 근본적인 메커니즘을 과학적이고 입체적으로 추적합니다."
              },
              {
                num: "02",
                name: "Trouble Shooting",
                level: 2,
                desc: "Equipment/process troubleshooting & recovery",
                action: "장비 트러블 및 오동작 발생 시, 수율 분석 데이터와 정밀 매뉴얼에 의거하여 문제를 빠르게 진단하고 정형화된 트러블슈팅 프로토콜을 가동해 공정 유실(Loss) 시간을 방지합니다."
              },
              {
                num: "03",
                name: "Customer Service & Collaboration",
                level: 3,
                desc: "Stakeholder communication, follow-through & active listening",
                action: "1티어 OSAT 대기업 앰코 실무 교육 및 반도체 공정 직무 부트캠프를 거치며, 고객사(Stakeholder) 및 다각적 유관 부서와의 소통 과정에서 깊이 경청하고 적극적인 대응 조치로 일정을 고수합니다."
              },
              {
                num: "04",
                name: "Aftercare & Ownership",
                level: 3,
                desc: "Follow-up mindset & entrepreneurship initiative",
                action: "단순히 개별 공정을 마치는 것에서 멈추지 않고, 후공정 출하 후 최종 신뢰성 챔버 검증 통과까지 전 주기에 걸쳐 끝까지 책임지고 추적 관리하는 애프터케어(Aftercare) 마인드셋을 가집니다."
              }
            ].map((strength) => (
              <div 
                key={strength.num}
                style={{ 
                  background: 'var(--surface-raised)', 
                  border: '1px solid var(--rule)', 
                  padding: '2.25rem', 
                  borderRadius: '4px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'hsl(var(--accent-primary))', fontWeight: 'bold' }}>
                    {strength.num}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {getCircularProgress(strength.level)}
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>
                      P.{strength.level}
                    </span>
                  </div>
                </div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: '600', color: '#fff', marginBottom: '0.5rem' }}>
                  {strength.name}
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'hsl(var(--accent-secondary))', marginBottom: '1rem' }}>
                  {strength.desc}
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {strength.action}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 / Tools & Stack (전문 툴박스 & 인터랙티브 스킬 인벤토리) */}
      <section id="tools" className="section-indexed rule-t">
        <div className="frame">
          <span className="section-index-num">07 / TOOLCHAIN &amp; SKILLS</span>
          <h2 className="section-title">Tools &amp; Interactive Skills.</h2>
          
          {/* Quick View: Core Technical Toolchain (Image 1 replica) */}
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              // Quick View: Core Technical Toolchain
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {[
                { cat: 'Data & Analytics', tools: ['TIBCO Spotfire', 'Python', 'Pandas & NumPy', 'Matplotlib (Visualization)', 'SQL Database'] },
                { cat: 'Standards & Reliability', tools: ['JEDEC Standards (JESD22)', 'HAST / ESD / Temp Cycle Specs', 'FMEA Quality Framework', 'Statistical Process Control (SPC)'] },
                { cat: 'Circuits & Core Studies', tools: ['Digital Logic Design', 'Analog Circuit Simulation (SPICE)', 'Electrical Material Physics', 'Relevant Lab Equipment Control'] }
              ].map((box, idx) => (
                <div key={idx} style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule)', padding: '2rem', borderRadius: '4px' }}>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: '600', color: 'var(--fg)', marginBottom: '1.25rem', borderBottom: '1px solid var(--rule)', paddingBottom: '0.75rem' }}>
                    {box.cat}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {box.tools.map(tool => (
                      <span key={tool} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'hsl(var(--accent-primary))',
                        background: 'rgba(0, 240, 255, 0.04)',
                        border: '1px solid rgba(0, 240, 255, 0.15)',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '2px'
                      }}>{tool}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Skills Matrix (Image 2 replica) */}
          <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'hsl(var(--accent-primary))', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  // Deep Dive: Interactive Skills Inventory
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#fff', letterSpacing: '-0.5px' }}>
                  Notion Portfolio Skills Database.
                </h3>
              </div>

              {/* Filters and Sorters */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {/* Category Toggles */}
                <div style={{ display: 'flex', background: 'var(--surface-raised)', border: '1px solid var(--rule)', borderRadius: '4px', padding: '2px' }}>
                  {['All', 'Technical', 'Interpersonal'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSkillCategoryFilter(cat)}
                      style={{
                        padding: '0.5rem 1rem',
                        border: 'none',
                        background: skillCategoryFilter === cat ? 'var(--bg)' : 'transparent',
                        color: skillCategoryFilter === cat ? 'hsl(var(--accent-primary))' : 'var(--muted)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: skillCategoryFilter === cat ? '600' : '400',
                        cursor: 'pointer',
                        borderRadius: '2px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {cat === 'All' ? '📂 All Skills' : cat === 'Technical' ? '🔬 Technical' : '🤝 Interpersonal'}
                    </button>
                  ))}
                </div>

                {/* Sort Toggle */}
                <div style={{ display: 'flex', background: 'var(--surface-raised)', border: '1px solid var(--rule)', borderRadius: '4px', padding: '2px' }}>
                  {[
                    { id: 'Proficiency', label: '📊 P. Level' },
                    { id: 'Alphabetical', label: '🔤 Name' }
                  ].map(sortOpt => (
                    <button
                      key={sortOpt.id}
                      onClick={() => setSkillSortOrder(sortOpt.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        border: 'none',
                        background: skillSortOrder === sortOpt.id ? 'var(--bg)' : 'transparent',
                        color: skillSortOrder === sortOpt.id ? 'hsl(var(--accent-secondary))' : 'var(--muted)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: skillSortOrder === sortOpt.id ? '600' : '400',
                        cursor: 'pointer',
                        borderRadius: '2px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {sortOpt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid of 28 Skills */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {filteredSkills.map(skill => (
                <div 
                  key={skill.name}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--rule)',
                    padding: '1.5rem',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '180px',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  className="skill-card-hover"
                >
                  <div>
                    {/* Top Row: Name + Category badge + P. Level */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 'bold', color: '#fff', letterSpacing: '-0.3px', maxWidth: '70%' }}>
                        {skill.name}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {getCircularProgress(skill.level)}
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)' }}>
                          P.{skill.level}
                        </span>
                      </div>
                    </div>

                    {/* Category Label */}
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: skill.category === 'Technical' ? 'hsl(var(--accent-primary))' : 'hsl(var(--accent-secondary))',
                        background: skill.category === 'Technical' ? 'rgba(0, 240, 255, 0.04)' : 'rgba(57, 255, 20, 0.04)',
                        border: skill.category === 'Technical' ? '1px solid rgba(0, 240, 255, 0.15)' : '1px solid rgba(57, 255, 20, 0.15)',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '2px',
                        textTransform: 'uppercase'
                      }}>
                        {skill.category}
                      </span>
                    </div>

                    {/* Skill Description */}
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                      {skill.desc}
                    </p>
                  </div>

                  {/* Certifications or Related Projects */}
                  {(skill.cert || skill.project) && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {skill.cert && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
                          <span style={{ color: 'hsl(var(--accent-secondary))' }}>🎫</span>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{skill.cert}</span>
                        </div>
                      )}
                      {skill.project && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
                          <span style={{ color: 'hsl(var(--accent-primary))' }}>🔗</span>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{skill.project}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Local styling for hover scale/glow effect on skill cards */}
        <style jsx>{`
          .skill-card-hover:hover {
            border-color: rgba(0, 240, 255, 0.25) !important;
            box-shadow: 0 4px 20px rgba(0, 240, 255, 0.03);
            transform: translateY(-2px);
          }
        `}</style>
      </section>

      {/* About & Contact Section */}
      <footer id="contact" className="rule-t">
        <div className="footer-container">
          <h2 className="footer-title">Let's Create High-Yield Innovations.</h2>
          <p className="footer-desc">
            가상 시뮬레이션 데이터 및 전공 공학 지식을 결합해 반도체 후공정 수율 극대화를 이끌 준비가 되었습니다. 협업 요청이나 질문이 있으시면 언제든지 편하게 이메일로 연락주세요!
          </p>
          <a href="mailto:youremail@example.com" className="contact-email">
            youremail@example.com
          </a>
          <p className="footer-copy">
            &copy; 2026. Semiconductor Backend Portfolio. All rights reserved. (Inspired by ozgur.design)
          </p>
        </div>
      </footer>

      {/* Details Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              &times;
            </button>
            <span className="modal-category">{selectedProject.category}</span>
            <h2 className="modal-title">{selectedProject.title}</h2>
            
            <div className="modal-meta-grid">
              <div className="modal-meta-item">
                <span>역할 및 기여</span>
                <p>{selectedProject.role || '소속 정보 없음'}</p>
              </div>
              <div className="modal-meta-item">
                <span>분석 기간</span>
                <p>{selectedProject.period || '기간 정보 없음'}</p>
              </div>
            </div>

            <div className="modal-body" style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.5rem' }}>
              {isModalLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: 'hsl(188, 100%, 50%)' }}>
                  <div className="spinner" style={{
                    display: 'inline-block',
                    width: '30px',
                    height: '30px',
                    border: '3px solid rgba(255,255,255,0.05)',
                    borderTopColor: 'hsl(188, 100%, 50%)',
                    borderRadius: '50%',
                    animation: 'spin 1s infinite linear'
                  }}></div>
                  <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--muted)' }}>노션 페이지 본문을 불러오는 중입니다...</p>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(modalContent) }} />
              )}
            </div>

            <div className="modal-footer">
              {selectedProject.link && (
                <a href={selectedProject.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem' }}>
                  GitHub 소스코드/분석서 바로가기
                </a>
              )}
              <button className="btn-secondary" onClick={() => setSelectedProject(null)} style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem' }}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inject spinner animation style */}
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
