export const mockProjects = [
  {
    id: "mock-1",
    title: "AI 기반 스마트 할 일 관리 플랫폼 (Tako)",
    category: "개발",
    period: "2026.01 - 2026.04 (4개월)",
    role: "Fullstack Developer (1인 개발)",
    tags: ["React", "Next.js", "Node.js", "MongoDB", "AI Integration"],
    description: "사용자의 업무 패턴과 작성 습관을 분석하여 우선순위를 제안하고, 완료 시간을 예측해 주는 개인화 비서 플랫폼입니다.",
    content: "## 📌 프로젝트 소개\n개인 생산성 향상을 극대화하기 위해 개발한 AI 연동 플래너 웹 서비스입니다. 기존 할 일 관리 앱들이 단순 기록에 그친다면, Tako는 작성된 텍스트의 맥락을 분석하고 과거 업무 완료 패턴을 대조하여 지능적인 완료 예측 및 맞춤형 피드백을 제공합니다.\n\n## 🛠️ 주요 기능\n- **AI 우선순위 자동화:** 하루 일정 등록 시 작업 중요도와 기한을 분석해 최적의 진행 순서 정렬\n- **스마트 시간 예측:** NLP 모델을 통해 '기획서 작성'과 같은 일정의 평균 완료 시간을 도출\n- **인터랙티브 대시보드:** 주차별 생산성 지수 및 주력 업무 카테고리를 차트와 그래프로 모니터링\n\n## 📈 기술적 성과\n- Next.js **ISR (Incremental Static Regeneration)**을 활용해 무거운 데이터 로딩 시간을 **80% 단축**\n- 복잡한 AI 추론 요청을 Edge Function 및 Queue 구조로 변경하여 **동시 요청 처리량 2.5배 개선**\n- 모바일 반응형 및 글래스모피즘 기반의 세련된 UI를 바닐라 CSS 변수로 완벽 제어",
    link: "https://github.com/example/tako",
    badge: "Featured"
  },
  {
    id: "mock-2",
    title: "글래스모피즘 디자인 시스템 'Lumina'",
    category: "디자인",
    period: "2025.10 - 2025.12 (2개월)",
    role: "Lead UI/UX Designer & Publisher",
    tags: ["UI/UX Design", "Figma", "CSS Variables", "Design System"],
    description: "현대적인 다크 테마와 아크릴 유리 감성의 질감을 구현할 수 있는 컴포넌트 라이브러리 및 디자인 토큰 가이드입니다.",
    content: "## 📌 프로젝트 소개\n'Lumina'는 복잡하고 눈 피로가 적은 다크 모드를 타겟으로 하는 글래스모피즘(Glassmorphism) 전용 디자인 시스템입니다. 모호한 가이드에서 벗어나 Figma 디자인 컴포넌트와 CSS 디자인 토큰을 1:1 매칭하여 디자이너와 개발자 간의 원활한 소통을 이끌어냅니다.\n\n## 🛠️ 주요 기능\n- **일관된 유리 질감 효과:** 백드롭 필터(`backdrop-filter`) 및 미세한 광원 효과를 머금은 그라디언트 테두리 사전 세팅\n- **Harmonious HSL 색상 체계:** 채도와 명도를 수학적으로 계산하여 가독성을 높인 HSL 컬러 팔레트 구축\n- **Figma to CSS Sync:** 토큰 변환 자동화 플러그인을 활용한 빠른 프로토타이핑 지원\n\n## 📈 기술적 성과\n- 약 40개의 공통 UI 컴포넌트(버튼, 카드, 모달, 인풋 등) 설계 완료\n- Figma 베스트 디자인 시스템 템플릿 선정 및 커뮤니티 공유 1만 건 이상 달성\n- 순수 CSS 변수만 사용하여 스타일 오버헤드가 거의 없는 친환경적 경량 라이브러리 완성",
    link: "https://figma.com/example/lumina",
    badge: "Design Award"
  },
  {
    id: "mock-3",
    title: "비대면 협업 툴 'SyncSpace' 기획 및 설계",
    category: "기획",
    period: "2025.05 - 2025.09 (5개월)",
    role: "Product Manager (PM)",
    tags: ["Product Strategy", "Wireframing", "User Research", "Agile"],
    description: "팀원 간의 실시간 화상 회의와 디지털 화이트보드를 결합한 하이브리드 워크스페이스 솔루션 기획서 및 MVP 설계입니다.",
    content: "## 📌 프로젝트 소개\n코로나 이후 보편화된 재택 근무 환경에서 화상 회의 툴과 메모 툴의 잦은 탭 전환으로 인해 발생하는 컨텍스트 스위칭 비용을 최소화하기 위한 비대면 원스톱 협업 툴입니다.\n\n## 🛠️ 주요 기능\n- **일체형 실시간 캔버스:** 비디오 미팅을 진행하면서 마우스 위치와 아이디어를 즉시 캔버스에 그리는 양방향 드로잉\n- **스마트 아카이빙:** 회의 내 오디오를 실시간 STT로 변환하여 주요 키워드와 액션 아이템을 자동으로 마인드맵화\n- **애자일 대시보드:** 기획서 안에서 바로 개발 스프린트 카드 생성 및 트래킹 연동\n\n## 📈 기획 성과\n- 잠재 고객 120명을 대상으로 심층 인터뷰 및 사용성 평가 진행\n- 유용성 지표(System Usability Scale) 조사 결과 기존 툴 대비 **18% 향상된 82점** 획득\n- MVP 스펙 정의서 및 30페이지 분량의 상세 와이어프레임 작성을 통해 개발 기간 2주 조기 단축",
    link: "https://notion.so/example/syncspace",
    badge: "Best Strategy"
  }
];
