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

// Roadmap data (KO/EN)
const roadmapSteps = [
  {
    num: "01", name: "Wafer Dicing", defects: "Chipping, Micro-cracks",
    desc: { ko: "웨이퍼상의 개별 칩(Die)을 다이아몬드 블레이드나 레이저를 이용해 초정밀 톱질하여 분리해내는 공정입니다. 칩의 손상을 극소화하는 것이 품질의 핵심입니다.", en: "A precise sawing process separating individual silicon dies from the wafer using diamond blades or lasers. Minimizing chipping is the key parameter for quality." },
    philosophy: { ko: "절단면 치핑(Chipping) 및 미세 균열 전수 시뮬레이션을 기반으로 초정밀 툴 마모도 감시 가이드 숙지", en: "Establishes tool wear monitoring protocols based on physical simulation of kerf chipping and micro-crack propagation." }
  },
  {
    num: "02", name: "Die Attach", defects: "Voiding, Tilt, Delamination",
    desc: { ko: "분리된 실리콘 칩을 패키지 기판(Substrate) 위에 정밀 리퀴드 에폭시나 다이 에이태치 필름(DAF)으로 물리적 본딩을 진행하는 공정입니다.", en: "A bonding process mounting the silicon die onto the package substrate using high-performance liquid epoxy or die attach film (DAF)." },
    philosophy: { ko: "접착 계면의 미세 기포(Void) 분석 및 실리콘 칩의 경사(Tilt) 방지를 위한 전공 공학 매커니즘 스터디", en: "Analyzes interface micro-voiding and prevents die tilt through advanced thermal-mechanical shear calculations." }
  },
  {
    num: "03", name: "Wire Bonding", defects: "Lifted Weld, Neck Break",
    desc: { ko: "칩의 알루미늄/구리 패드와 기판의 리드(Lead) 사이를 수 마이크로미터 두께의 미세한 금선/구리선으로 연결하여 전기 신호 통로를 확보합니다.", en: "Interconnects the aluminum/copper pads of the die to the substrate leads using microscopic gold or copper wires of just a few micrometers." },
    philosophy: { ko: "와이어 텐션 균일화 및 접합부 기계적 신뢰성 테스트용 전단 강도(Shear Strength) 최적화 방법론 이해", en: "Understands wire tension uniformity and wire-pull shear strength optimization formulas to ensure joint reliability." }
  },
  {
    num: "04", name: "Molding", defects: "Void, Wire Sweep, Incomplete Fill",
    desc: { ko: "외부의 충격, 열, 습기 및 정전기로부터 칩과 연결선을 보호하기 위해 에폭시 몰딩 컴파운드(EMC) 수지로 감싸 패키지를 밀봉하는 공정입니다.", en: "Encapsulates the sensitive die and wires using Epoxy Molding Compound (EMC) resin to seal against mechanical impact, heat, and moisture." },
    philosophy: { ko: "EMC 고온 점도 변화로 인한 와이어 휩(Wire Sweep, 쏠림) 불량 방지를 위한 열응력 해석론 탐구", en: "Investigates transfer molding thermo-fluid dynamics to prevent wire sweep and mold voiding during resin flow." }
  },
  {
    num: "05", name: "Package Test", defects: "Contact Failure, Parametric Drift",
    desc: { ko: "최종 생산된 패키지 반도체에 대해 실제 온도 챔버 환경과 고주파 테스터 장비(ATE)를 사용하여 전기 신호 정상 동작 여부를 판정합니다.", en: "Applies thermal chambers and automated test equipment (ATE) to evaluate final electrical signal integrity and screen outliers." },
    philosophy: { ko: "웨이퍼 맵 불량 패턴 통계 분석을 통해 불량 다발 유발 장비 역추적 및 수율 최적화 분석 역량 보유", en: "Utilizes wafer spatial defect signature analytics to isolate equipment failures and optimize final packaging yield." }
  }
];

