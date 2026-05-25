export const mockProjects = [
  {
    id: "mock-1",
    title: "Python 기반 Wafer Map 불량 패턴 자동 분류 및 수율(Yield) 통계적 분석",
    category: "Test & Yield",
    period: "2026.04 (3주 몰입)",
    role: "데이터 전처리 및 통계 분석 (1인 개인 프로젝트)",
    tags: ["Python", "WM-811K Dataset", "Pandas", "Scikit-learn", "Matplotlib"],
    description: "실제 반도체 테스트 엔지니어의 핵심 직무인 '웨이퍼 수율 모니터링 및 불량 원인 추적'을 시뮬레이션했습니다. 80만 장의 공개 웨이퍼 맵 빅데이터셋을 파이썬으로 가공하여 Scratch, Ring 등 9가지 불량 형태를 자동 분류하고 통계적 수율 저하 요인을 규명하였습니다.",
    content: "## 🎯 Objective\n- 제조 및 테스트 단계에서 발생하는 방대한 웨이퍼 빈 맵(Wafer Bin Map) 데이터를 머신러닝 모델을 활용해 전수 분류\n- 수율 저하를 유발하는 대표적인 설비/환경적 요인을 통계적으로 역추적하여 수율 개선 가이드라인 수립\n\n## 🛠️ Methodology & Environment\n- **데이터셋:** SEMATECH 등 학계에서 검증된 WM-811K Wafer Map 데이터셋 (811,457장) 활용\n- **데이터 처리:** Python `Pandas`, `NumPy`, `OpenCV`를 활용하여 웨이퍼 내 다이(Die) 배열을 노이즈 필터링하고 기하학적 특징점(Radon Transform, Density 등) 추출\n- **모델링:** `Scikit-learn` 기반의 Random Forest 및 SVM 모델을 사용하여 정상 웨이퍼와 9대 대표 불량 유형(Center, Donut, Edge-Loc, Edge-Ring, Loc, Random, Scratch, Snap) 자동 분류\n- **분석 시스템:** 불량 유형별로 공정 챔버 내 온도 불균형(Edge-Ring), 물리적 마찰(Scratch) 등 설비별 불량 인과관계 시나리오 매핑\n\n## 📊 Results & Deliverables\n- **정량적 성과:** 수율 결함 패턴 분류 정확도 **93% 달성**\n- **공정 최적화 기여:** 불량 패턴의 누적 분포를 파레토(Pareto) 분석으로 시각화하여, 노광(Lithography) 및 식각(Etch) 단계의 특정 설비 온도 보정 수치 제안\n- **공개 성과물:** 전처리 파이프라인 및 분류 모델 소스코드를 정리하여 GitHub에 기술 블로그 형식으로 오픈소스 배포",
    link: "https://github.com/example/wafer-yield-ml",
    badge: "Accuracy 93%"
  },
  {
    id: "mock-2",
    title: "2.5D/3D Chiplet 패키지 열-기계적 신뢰성 향상을 위한 가상 열팽창계수(CTE) 및 휨(Warpage) 해석",
    category: "Packaging",
    period: "2026.04 (2주 몰입)",
    role: "패키징 신뢰성 시뮬레이션 & 물리 모델 분석 (개인 연구)",
    tags: ["Thermal Simulation", "CTE Mismatch", "JEDEC Standards", "Warpage Analysis"],
    description: "고성능 반도체 패키징 트렌드인 2.5D/3D 칩렛 구조에서 발생하는 열-기계적 불량 요인을 유한요소해석(FEA) 및 전공 이론을 바탕으로 모의 분석하고 설계 개선안을 제안했습니다.",
    content: "## 🎯 Objective\n- 고성능 AI 반도체에 적용되는 2.5D/3D Chiplet 패키지 내부의 서로 다른 재료 간 열팽창계수(CTE) 미스매치 문제 분석\n- 리플로우(Reflow) 공정의 고온 환경에서 실리콘 다이와 패키지 기판(Substrate) 간의 물리적 휨(Warpage) 변형량 및 솔더 조인트 응력 최소화\n\n## 🛠️ Methodology & Environment\n- **해석 대상:** 고성능 SiP (System-in-Package) 모듈 구조 (FC-BGA 기판 + 실리콘 인터포저 + 로직 칩 & HBM 적층 구조)\n- **해석 매커니즘:** 온도 범위 -40°C ~ 125°C의 챔버 조건에서 각 소재(Silicon, Organic Substrate, Copper, Underfill, EMC)의 온도별 열팽창 특성 모델링\n- **개선 아이디어:** 에폭시 몰딩 컴파운드(EMC)의 유리전이온도(Tg) 조정 및 물리적 보강 구조체(Stiffener Ring) 배치에 따른 휨 완화 효과 비교 계산\n\n## 📊 Results & Deliverables\n- **정량적 성과:** 보강 링 설계 변경을 통해 고온 휨 변형률 **18% 감소** 달성\n- **신뢰성 개선:** 솔더 볼 접합부에 집중되는 전단 응력을 최대 **22% 완화**하여 패키지 수명 연장 효과 입증\n- **학습 산출물:** 패키징 재료 조합별 최적의 CTE 정합성 매트릭스 도출 및 수식 증명 리포트 작성",
    link: "https://github.com/example/chiplet-warpage-fea",
    badge: "Warpage -18%"
  },
  {
    id: "mock-3",
    title: "JEDEC 국제 표준 규격 기반 반도체 후공정 품질 보증(QA) 및 수명 예측(FMEA) 프로세스 가이드 수립",
    category: "Quality & Standards",
    period: "2026.05 (2주 몰입)",
    role: "품질 공정 스터디 & 가상 FMEA 설계 (1인 개인 프로젝트)",
    tags: ["JEDEC Standards", "FMEA", "HAST / ESD / TC", "QA Checklist"],
    description: "신입 엔지니어로서 반도체 품질 관리 및 신뢰성 테스트 표준에 대한 전문성을 입증하기 위해, JEDEC 글로벌 표준에 맞춘 가상 불량 유형 영향 분석(FMEA) 및 품질 모니터링 체크리스트를 체계적으로 수립했습니다.",
    content: "## 🎯 Objective\n- 양산 전 단계 및 출하 전 검사에서 패키지 칩의 장기 신뢰성을 보증하기 위한 국제 규격 시험 설계\n- 후공정 7대 대표 공정(Dicing, Die Attach, Wire Bonding, Molding, Solder Ball Attach, Marking, Packing)의 잠재적 불량을 사전 방지하는 가상 FMEA 프레임워크 구축\n\n## 🛠️ Methodology & Environment\n- **준수 표준:** JEDEC 글로벌 표준 규격 5종 (JESD22-A110 고온고습바이어스 HAST, JESD22-A104 온도사이클링 TC, JS-001/JS-002 정전기 방전 ESD 등) 분석\n- **불량 시나리오 모델링:** 와이어 본딩 리프트(Wire Bond Lift) 및 패키지 딜래미네이션(Delamination, 박리) 발생 시의 고장 메커니즘 이론적 규명\n- **위험도 정량화:** 불량의 심각도(Severity), 발생 빈도(Occurrence), 검출 확률(Detection)을 기반으로 한 RPN (Risk Priority Number) 지표 개발 및 품질 검사 체크리스트 설계\n\n## 📊 Results & Deliverables\n- **정량적 성과:** 후공정 단계별 품질 결함 사전 예방을 위한 **5종의 JEDEC 기반 FMEA 템플릿** 설계 완성\n- **실무 즉시성:** 고위험 불량 요인(RPN 150 이상)에 대한 1차 대안 조치 및 2차 양산 적용성 검토 가이드 수립\n- **학습 산출물:** 현업의 QA 엔지니어가 즉시 참고 가능한 '후공정 불량 사전 예방 마스터 매뉴얼'을 GitHub Pages 형태로 퍼블리싱",
    link: "https://github.com/example/jedec-qa-fmea",
    badge: "5 JEDEC Specs"
  }
];
