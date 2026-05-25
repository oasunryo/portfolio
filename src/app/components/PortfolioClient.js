'use client';

import { useState, useEffect } from 'react';

// 간단한 Markdown-to-HTML 파서 함수 (라이트 에디토리얼 테마 지원)
function parseMarkdown(markdownText) {
  if (!markdownText) return '';
  
  let html = markdownText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 인용구/캘아웃 변환 - 차분한 샌드베이지 및 디지털 블루 테두리 적용
  html = html.replace(/^>\s+💡\s+(.+)$/gm, '<blockquote style="border-left:4px solid hsl(var(--accent-primary)); background:var(--surface); padding:1rem; border-radius:4px; margin-bottom:1.25rem; font-size:0.92rem;">💡 $1</blockquote>');
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote style="border-left:4px solid hsl(var(--accent-secondary)); background:var(--surface); padding:1rem; border-radius:4px; margin-bottom:1.25rem; font-size:0.92rem;">$1</blockquote>');

  // 헤더 변환 (h2, h3)
  html = html.replace(/^##\s+(.+)$/gm, '<h2 style="color:var(--fg); font-family:var(--font-display); font-size:1.35rem; font-weight:400; margin-top:2rem; margin-bottom:0.75rem; border-left:3px solid hsl(var(--accent-primary)); padding-left:0.75rem;">$1</h2>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 style="color:hsl(var(--accent-primary)); font-size:1.05rem; font-weight:600; margin-top:1.5rem; margin-bottom:0.5rem; font-family:var(--font-mono);">$1</h3>');

  // 볼드 텍스트 변환
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--fg); font-weight:700;">$1</strong>');

  // 리스트 변환 (ul / li)
  html = html.replace(/^\-\s+(.+)$/gm, '<li style="margin-bottom:0.4rem; padding-left:0.25rem;">$1</li>');
  html = html.replace(/(<li style="margin-bottom:0\.4rem; padding-left:0\.25rem;">.*<\/li>)/gs, '<ul style="padding-left:1.25rem; margin-bottom:1.25rem; list-style-type:square; font-size:0.92rem;">$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  // 줄바꿈을 문단(<p>) 혹은 <br>로 변경
  html = html.replace(/

/g, '</p><p style="margin-bottom:1rem; color:var(--text-secondary);">');
  html = html.replace(/
/g, '<br />');
  
  if (!html.startsWith('<h') && !html.startsWith('<u') && !html.startsWith('<l') && !html.startsWith('<b')) {
    html = '<p style="margin-bottom:1rem; color:var(--text-secondary);">' + html + '</p>';
  }

  return html;
}

// 5대 반도체 후공정 단계 로드맵 데이터 (영/한 완벽 다국어화)
const roadmapSteps = [
  {
    num: "01",
    name: "Wafer Dicing",
    defects: "Chipping, Micro-cracks",
    desc: {
      ko: "웨이퍼상의 개별 칩(Die)을 다이아몬드 블레이드나 레이저를 이용해 초정밀 톱질하여 분리해내는 공정입니다. 칩의 손상을 극소화하는 것이 품질의 핵심입니다.",
      en: "A precise sawing process separating individual silicon dies from the wafer using diamond blades or lasers. Minimizing chipping is the key parameter for quality."
    },
    philosophy: {
      ko: "절단면 치핑(Chipping) 및 미세 균열 전수 시뮬레이션을 기반으로 초정밀 툴 마모도 감시 가이드 숙지",
      en: "Establishes tool wear monitoring protocols based on physical simulation of kerf chipping and micro-crack propagation."
    }
  },
  {
    num: "02",
    name: "Die Attach",
    defects: "Voiding, Tilt, Delamination",
    desc: {
      ko: "분리된 실리콘 칩을 패키지 기판(Substrate) 위에 정밀 리퀴드 에폭시나 다이 에이태치 필름(DAF)으로 물리적 본딩을 진행하는 공정입니다.",
      en: "A bonding process mounting the silicon die onto the package substrate using high-performance liquid epoxy or die attach film (DAF)."
    },
    philosophy: {
      ko: "접착 계면의 미세 기포(Void) 분석 및 실리콘 칩의 경사(Tilt) 방지를 위한 전공 공학 매커니즘 스터디",
      en: "Analyzes interface micro-voiding and prevents die tilt through advanced thermal-mechanical shear calculations."
    }
  },
  {
    num: "03",
    name: "Wire Bonding",
    defects: "Lifted Weld, Neck Break",
    desc: {
      ko: "칩의 알루미늄/구리 패드와 기판의 리드(Lead) 사이를 수 마이크로미터 두께의 미세한 금선/구리선으로 연결하여 전기 신호 통로를 확보합니다.",
      en: "Interconnects the aluminum/copper pads of the die to the substrate leads using microscopic gold or copper wires of just a few micrometers."
    },
    philosophy: {
      ko: "와이어 텐션 균일화 및 접합부 기계적 신뢰성 테스트용 전단 강도(Shear Strength) 최적화 방법론 이해",
      en: "Understands wire tension uniformity and wire-pull shear strength optimization formulas to ensure joint reliability."
    }
  },
  {
    num: "04",
    name: "Molding",
    defects: "Void, Wire Sweep, Incomplete Fill",
    desc: {
      ko: "외부의 충격, 열, 습기 및 정전기로부터 칩과 연결선을 보호하기 위해 에폭시 몰딩 컴파운드(EMC) 수지로 감싸 패키지를 밀봉하는 공정입니다.",
      en: "Encapsulates the sensitive die and wires using Epoxy Molding Compound (EMC) resin to seal against mechanical impact, heat, and moisture."
    },
    philosophy: {
      ko: "EMC 고온 점도 변화로 인한 와이어 휩(Wire Sweep, 쏠림) 불량 방지를 위한 열응력 해석론 탐구",
      en: "Investigates transfer molding thermo-fluid dynamics to prevent wire sweep and mold voiding during resin flow."
    }
  },
  {
    num: "05",
    name: "Package Test",
    defects: "Contact Failure, Parametric Drift",
    desc: {
      ko: "최종 생산된 패키지 반도체에 대해 실제 온도 챔버 환경과 고주파 테스터 장비(ATE)를 사용하여 전기 신호 정상 동작 여부를 판정합니다.",
      en: "Applies thermal chambers and automated test equipment (ATE) to evaluate final electrical signal integrity and screen outliers."
    },
    philosophy: {
      ko: "웨이퍼 맵 불량 패턴 통계 분석을 통해 불량 다발 유발 장비 역추적 및 수율 최적화 분석 역량 보유",
      en: "Utilizes wafer spatial defect signature analytics to isolate equipment failures and optimize final packaging yield."
    }
  }
];

// Notion "Portfolio Skills" 실물 데이터베이스 정밀 이식 (28개 영/한 완벽 매핑)
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

// Notion-style P. (Proficiency) 레벨 원형 진행도 표시 컴포넌트
function getCircularProgress(level) {
  const radius = 8;
  const stroke = 2.2;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percentage = level === 3 ? 100 : level === 2 ? 66 : 33;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} style={{ transform: 'rotate(-90deg)', marginRight: '6px' }}>
      <circle
        stroke="rgba(25,24,24,0.08)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="hsl(var(--accent-primary))"
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

// KO/EN UI 딕셔너리 사전
const translations = {
  ko: {
    nav_selected: "selected",
    nav_roadmap: "roadmap",
    nav_archive: "archive",
    nav_skills: "skills",
    hero_badge: "Notion API 실시간 연동 | 반도체 후공정 포트폴리오",
    hero_title_1: "미래 반도체의 완성을 책임지는",
    hero_title_accent: "반도체 후공정 (패키징 & 테스트)",
    hero_title_2: "엔지니어 Junseo Oh 입니다.",
    hero_subtitle: "본 웹사이트는 노션(Notion) 데이터베이스와 실시간으로 바인딩된 프리미엄 크림 에디토리얼 대시보드입니다. 1티어 OSAT 앰코테크놀로지 연계 실무 지식, SK하이닉스 청년 반도체 인재 양성(SK Hy-Po) 8기 과정 수료 이력 및 Spotfire 기반 수율/공정 결함 통계 R&D 분석 결과물들을 정밀 탐색해 보실 수 있습니다.",
    btn_explore: "포트폴리오 탐색 시작",
    selected_title: "Selected Case Studies.",
    selected_sub: "02 / SELECT CASES",
    view_details: "→ 자세히 보기",
    roadmap_title: "Back-end Process Roadmap.",
    roadmap_sub: "03 / TECHNOLOGY",
    roadmap_flow_title: "Process Flow & Engineering Philosophy",
    roadmap_philosophy_label: "엔지니어 품질 철학:",
    archive_title: "Semiconductor Archives.",
    archive_sub: "04 / ARCHIVES",
    archive_search_placeholder: "프로젝트, 툴(Python, JEDEC), 또는 이력으로 검색...",
    tab_projects: "🔬 Projects",
    tab_career: "🏆 Career & Education",
    tab_courses: "📚 Relevant Coursework",
    tab_credentials: "🎫 Credentials & Books",
    th_tag: "분류 / 태그",
    th_title: "프로젝트 및 활동명",
    th_org: "소속 / 기관",
    th_period: "진행 기간",
    no_results: "검색 조건에 맞는 프로젝트가 존재하지 않습니다.",
    trajectory_title: "Career Trajectory.",
    trajectory_sub: "05 / TRAJECTORY",
    approach_title: "Engineering Approach & Strengths.",
    approach_sub: "06 / CORE STRENGTHS",
    approach_quote: '"반도체 불량은 양산 후에 사후 대응하는 것이 아닙니다. 5Why 및 피시본(Fishbone) 다이어그램 기반의 정밀 분석 프레임워크와 설비 트러블슈팅 역량, 그리고 유관 부서와의 주도적인 협업을 통해 신뢰성을 완성하는 것이 엔지니어로서의 오너십입니다."',
    tools_title: "Tools & Interactive Skills.",
    tools_sub: "07 / TOOLCHAIN & SKILLS",
    quick_view_label: "// 요약 뷰: 핵심 기술 툴체인",
    deep_dive_label: "// 상세 분석: 노션 실물 보유 역량 데이터베이스",
    notion_skills_db_title: "Notion Portfolio Skills Database.",
    footer_title: "Let's Create High-Yield Innovations.",
    footer_desc: "가상 시뮬레이션 데이터 및 전공 공학 지식을 결합해 반도체 후공정 수율 극대화를 이끌 준비가 되었습니다. 협업 요청이나 질문이 있으시면 언제든지 편하게 이메일로 연락주세요!",
    copyright: "© 2026. Junseo Oh. All rights reserved. (Inspired by codedgar.com)",
    modal_contribution: "역할 및 기여",
    modal_period: "분석 기간",
    modal_close: "닫기",
    modal_github: "GitHub 소스코드/분석서 바로가기",
    modal_loading: "노션 페이지 본문을 불러오는 중입니다..."
  },
  en: {
    nav_selected: "selected",
    nav_roadmap: "roadmap",
    nav_archive: "archive",
    nav_skills: "skills",
    hero_badge: "Notion API Live Linked | Semiconductor Backend Portfolio",
    hero_title_1: "Securing the Future of Microchips,",
    hero_title_accent: "Semiconductor Back-end (Packaging & Test)",
    hero_title_2: "Engineer Junseo Oh.",
    hero_subtitle: "A premium editorial portfolio dashboard live-linked with Notion API. Explore yield analytics with TIBCO Spotfire, SK hynix SK Hy-Po 8th cohort training, and Amkor Technology OSAT engineering insights.",
    btn_explore: "Explore Portfolio",
    selected_title: "Selected Case Studies.",
    selected_sub: "02 / SELECT CASES",
    view_details: "→ View Details",
    roadmap_title: "Back-end Process Roadmap.",
    roadmap_sub: "03 / TECHNOLOGY",
    roadmap_flow_title: "Process Flow & Engineering Philosophy",
    roadmap_philosophy_label: "Engineering Philosophy:",
    archive_title: "Semiconductor Archives.",
    archive_sub: "04 / ARCHIVES",
    archive_search_placeholder: "Search projects, tools (Python, JEDEC), or keywords...",
    tab_projects: "🔬 Projects",
    tab_career: "🏆 Career & Education",
    tab_courses: "📚 Relevant Coursework",
    tab_credentials: "🎫 Credentials & Books",
    th_tag: "Category / Tag",
    th_title: "Projects & Activities",
    th_org: "Organization",
    th_period: "Period",
    no_results: "No projects match your search filters.",
    trajectory_title: "Career Trajectory.",
    trajectory_sub: "05 / TRAJECTORY",
    approach_title: "Engineering Approach & Strengths.",
    approach_sub: "06 / CORE STRENGTHS",
    approach_quote: '"Defect control in semiconductors is not about post-mass-production sorting. True engineering ownership is about proactively preventing failures through physical root-cause analysis, equipment troubleshooting, and collaborative cross-functional alignment."',
    tools_title: "Tools & Interactive Skills.",
    tools_sub: "07 / TOOLCHAIN & SKILLS",
    quick_view_label: "// Quick View: Core Technical Toolchain",
    deep_dive_label: "// Deep Dive: Interactive Skills Inventory",
    notion_skills_db_title: "Notion Portfolio Skills Database.",
    footer_title: "Let's Create High-Yield Innovations.",
    footer_desc: "I am fully prepared to maximize semiconductor back-end yields by integrating data analytics with solid engineering principles. Feel free to reach out to me for collaborations or inquiries!",
    copyright: "© 2026. Junseo Oh. All rights reserved. (Inspired by codedgar.com)",
    modal_contribution: "Role & Contribution",
    modal_period: "Duration",
    modal_close: "Close",
    modal_github: "Go to GitHub Source / Analysis",
    modal_loading: "Loading page content from Notion API..."
  }
};

// 실물 노션 데이터 영문 이식 번역본 (High-Fidelity)
const projectTranslations = {
  "Spotfire-Based Analysis of Correlation Between Semiconductor Process & Defects": {
    title: "TIBCO Spotfire-Based Analysis of Correlation Between Semiconductor Process & Defects",
    description: "Models and visualizes defect patterns and process parameters to identify root causes of package yields using Spotfire.",
    role: "Yield Data Analyst"
  },
  "Job Bootcamp : Process Manufacturing - Semiconductor": {
    title: "Semiconductor Process & Manufacturing Job Bootcamp",
    description: "Hands-on simulation bootcamp focused on dicing, wire bonding, molding, and standard operating procedures (SOP).",
    role: "Process Engineering Trainee"
  },
  "SK Hy-Po : Cohort 8": {
    title: "SK hynix SK Hy-Po Training Program (Cohort 8)",
    description: "Intensive semiconductor academy by SK hynix, covering front-end processes, back-end packaging, and device reliability testing.",
    role: "Trainee"
  },
  "OSAT Enigneer": {
    title: "OSAT Packaging & Test Engineering Practice",
    description: "Analysis of copper wire bonding tension, thermal cycling spec validation, and high-temp reliability specs under JEDEC standards.",
    role: "OSAT Engineering Practitioner"
  },
  "Battery Capacity Tester Design and Development": {
    title: "Battery Capacity Tester Design & Hardware Development",
    description: "Designed a constant-current battery capacity measurement circuit with MATLAB simulation and physical verification.",
    role: "Hardware Design Engineer"
  },
  "Battery Charger Design and Development": {
    title: "Smart Battery Charger Design & Development",
    description: "Designed and simulated an electro-thermal battery charging system in Simscape, optimizing charging profile efficiency.",
    role: "Simulation Engineer"
  },
  "Audio Level Meter Design and Development": {
    title: "Audio Level Meter & Analog Filter Design",
    description: "Designed an active bandpass filter and multi-stage audio level meter using MATLAB and circuit simulation.",
    role: "Analog Circuit Designer"
  },
  "Development of a Business Type Recommendation Algorithm for University District Commercial Areas": {
    title: "District Commercial Area Recommendation Algorithm",
    description: "Programmed a district recommendation algorithm using SQL database querying and Python clustering models.",
    role: "Data & SQL Engineer"
  },
  "ThermOptic : Edge-Based Autonomous Control Platform for AI-Era Data Center Energy Optimization": {
    title: "ThermOptic: Edge-Based Data Center Thermal Control Platform",
    description: "Developed an autonomous edge controller using MATLAB and physical thermal modeling to optimize server rack cooling.",
    role: "Thermal System Designer"
  }
};

// 핵심 3대 프로젝트 상세 소개 본문 영문 번역본
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

  // VIM 스타일 하단 상태 바를 위한 실시간 로컬 시간 Hook
  const [timeStr, setTimeStr] = useState('12:00 PM');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // 다국어 상태 관리 (기본값: 'ko')
  const [lang, setLang] = useState('ko');

  const t = translations[lang];

  // 뱃지 영문 번역 함수
  const translateBadge = (badgeStr) => {
    if (!badgeStr) return '';
    const mappings = {
      '🏆 OSAT 실무': '🏆 OSAT Engineering',
      '📊 YIELD DATA': '📊 Yield Data',
      '🔥 SK HY-PO': '🔥 SK Hy-Po',
      '🔬 RESEARCH': '🔬 Research Paper',
      '⚡ TESTER DESIGN': '⚡ Tester Design',
      '💻 SILICON CAMP': '💻 Silicon Camp',
      '📚 COURSEWORK': '📚 Coursework',
      '⭐ CORE SEMI': '⭐ Core Semi',
      '🎫 LICENSE': '🎫 License',
      '📖 STUDY': '📖 Study Review',
      '💡 GENERAL': '💡 General'
    };
    return mappings[badgeStr] || badgeStr;
  };

  // ==========================================
  // [데이터 레이어 분류 및 스마트 다국어/정렬 알고리즘]
  // ==========================================
  
  // 1. 노션 데이터 다국어 실시간 스왑 로직 적용
  const localizedItems = initialItems.map(item => {
    if (lang === 'ko') return item;
    
    // Find matching english translation in dictionary by title prefix
    const matchingKey = Object.keys(projectTranslations).find(k => 
      item.title.startsWith(k.substring(0, 15)) || k.startsWith(item.title.substring(0, 15))
    );
    
    if (matchingKey && projectTranslations[matchingKey]) {
      const trans = projectTranslations[matchingKey];
      return {
        ...item,
        title: trans.title,
        description: trans.description,
        role: trans.role,
        badge: item.badge ? translateBadge(item.badge) : ''
      };
    }
    
    return {
      ...item,
      badge: item.badge ? translateBadge(item.badge) : ''
    };
  });

  // 2. 핵심 킬러 성과 Featured 프로젝트 (반도체 연관 프로젝트 및 핵심 경력 우선 배치)
  const featuredProjects = localizedItems.filter(p => p.featured && p.category !== 'Courses');

  // 3. 탭 A: Projects (실무형 프로젝트 및 부트캠프)
  const projects = localizedItems.filter(p => 
    p.category === 'Projects' || 
    (p.rawSemiconductor && p.category !== 'Courses' && p.category !== 'Career' && p.category !== 'Education')
  );

  // 4. 탭 B: Career & Education (앰코테크놀로지, SK Hy-Po, Schneider 등 대외 실무 및 교육)
  const careerAndEdu = localizedItems.filter(p => 
    p.category === 'Career' || 
    p.category === 'Education' || 
    p.title.toLowerCase().includes('hy-po') ||
    p.role.toLowerCase().includes('amkor') ||
    p.role.toLowerCase().includes('hynix')
  );

  // 5. 탭 C: Relevant Coursework (학부 이수 과목)
  const courses = localizedItems.filter(p => 
    p.category === 'Courses' || 
    p.title.toLowerCase().startsWith('course')
  );

  // 6. 탭 D: Credentials & Books (자격증, 서적 연구 분석 리뷰)
  const credentials = localizedItems.filter(p => 
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

  // 필터링 및 정렬된 실물 스킬 리스트 가공 (영/한 스왑)
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

  // 모달 열기 핸들러 (실시간 영문 마크다운 본문 스왑 완벽 내장)
  const handleOpenModal = async (project) => {
    setSelectedProject(project);
    setModalContent('');
    setIsModalLoading(true);

    // 1. 영어 상태이고 3대 프로젝트 영문 번역본이 딕셔너리에 존재하는 경우 즉시 교체
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
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)' }}>
            junseo.oh // <span style={{ color: 'hsl(var(--accent-primary))', fontWeight: 'bold' }}>{t.nav_selected}</span>
          </div>
          <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a className="nav-link" onClick={() => document.getElementById('selected').scrollIntoView({ behavior: 'smooth' })}>{t.nav_selected}</a>
            <a className="nav-link" onClick={() => document.getElementById('roadmap').scrollIntoView({ behavior: 'smooth' })}>{t.nav_roadmap}</a>
            <a className="nav-link" onClick={() => document.getElementById('archived').scrollIntoView({ behavior: 'smooth' })}>{t.nav_archive}</a>
            <a className="nav-link" onClick={() => document.getElementById('tools').scrollIntoView({ behavior: 'smooth' })}>{t.nav_skills}</a>
            
            {/* KO / EN 다국어 토글 미니멀 버튼 */}
            <button 
              onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                padding: '0.25rem 0.5rem',
                border: '1px solid var(--rule)',
                background: 'var(--surface)',
                color: 'hsl(var(--accent-primary))',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              {lang === 'ko' ? 'en' : 'ko'}
            </button>
          </nav>
        </div>
      </header>

      {/* 01 / Intro Section (히어로) */}
      <section id="intro" className="hero">
        <div className="hero-badge">{t.hero_badge}</div>
        <h1 className="hero-title">
          {t.hero_title_1}<br />
          <span>{t.hero_title_accent}</span><br />
          {t.hero_title_2}
        </h1>
        <p className="hero-subtitle">
          {t.hero_subtitle}
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => document.getElementById('selected').scrollIntoView({ behavior: 'smooth' })}>
            {t.btn_explore}
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
            <span className="section-index-num">{t.selected_sub}</span>
            <h2 className="section-title">{t.selected_title}</h2>
            
            <div className="grid">
              {featuredProjects.map(p => (
                <div 
                  key={p.id} 
                  className="card" 
                  onClick={() => handleOpenModal(p)}
                >
                  {/* Codedgar-style Top Scanline indicator */}
                  <div className="section-scanline"></div>

                  <div className="card-top">
                    {/* macOS style dots */}
                    <div className="window-dots">
                      <span className="window-dot dot-red"></span>
                      <span className="window-dot dot-yellow"></span>
                      <span className="window-dot dot-green"></span>
                    </div>

                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span className="card-category">{p.category}</span>
                      <span className="card-badge" style={{ color: 'hsl(var(--accent-secondary))' }}>{p.badge}</span>
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
                    <div className="card-footer" style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.25rem' }}>
                      <span>{p.period || '진행 기간 없음'}</span>
                      <span className="card-arrow" style={{ color: 'hsl(var(--accent-primary))', fontWeight: 'bold' }}>{t.view_details}</span>
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
          <span className="section-index-num">{t.roadmap_sub}</span>
          <h2 className="section-title">{t.roadmap_title}</h2>
          
          <div className="roadmap-container">
            <div className="roadmap-title">{t.roadmap_flow_title}</div>
            
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
                {selectedRoadmapStep.desc[lang]}
              </div>
              <div className="roadmap-details-philosophy">
                <strong>{t.roadmap_philosophy_label}</strong> {selectedRoadmapStep.philosophy[lang]}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 / Archived (고효율 탭 분류 아카이브 대시보드) */}
      <section id="archived" className="section-indexed rule-t">
        <div className="frame">
          <span className="section-index-num">{t.archive_sub}</span>
          <h2 className="section-title">{t.archive_title}</h2>
          
          {/* Search Box */}
          <div style={{ maxWidth: '600px', marginBottom: '3.5rem', position: 'relative' }}>
            <input
              type="text"
              placeholder={t.archive_search_placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                border: '1px solid var(--rule)',
                background: 'var(--surface)',
                color: 'var(--fg)',
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
              {t.tab_projects} ({projects.length})
            </button>
            <button 
              className={`filter-btn ${activeTab === 'CareerEdu' ? 'active' : ''}`}
              onClick={() => { setActiveTab('CareerEdu'); setSearchQuery(''); }}
            >
              {t.tab_career} ({careerAndEdu.length})
            </button>
            <button 
              className={`filter-btn ${activeTab === 'Courses' ? 'active' : ''}`}
              onClick={() => { setActiveTab('Courses'); setSearchQuery(''); }}
            >
              {t.tab_courses} ({courses.length})
            </button>
            <button 
              className={`filter-btn ${activeTab === 'Credentials' ? 'active' : ''}`}
              onClick={() => { setActiveTab('Credentials'); setSearchQuery(''); }}
            >
              {t.tab_credentials} ({credentials.length})
            </button>
          </div>

          {/* 격자형 슬림 테이블 렌더링 (Ozgur Archived Table 연출) */}
          <div className="table-container" style={{ overflowX: 'auto' }}>
            <table className="archive-table">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--rule-strong)' }}>
                  <th className="archive-cell label" style={{ width: '20%' }}>{t.th_tag}</th>
                  <th className="archive-cell label" style={{ width: '45%' }}>{t.th_title}</th>
                  <th className="archive-cell label" style={{ width: '20%' }}>{t.th_org}</th>
                  <th className="archive-cell label" style={{ width: '15%', textAlign: 'right' }}>{t.th_period}</th>
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
                      {t.no_results}
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
          <span className="section-index-num">{t.trajectory_sub}</span>
          <h2 className="section-title">{t.trajectory_title}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '3rem', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '15px', top: '5px', bottom: '5px', width: '1px', background: 'var(--rule)' }}></div>
            
            {[
              { 
                year: '2026', 
                title: { ko: 'OSAT 엔지니어 직무 연계 스터디', en: 'OSAT Packaging & Test Engineering Study' }, 
                org: 'Amkor Technology', 
                desc: {
                  ko: '세계적 반도체 후공정(OSAT) 1티어 대기업 Amkor와의 연계 교육 및 경력 궤적 완성.',
                  en: 'Completed industrial study linkage programs mapped directly to Tier-1 OSAT leader Amkor Technology.'
                }
              },
              { 
                year: '2026', 
                title: { ko: 'SK 하이포(SK Hy-Po) : 8기 교육 과정', en: 'SK hynix SK Hy-Po Program : Cohort 8' }, 
                org: 'SK hynix', 
                desc: {
                  ko: 'SK하이닉스 주관 청년 반도체 인재 육성 과정 수료. 전공 공정 기초 및 후공정 신뢰성 테스트 심화 정복.',
                  en: 'Graduated from SK hynix intensive academy, mastering front-end lithography and back-end reliability packaging mechanics.'
                }
              },
              { 
                year: '2025', 
                title: { ko: '반도체 공정 및 불량 분석 데이터 애널리스트', en: 'Semiconductor Process & Defect Data Analyst' }, 
                org: 'Letuin Edu', 
                desc: {
                  ko: 'Spotfire 기반 반도체 결함 분석 및 수율 통계적 분석 프로젝트 수행. Python 및 Pandas를 활용한 결함 감지 R&D 진행.',
                  en: 'Engineered yield analysis models with Spotfire and developed spatial defect pattern recognition algorithms using Python.'
                }
              },
              { 
                year: '2021 ~ 2025', 
                title: { ko: '핵심 공학 전공 이수 및 학술 연대', en: 'Core Academic Engineering Coursework' }, 
                org: 'Kwangwoon University', 
                desc: {
                  ko: '전기공학과 전공 이수 (반도체소자공학, 디지털논리회로설계, 전기전자재료물성학 및 회로이론 정복).',
                  en: 'Majored in Electrical Engineering, mastering Semiconductor Device Engineering, Digital Logic Design, and Material Properties.'
                }
              }
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
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--fg)', fontWeight: '600', marginBottom: '0.4rem' }}>{t.title[lang]}</h3>
                  <span style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'hsl(var(--accent-secondary))', marginBottom: '0.75rem' }}>{t.org}</span>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{t.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 / Approach (엔지니어 핵심 강점 & 신뢰성 철학) */}
      <section id="approach" className="section-indexed rule-t">
        <div className="frame">
          <span className="section-index-num">{t.approach_sub}</span>
          <h2 className="section-title">{t.approach_title}</h2>
          
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
              {t.approach_quote}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {[
              {
                num: "01",
                name: "Root Cause Analysis (RCA)",
                level: 2,
                desc: "Defect troubleshooting framework (5Why / Fishbone / Pareto)",
                action: {
                  ko: "공정 결함 및 수율 저하 발생 시, 단순 현상 기록을 넘어 5Why 및 피시본(Fishbone) 다이어그램 분석법을 적용하여 물리적 결함 유발의 근본적인 메커니즘을 과학적이고 입체적으로 추적합니다.",
                  en: "Applies 5Why and Fishbone diagram frameworks to logically trace and control the root causes of physical defect mechanisms, rather than simply documenting symptoms."
                }
              },
              {
                num: "02",
                name: "Trouble Shooting",
                level: 2,
                desc: "Equipment/process troubleshooting & recovery",
                action: {
                  ko: "장비 트러블 및 오동작 발생 시, 수율 분석 데이터와 정밀 매뉴얼에 의거하여 문제를 빠르게 진단하고 정형화된 트러블슈팅 프로토콜을 가동해 공정 유실(Loss) 시간을 방지합니다.",
                  en: "Traces and restores faulty equipment states by auditing real-time sensor parameters, optimizing recovery protocols, and preventing costly inline production loss."
                }
              },
              {
                num: "03",
                name: "Customer Service & Collaboration",
                level: 3,
                desc: "Stakeholder communication, follow-through & active listening",
                action: {
                  ko: "1티어 OSAT 대기업 앰코 실무 교육 및 반도체 공정 직무 부트캠프를 거치며, 고객사(Stakeholder) 및 다각적 유관 부서와의 소통 과정에서 깊이 경청하고 적극적인 대응 조치로 일정을 고수합니다.",
                  en: "Maintains absolute timeline integrity and aligns cross-functional engineering metrics through proactive active listening, polished stakeholder interfacing, and meticulous follow-through."
                }
              },
              {
                num: "04",
                name: "Aftercare & Ownership",
                level: 3,
                desc: "Follow-up mindset & entrepreneurship initiative",
                action: {
                  ko: "단순히 개별 공정을 마치는 것에서 멈추지 않고, 후공정 출하 후 최종 신뢰성 챔버 검증 통과까지 전 주기에 걸쳐 끝까지 책임지고 추적 관리하는 애프터케어(Aftercare) 마인드셋을 가집니다.",
                  en: "Fosters end-to-end engineering ownership by executing continuous quality aftercare loops and validation checking until the final JEDEC reliability chambers are cleared."
                }
              }
            ].map((strength) => (
              <div 
                key={strength.num}
                style={{ 
                  background: 'var(--surface)', 
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
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: '600', color: 'var(--fg)', marginBottom: '0.5rem' }}>
                  {strength.name}
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'hsl(var(--accent-secondary))', marginBottom: '1rem' }}>
                  {strength.desc}
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {strength.action[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 / Tools & Stack (전문 툴박스 & 인터랙티브 스킬 인벤토리) */}
      <section id="tools" className="section-indexed rule-t">
        <div className="frame">
          <span className="section-index-num">{t.tools_sub}</span>
          <h2 className="section-title">{t.tools_title}</h2>
          
          {/* Quick View: Core Technical Toolchain (Image 1 replica) */}
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {t.quick_view_label}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {[
                { cat: 'Data & Analytics', tools: ['TIBCO Spotfire', 'Python', 'Pandas & NumPy', 'Matplotlib (Visualization)', 'SQL Database'] },
                { cat: 'Standards & Reliability', tools: ['JEDEC Standards (JESD22)', 'HAST / ESD / Temp Cycle Specs', 'FMEA Quality Framework', 'Statistical Process Control (SPC)'] },
                { cat: 'Circuits & Core Studies', tools: ['Digital Logic Design', 'Analog Circuit Simulation (SPICE)', 'Electrical Material Physics', 'Relevant Lab Equipment Control'] }
              ].map((box, idx) => (
                <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--rule)', padding: '2rem', borderRadius: '4px' }}>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: '600', color: 'var(--fg)', marginBottom: '1.25rem', borderBottom: '1px solid var(--rule)', paddingBottom: '0.75rem' }}>
                    {box.cat}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {box.tools.map(tool => (
                      <span key={tool} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'hsl(var(--accent-primary))',
                        background: 'rgba(var(--accent-primary-rgb), 0.04)',
                        border: '1px solid rgba(var(--accent-primary-rgb), 0.15)',
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
                  {t.deep_dive_label}
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '600', color: 'var(--fg)', letterSpacing: '-0.5px' }}>
                  {t.notion_skills_db_title}
                </h3>
              </div>

              {/* Filters and Sorters */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {/* Category Toggles */}
                <div style={{ display: 'flex', background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: '4px', padding: '2px' }}>
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
                      {cat === 'All' ? t.tab_projects.split(' ')[0] + ' ' + (lang === 'ko' ? '전체 스킬' : 'All Skills') : cat === 'Technical' ? (lang === 'ko' ? '🔬 기술' : '🔬 Technical') : (lang === 'ko' ? '🤝 대인' : '🤝 Interpersonal')}
                    </button>
                  ))}
                </div>

                {/* Sort Toggle */}
                <div style={{ display: 'flex', background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: '4px', padding: '2px' }}>
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
                      <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--fg)', letterSpacing: '-0.3px', maxWidth: '70%' }}>
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
                        background: skill.category === 'Technical' ? 'rgba(var(--accent-primary-rgb), 0.04)' : 'rgba(var(--accent-secondary-rgb), 0.04)',
                        border: skill.category === 'Technical' ? '1px solid rgba(var(--accent-primary-rgb), 0.15)' : '1px solid rgba(var(--accent-secondary-rgb), 0.15)',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '2px',
                        textTransform: 'uppercase'
                      }}>
                        {skill.category}
                      </span>
                    </div>

                    {/* Skill Description */}
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                      {skill.desc[lang]}
                    </p>
                  </div>

                  {/* Certifications or Related Projects */}
                  {(skill.cert || skill.project) && (
                    <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {skill.cert && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                          <span style={{ color: 'hsl(var(--accent-secondary))' }}>🎫</span>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{skill.cert}</span>
                        </div>
                      )}
                      {skill.project && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                          <span style={{ color: 'hsl(var(--accent-primary))' }}>🔗</span>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {typeof skill.project === 'object' ? skill.project[lang] : skill.project}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Local styling for hover scale/glow effect on skill cards moved to globals.css */}
      </section>

      {/* About & Contact Section */}
      <footer id="contact" className="rule-t" style={{ paddingBottom: '6rem' }}>
        <div className="footer-container">
          <h2 className="footer-title">{t.footer_title}</h2>
          <p className="footer-desc">
            {t.footer_desc}
          </p>
          <a href="mailto:junseo.oh.kr@gmail.com" className="contact-email">
            junseo.oh.kr@gmail.com
          </a>
          <p className="footer-copy">
            {t.copyright}
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
                <span>{t.modal_contribution}</span>
                <p>{selectedProject.role || '소속 정보 없음'}</p>
              </div>
              <div className="modal-meta-item">
                <span>{t.modal_period}</span>
                <p>{selectedProject.period || '기간 정보 없음'}</p>
              </div>
            </div>

            <div className="modal-body" style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.5rem' }}>
              {isModalLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: 'hsl(var(--accent-primary))' }}>
                  <div className="spinner" style={{
                    display: 'inline-block',
                    width: '30px',
                    height: '30px',
                    border: '3px solid var(--rule)',
                    borderTopColor: 'hsl(var(--accent-primary))',
                    borderRadius: '50%',
                    animation: 'spin 1s infinite linear'
                  }}></div>
                  <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--muted)' }}>{t.modal_loading}</p>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(modalContent) }} />
              )}
            </div>

            <div className="modal-body-translated-caution" style={{ display: lang === 'en' ? 'block' : 'none', padding: '1rem', background: 'var(--surface)', border: '1px solid var(--rule)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '2rem', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
              💡 *This project detail is dynamically localized for English screening.*
            </div>

            <div className="modal-footer">
              {selectedProject.link && (
                <a href={selectedProject.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem' }}>
                  {t.modal_github}
                </a>
              )}
              <button className="btn-secondary" onClick={() => setSelectedProject(null)} style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem' }}>
                {t.modal_close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spinner keyframes moved to globals.css */}

      {/* Codedgar-style Fixed Bottom Status Bar */}
      <div className="status-bar hidden sm:block">
        <div className="status-bar-inner">
          <div className="status-bar-segment status-bar-mode">
            <span className="status-bar-mode-label">mode:</span>
            <span className="status-bar-mode-value">live_notion</span>
          </div>
          <div className="status-bar-segment status-bar-path">
            <span className="status-bar-path-prefix">~/portfolio/</span>
            <span>junseo.oh</span>
          </div>
          <div style={{ width: '1px', height: '14px', background: 'var(--rule)', margin: '0 0.5rem' }}></div>
          <div className="status-bar-segment status-bar-studying">
            <span className="status-bar-studying-icon">⚡</span>
            <span>studying: OSAT packaging &amp; electrical testing (sk hy-po 8th)</span>
          </div>
          
          {/* 하단에도 미니멀 다국어 스위치 탑재 */}
          <div style={{ width: '1px', height: '14px', background: 'var(--rule)', margin: '0 0.5rem' }}></div>
          <div className="status-bar-segment" style={{ cursor: 'pointer' }} onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>
            <span style={{ color: 'var(--muted)' }}>lang:</span>
            <span style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 'bold' }}>{lang}</span>
          </div>

          <div className="status-bar-time">
            <span>{timeStr}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