// 28 Skills Database (KO/EN)
const portfolioSkills = [
  { name: "AI Prompting", category: "Technical", level: 3, desc: { ko: "문서 작성 및 데이터 분석 워크플로우 자동화", en: "Automation of documentation/analysis workflows" }, cert: "AIOF No.2 Career-Jump", project: "SK Hy-Po : Cohort 8" },
  { name: "Figma", category: "Technical", level: 3, desc: { ko: "설비 상태 모니터링/불량율/수율(KPI) 대시보드 UX 설계", en: "Dashboard UX for monitoring (defect/uptime/KPI)" }, cert: "", project: "App UX/UI Improvement" },
  { name: "MATLAB", category: "Technical", level: 3, desc: { ko: "수치 분석 및 열응력/기계 기하학적 물리 시뮬레이션", en: "Model-based analysis/simulation" }, cert: "Matlab Onramp", project: "Audio Level Meter Design and..." },
  { name: "MS Office", category: "Technical", level: 3, desc: { ko: "기술 보고서 및 분석 장표(Excel, PPT) 작성 기본", en: "Reporting basics (Excel/PowerPoint)" }, cert: "Word Processor Certificate", project: "Job Bootcamp : Process Manual..." },
  { name: "Notion", category: "Technical", level: 3, desc: { ko: "사내 기술 지식 베이스(SOP) 및 이력 문서 관리", en: "Knowledge base / documentation" }, cert: "Notion Advanced Badge", project: "2001runners, Do Run Seoul..." },
  { name: "Verilog HDL", category: "Technical", level: 3, desc: { ko: "하드웨어 설명 언어 및 디지털 논리 회로 설계", en: "Hardware description & digital logic design" }, cert: "", project: "Course : Semiconductor Equipment..." },
  { name: "Active Listening", category: "Interpersonal", level: 3, desc: { ko: "부서간 명확한 의사결정 공유 및 크로스펑셔널 소통", en: "Cross-functional communication" }, cert: "", project: "" },
  { name: "Aftercare", category: "Interpersonal", level: 3, desc: { ko: "공정 출하 후 최종 테스트까지 추적하는 집요함", en: "Follow-up mindset" }, cert: "", project: "" },
  { name: "Customer Service (CS)", category: "Interpersonal", level: 3, desc: { ko: "유관 이해관계자 및 협력사 요구 조율 및 완결 마인드", en: "Stakeholder communication & follow-through" }, cert: "CS Leader Manager", project: "Job Bootcamp : Process Manual..." },
  { name: "LinkedIn", category: "Interpersonal", level: 3, desc: { ko: "기술 트렌드 공유 및 전문가 네트워킹/브랜딩", en: "Networking/branding" }, cert: "", project: "" },
  { name: "ModelSim", category: "Technical", level: 2, desc: { ko: "하드웨어 논리 검증 및 파형 분석 툴 활용 능력", en: "HDL simulation & verification tool (program usage)" }, cert: "", project: "Course : Semiconductor Equipment..." },
  { name: "Quartus II", category: "Technical", level: 2, desc: { ko: "FPGA 회로 핀 매핑, 로직 합성 및 컴파일러 운용 능력", en: "FPGA design & synthesis tool (program usage)" }, cert: "", project: "Course : Semiconductor Equipment..." },
  { name: "Simscape", category: "Technical", level: 2, desc: { ko: "배터리 충전기 등 열-기계/기전 다중 물리 도메인 모델링", en: "Physical modeling (electro-thermal systems)" }, cert: "Circuit Simulation Onramp", project: "Battery Charger Design and..." },
  { name: "Simulink", category: "Technical", level: 2, desc: { ko: "제어 루프 모델 기반 가상 시뮬레이션 및 검증", en: "Control/system simulation (Model-based validation)" }, cert: "Simulink Onramp, Circuit Simulation...", project: "Audio Level Meter Design and..." },
  { name: "Spotfire", category: "Technical", level: 2, desc: { ko: "공정/결함 데이터 분산 차트 및 통계적 상관 분석 시각화", en: "Process/Yield/Defect analytics (Visualization/Correlation)" }, cert: "", project: "Spotfire-Based Analysis of Core..." },
  { name: "Entrepreneurship", category: "Interpersonal", level: 2, desc: { ko: "주도적 공정 개선 R&D 시나리오 탐색 및 문제 제안", en: "Ownership/initiative" }, cert: "1st Asan Doers University", project: "Kazipon : Childcare and house..." },
  { name: "Root Cause Analysis (RCA)", category: "Interpersonal", level: 2, desc: { ko: "결함 인과관계 역추적을 위한 5Why/피시본 다이어그램 설계", en: "Defect troubleshooting framework (5Why/Fishbone/Pareto)" }, cert: "", project: "SK Hy-Po : Cohort 8" },
  { name: "Trouble Shooting", category: "Interpersonal", level: 2, desc: { ko: "설비 및 공정 불량 복구를 위한 시나리오 작동 역량", en: "Equipment/process troubleshooting & recovery" }, cert: "", project: "" },
  { name: "Battery System", category: "Technical", level: 1, desc: { ko: "하드웨어 셀 측정 및 미세 용량 편차 모니터링", en: "Hardware systems understanding (measurement mindset)" }, cert: "", project: "Battery Capacity Tester Design..." },
  { name: "Circuit Design", category: "Technical", level: 1, desc: { ko: "수동 소자 RLC 네트워크 회로 및 증폭기 기계 배선 기초", en: "Electronics fundamentals" }, cert: "", project: "Battery Capacity Tester Design..." },
  { name: "Github", category: "Technical", level: 1, desc: { ko: "공학 분석 리포트 및 소스코드 형상/이력 관리", en: "Version control / evidence of work" }, cert: "", project: "Development of a Business Type..." },
  { name: "Mermaid", category: "Technical", level: 1, desc: { ko: "공정 흐름 및 표준 가이드(SOP), 불량 인과 메커니즘 흐름도 도식화", en: "Process flow / logic diagram for SOP & RCA" }, cert: "", project: "" },
  { name: "Power System", category: "Technical", level: 1, desc: { ko: "배전 전력 계통 전송 효율 및 노이즈 관리 기본", en: "Energy/power fundamentals (less direct to OSAT)" }, cert: "KPX : Electric Power Trans...", project: "ThermOptic : Edge-Based Auto..." },
  { name: "SQL", category: "Technical", level: 1, desc: { ko: "수율 적재 데이터베이스 쿼리를 위한 질의문 제어 역량", en: "Data querying for test/process datasets" }, cert: "ADsP : Advanced Data Ana...", project: "Development of a Business Type..." },
  { name: "Tableau", category: "Technical", level: 1, desc: { ko: "공정/통계 통계적 공정제어(SPC) 차트 시각화", en: "KPI dashboarding (SPC-style reporting)" }, cert: "", project: "" },
  { name: "B2B", category: "Interpersonal", level: 1, desc: { ko: "OSAT와 원청 종합 반도체사(IDM) 간의 계약 및 비즈니스 이해도", en: "Professional communication (business)" }, cert: "B2B Sales Short-term Pro...", project: "AI Solution Sales for Tenants..." },
  { name: "B2C", category: "Interpersonal", level: 1, desc: { ko: "일반 사용자 및 대중 소통 역량", en: "General communication" }, cert: "", project: "Do Run Seoul, Development..." },
  { name: "Economics", category: "Interpersonal", level: 1, desc: { ko: "비즈니스 지표 및 시황 분석 리터러시", en: "Business literacy" }, cert: "MaeKyung Economic Test...", project: "Techlog." }
];

// Skill Segmented Tab Categories
const skillSegments = [
  { id: 'all', label: { ko: '전체 보기', en: 'View All' }, icon: '📌' },
  { id: 'core', label: { ko: '핵심 기술', en: 'Core Tech' }, icon: '🛠️', filter: (s) => s.category === 'Technical' && s.level === 3 },
  { id: 'process', label: { ko: '후공정 실무', en: 'Backend Process' }, icon: '⚙️', filter: (s) => s.category === 'Technical' && s.level === 2 },
  { id: 'data', label: { ko: '데이터분석', en: 'Data & Analytics' }, icon: '📊', filter: (s) => s.category === 'Technical' && s.level === 1 },
  { id: 'soft', label: { ko: '소통 · 협업', en: 'Soft Skills' }, icon: '💡', filter: (s) => s.category === 'Interpersonal' },
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
    nav_selected: "selected cases", nav_roadmap: "technology", nav_archive: "archives", nav_skills: "skills",
    hero_badge: "Notion API 실시간 연동 포트폴리오",
    hero_title_1: "반도체 패키징과 테스트의 신뢰성을",
    hero_title_accent: "데이터로 증명합니다.",
    hero_title_2: "엔지니어 오준서의 포트폴리오입니다.",
    hero_subtitle: "노션(Notion) 데이터베이스와 실시간으로 연동된 미니멀 포트폴리오입니다. Amkor Technology OSAT 실무, SK Hy-Po 8기, Spotfire 기반 수율 분석 등 반도체 후공정 엔지니어링 역량을 탐색해 보세요.",
    btn_explore: "포트폴리오 탐색",
    selected_title: "주요 프로젝트",
    view_details: "자세히 보기 →",
    roadmap_title: "후공정 기술 흐름",
    roadmap_flow_title: "Process Flow & Engineering Philosophy",
    roadmap_philosophy_label: "엔지니어 품질 철학 :",
    archive_title: "전체 아카이브",
    archive_search_placeholder: "프로젝트, 툴, 이력으로 검색...",
    tab_projects: "프로젝트", tab_career: "경력 · 교육", tab_courses: "이수 과목", tab_credentials: "자격 · 서적",
    th_tag: "분류", th_title: "프로젝트명", th_org: "소속", th_period: "기간",
    no_results: "검색 조건에 맞는 프로젝트가 없습니다.",
    trajectory_title: "커리어 타임라인",
    approach_title: "엔지니어링 강점",
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
    nav_selected: "selected cases", nav_roadmap: "technology", nav_archive: "archives", nav_skills: "skills",
    hero_badge: "Notion API Live-Linked Portfolio",
    hero_title_1: "Proving semiconductor packaging",
    hero_title_accent: "reliability with data.",
    hero_title_2: "Engineer Junseo Oh.",
    hero_subtitle: "A minimal portfolio live-linked with Notion API. Explore yield analytics with TIBCO Spotfire, SK hynix Hy-Po training, and Amkor Technology OSAT engineering practice.",
    btn_explore: "Explore Portfolio",
    selected_title: "Selected Projects",
    view_details: "View Details →",
    roadmap_title: "Backend Technology Flow",
    roadmap_flow_title: "Process Flow & Engineering Philosophy",
    roadmap_philosophy_label: "Engineering Philosophy :",
    archive_title: "Full Archives",
    archive_search_placeholder: "Search projects, tools, or keywords...",
    tab_projects: "Projects", tab_career: "Career & Education", tab_courses: "Coursework", tab_credentials: "Credentials",
    th_tag: "Category", th_title: "Title", th_org: "Organization", th_period: "Period",
    no_results: "No matching projects found.",
    trajectory_title: "Career Timeline",
    approach_title: "Engineering Strengths",
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
  const [selectedRoadmapStep, setSelectedRoadmapStep] = useState(roadmapSteps[0]);
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
            <a className="nav-link" onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}>{t.nav_roadmap}</a>
            <a className="nav-link" onClick={() => document.getElementById('archived')?.scrollIntoView({ behavior: 'smooth' })}>{t.nav_archive}</a>
            <a className="nav-link" onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}>{t.nav_skills}</a>
            <button onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')} style={{ padding: '0.3rem 0.75rem', border: '1px solid var(--rule)', background: 'var(--surface)', color: 'var(--accent)', cursor: 'pointer', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'var(--font-primary)', transition: 'all 0.2s ease' }}>
              {lang === 'ko' ? 'EN' : 'KO'}
            </button>
          </nav>
        </div>
      </header>

      {/* ━━━ 01 / Hero ━━━ */}
      <section id="intro" className="hero">
        <div className="hero-badge">{t.hero_badge}</div>
        <h1 className="hero-title" style={{ marginBottom: '1.5rem' }}>
          {t.hero_title_1}<br />
          <span>{t.hero_title_accent}</span><br />
          {t.hero_title_2}
        </h1>
        <p className="hero-subtitle">{t.hero_subtitle}</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => document.getElementById('selected')?.scrollIntoView({ behavior: 'smooth' })}>{t.btn_explore}</button>
          <a href="https://github.com/oasunryo" target="_blank" rel="noreferrer" className="btn-secondary">GitHub</a>
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

      {/* ━━━ 03 / Roadmap ━━━ */}
      <section id="roadmap" style={{ padding: '5rem 2rem' }}>
        <div className="frame">
          <h2 className="section-title">{t.roadmap_title}</h2>
          <div className="roadmap-container">
            <div style={{ fontSize: '0.82rem', color: 'var(--accent)', marginBottom: '2rem', fontWeight: 700 }}>{t.roadmap_flow_title}</div>
            <div className="roadmap-flow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
              {roadmapSteps.map((step) => {
                const isActive = selectedRoadmapStep.num === step.num;
                return (
                  <div key={step.num} className="roadmap-step" onClick={() => setSelectedRoadmapStep(step)} style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '1rem', background: isActive ? 'var(--bg)' : 'transparent', border: isActive ? '1px solid var(--rule)' : '1px solid transparent', borderRadius: '16px', transition: 'all 0.3s ease' }}>
                    <div className={`roadmap-node ${isActive ? 'roadmap-node-active' : ''}`} style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.82rem', fontWeight: 700, background: isActive ? 'var(--accent)' : 'var(--surface-raised)', color: isActive ? '#fff' : 'var(--muted)', border: `2px solid ${isActive ? 'var(--accent)' : 'var(--rule)'}`, transition: 'all 0.3s ease', marginBottom: '0.5rem' }}>
                      {step.num}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--fg)' : 'var(--muted)', textAlign: 'center', transition: 'all 0.2s ease' }}>{step.name}</div>
                  </div>
                );
              })}
            </div>
            <div className="roadmap-details-box">
              <div className="roadmap-details-header">
                <div className="roadmap-details-step-title">{selectedRoadmapStep.num}. {selectedRoadmapStep.name}</div>
                <div className="roadmap-details-defects-badge">Key Defects: {selectedRoadmapStep.defects}</div>
              </div>
              <div className="roadmap-details-description">{selectedRoadmapStep.desc[lang]}</div>
              <div className="roadmap-details-philosophy">
                <strong style={{ color: 'var(--accent)', marginRight: '0.5rem', fontWeight: 700 }}>{t.roadmap_philosophy_label}</strong>
                {selectedRoadmapStep.philosophy[lang]}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 04 / Archives ━━━ */}
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
