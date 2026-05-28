const projectProseData = {
  ko: {
    1: {
      meta: `반도체 / 와이어 본딩 캐필러리 신뢰성`,
      title: `Effect of Ceramic Capillary Geometry on 1st Bond Morphology and Strength in Wire Bonding`,
      date: `2026. 05. 01. ~ 2026. 05. 18.`,
      prose: `
<p class="journal-p"><em>(세라믹 캐필러리 기하학적 형상이 와이어 본딩 First Bond 형상 및 신뢰성 강도에 미치는 영향)</em></p>
<hr class="journal-divider">
<h3 class="journal-h3">1) 프로젝트 개요</h3>
<ul class="journal-ul">
<li><strong>기간</strong>: 2026. 05. 01. ~ 2026. 05. 18.</li>
<li><strong>유형</strong>: 학술 세미나 및 공정 변수 최적화 메커니즘 분석</li>
<li><strong>소속/수행 환경</strong>: 광운대학교 전자공학과 (학부 4학년 학술 세미나 / Amkor Technology 백엔드 엔지니어링 준비 과정)</li>
<li><strong>한 줄 소개</strong>: </li>
</ul>
<p class="journal-p">> 이 프로젝트는 반도체 패키지 미세 피치(Fine-pitch)화에 따라 중요성이 대두된 <strong>캐필러리(Capillary) 툴의 미세 설계 수치가 1st Bond 불량 모드 및 접합 신뢰성에 미치는 기계적 메커니즘을 분석</strong>하고, 최적의 접합 레시피 밸런스를 정의한 프로젝트이다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">2) 배경 및 문제 정의</h3>
<ul class="journal-ul">
<li><strong>배경</strong>: 오늘날 반도체 미세선폭화가 가속화되면서 소자 간 갭이 0.13μm 수준으로 촘촘해졌고, 패키징 와이어 본딩의 Bond 피치 간격 역시 <strong>50μm</strong> 수준으로 극도로 미세화(Fine-pitch)되었습니다.</li>
<li><strong>문제 정의</strong>: </li>
</ul>
<p class="journal-p">* 미세 피치 패키징 환경에서는 와이어 접착 패드의 면적이 좁아지기 때문에 First Bond(Ball Bond)가 조금만 중심을 벗어나거나 옆으로 번져도 인접 볼과 부딪쳐 <strong>단락(Short circuit) 불량</strong>을 일으킵니다.</p>
<p class="journal-p">* 현장에서는 주로 기계의 힘(Force)이나 초음파(Ultrasonic Power) 세기 등 단순 '공정 파라미터' 조정으로 문제를 해결하려 하지만, 기저 원인이 되는 <strong>공정 툴(Capillary)의 기하학적 치수 설계(Geometry)</strong>의 물리적 영향력을 정밀하게 이해하지 못하면 근본적인 불량 제어가 불가능하다는 한계가 있었습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">3) 목표</h3>
<ul class="journal-ul">
<li><strong>정량 목표</strong>: </li>
</ul>
<p class="journal-p">* 인장 강도(Pull Strength)를 극대화하여 와이어 중간 영역 파단율(Normal break rate at Point C) <strong>99%</strong> 달성 조건 수립.</p>
<p class="journal-p">* 최적의 MBD(Mashed Ball Diameter, 납작해진 볼 직경) 제어로 인접 패드 간의 누설 전류 및 단락(Short circuit) 발생율 0% 조건 수립.</p>
<ul class="journal-ul">
<li><strong>정성 목표</strong>: </li>
</ul>
<p class="journal-p">* 캐필러리 3대 기하학 변수(IHD, ICAD, ICBA)의 치수 변화에 따른 물리적 고장 모드(Failure Mode) 인과관계 규명 및 설계 밸런스 확립.</p>
<hr class="journal-divider">
<h3 class="journal-h3">4) 내 역할</h3>
<ul class="journal-ul">
<li><strong>프로젝트 형태</strong>: 개인 프로젝트 (논문 분석 및 학술 세미나 발표)</li>
<li><strong>내 역할 (주도적 기여)</strong>: </li>
</ul>
<p class="journal-p">* Cao et al. (Micromachines, 2020) 논문을 기반으로 캐필러리 미세 치수가 접합 물리성에 미치는 통계적 데이터 분석 및 시각화 자료 제작.</p>
<p class="journal-p">* 미세 와이어 본딩 공정 4단계(FAB 형성 ➔ 1st Bond ➔ Loop ➔ 2nd Bond)에서 1st Bond의 형상(Morphology) 결정 요인을 물리 법칙(응력 집중, 유동성) 관점으로 해석.</p>
<p class="journal-p">* 세미나 발표를 통해 캐필러리 형상 설계가 단순 변수 변경으로 해결할 수 없는 '대체 불가능한 핵심 공정 기술'임을 논리적으로 증명.</p>
<hr class="journal-divider">
<h3 class="journal-h3">5) 적용 공정 / 기술 / 도구</h3>
<table class="journal-table">
<thead>
<tr>
  <th>구분</th>
  <th>내용</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>공정/기술</strong></td>
  <td>Thermosonic Wire Bonding (열압착 및 초음파 인가를 통한 금 와이어 본딩)</td>
</tr>
<tr>
  <td><strong>장비/환경</strong></td>
  <td>KAIJO Bonder FB-988 (공정 메커니즘 학습)</td>
</tr>
<tr>
  <td><strong>분석 도구</strong></td>
  <td>OriginPro / Excel (인장 강도 및 전단 강도 통계치 데이터 시각화 및 분석)</td>
</tr>
<tr>
  <td><strong>측정/검증</strong></td>
  <td>Wire Pull Test (접합부 인장 강도 검증), Ball Shear Test (전단 신뢰성 평가), SEM 분석</td>
</tr>
<tr>
  <td><strong>핵심 변수</strong></td>
  <td><strong>IHD</strong> (Inner Hole Diameter), <strong>ICAD</strong> (Inside Chamfer Diameter), <strong>ICBA</strong> (Inside Chamfer Angle)</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">6) 진행 과정</h3>
<h4 class="journal-h4">1) 현상 파악 (미세 피치 본딩의 물리적 거동 이해)</h4>
<ul class="journal-ul">
<li>와이어 본딩 공정 중 고주파 열에너지(EFO spark)로 형성된 Free Air Ball(FAB)이 본딩 패드에 물리적 압력과 초음파 에너지를 통해 접합될 때, 납작해진 볼의 직경(MBD)과 목 부분(Neck)의 기하학적 형태가 캐필러리 끝단 미세 세라믹 팁 내부 형상과 직접 일치하여 성형되는 현상을 분석함.</li>
</ul>
<p class="journal-p">> 💡 <strong>비유 예시</strong>: 마치 제과 제빵을 할 때 틀의 모양(Capillary)에 따라 구워져 나오는 쿠키(Ball Bond)의 형태가 완전히 결정되는 것과 같습니다. 틀의 구멍이나 각도가 아주 미세하게만 어긋나도 구워진 쿠키는 찢어지거나 넘치게 됩니다.</p>
<h4 class="journal-h4">2) 원인 가설 설정 (3대 핵심 변수의 불량 인과관계 가설 세우기)</h4>
<ul class="journal-ul">
<li><strong>가설 1</strong>: IHD(홀 지름)가 너무 좁으면 구멍 벽면과 와이어 사이 마찰력이 극대화되어 와이어 목(Neck) 부위에 물리적 스트레스(Stress Concentration)가 집중되어 접합 강도가 낮아질 것이다.</li>
<li><strong>가설 2</strong>: ICAD(챔퍼 지름)가 너무 좁으면 FAB가 챔퍼 내부 공간을 초과하여 옆으로 흘러넘쳐 인접 볼과 쇼트가 날 것이다.</li>
<li><strong>가설 3</strong>: ICBA(챔퍼 각도)가 너무 넓어지면 가압 시 볼이 횡방향으로 과도하게 펴지게 되어 기계적 강도는 오르겠지만 미세 피치 간격을 침범할 것이다.</li>
</ul>
<h4 class="journal-h4">3) 분석 및 데이터 검증 (통계 분석 기반 증명)</h4>
<ul class="journal-ul">
<li><strong>IHD 분석</strong>: IHD가 26μm(너무 작을 때)인 경우 홀 내부 마찰 극대화로 와이어 목 부러짐(Neck broken) 현상이 심해져 인장 강도가 급락함을 확인. 반면 41μm(너무 클 때)는 와이어가 흔들려 수직 정렬도가 무너짐. 와이어 직경 대비 <strong>1.3배(33μm)</strong>가 최적 밸런스임을 데이터로 증명.</li>
<li><strong>ICAD 분석</strong>: ICAD가 51μm일 때 볼이 패드 밖으로 범람(Ball Overflow)하는 SEM 이미지를 확보하고, 76μm일 때는 누르는 압력이 분산되어 결합 면적이 줄어들어 접합 전단 강도가 26% 감소하는 상관관계 도출. <strong>64μm</strong>가 전단 강도 유지와 쇼트 방지의 최적 수치임을 확인.</li>
<li><strong>ICBA 분석</strong>: ICBA가 70°일 때는 가파른 경사로 인해 볼이 한쪽으로 쏠리는 편심 볼(Eccentric Ball) 현상 유발. 120°는 전단 강도 수치는 높지만 radial 방향(부채꼴)으로 볼이 과도하게 퍼져 미세 피치 마진을 초과함. 양쪽의 트레이드오프를 맞추는 지점은 <strong>100°</strong>임을 증명.</li>
</ul>
<h4 class="journal-h4">4) 검증 및 최종 결론</h4>
<ul class="journal-ul">
<li>기하학적으로 최적 설계된 캐필러리 조건 <strong>(IHD 33μm, ICAD 64μm, ICBA 100°)</strong> 환경에서는 인장 성능이 <strong>11.26g</strong>로 극대화되며, 인장 시험 시 접착부가 떨어지는 것이 아닌 와이어 본선 자체가 끊어지는 정상 거동(Point C 단선)이 99% 이상 보장됨을 최종 규명.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">7) 핵심 문제 해결 포인트</h3>
<ul class="journal-ul">
<li><strong>가장 어려웠던 문제</strong>: "전단 강도(Shear Strength) 수치가 높은 조건이 항상 안전한 공정 조건인가?"에 대한 모순 규명이었습니다.</li>
<li><strong>해결 방법</strong>: </li>
</ul>
<p class="journal-p">* 단순 데이터 분석 결과만 보면 챔퍼 각도(ICBA)가 120°일 때 접합 전단 강도가 가장 높게 우상향하는 통계 데이터가 나타났습니다.</p>
<p class="journal-p">* 그러나 이를 단순 채택할 경우 미세 피치 패키지(50μm 이하) 환경에서는 넓어진 각도로 인해 MBD가 과도하게 확장되어 인접 볼과 닿는 치명적인 쇼트(Short-circuit) 불량을 발생시킨다는 모순을 발견했습니다.</p>
<p class="journal-p">* 이에 따라 <strong>'단일 기계 강도 지표'의 극대화가 아닌 '강도 지표와 공정 윈도우(Short 마진) 간의 엔지니어링적 트레이드오프'</strong>를 감안하여 최적의 균형점인 <strong>100°</strong>를 공정 표준으로 도출해내는 종합적 사고를 발휘했습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">8) 결과 및 성과</h3>
<ul class="journal-ul">
<li><strong>최적 공정 설계 기준 수립</strong>: </li>
</ul>
<p class="journal-p">* <strong>IHD 33μm (와이어 지경의 1.3배)</strong>: 99%의 와이어 정상 파단(C-break) 보장 및 최적 인장 강도(11.26g) 달성. 기준 편차 시 인장 강도가 <strong>최대 76% 급락</strong>함을 수학적으로 확인.</p>
<p class="journal-p">* <strong>ICAD 64μm</strong>: 전단 강도 저하 및 볼 넘침 현상 원천 봉쇄.</p>
<p class="journal-p">* <strong>ICBA 100°</strong>: 편심 볼 불량과 인접 쇼트 불량을 완벽히 분리하는 양방향 안전 윈도우 수립.</p>
<h4 class="journal-h4">결과 비교 데이터 요약</h4>
<table class="journal-table">
<thead>
<tr>
  <th>평가지표</th>
  <th>최적 조건 외 (편차 발생 시)</th>
  <th>최적 조건 적용 시</th>
  <th>비고 / Failure Mode</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>Pull Test 정상 파단율</strong></td>
  <td>19% (IHD 26μm 기준)</td>
  <td><strong>99%</strong></td>
  <td>Neck broken 및 접합부 이탈 방지</td>
</tr>
<tr>
  <td><strong>접합 인장 강도(Pull)</strong></td>
  <td>~ 7.4 g</td>
  <td><strong>11.26 g</strong></td>
  <td>약 50% 이상의 강도 신뢰성 향상</td>
</tr>
<tr>
  <td><strong>전단 강도(Shear)</strong></td>
  <td>48.7 g (ICAD 76μm 기준)</td>
  <td><strong>66.2 g</strong></td>
  <td>결합 안정성 26% 이상 확보</td>
</tr>
<tr>
  <td><strong>인접 볼 단락(Short) 가능성</strong></td>
  <td>매우 높음 (ICBA 120° 적용 시)</td>
  <td><strong>0% (마진 확보)</strong></td>
  <td>MBD를 패드 범위 안으로 통제 완료</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">9) 내가 배운 점</h3>
<ul class="journal-ul">
<li>이 분석 프로젝트를 통해 반도체 후공정에서 <strong>"공정 장비의 세팅(레시피 파라미터)을 백날 조절하더라도, 핵심 공정 팁인 캐필러리 툴 자체의 형상 구조(Geometry)가 맞지 않으면 어떠한 물리적 불량도 잡을 수 없다"</strong>는 것을 통계적 데이터와 물리학적 증명(압력 분산 및 응력 집중 원리)을 통해 깊이 깨달았습니다.</li>
<li>단일 성능 강도(Shear, Pull)만을 높이는 단편적 셋업보다 전체 패키지의 밀도와 레이아웃 마진을 균형 있게 조율하는 <strong>종합적인 아키텍트적 엔지니어 마인드</strong>를 배울 수 있었습니다.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">10) 후공정 직무와의 연결점</h3>
<ul class="journal-ul">
<li><strong>후공정 직무와의 관련성</strong>: 와이어 본딩은 전통적 패키징뿐 아니라 최신 패키지 기술에서도 신뢰성을 좌우하는 가장 본질적인 공정입니다.</li>
<li><strong>실무 적용 가능 업무</strong>: </li>
</ul>
<p class="journal-p">* Amkor Technology 등 글로벌 후공정 OSAT 기업 입사 후, 와이어 본딩 파트에서 <strong>새로운 규격의 미세 와이어 도입 시 패드 단락 불량을 방지하고 신뢰성을 검증하는 툴 최적화 엔지니어링</strong> 업무에 즉각적인 도메인 지식으로 기여할 수 있습니다.</p>
<p class="journal-p">* 데이터 기반 불량 분석(FA) 기법과 SEM 형상 분석 능력을 토대로 품질 보증(QA) 및 수율 개선(Yield) 부서에서도 높은 공학적 이해도를 보여줄 수 있습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">11) 첨부 자료</h3>
<ul class="journal-ul">
<li><strong>그림 1</strong>: 캐필러리 3대 기하학 변수(IHD, ICAD, ICBA) 상세 도면</li>
<li><strong>그림 2</strong>: 챔퍼 각도(ICBA)에 따른 볼 성형(Morphology) 및 패드 밖 쇼트 현상 SEM 이미지 비교</li>
<li><strong>표 1</strong>: 캐필러리 형상 설계 조건에 따른 Pull/Shear Test 데이터 분포 그래프</li>
</ul>
      `
    },
    2: {
      meta: `반도체 / 후공정 패키지 및 테스트 종합 이론`,
      title: `Semiconductor Packaging & Test Engineering Fundamentals`,
      date: `2026. 04. 01. ~`,
      prose: `
<p class="journal-p"><em>(반도체 패키징 및 테스트 엔지니어링 핵심 이론 독파 및 직무 역량 체계화)</em></p>
<hr class="journal-divider">
<h3 class="journal-h3">1) 프로젝트 개요</h3>
<ul class="journal-ul">
<li><strong>기간</strong>: 2026. 04. 01. ~ 진행 중</li>
<li><strong>유형</strong>: 전공 직무 서적 분석 및 핵심 공정 기술 체계화 프로젝트</li>
<li><strong>소속/수행 환경</strong>: 개인 연구 및 직무 이론 강화 프로젝트 (추천 도서: <em>반도체 패키지와 테스트 입문</em>)</li>
<li><strong>한 줄 소개</strong>: </li>
</ul>
<p class="journal-p">> 이 프로젝트는 반도체 테스트 장비 운영 프로세스부터 시작하여 컨벤셔널/웨이퍼 레벨 패키지(WLCSP), 차세대 적층 기술(TSV/SiP) 및 전산모사(열/구조/전기 해석)에 이르는 <strong>후공정 전반의 메커니즘을 독파하고, 주니어 엔지니어로서의 이론적 기틀을 완성한 직무 체계화 경험</strong>이다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">2) 배경 및 문제 정의</h3>
<ul class="journal-ul">
<li><strong>배경</strong>: 반도체 후공정(Packaging & Test) 직무는 전공정에서 제조된 웨이퍼를 개별 칩으로 나누고 보호하며, 전기적으로 외부와 연결해 최종 수율을 결정짓는 핵심 관문입니다.</li>
<li><strong>문제 정의</strong>: </li>
</ul>
<p class="journal-p">* 학부 전공 과정에서는 후공정 및 테스트 장비, 신뢰성 평가(Reliability)에 대해 깊이 있는 실무 지식을 습득하기 어렵다는 한계가 있었습니다.</p>
<p class="journal-p">* 특히, 이종 재료 결합 시 발생하는 열적/구조적 변형(Warpage)이나 고주파 신호 무결성(Signal Integrity)과 같은 복합 물리 현상은 단순 이론 암기만으로는 설계 최적화에 기여할 수 없습니다.</p>
<p class="journal-p">* 이에 따라 실제 현업 엔지니어가 사용하는 전문 서적 및 업계 동향 분석을 결합하여, <strong>공학적 관점(현상 파악 ➔ 원인 분석 ➔ 솔루션 도출)의 탄탄한 기본기</strong>를 다지기 위해 본 프로젝트를 기획하였습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">3) 목표</h3>
<ul class="journal-ul">
<li><strong>정량 목표</strong>: </li>
</ul>
<p class="journal-p">* 14일 동안 매일 정해진 핵심 챕터(총 280페이지 분량)를 완벽히 독파하고, 일차별 키워드 리포트 작성.</p>
<p class="journal-p">* 테스트 프로세스, 패키지 분류, 구조 해석, 신뢰성 평가 등 <strong>7대 영역</strong>에 대한 100% 기술적 완독 및 정리율 달성.</p>
<ul class="journal-ul">
<li><strong>정성 목표</strong>: </li>
</ul>
<p class="journal-p">* 단순 개념 습득을 넘어, 각 공정 단계별 핵심 실패 모드(Failure Mode) 및 해결 방안(예: Pad Swap을 통한 라우팅 최적화, e-퓨즈를 활용한 패키지 레벨 리페어)을 물리적 메커니즘 관점으로 해설할 수 있는 직무 전문성 확보.</p>
<hr class="journal-divider">
<h3 class="journal-h3">4) 내 역할</h3>
<ul class="journal-ul">
<li><strong>프로젝트 형태</strong>: 개인 프로젝트 (14일간의 독서 및 직무 기술 분석 노트 작성)</li>
<li><strong>내 역할 (주도적 기여)</strong>: </li>
</ul>
<p class="journal-p">* 서적에 소개된 복잡한 표와 구조(Conventional vs WLCSP, SoC vs SiP 등)를 핵심 직무 역량 관점에서 비교/분석하고 요약 자료 제작.</p>
<p class="journal-p">* 전기적/열적 해석 기법(SI, PI, EMI 및 Thermal resistance $R_{j-a}$)의 물리 모델과 수식을 학부 전공 지식(전자기학, 재료역학)과 연결하여 입체적으로 해석.</p>
<p class="journal-p">* 독서 기록 내 이미지 자료(프루브카드, 팬인/팬아웃, 범프 구조 등)의 공정 경로를 추적하며 실무 프로세스 이해도 극대화.</p>
<hr class="journal-divider">
<h3 class="journal-h3">5) 적용 공정 / 기술 / 도구</h3>
<p class="journal-p">이론 학습을 통해 숙지하고 체계화한 실제 반도체 후공정의 핵심 직무 도구 및 공정 기술 리스트입니다.</p>
<table class="journal-table">
<thead>
<tr>
  <th>구분</th>
  <th>내용</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>반도체 테스트</strong></td>
  <td>Probe Card (Cantilever, Vertical), Burn-In Test (TDBI), Laser/e-Fuse Repair</td>
</tr>
<tr>
  <td><strong>패키지 분류</strong></td>
  <td>Conventional (Leadframe, Substrate BGA), WLCSP (Fan-In, Fan-Out, RDL First)</td>
</tr>
<tr>
  <td><strong>인터커넥트 기술</strong></td>
  <td>Flip-Chip bonding, Capillary Stud Bump, ACF, Copper Pillar Bump, TSV (Via-Middle)</td>
</tr>
<tr>
  <td><strong>적층 및 패키지 구조</strong></td>
  <td>TMV (Through Mold Via), PoP, HBM (X1024), 2.5D/3D SiP, Silicon Interposer</td>
</tr>
<tr>
  <td><strong>전산모사 해석</strong></td>
  <td>FEM (유한요소법), 구조 해석 (Warpage, Solder Joint Reliability), 열/전기 해석 (SI/PI/EMI)</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">6) 진행 과정</h3>
<h4 class="journal-h4">1) 1주차: 반도체 테스트 인프라 및 패키지 분류 체계화</h4>
<ul class="journal-ul">
<li><strong>테스트 및 리페어 메커니즘</strong>: 웨이퍼 레벨 테스트를 가능하게 하는 프루브 카드의 작동 방식 및 수명 연장 메커니즘 분석. 특히 불량이 발생했을 때 패키징 완료 후에도 배선 노출 없이 회로를 끊어 복구할 수 있는 <strong>e-퓨즈 리페어(e-Fuse Repair)</strong> 방식과 높은 전류/전압 인하 원리 파악.</li>
<li><strong>생산 체계 분석</strong>: 메모리 중심의 소품종 대량 생산(공정 효율 및 원가 절감)과 파운드리/OSAT 중심의 다품종 소량 생산(고객 납기 우선, 고부가가치 제품)의 장단점 및 비즈니스 전략 분류.</li>
</ul>
<h4 class="journal-h4">2) 2주차: 차세대 패키징(WLCSP) 및 적층(TSV) 기술 독파</h4>
<ul class="journal-ul">
<li><strong>Fan-In vs Fan-Out</strong>: 칩 크기가 곧 패키지 크기가 되는 팬인의 물리적 취약성을 파악하고, 재배열 방식을 사용하는 팬아웃의 강점 확인. 몰딩 유체 흐름에 의한 미스얼라인을 방지하는 <strong>RDL First</strong> 기술의 부상 원인 규명.</li>
<li><strong>연결의 혁신(Flip-Chip & TSV)</strong>: 와이어 본딩의 물리적 길이 한계를 극복하는 플립칩 범프 기술 분석. Copper Pillar 범프를 통해 피치 간격을 극적으로 줄이는 기술과 고대역폭 메모리(HBM)에서 한 번에 1024비트 신호를 전송할 수 있는 <strong>TSV 기반 적층 구조(X1024)</strong>의 대량 데이터 고속도로 메커니즘 연구.</li>
</ul>
<p class="journal-p">> 💡 <strong>비유 예시</strong>: 2차선 국도(와이어 본딩)를 통해 데이터를 보내던 것을 1024차선 초광대역 고속도로(TSV HBM)로 뚫어버려, 한 번에 어마어마한 양의 데이터를 신속하고 정체 없이 소통시키는 혁신적인 교통 제어와 같습니다.</p>
<h4 class="journal-h4">3) 3주차: 신뢰성 해석 및 물리적 한계 돌파 분석</h4>
<ul class="journal-ul">
<li><strong>Warpage & Solder Joint Reliability</strong>: 실리콘 칩과 기판의 서로 다른 열팽창 계수(CTE) 차이에서 오는 이종 재료 휨(Heterogeneous Materials Warpage) 현상 규명. 평면 전단(Shear)과 축 인장(Tensile)의 복합 응력에 노출되는 솔더 접합부 파괴 거동 해석.</li>
<li><strong>전기 및 열 해석 (SI/PI/EMI)</strong>: 고주파 패키지에서 신호 전달 왜곡을 일으키는 시간 지연, 크로스톡, 스큐, 반사, 지터의 인자와 솔더/PCB 임피던스 매칭(Termination)의 중요성 도출. 임피던스를 안정화하기 위해 디커플링 커패시터를 배치하는 PI 해석 흐름 파악.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">7) 핵심 문제 해결 포인트</h3>
<ul class="journal-ul">
<li><strong>직무 관점의 핵심 분석</strong>: "칩 설계와 패키지 설계 간의 복합 유기적 상관관계 이해 및 Pad Swap을 통한 공정 난제 해결"</li>
<li><strong>해결 방법</strong>: </li>
</ul>
<p class="journal-p">* 칩 단독 설계 시에는 이상적인 배선 흐름이 패키징 조립 단계에서는 캐필러리 장비 진입 차단이나 크로스톡(Crosstalk)과 같은 치명적인 성능 저하를 일으킬 수 있음을 파악했습니다.</p>
<p class="journal-p">* 이를 방지하기 위해 기판 상에서 배선이 꼬이지 않도록 칩 가장자리의 접점 좌표를 재배치하는 <strong>패드 스왑(Pad Swap)</strong> 기술의 중요성을 분석하고, 이를 통해 공정 작업성과 전기적 안정성(SI)을 한 번에 확보할 수 있는 상호 최적화 프로토콜을 체계화하였습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">8) 결과 및 성과</h3>
<ul class="journal-ul">
<li><strong>후공정 직무 포트폴리오 기틀 확립</strong>: </li>
</ul>
<p class="journal-p">* 14일간의 독서 로드맵을 지연 없이 완주하여 후공정 전 분야에 걸친 방대한 기술 도감 및 독서 노트 완성.</p>
<p class="journal-p">* 단순한 용어 정의에 그치지 않고, 공정별 원인-영향-솔루션 간의 상관관계 테이블 작성 완료.</p>
<h4 class="journal-h4">핵심 분석 영역 요약 표</h4>
<table class="journal-table">
<thead>
<tr>
  <th>공정/해석 영역</th>
  <th>주요 발생 불량 (Failure Mode)</th>
  <th>공학적 개선/분석 방안</th>
  <th>직무 적용점</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>테스트 공정</strong></td>
  <td>초기 불량 제품 출하</td>
  <td>번인(Burn-In) 테스트 인위적 스트레스 인가</td>
  <td>불량품 사전 선별로 고객사 신뢰 확보</td>
</tr>
<tr>
  <td><strong>재배열 패키지</strong></td>
  <td>몰딩 중 유체 흐름에 의한 칩 미스얼라인</td>
  <td>RDL First 방식 도입</td>
  <td>초미세 패턴 공차 확보 및 패턴 설계 개선</td>
</tr>
<tr>
  <td><strong>물리 구조 해석</strong></td>
  <td>열팽창 계수(CTE) 편차에 의한 Warpage</td>
  <td>유한요소법(FEM) 기반 온도 변형 전산모사</td>
  <td>EMC 두께 및 기판 재료 물성 최적화 제안</td>
</tr>
<tr>
  <td><strong>전기적 해석 (SI)</strong></td>
  <td>임피던스 불일치에 의한 신호 반사(Reflection)</td>
  <td>종단 저항 매칭(Termination) 및 VIA 최소화</td>
  <td>고속 데이터 전송 패키지 전송선 배선 설계</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">9) 내가 배운 점</h3>
<ul class="journal-ul">
<li>반도체 성능 향상의 중심이 전공정(Scale-down)에서 후공정(Advanced Packaging)으로 완전히 이동했음을 2.5D/3D SiP 및 HBM 기술 트렌드를 통해 뼈저리게 깨달았습니다.</li>
<li>공정 엔지니어로서 하나의 공정 조건만을 매몰되어 보는 것이 아니라, <strong>재료의 물성(CTE, Poisson's ratio) ➔ 장비의 특성(Capillary, Decap) ➔ 전기/구조 신뢰성(SI, Solder Reliability)</strong>까지 다각도로 연계하여 바라보는 '통합적 엔지니어링 혜안'의 중요성을 깊이 이해하게 되었습니다.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">10) 후공정 직무와의 연결점</h3>
<ul class="journal-ul">
<li><strong>실무 적용 가능 업무</strong>: </li>
</ul>
<p class="journal-p">* 입사 후 신규 패키징 기술 도입 및 기존 Conventional 패키지의 수율 개선 시, 공정 불량이 발생했을 때 빠르게 가설을 세우고 물리적 원인을 짚어내는 <strong>공정 트러블슈팅(Troubleshooting)</strong> 직무에 강력한 이론적 배경으로 즉시 활용할 수 있습니다.</p>
<p class="journal-p">* 기판 설계 및 소자 분석 부서와의 협업 시, 패키지 디자인 룰(PKG Design rule & Dimension)과 라인/스페이스 마진 수치들을 정확히 이해하고 소통하는 <strong>다학제적 협업 엔지니어</strong>로 기여할 것입니다.</p>
      `
    },
    3: {
      meta: `디지털 설계 / FPGA 및 Verilog HDL 시스템`,
      title: `FPGA and Verilog HDL Digital Logic Circuit Design & Verification`,
      date: `2026. 03. 01. ~ 2026. 06. 30.`,
      prose: `
<p class="journal-p"><em>(FPGA 및 Verilog HDL을 활용한 디지털 논리 회로 설계 및 하드웨어 검증)</em></p>
<hr class="journal-divider">
<h3 class="journal-h3">1) 프로젝트 개요</h3>
<ul class="journal-ul">
<li><strong>기간</strong>: 2026. 03. 01. ~ 2026. 06. 30.</li>
<li><strong>유형</strong>: FPGA 보드 및 Verilog HDL 디지털 시스템 설계 및 하드웨어 디버깅</li>
<li><strong>소속/수행 환경</strong>: 광운대학교 전자공학과 (디지털 시스템 설계 실습)</li>
<li><strong>한 줄 소개</strong>: </li>
</ul>
<p class="journal-p">> 이 프로젝트는 Altera Cyclone II FPGA 보드와 Quartus II, ModelSim 툴을 활용하여 <strong>기본 AND 게이트부터 시작해 가변 속도 10진 카운터, 7세그먼트 디스플레이 컨트롤러, 디바운서(Debouncer) 회로 등을 직접 Verilog HDL로 설계하고 파형 시뮬레이션을 통해 하드웨어의 시간 지연(Propagation Delay) 및 신뢰성을 검증한 프로젝트</strong>이다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">2) 배경 및 문제 정의</h3>
<ul class="journal-ul">
<li><strong>배경</strong>: 반도체 후공정 및 테스트 엔지니어는 칩의 오동작을 찾아내는 테스트 패턴을 설계하거나 테스트 장비(ATE)와 FPGA 인터페이스 간의 동기화 신호를 안정적으로 처리할 수 있어야 합니다.</li>
<li><strong>문제 정의</strong>: </li>
</ul>
<p class="journal-p">* 하드웨어 스위치를 누를 때 기계적 접점에서 발생하는 미세한 물리적 잡음인 <strong>글리치(Glitch)/바운싱(Bouncing)</strong> 현상은 디지털 카운터 회로에서 한 번 눌렀음에도 여러 번 누른 것으로 오인식하는 심각한 논리 오류를 유발합니다.</p>
<p class="journal-p">* 또한, 고속 시스템 클럭(50MHz)을 그대로 사용하면 카운터 동작이 육안으로 관찰 불가능하여, 하드웨어 타이밍 클럭 분주와 시뮬레이션용 파라미터 간의 유기적 조율이 요구되었습니다.</p>
<p class="journal-p">* 이에 따라 FPGA 보드 상에서 발생할 수 있는 글리치 필터링(Debouncing), 클럭 분주기, BCD 카운터 및 7세그먼트 드라이버를 통합 설계하여 실제 <strong>보드급 하드웨어 디자인 역량</strong>을 다지고자 실습을 수행했습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">3) 목표</h3>
<ul class="journal-ul">
<li><strong>정량 목표</strong>: </li>
</ul>
<p class="journal-p">* 0000~9999까지 4자리 BCD 카운트를 7세그먼트에 Active-Low 신호로 오차 없이 디스플레이 구동.</p>
<p class="journal-p">* 버튼 글리치 필터링을 위한 디바운싱(Debouncing) 회로를 설계하여 카운터 오류 인식률 <strong>0%</strong> 달성.</p>
<p class="journal-p">* ModelSim 시뮬레이션 시 게이트 전파 지연(Gate Delay) 5ns 프로파일 예측 모델 수립.</p>
<ul class="journal-ul">
<li><strong>정성 목표</strong>: </li>
</ul>
<p class="journal-p">* 비동기 리셋(Asynchronous Reset) 및 비트 결합 연산자(\<code>{}\</code>)를 활용한 Verilog 코딩 스타일 준수 및 하드웨어 매핑 디버깅 능력 배양.</p>
<hr class="journal-divider">
<h3 class="journal-h3">4) 내 역할</h3>
<ul class="journal-ul">
<li><strong>프로젝트 형태</strong>: 개인 프로젝트 (매주 하드웨어 보드 검증 및 Verilog 프로그래밍 과제 수행)</li>
<li><strong>내 역할 (주도적 기여)</strong>: </li>
</ul>
<p class="journal-p">* Quartus II 환경에서 BDF(Block Diagram File) 및 Verilog HDL 상호 모델링 구조 설계.</p>
<p class="journal-p">* LPM 라이브러리 가산기(\<code>LPM_ADD_SUB\</code>)와 직접 코딩한 가산 모듈(\<code>add3\</code>)을 BDF 블록상에서 유기적으로 배치 및 핀 연결.</p>
<p class="journal-p">* ModelSim TestBench 작성 시 포트 매핑을 이름 방식(\<code>.a(a)\</code>)으로 설계하여 확장성을 높이고, 시뮬레이션 속도 향상을 위해 파라미터(\<code>WIDTH=2\</code>) 동적 분주 셋업 적용.</p>
<p class="journal-p">* Cyclone II 라이브러리를 활용한 게이트 지연 시뮬레이션 파형 분석 및 FPGA 업로드용 POF 변환 디바운싱 회로 디버깅 주도.</p>
<hr class="journal-divider">
<h3 class="journal-h3">5) 적용 공정 / 기술 / 도구</h3>
<table class="journal-table">
<thead>
<tr>
  <th>구분</th>
  <th>내용</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>개발 장비</strong></td>
  <td>Altera Cyclone II FPGA Board (EP2C35F672C6 - DE2)</td>
</tr>
<tr>
  <td><strong>EDA 소프트웨어</strong></td>
  <td>Quartus II 13.0sp1, ModelSim-Altera Starter Edition</td>
</tr>
<tr>
  <td><strong>설계 언어</strong></td>
  <td>Verilog HDL (IEEE 1364 표준 규격 준수)</td>
</tr>
<tr>
  <td><strong>검증 기술</strong></td>
  <td>Timing Simulation (Gate-level Delay), Testbench, Wave Analysis</td>
</tr>
<tr>
  <td><strong>디지털 IP</strong></td>
  <td>LPM_ADD_SUB, SEG7_LUT (7세그먼트 룩업테이블), Debouncer</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">6) 진행 과정</h3>
<h4 class="journal-h4">1) 4bits 가산기(Adder) 및 블록 BDF 통합 설계 (Week 3 ~ 6)</h4>
<ul class="journal-ul">
<li>Verilog HDL을 통해 입력 \<code>a, b[3:0]\</code>와 출력 \<code>sum[5:0]\</code>을 설계하고, 비트 결합 연산자(\<code>temp = {cout, result}\</code>)를 활용해 상위 올림수 캐리아웃(cout)을 부드럽게 병합하는 \<code>add3\</code> 모듈 설계.</li>
<li>Quartus II의 <strong>Pin Planner</strong>를 활용해 Terasic DE2 보드 핀 테이블 규격에 맞춰 스위치 및 LED 핀을 정밀 매핑함.</li>
</ul>
<h4 class="journal-h4">2) 기하학적 지연(Timing Delay) 및 시뮬레이션 검증 (Week 5 & 9)</h4>
<ul class="journal-ul">
<li>단순 이상적인 코드(.v) 시뮬레이션에서는 딜레이가 전혀 발생하지 않았으나, 칩의 실제 내부 레이아웃 배선 정보가 반영된 \<code>.vo\</code> 파일을 ModelSim에 올려 검증한 결과, <strong>5ns의 물리적 게이트 전파 지연(Propagation Delay)</strong> 파형이 정상적으로 튀어나오는 것을 관찰함.</li>
</ul>
<p class="journal-p">> 💡 <strong>비유 예시</strong>: 가상의 지도에서는 한 장소에서 다른 장소로 순간이동 하듯 거리가 0으로 표시되지만(코드 시뮬레이션), 실제 현실 도로에서 차를 몰고 가면 교차로 신호등과 마찰 때문에 가는데 일정 시간이 걸리는 것(물리적인 5ns 지연 파형 관측)과 같습니다.</p>
<h4 class="journal-h4">3) Speed-Controllable Up Counter 설계 (Week 10 ~ 11)</h4>
<ul class="journal-ul">
<li>DE2 보드의 50MHz 기본 클럭을 육안으로 확인하도록 분주(Divider) 회로 구축.</li>
<li>7비트 슬라이드 스위치(\<code>sw[6:0]\</code>) 입력을 받아 동적으로 리셋 임계치인 \<code>cnt_offset\</code> 값을 변환시켜, 시스템 클럭의 주파수 분주비를 조절해 7세그먼트의 카운트 속도를 실시간으로 변경하는 가변형 BCD 카운터 모듈 개발.</li>
<li>시뮬레이션 시간 단축을 위해 \<code>WIDTH\</code> 파라미터를 시뮬레이션 시에는 \<code>2\</code>(4클럭)로, 실제 보드 구동 시에는 \<code>20\</code> 또는 \<code>22\</code>로 전환해 동작시키는 파라미터 관리 체계 수립.</li>
</ul>
<h4 class="journal-h4">4) Debouncer 회로 설계 및 하드웨어 최종 테스트 (Week 12)</h4>
<ul class="journal-ul">
<li>푸시 버튼을 누를 때 튀는 과도 상태 노이즈를 제어하기 위해, D 플립플롭을 여러 단계 거치는 <strong>다단 레지스터 시프트 필터</strong> 설계.</li>
<li>지연된 신호가 일정 카운트(\<code>counter_max = 50\</code>) 동안 흐트러짐 없이 똑같은 신호 레벨을 유지할 때만 진짜 입력 신호(\<code>data_out\</code>)로 인정하여 카운트를 올리는 디바운싱 알고리즘 검증 완료.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">7) 핵심 문제 해결 포인트</h3>
<ul class="journal-ul">
<li><strong>가장 어려웠던 문제</strong>: "FPGA 실제 업로드 컴파일 에러 및 Pin Planner 내림차순 핀 배치 오류 디버깅"</li>
<li><strong>해결 방법</strong>: </li>
</ul>
<p class="journal-p">* 초기 FPGA 핀 배치 실습 시, Quartus II의 Node Name 정렬 순서(\<code>a[3], a[2], a[1], a[0]\</code>)로 인해 단순 위에서 아래 순으로 핀을 배치했다가 하드웨어 스위치 0번을 올렸을 때 칩의 최상위 비트(MSB)인 \<code>a[3]\</code>이 오작동하는 핀 뒤집힘 문제를 발견했습니다.</p>
<p class="journal-p">* 또한 EPCS4 장치 용량(4MB) 대비 컴파일된 SOF 파일의 실질적 크기가 초과되어 보드 다운로드 후 하드웨어가 멈추는 불량을 식별했습니다.</p>
<p class="journal-p">* 이를 해결하기 위해 FPGA의 핀 매핑 테이블을 물리 레벨에서 1:1 재조정하고, Convert Programming Files 툴을 사용하여 EPCS 장치 규격에 최적화된 <strong>EPCS16(6MB 지원 장치)</strong> 포맷의 POF 파일로 변환 업로드하여 정상 작동에 성공했습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">8) 결과 및 성과</h3>
<ul class="journal-ul">
<li><strong>속도 가변형 10진 카운터 완성</strong>: </li>
</ul>
<p class="journal-p">* 7세그먼트 디스플레이 구동 및 Active-Low 반전 출력(\<code>~seg_sig\</code>)을 통해 보드상에 숫자가 정확히 표시됨을 검증.</p>
<p class="journal-p">* 디바운싱 회로를 통해 버튼 글리치 오인식 제어 성공.</p>
<h4 class="journal-h4">하드웨어 설계 결과 데이터</h4>
<table class="journal-table">
<thead>
<tr>
  <th>회로 설계 요소</th>
  <th>개선 전 (이상적인 무지연 모델)</th>
  <th>개선 후 (물리적 실환경 모델)</th>
  <th>비고 / 디버깅 성과</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>초기 신호 지연 (Delay)</strong></td>
  <td>0 ns</td>
  <td><strong>5 ns</strong></td>
  <td>실제 실리콘 기판 내부 배선 물리량 반영</td>
</tr>
<tr>
  <td><strong>버튼 클릭 인식 정확도</strong></td>
  <td>80% (글리치 오인식 유발)</td>
  <td><strong>100% (오류 없음)</strong></td>
  <td>Debouncer (D-FF 시프트) 필터링 효과</td>
</tr>
<tr>
  <td><strong>시뮬레이션 컴파일 속도</strong></td>
  <td>~ 5분 소요 (WIDTH 22 기준)</td>
  <td><strong>~ 10초 미만</strong></td>
  <td>시뮬레이션용 WIDTH=2 임시 분주 최적화</td>
</tr>
<tr>
  <td><strong>FPGA 용량 매치 수율</strong></td>
  <td>용량 초과 불량 (EPCS4 기준)</td>
  <td><strong>100% 정상 작동</strong></td>
  <td>EPCS16 규격 POF 변환 적용 성공</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">9) 내가 배운 점</h3>
<ul class="journal-ul">
<li>코드로만 작성한 이상적인 코딩 언어가 실제 반도체 게이트와 만나 동작할 때는 <strong>'물리적 지연(Gate Delay)'과 '외부 기계 노이즈(Bouncing)'</strong>와 같은 아날로그적 한계가 상존함을 배웠습니다.</li>
<li>Top-Level Entity 모듈명 일치 원칙과 비동기 리셋(negedge reset) 회로 구성을 통해, 단선과 오동작을 줄이기 위한 <strong>정밀하고 엄격한 하드웨어 설계 아키텍처</strong>를 다룰 수 있게 되었습니다.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">10) 후공정 직무와의 연결점</h3>
<ul class="journal-ul">
<li><strong>후공정/테스트 직무와의 관련성</strong>: 반도체 패키징이 끝난 최종 칩을 테스트하기 위해서는 ATE(자동 테스트 장비)와 프루브카드/테스트 보드 간의 정밀한 디지털 신호 동기화와 데이터 시퀀스 입력 제어가 필수적입니다.</li>
<li><strong>실무 적용 가능 업무</strong>: </li>
</ul>
<p class="journal-p">* 테스트 엔지니어로서 <strong>FPGA 보드 레벨의 디지털 회로를 직접 셋업하여 테스트 패턴 제어 회로를 설계</strong>하거나, 로직 신호의 지연 마진을 모델링하여 수율(Yield) 평가 장비 오류를 디버깅하는 실무 능력을 입증합니다.</p>
<p class="journal-p">* 패키징 내 디바운싱 패턴이나 전원 노이즈(PI) 저감 보드 레벨 해석 시 회로 설계적 통찰력으로 소통할 수 있습니다.</p>
      `
    },
    4: {
      meta: `차세대 노광 / EUV 무기 포토레지스트 공정`,
      title: `TinNO₃: EUV Photoresist Innovation by Integrating Photoactive Nitrate Anion`,
      date: `2025. 11. 17. ~ 2025. 12. 04.`,
      prose: `
<p class="journal-p"><em>(광활성 질산염 음이온을 통합한 TinNO₃ 차세대 EUV 포토레지스트의 공정 적용 혁신 분석)</em></p>
<hr class="journal-divider">
<h3 class="journal-h3">1) 프로젝트 개요</h3>
<ul class="journal-ul">
<li><strong>기간</strong>: 2025. 11. 17. ~ 2025. 12. 04.</li>
<li><strong>유형</strong>: 차세대 반도체 포토/식각 전공정 신소재 분석 및 소자 신뢰성 세미나</li>
<li><strong>소속/수행 환경</strong>: 광운대학교 전기공학과 (최신 전기공학 주제 탐구 학술 세미나)</li>
<li><strong>한 줄 소개</strong>: </li>
</ul>
<p class="journal-p">> 이 프로젝트는 반도체 나노 공정 한계 돌파를 위한 핵심 연구인 <strong>무기 주석 옥소 클러스터(Tin-based photoresists) 중 광활성 질산염 음이온을 적용한 \<code>TinNO₃\</code> 레지스트의 EUV 감도, 열처리(PEB) 공정 신뢰성, 미세 패턴 해상도 및 건식 식각 저항성을 정량적으로 분석하고 요약한 세미나 프로젝트</strong>이다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">2) 배경 및 문제 정의</h3>
<ul class="journal-ul">
<li><strong>배경</strong>: 반도체 미세공정이 10nm 이하의 극미세 나노 노드로 진입함에 따라, 파장이 13.5nm로 매우 짧은 <strong>극자외선(EUV) 리소그래피</strong> 기술 도입이 필수가 되었습니다.</li>
<li><strong>문제 정의</strong>: </li>
</ul>
<p class="journal-p">* 기존에 사용되던 유기 포토레지스트(Organic PR)는 EUV 광원의 강한 에너지(92 eV)에 노출되었을 때 광원 흡수율이 떨어지고 샷 노이즈(Shot Noise)로 인해 균일한 노광이 어렵다는 한계가 있었습니다.</p>
<p class="journal-p">* 또한, 습식 현상액 사용 시 미세 패턴이 쓰러지는 <strong>패턴 붕괴(Pattern Collapse)</strong> 불량과, 화학 증폭형 레지스트(CARs) 특유의 무작위 산 확산(Acid Diffusion)으로 인해 회로 외곽선이 들쭉날쭉해지는 LER(Line Edge Roughness) 문제가 심각했습니다.</p>
<p class="journal-p">* 이를 해결하기 위해 무기 주석 옥소 클러스터(Tin oxo clusters) 기반 신소재 레지스트 개발이 대두되었으나, 기존 \<code>TinOH\</code> 등은 열처리(PEB) 시 온도 변화에 따라 감도가 불안정해지는 문제가 있어 새로운 공정 안정 물질 검증이 시급했습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">3) 목표</h3>
<ul class="journal-ul">
<li><strong>정량 목표</strong>: </li>
</ul>
<p class="journal-p">* 기존 \<code>TinTos\</code> 무기 레지스트의 저조한 감도를 극복하여 EUV 감도 <strong>32 mJ/cm²</strong> 이하 조건 수립 (기존 대비 3배 이상 향상).</p>
<p class="journal-p">* 습식 공정 한계 극복을 위한 비정질 탄소층(ACL) 건식 식각 선택도 <strong>13.2:1</strong> 이상 확보.</p>
<p class="journal-p">* 미세 패턴 CD 140nm 라인 구동 시 선단 거칠기(LER) 편차를 <strong>8nm</strong> 이하로 억제.</p>
<ul class="journal-ul">
<li><strong>정성 목표</strong>: </li>
</ul>
<p class="journal-p">* 질산염 음이온(Nitrate anion)의 광화학적 활성 메커니즘을 규명하고, EUV 공정에서 물리 화학적으로 왜 강건성을 확보할 수 있는지 인과관계 입증.</p>
<hr class="journal-divider">
<h3 class="journal-h3">4) 내 역할</h3>
<ul class="journal-ul">
<li><strong>프로젝트 형태</strong>: 개인 프로젝트 (최신 공정 세미나 분석 및 학술 발표)</li>
<li><strong>내 역할 (주도적 기여)</strong>: </li>
</ul>
<p class="journal-p">* Applied Surface Science (IF 6.9, CiteScore 13.4, 2026년 게재) 저널의 최신 연구 성과를 분석하여, \<code>TinNO₃\</code> 포토레지스트의 4대 핵심 공정 우위(EUV 감도, PEB 신뢰성, LER 정밀도, 식각 저항성)를 입증.</p>
<p class="journal-p">* 앨립소미터(Ellipsometer) 및 FE-SEM(전계방출형 주사전자현미경), AFM(원자간력현미경) 측정 기술 분석을 바탕으로, 이종 박막 공정에서의 식각 선택비(Selectivity) 변화 모델 검증.</p>
<p class="journal-p">* 전공정(EUV 포토레지스트)의 해상도 개선이 패키징 단계의 미세 피치 범프/패드 얼라인 마진에 미치는 물리적 연계성 정립.</p>
<hr class="journal-divider">
<h3 class="journal-h3">5) 적용 공정 / 기술 / 도구</h3>
<table class="journal-table">
<thead>
<tr>
  <th>구분</th>
  <th>내용</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>EUV 광원 장비</strong></td>
  <td>ASML XT1250D (193nm ArF 드라이 및 차세대 13.5nm EUV 리소그래피 비교분석)</td>
</tr>
<tr>
  <td><strong>분석 장비</strong></td>
  <td>FE-SEM (Field Emission Scanning Electron Microscopy), AFM (Atomic Force Microscope)</td>
</tr>
<tr>
  <td><strong>박막 두께 측정</strong></td>
  <td>Ellipsometry (편광 특성을 활용한 복소 굴절률 및 박막 두께 정밀 분석)</td>
</tr>
<tr>
  <td><strong>식각 가스/시스템</strong></td>
  <td>ICP (Inductively Coupled Plasma) Dry Etching ($Cl_2$ 및 $Ar$ 혼합 가스 활용)</td>
</tr>
<tr>
  <td><strong>핵심 재료 기술</strong></td>
  <td><strong>TinNO₃</strong> (무기 주석 옥소 클러스터 + 광활성 질산염 음이온), BARC (하부 반사 방지막)</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">6) 진행 과정</h3>
<h4 class="journal-h4">1) EUV 감도(Photosensitivity) 공정 거동 분석 (핵심 성과 1)</h4>
<ul class="journal-ul">
<li>패턴 형성에 필요한 최소 에너지 조사량(Dose)을 분석하기 위해 PLS-II 빔라인 조건 하의 Contrast Curve 평가.</li>
<li>\<code>TinNO₃\</code> 레지스트는 <strong>32 mJ/cm²</strong>의 아주 우수한 감도를 나타냄. 이는 기존 무기 PR인 \<code>TinTos\</code>(104 mJ/cm²) 대비 <strong>3.25배 향상</strong>되었으며, 기존 산업 표준인 50 mJ/cm² 대비 <strong>156% 초과 달성</strong>하여 웨이퍼 대량 생산 처리량(Throughput)을 혁신할 수 있음을 증명.</li>
</ul>
<h4 class="journal-h4">2) PEB(노광 후 열처리) 환경 하의 공정 신뢰성 평가 (핵심 성과 2)</h4>
<ul class="journal-ul">
<li>기존 \<code>TinOH\</code> 레지스트의 경우 PEB 온도 증가(90℃ ➔ 110℃ ➔ 130℃)에 따라 열에 의해 감도가 시시각각 급변하는 불안정성(시간 의존성)을 노출함.</li>
<li>반면, 질산염 음이온이 안정적으로 바인딩된 \<code>TinNO₃\</code>는 PEB 온도 변화에도 감도 변동 파형이 완전 일치하는 <strong>우수한 공정 신뢰성</strong>을 보임을 앨립소미터 측정 두께 데이터를 통해 최종 규명.</li>
</ul>
<p class="journal-p">> 💡 <strong>비유 예시</strong>: 더운 여름철이나 추운 겨울철 날씨 변화에 따라 성능이 매번 달라지는 기계 대신, 남극이나 사하라 사막처럼 극한의 온도 편차 속에서도 일정한 정확도를 100% 유지하는 초정밀 계측 시스템을 구축한 것과 같은 원리입니다.</p>
<h4 class="journal-h4">3) 미세 L/S 패턴 해상도 및 LER 개선 분석 (핵심 성과 3)</h4>
<ul class="journal-ul">
<li>하부 반사 방지막(BARC) 코팅을 도입하여 기판에서 되돌아오는 유해 반사광을 차단.</li>
<li>분석 결과, CD 140nm 라인에서 LER(가장자리가 지네 다리처럼 울퉁불퉁해지는 거칠기) 값이 16.9nm에서 <strong>7.87nm</strong>로 극적으로 매끄러워짐을 입증.</li>
<li>CD 84nm 초미세 L/S(Line/Space) 패턴에서도 LER 10.68nm를 기록하며 최종 <strong>45nm 극미세 회로 선폭</strong> 구현 능력을 통계로 증명.</li>
</ul>
<h4 class="journal-h4">4) ICP 건식 식각 저항성 및 선택도 분석 (핵심 성과 4)</h4>
<ul class="journal-ul">
<li>습식 식각(Wet Etching) 시 발생하는 해상도 저하(Undercut) 문제를 피하기 위해 <strong>ICP 건식 식각(Dry Etching)</strong> 공정 적용.</li>
<li>실리콘(Si) 층 식각 시, \<code>TinNO₃\</code> 보호막의 우수한 화학적 내성 덕분에 <strong>3.1:1</strong>의 우수한 식각 선택도를 보여 기존 유기 PR(0.4:1) 대비 압도적 정밀도를 입증.</li>
<li>비정질 탄소 하드마스크(ACL) 층 식각 시에는 <strong>13.2:1</strong>이라는 경이적인 선택비(Selectivity)를 달성. 또한 바이어스 전압(Bias DC Voltage)의 급격한 변동 파형에서도 식각률이 변하지 않고 일정하게 보호막 역할을 해내는 탁월한 공정 강건성 확보.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">7) 핵심 문제 해결 포인트</h3>
<ul class="journal-ul">
<li><strong>전공정(EUV)과 후공정(Packaging)의 유기적 시너지 규명</strong>: </li>
</ul>
<p class="journal-p">* 포토레지스트의 LER(선단 거칠기) 불량이 단순히 전공정 회로 오동작에만 영향을 주는 것이 아니라, 궁극적으로 후공정 패키징의 초미세 피치 범프/패드 조립 공차(Mis-align margin)를 좁혀 <strong>패키징 조립 수율을 악화</strong>시키는 근본 요인임을 규명했습니다.</p>
<p class="journal-p">* LER이 심해지면 패드의 구체적인 면적이 미세하게 찌그러지며 범프 접합 면적이 불균일해져 접합 불량(Solder Crack)으로 이어집니다.</p>
<p class="journal-p">* 본 세미나를 통해 \<code>TinNO₃\</code> 도입에 따른 <strong>LER 저감(16.9nm ➔ 7.87nm)이 패키지 계면 접합 신뢰성 마진을 2배 이상 확보</strong>하게 해준다는 연결 고리를 도출하여 차별화된 통찰력을 드러냈습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">8) 결과 및 성과</h3>
<ul class="journal-ul">
<li><strong>차세대 EUV 포토레지스트 4대 핵심 강점 입증</strong>: </li>
</ul>
<p class="journal-p">* <strong>EUV 감도</strong>: 32 mJ/cm² (TinTos 대비 3.25배 감도 향상으로 생산성 극대화).</p>
<p class="journal-p">* <strong>공정 안정성</strong>: PEB 온도 변동 시 감도 드리프트 차단.</p>
<p class="journal-p">* <strong>미세 패턴 해상도</strong>: 45nm 극미세 회로 선폭 및 LER 53% 감소 구현.</p>
<p class="journal-p">* <strong>건식 식각 저항성</strong>: Si 층 선택도 3.1:1, ACL 층 선택도 13.2:1로 식각 손상 최소화.</p>
<h4 class="journal-h4">포토레지스트 공정 비교 요약</h4>
<table class="journal-table">
<thead>
<tr>
  <th>평가지표</th>
  <th>기존 유기 PR / 기존 무기(TinTos)</th>
  <th>차세대 TinNO₃ 적용 시</th>
  <th>비고 / 공정 성능 비교</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>EUV Photosensitivity</strong></td>
  <td>104 mJ/cm² (TinTos)</td>
  <td><strong>32 mJ/cm²</strong></td>
  <td>감도 3.25배 향상 (대량생산 극대화)</td>
</tr>
<tr>
  <td><strong>PEB 온도 민감도</strong></td>
  <td>감도 급변 (시간 의존성)</td>
  <td><strong>감도 변동 없음 (안정)</strong></td>
  <td>외부 열적 스트레스 방어력 확보</td>
</tr>
<tr>
  <td><strong>Line Edge Roughness (LER)</strong></td>
  <td>16.9 nm</td>
  <td><strong>7.87 nm</strong></td>
  <td>외곽선 조도 53% 개선 (Short 불량 방지)</td>
</tr>
<tr>
  <td><strong>Si 층 식각 선택비</strong></td>
  <td>0.4 : 1 (유기 PR)</td>
  <td><strong>3.1 : 1</strong></td>
  <td>기존 대비 식각 선택비 7배 이상 향상</td>
</tr>
<tr>
  <td><strong>ACL 하드마스크 선택비</strong></td>
  <td>낮음</td>
  <td><strong>13.2 : 1</strong></td>
  <td>하부층 식각 시 완벽한 보호막 역할 수행</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">9) 내가 배운 점</h3>
<ul class="journal-ul">
<li>반도체 초미세 공정의 실현은 단일 공정 장비의 고도화뿐 아니라, 분자 수준에서 제어되는 <strong>신소재 레지스트 개발(무기 주석 클러스터 및 음이온 설계)</strong>과의 융합이 필수적임을 깊이 이해했습니다.</li>
<li>분석 장비(AFM, FE-SEM, Ellipsometer)의 물리적 측정 원리를 내재화하여, 공정 결과물에 대한 객관적인 정량 지표 데이터 신뢰도를 평가하는 공학적 시각을 확립했습니다.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">10) 후공정 직무와의 연결점</h3>
<ul class="journal-ul">
<li><strong>후공정/품질 직무와의 관련성</strong>: 전공정의 회로 선폭이 45nm 수준으로 좁아지면, 후공정의 BGA 패키지 기판 설계 규칙(Line & Space 마진) 역시 이에 맞추어 극도의 정밀성을 구현해야 합니다.</li>
<li><strong>실무 적용 가능 업무</strong>: </li>
</ul>
<p class="journal-p">* OSAT 및 패키징 품질 보증(QA) 부서 입사 후, <strong>패키지 기판 불량 분석 시 FE-SEM 및 AFM 기법을 활용한 단면 미세 조도 분석 업무</strong>에 숙련된 역량으로 기여할 수 있습니다.</p>
<p class="journal-p">* EUV 노광 공정 마진에 대한 전반적 이해도를 통해 전공정 부서(소자사)와의 원활한 기판 스펙 설계 매칭 커뮤니케이션 리더로 활약할 것입니다.</p>
      `
    },
    5: {
      meta: `빅데이터 분석 / Spotfire 기반 반도체 수율 분석`,
      title: `Spotfire-based Semiconductor Manufacturing Process Data Analytics for Yield & Defect Optimization`,
      date: `2025. 10. 20. ~ 2025. 11. 09.`,
      prose: `
<p class="journal-p"><em>(Spotfire 기반 반도체 제조 공정 빅데이터 상관관계 분석을 통한 수율 및 불량 핵심 요인 규명)</em></p>
<hr class="journal-divider">
<h3 class="journal-h3">1) 프로젝트 개요</h3>
<ul class="journal-ul">
<li><strong>기간</strong>: 2025. 10. 20. ~ 2025. 11. 09.</li>
<li><strong>유형</strong>: 반도체 제조 데이터 통계 분석 및 수율/불량 최적화 (Root Cause Analysis)</li>
<li><strong>소속/수행 환경</strong>: 반도체 제조 데이터 시각화 및 Spotfire 통계 분석 직무 전문 교육 과정</li>
<li><strong>한 줄 소개</strong>: </li>
</ul>
<p class="journal-p">> 이 프로젝트는 반도체 제조 현장의 대규모 실무 데이터를 활용하여, <strong>Spotfire 툴을 통해 칩/웨이퍼 레벨의 측정 파라미터, 설비 센서 이력, 공정 경로(Path) 데이터를 분석하고 통계적 검증(선형 회귀, ANOVA)을 거쳐 수율을 저해하는 핵심 인자(Key Predictors)들을 밝혀낸 데이터 엔지니어링 프로젝트</strong>이다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">2) 배경 및 문제 정의</h3>
<ul class="journal-ul">
<li><strong>배경</strong>: 반도체 제조 공정은 수백 개의 미세 단계로 이루어져 있어 매일 방대한 센서 및 측정 데이터가 발생합니다. 수율(Yield) 향상과 불량률 감소를 위해서는 이 데이터들 속에 숨겨진 핵심 공정 인자를 정량적으로 찾아내는 데이터 분석 능력이 필수적입니다.</li>
<li><strong>문제 정의</strong>: </li>
</ul>
<p class="journal-p">* 현장에서는 불량(Defect)이나 수율 저하가 발생했을 때 단순 경험에 의존해 공정 레시피를 수정하려 하지만, 수많은 공정 장비 변수 중 어떤 것이 진짜 불량 유발의 근본 원인(Root Cause)인지 데이터로 입증하기 어렵다는 한계가 있었습니다.</p>
<p class="journal-p">* 또한, 분리되어 있는 설비 센서 데이터와 웨이퍼 불량 테이블을 적절히 결합하고 통계적으로 유의미한 인자(p-value < 0.05)를 가려내어 데이터 기반의 공정 관리 체계(SPC)를 수립하는 것이 강력히 요구되었습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">3) 목표</h3>
<ul class="journal-ul">
<li><strong>정량 목표</strong>: </li>
</ul>
<p class="journal-p">* 칩 레벨 파라미터(Defect, CD, THK)와 웨이퍼 수율 간의 선형 회귀 모형 수립 및 유의 인자(p-value < 0.05) 규명.</p>
<p class="journal-p">* 설비 센서 데이터와 웨이퍼 Defect 간의 Join 분석을 통한 결정계수($R^2$) 0.95 이상의 지배적인 예시 인자 검출.</p>
<p class="journal-p">* 분산 분석(ANOVA)을 활용하여 최종 수율에 가장 강력한 영향을 미치는 범주형 인자(recipe_id, eqp_id, path)의 통계적 기여도 산출.</p>
<ul class="journal-ul">
<li><strong>정성 목표</strong>: </li>
</ul>
<p class="journal-p">* 데이터 병합(Join) 및 집계(Aggregation) 프로세스를 체계화하고, 통계학적 검증(선형 회귀, 분산 분석)과 Spotfire 시각화를 융합한 제조 분석 리포트 작성.</p>
<hr class="journal-divider">
<h3 class="journal-h3">4) 내 역할</h3>
<ul class="journal-ul">
<li><strong>프로젝트 형태</strong>: 개인 프로젝트 (Spotfire 실무 분석 과정 및 기술 보고서 작성)</li>
<li><strong>내 역할 (주도적 기여)</strong>: </li>
</ul>
<p class="journal-p">* 칩 레벨 원본 데이터를 웨이퍼 ID 기준으로 가공 및 수율 연산 파이프라인 구축.</p>
<p class="journal-p">* Spotfire를 활용한 세 가지 독립 주제식 분석 실습 및 최종 시각화 대시보드 설계.</p>
<p class="journal-p">* <strong>분석 1</strong>: 수율 대비 칩 측정 요소(Defect, 두께, CD) 선형 회귀 분석.</p>
<p class="journal-p">* <strong>분석 2</strong>: 설비 4대 센서(precursor flow, pressure, rf power, reflect power)와 Defect 결합 분석.</p>
<p class="journal-p">* <strong>분석 3</strong>: 공정 설비 경로(Path) 및 레시피별 분산 분석(ANOVA)과 Box Plot 구현.</p>
<p class="journal-p">* 각 통계 분석 모델의 p-value와 R-sq 지표를 해석하여, 통계적으로 유의미하지 않은 노이즈 변수(예: CD, rf_power 등)를 필터링하는 의사결정 수립.</p>
<hr class="journal-divider">
<h3 class="journal-h3">5) 적용 공정 / 기술 / 도구</h3>
<table class="journal-table">
<thead>
<tr>
  <th>구분</th>
  <th>내용</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>데이터 분석 툴</strong></td>
  <td>TIBCO Spotfire (반도체 제조 데이터 시각화 및 통계 모델링 전용 툴)</td>
</tr>
<tr>
  <td><strong>통계 분석 기법</strong></td>
  <td>Linear Regression (선형 회귀 분석), ANOVA (분산 분석), Correlation Analysis</td>
</tr>
<tr>
  <td><strong>시각화 모델</strong></td>
  <td>Scatter Plot Matrix (산점도 행렬), Box Plot (상자 수염 그림), Line / Bar Chart</td>
</tr>
<tr>
  <td><strong>핵심 데이터 키</strong></td>
  <td>\<code>lot_id\</code>, \<code>wafer_id\</code>, \<code>recipe_id\</code>, \<code>eqp_id\</code>, \<code>BIN\</code> (양불 판정 데이터)</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">6) 진행 과정</h3>
<h4 class="journal-h4">🔬 서브 프로젝트 1. Chip 양불(Good/Bad) 공통 인자 분석</h4>
<ul class="journal-ul">
<li><strong>목적</strong>: 칩 두께(THK), 선폭(CD), Defect 수 중 수율의 지배적 인자 도출.</li>
<li><strong>통계 검증</strong>: 수율을 종속 변수(Y)로 설정해 선형 회귀 분석 수행.</li>
</ul>
<p class="journal-p">* <strong>Sum(Defect)</strong>: p-value가 $6.93 \\times 10^{-23}$ (<<0.05), $R^2$ 0.09로 매우 유의미한 <strong>음의 선형 상관관계</strong> 입증.</p>
<p class="journal-p">* <strong>Avg(THK)</strong>: p-value가 $6.77 \\times 10^{-10}$ (<<0.05), $R^2$ 0.04로 통계적으로 유의미한 <strong>음의 상관관계</strong> 입증. 두께 편차가 수율에 직접적 악영향을 미침을 규명.</p>
<p class="journal-p">* <strong>Avg(CD)</strong>: p-value가 0.456 (>0.05)으로 수율에 미치는 유의미한 영향이 발견되지 않아 노이즈 변수로 배제.</p>
<p class="journal-p">> 💡 <strong>비유 예시</strong>: 학생의 성적(수율)에 미치는 요인 중 예습 시간(Defect)과 잠자는 시간(두께)은 뚜렷한 관련이 있는 반면, 등교할 때 입은 옷의 색깔(CD)은 성적과 아무 관련이 없음을 차가운 수학적 데이터로 밝혀낸 것과 같습니다.</p>
<h4 class="journal-h4">🔬 서브 프로젝트 2. 공정 Split 평가 분석 (설비 센서 및 Defect)</h4>
<ul class="journal-ul">
<li><strong>목적</strong>: 설비 내부 물리 센서 값이 불량(Defect) 발생에 주는 영향 분석.</li>
<li><strong>통계 검증</strong>: \<code>lot_id\</code> 및 \<code>wafer_id\</code>를 매핑해 테이블을 병합하고, 4대 센서 변수와 Defect 수 간의 다중 회귀 분석 실시.</li>
</ul>
<p class="journal-p">* <strong>Max(reflect_power)</strong>: p-value <strong>0.00E+000</strong>, 결정계수($R^2$) <strong>0.99</strong>라는 완벽에 가까운 <strong>초강력 양의 선형 상관관계</strong> 발견! 반사 파워 제어 실패가 Defect 발생의 압도적 핵심 원인(Key Predictor)임을 단번에 규명.</p>
<p class="journal-p">* <strong>기타 변수</strong>: rf_power(p=0.513), precursor_flow_rate(p=0.637), chamber_pressure(p=0.867)는 불량 발생과 통계적 유의성이 완전히 무관함을 증명하여 불필요한 엔지니어링 리소스 낭비를 차단함.</p>
<h4 class="journal-h4">🔬 서브 프로젝트 3. Wafer 단위 수율 영향 인자 분석 (공정 Path 이력 추적)</h4>
<ul class="journal-ul">
<li><strong>목적</strong>: 불량 웨이퍼가 흘러온 장비 및 레시피 경로(Path Tracking) 이력 분석.</li>
<li><strong>통계 검증</strong>: \<code>BIN\</code> 데이터로 칩 수율을 가공하고, 장비 경로를 텍스트로 합친 \<code>Path\</code> 변수를 생성하여 분산 분석(ANOVA) 실시.</li>
</ul>
<p class="journal-p">* <strong>recipe_id</strong>: p-value $6.77 \\times 10^{-297}$ (<<0.05)로 수율에 가장 치명적인 영향 요인임을 밝힘. 특정 저수율 레시피 그룹(F108C...)과 고수율 레시피 그룹(HF601) 간의 현격한 수율 격차(72% vs 97.6%) 시각화.</p>
<p class="journal-p">* <strong>eqp_id & Path</strong>: 장비 설비(p-value $1.26 \\times 10^{-9}$)와 공정 전체 경로(p-value $4.88 \\times 10^{-133}$) 역시 수율에 유의미한 변동을 주는 누적 변수임을 규명.</p>
<hr class="journal-divider">
<h3 class="journal-h3">7) 핵심 문제 해결 포인트</h3>
<ul class="journal-ul">
<li><strong>불량 요인 데이터의 '다학제적 원인 규명 및 의사결정'</strong>: </li>
</ul>
<p class="journal-p">* 단순 데이터 테이블 Join 후 모든 변수를 집어넣어 회귀 분석을 돌리면 불필요한 변수 간 다중공선성(Multicollinearity)에 빠지거나 엉뚱한 결정을 내릴 수 있었습니다.</p>
<p class="journal-p">* 이를 방지하기 위해 Spotfire 상에서 데이터의 누락값 및 극단적 이상치를 Box Plot으로 걸러낸 뒤 순차적 회귀분석을 진행했습니다.</p>
<p class="journal-p">* 그 결과, 설비의 RF Power 인가 제어보다 <strong>반사되어 튕겨 나가는 파워(\<code>reflect_power\</code>)의 최대 임계값</strong>이 공정 챔버 내에서 불량 아크를 발생시키고 Defect을 대량 형성시킨다는 물리적 고장 시나리오를 데이터 기반으로 정확히 역추적하여 문제를 클리어하게 해결했습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">8) 결과 및 성과</h3>
<ul class="journal-ul">
<li><strong>데이터 분석 기반의 수율 개선 지표 도출 완료</strong>: </li>
</ul>
<p class="journal-p">* <strong>불량 인자 규명</strong>: \<code>Sum(Defect)\</code>와 \<code>Avg(THK)\</code>가 웨이퍼 최종 수율을 갉아먹는 핵심 범인임을 검증.</p>
<p class="journal-p">* <strong>예측 모델 확립</strong>: \<code>Max(reflect_power)\</code>에 따른 불량 발생률 $R^2=0.99$ 회귀 방정식 확보.</p>
<p class="journal-p">* <strong>수율 최적 레시피 분류</strong>: ANOVA 분석으로 수율 97.6% 이상을 보장하는 우수 레시피(HF601)군 지정.</p>
<h4 class="journal-h4">통계 분석 결과 요약</h4>
<table class="journal-table">
<thead>
<tr>
  <th>분석 대상 (독립변수 X)</th>
  <th>종속변수 (Y)</th>
  <th>통계 검증 기법</th>
  <th>p-value (유의성)</th>
  <th>$R^2$ (결정계수)</th>
  <th>판정 및 결론</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>Sum(Defect)</strong></td>
  <td>Wafer Yield</td>
  <td>선형 회귀 분석</td>
  <td>$6.93 \\times 10^{-23}$</td>
  <td>0.09</td>
  <td><strong>유의미한 음의 상관관계 (관리 인자)</strong></td>
</tr>
<tr>
  <td><strong>Avg(THK) (두께)</strong></td>
  <td>Wafer Yield</td>
  <td>선형 회귀 분석</td>
  <td>$6.77 \\times 10^{-10}$</td>
  <td>0.04</td>
  <td><strong>유의미한 음의 상관관계 (관리 인자)</strong></td>
</tr>
<tr>
  <td><strong>Avg(CD) (선폭)</strong></td>
  <td>Wafer Yield</td>
  <td>선형 회귀 분석</td>
  <td>0.456</td>
  <td>-</td>
  <td>유의성 없음 (관리 제외 변수)</td>
</tr>
<tr>
  <td><strong>Max(reflect_power)</strong></td>
  <td>Defect Sum</td>
  <td>선형 회귀 분석</td>
  <td><strong>0.00E+000</strong></td>
  <td><strong>0.99</strong></td>
  <td><strong>극도로 유의미한 양의 상관관계 (최우선 관리)</strong></td>
</tr>
<tr>
  <td><strong>recipe_id</strong></td>
  <td>Wafer Yield</td>
  <td>분산 분석(ANOVA)</td>
  <td>$6.77 \\times 10^{-297}$</td>
  <td>-</td>
  <td><strong>수율 변동의 가장 지배적인 범주형 요인</strong></td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">9) 내가 배운 점</h3>
<ul class="journal-ul">
<li>반도체 엔지니어링은 단순히 기계를 셋업하는 것을 넘어, <strong>"데이터가 가리키는 뚜렷한 p-value 수치를 해석하고, 이를 바탕으로 설비 오동작 원인을 과학적으로 역추적해나가는 과정"</strong>임을 Spotfire 분석 과제를 통해 체득했습니다.</li>
<li>다양한 공정 센서 노이즈 속에서 통계적 기법을 통해 <strong>참과 거짓 변수를 발라내는 계량 공학적 통찰</strong>을 길렀습니다.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">10) 후공정 직무와의 연결점</h3>
<ul class="journal-ul">
<li><strong>후공정/품질/수율 직무와의 관련성</strong>: 패키징 공정에서도 에폭시(EMC) 토출 속도, 본딩 압력, 진공 챔버 수치 등 수많은 파라미터가 솔더 범프 접합 불량과 패키지 수율에 영향을 미칩니다.</li>
<li><strong>실무 적용 가능 업무</strong>: </li>
</ul>
<p class="journal-p">* Amkor Technology 등 현업 입사 후, <strong>패키지 최종 수율 저하 시 공정 장비 트래킹 데이터와 수율 데이터를 Spotfire를 통해 직접 Join하여 불량을 유발한 특정 설비(\<code>eqp_id\</code>)나 패키징 레시피의 병목 구간을 신속하게 짚어내는 데이터 분석 엔지니어</strong>로 주도적 역할을 수행하게 됩니다.</p>
<p class="journal-p">* 데이터 기반 통계 프로세스 제어(SPC) 및 6시그마 수율 관리 기법에 즉각적인 준비된 핵심 인재로 기여할 것입니다.</p>
      `
    },
    6: {
      meta: `임베디드 회로 / MCU 기반 AC 전력계 설계`,
      title: `Development of a Microcontroller-based Digital Single-Phase AC Power Meter`,
      date: `2025. 09. 01. ~ 2025. 12. 31.`,
      prose: `
<p class="journal-p"><em>(마이크로컨트롤러 기반의 고정밀 디지털 단상 교류 전력계 설계 및 제작)</em></p>
<hr class="journal-divider">
<h3 class="journal-h3">1) 프로젝트 개요</h3>
<ul class="journal-ul">
<li><strong>기간</strong>: 2025. 09. 01. ~ 2025. 12. 31.</li>
<li><strong>유형</strong>: 아날로그 센서 회로 설계, MCU 임베디드 시스템 개발 및 하드웨어 제작(납땜)</li>
<li><strong>소속/수행 환경</strong>: 광운대학교 전기공학과 (3학년 2학기 전기공학실험 종합 설계 과제)</li>
<li><strong>한 줄 소개</strong>: </li>
</ul>
<p class="journal-p">> 이 프로젝트는 가정용 220Vac / 1500W 부하를 대상으로, <strong>아두이노 MCU 및 전압/전류 아날로그 센싱 회로를 자체 설계 및 기판(PCB)에 납땜 조립하여, 유효/무효 전력을 5% 이내의 오차로 정밀 계측하고 타이머 및 THD/FFT 고조파 모니터링 보호 회로를 구현한 임베디드 프로젝트</strong>이다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">2) 배경 및 문제 정의</h3>
<ul class="journal-ul">
<li><strong>배경</strong>: 지능형 전력망(Smart Grid)과 에너지 관리 시스템(EMS)의 핵심은 실제 사용 전력과 누설 전력을 실시간으로 감시하고 오작동 시 회로를 보호하는 고정밀 전력 계측 기술입니다.</li>
<li><strong>문제 정의</strong>: </li>
</ul>
<p class="journal-p">* 교류(AC) 전력망 특성상 단순 전압과 전류의 곱(Apparent Power)은 실제 소비되는 유효 전력(Active Power)과 일치하지 않으며, 전동기나 유도성 부하 연결 시 발생하는 <strong>무효 전력(Reactive Power)과 역률(Power Factor) 저하</strong>는 전력 손실을 유발합니다.</p>
<p class="journal-p">* 또한 부하가 추가되거나 급격히 탈락할 때(Transient 상태), 순간적인 돌입 전류로 인해 계측 회로가 소실되거나 정밀도가 떨어지는 아날로그 노이즈 문제가 존재했습니다.</p>
<p class="journal-p">* 상용 솔루션을 쓰지 않고, 전압/전류 파형의 실시간 실효값(RMS) 연산 알고리즘을 아두이노 상에 탑재하고 하드웨어 보호 회로(Protection)와 고조파(THD) 모니터링 시스템을 통합 설계하는 난제를 해결해야 했습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">3) 목표</h3>
<ul class="journal-ul">
<li><strong>정량 목표</strong>: </li>
</ul>
<p class="journal-p">* 단상 220Vac / 1500W 계측 범위에서 유효전력 측정 오차율 <strong>5% 이내</strong> 보장 (최종 검증 오차율 3.2% 달성).</p>
<p class="journal-p">* 부하 급변(추가 및 탈락) 조건하에서 회로 전압/전류의 실시간 정상 동작을 보장하는 신뢰성 100% 확보.</p>
<p class="journal-p">* FFT(고속 푸리에 변환) 알고리즘을 소스화하여 7세그먼트/LCD 상에 THD(전고조파 왜곡률) 모니터링 성능 구현.</p>
<ul class="journal-ul">
<li><strong>정성 목표</strong>: </li>
</ul>
<p class="journal-p">* 아날로그 OP-AMP 신호 증폭 및 필터 회로 설계, 안전용 누전차단기 보호단 인터페이스 설계 및 만능 기판에 납땜 조립하여 구동성 확보.</p>
<hr class="journal-divider">
<h3 class="journal-h3">4) 내 역할</h3>
<ul class="journal-ul">
<li><strong>프로젝트 형태</strong>: 팀 프로젝트 (인원: 3명)</li>
<li><strong>내 역할 (주도적 기여)</strong>: </li>
</ul>
<p class="journal-p">* <strong>아날로그 센싱 및 계측 회로 설계 (하드웨어)</strong>: 전류 센서 모듈(CT) 및 전압 분배 센싱 트랜스의 2차 신호를 MCU 입력 전압 범위(0~5V)로 매칭하기 위한 아날로그 오프셋 및 저대역 통과 필터(LPF) 회로 설계 및 PCB 납땜 제작.</p>
<p class="journal-p">* <strong>실시간 RMS 연산 알고리즘 포팅 (임베디드 소프트웨어)</strong>: 아두이노 ADC 샘플링 데이터를 전자기학 수식을 적용한 이산 실효값(Discrete RMS) 연산 알고리즘으로 코딩.</p>
<p class="journal-p">* <strong>보호 회로(Protection) 알고리즘 설계</strong>: 과전류/과전압 감지 시 즉시 전원을 하드웨어적으로 차단하는 릴레이 스위칭 및 타이머 안전 차단 메커니즘 개발.</p>
<p class="journal-p">* <strong>트러블 슈팅 및 최종 오차율 튜닝</strong>: 부하 변동 시 발생하는 과도 응답 특성 노이즈를 커패시터 튜닝을 통해 잡고 오차율 개선.</p>
<hr class="journal-divider">
<h3 class="journal-h3">5) 적용 공정 / 기술 / 도구</h3>
<table class="journal-table">
<thead>
<tr>
  <th>구분</th>
  <th>내용</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>제어 코어</strong></td>
  <td>ATmega328P 마이크로컨트롤러 (Arduino Uno 기반 임베디드 펌웨어 설계)</td>
</tr>
<tr>
  <td><strong>아날로그 센싱</strong></td>
  <td>전압 센서 트랜스포머, 전류 트랜스듀서 (Current Transformer, CT)</td>
</tr>
<tr>
  <td><strong>신호 처리</strong></td>
  <td>아날로그 신호 오프셋 회로, Active Low-pass Filter (OP-AMP LM358 활용)</td>
</tr>
<tr>
  <td><strong>디스플레이/출력</strong></td>
  <td>I2C 16x2 LCD Character Display (실시간 $V_{rms}$, $I_{rms}$, $P$, $Q$, THD 출력)</td>
</tr>
<tr>
  <td><strong>보호 소자</strong></td>
  <td>5V SPDT Relay Module (과전류 차단 및 보호용 액추에이터 인터페이스)</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">6) 진행 과정</h3>
<h4 class="journal-h4">1) 아날로그 신호 처리 및 바이어스(Bias) 설계 (현상 파악 & 원인 분석)</h4>
<ul class="journal-ul">
<li>AC 220V 고전압 전류 파형을 바로 MCU의 ADC(0~5V)에 인가할 수 없어, 기계적 절연 트랜스를 통해 전압을 떨어뜨리고 음의 전압 영역을 제거하기 위해 <strong>2.5V DC Bias Offset 회로</strong> 설계.</li>
<li>ADC 샘플링 속도 한계로 인한 에일리어싱(Aliasing) 및 고주파 서지 노이즈를 필터링하기 위해 LM358 OP-AMP를 사용한 <strong>액티브 저대역 필터(LPF)</strong> 회로를 셋업함.</li>
</ul>
<p class="journal-p">> 💡 <strong>비유 예시</strong>: 엄청나게 빠른 유속을 가진 큰 강물(220Vac 고전압 교류)의 물을 컵으로 바로 마실 수 없으므로, 작은 수로를 파서 속도를 늦추고 필터(LPF 및 Offset)를 달아 깨끗하고 마실 수 있는 적당한 양의 수돗물(0~5V 안정적인 DC 바이어스 아날로그 신호)로 바꾸어 계량기로 정밀 측정하는 것과 같습니다.</p>
<h4 class="journal-h4">2) 이산 RMS 및 전력 통계 연산 알고리즘 구현 (진행 및 분석)</h4>
<ul class="journal-ul">
<li>연속적인 교류 파형을 이산적으로 적분 연산하기 위해 아두이노 상에 빠른 연산 수식 포팅:</li>
</ul>
<p class="journal-p">$$V_{rms} = \\sqrt{\\frac{1}{N}\\sum_{i=1}^{N} v(i)^2}$$</p>
<ul class="journal-ul">
<li>실시간 전압/전류 배열 데이터를 곱하여 평균 전력(유효 전력 P)을 계산하고, 무효 전력(Q) 및 피상 전력(S)을 수학적으로 분리 추출하여 실시간 역률(Power Factor)을 계산함.</li>
<li>50Hz 교류 주파수의 한 주기(20ms) 동안 최소 100회 이상 정밀 샘플링되도록 타이머 인터럽트 주기를 미세 조정하여 오차 최소화.</li>
</ul>
<h4 class="journal-h4">3) 부하 추가/탈락 및 과도 보호 동작 시뮬레이션 (검증 및 결론)</h4>
<ul class="journal-ul">
<li>대형 헤어드라이어 및 온풍기를 다단 결합(부하 추가/탈락) 시키며 Transient 환경 생성.</li>
<li>부하가 갑자기 추가될 때 들어오는 서지(Surge)성 피크 전류를 감지하여 릴레이를 0.05초 만에 Trip(차단) 시키는 <strong>누전/과전류 Protection 하드웨어 인터페이스</strong>를 완벽하게 구동시켰으며, 이를 통해 계측 시스템의 물리 안정성을 100% 입증함.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">7) 핵심 문제 해결 포인트</h3>
<ul class="journal-ul">
<li><strong>가장 어려웠던 문제</strong>: "유도성 부하(모터) 연결 시 발생하는 급격한 측정 오차 및 잡음 극복"</li>
<li><strong>해결 방법</strong>: </li>
</ul>
<p class="journal-p">* 초기 회로 작동 테스트 시, 저항성 부하(백열전구)에서는 오차가 2% 수준이었으나 소형 선풍기나 드라이어의 모터(유도성 부하)를 추가하자 순간 전류 위상 왜곡으로 인해 측정 오차가 12% 이상 급증하는 트러블이 발생했습니다.</p>
<p class="journal-p">* 원인을 추적한 결과, 전압과 전류 센서 모듈의 변압 내부 기생 인덕턴스 편차로 인해 두 계측 신호 간의 미세한 위상 지연(Phase Shift)이 생겨 역률 계산의 곱셈 적분 연산 오류가 유발된 것임을 밝혀냈습니다.</p>
<p class="journal-p">* 이를 해결하기 위해 소프트웨어 단에서 두 샘플링 배열 데이터 간에 미세 보정 인덱스 지연값(Phase Correction Constant)을 적용하는 위상 보정 코드를 삽입하고, 아날로그 기판에 Bypass 커패시터 필터를 다단 보완하여 최종 전 구간 유효전력 측정 오차율을 <strong>3.2%</strong>로 극적으로 끌어내려 설계를 완수하였습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">8) 결과 및 성과</h3>
<ul class="journal-ul">
<li><strong>고정밀 디지털 교류 전력계 완성</strong>: </li>
</ul>
<p class="journal-p">* 유효전력 측정 오차율 3.2% 달성 (설계 요구 기준 5% 대비 우수).</p>
<p class="journal-p">* 무효전력 및 역률 실시간 모니터링 성공 및 과도 부하 보호(SPDT 릴레이 트립) 검증 완료.</p>
<h4 class="journal-h4">설계 계측 성능 결과</h4>
<table class="journal-table">
<thead>
<tr>
  <th>평가 파라미터</th>
  <th>설계 요구 사양</th>
  <th>최종 제작 하드웨어 성능</th>
  <th>비고 / 디버깅 성과</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>유효전력 오차율</strong></td>
  <td>5.0% 이내</td>
  <td><strong>3.2%</strong></td>
  <td>위상 보정 및 OP-AMP LPF 필터 튜닝 성과</td>
</tr>
<tr>
  <td><strong>동작 허용 부하 범위</strong></td>
  <td>220 Vac / 1500 W</td>
  <td><strong>220 Vac / 1500 W</strong></td>
  <td>대형 가전 부하 구동 시 발열 없이 정상 작동</td>
</tr>
<tr>
  <td><strong>과도 부하 신뢰성</strong></td>
  <td>부하 탈락 시 오작동 금지</td>
  <td><strong>정상 복귀 및 구동</strong></td>
  <td>릴레이 차단 신뢰성 100% 검증</td>
</tr>
<tr>
  <td><strong>부가 기능 (Protection)</strong></td>
  <td>누전/과전류 보호</td>
  <td><strong>0.05초 이내 강제 Trip</strong></td>
  <td>소프트웨어 과전류 차단 릴레이 트리거 연동</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">9) 내가 배운 점</h3>
<ul class="journal-ul">
<li>센서로부터 들어오는 미세한 아날로그 전압 파형의 노이즈 필터링(LPF)과 바이어스 매칭이 디지털 임베디드 코딩의 연산 정확도를 결정짓는 가장 중요한 열쇠임을 절감했습니다.</li>
<li>하드웨어를 직접 만능 기판에 납땜 조립하고 계측 오차를 좁혀나가는 트러블 슈팅 과정을 거치며, 실제 회로 패턴의 기생 인덕턴스/커패시턴스를 감안하는 <strong>실전형 전기공학 설계 시야</strong>를 갖추게 되었습니다.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">10) 후공정 직무와의 연결점</h3>
<ul class="journal-ul">
<li><strong>후공정/테스트 직무와의 관련성</strong>: 반도체 신뢰성 평가 시, 칩에 고온/고전압 스트레스를 인가하며 실시간 누설 전력을 감시하는 번인(Burn-In) 테스트 보드 설계 및 테스트 장비 내의 정밀 전원 인가 계측 유닛(SMU) 설계 원리와 매우 유사합니다.</li>
<li><strong>실무 적용 가능 업무</strong>: </li>
</ul>
<p class="journal-p">* OSAT 및 패키징 테스트 엔지니어 입사 후, <strong>테스트 보드 상의 과전류 및 전원 바이어스 오프셋 노이즈를 필터링하는 전력 계측 회로를 정밀하게 분석하고 설계</strong>하는 기술적 강점으로 발휘됩니다.</p>
<p class="journal-p">* 계측 장비의 신뢰성 오차 캘리브레이션(Calibration) 및 보호(Protection) 회로 디버깅 시 즉시 활용 가능한 실무 즉전력입니다.</p>
      `
    },
    7: {
      meta: `아날로그 회로 / 능동 필터 오디오 레벨 미터`,
      title: `Design & Verification of a 3-Band Audio Level Meter with Active Filters`,
      date: `2025. 03. 01. ~ 2025. 06. 30.`,
      prose: `
<p class="journal-p"><em>(능동 필터를 활용한 주파수 대역별 3단계 오디오 레벨 미터 및 드라이버 회로 설계)</em></p>
<hr class="journal-divider">
<h3 class="journal-h3">1) 프로젝트 개요</h3>
<ul class="journal-ul">
<li><strong>기간</strong>: 2025. 03. 01. ~ 2025. 06. 30.</li>
<li><strong>유형</strong>: 아날로그 능동 필터(Active Filter) 회로 설계, 오디오 신호 제어 및 시스템 제작</li>
<li><strong>소속/수행 환경</strong>: 광운대학교 전기공학과 (전기공학머신러닝실습 기말 설계 과제)</li>
<li><strong>한 줄 소개</strong>: </li>
</ul>
<p class="journal-p">> 이 프로젝트는 OPA2134PA 고성능 오디오 OP-AMP를 프리앰프로 적용하고, <strong>2차 Sallen-Key Butterworth 능동 필터(LPF, HPF, BPF) 회로를 수학적으로 직접 계산 설계하여 오디오 대역을 3개로 분리한 후, LM3914 드라이버 IC와 LED 어레이 및 LM380N 파워 앰프 스피커 구동단을 통합 설계한 아날로그 신호 처리 프로젝트</strong>이다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">2) 배경 및 문제 정의</h3>
<ul class="journal-ul">
<li><strong>배경</strong>: 오디오 믹서, 통신 장비, 계측 기기 등에서는 아날로그 신호의 주파수 성분을 정확하게 분리하고 노이즈를 필터링하여 실시간 신호 강도를 시각화하는 기술이 매우 중요합니다.</li>
<li><strong>문제 정의</strong>: </li>
</ul>
<p class="journal-p">* 아날로그 마이크로부터 들어오는 미세한 전압 신호는 전자기적 환경 노이즈에 매우 취약하며, 주파수 대역 분리 시 필터의 차단 특성(Roll-Off)이 날카롭지 않으면 <strong>대역 간 신호 중첩(Interference)</strong>으로 인해 레벨 계측 오차가 커집니다.</p>
<p class="journal-p">* 또한, 고음질 오디오 신호의 전도/증폭 시 위상 왜곡을 제어해야 하며, 다양한 주파수 성분 중 저음(400Hz 이하), 중음(800Hz~1.6kHz), 고음(3.2kHz 이상)의 특정 크기에 정밀 대응하는 가변 증폭 게인(0.2배 ~ 5배)을 아날로그적으로 안정되게 구현하는 과제가 요구되었습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">3) 목표</h3>
<ul class="journal-ul">
<li><strong>정량 목표</strong>: </li>
</ul>
<p class="journal-p">* 2차 Butterworth Active 필터 설계를 통해 대역별 차단 주파수(Cutoff Frequency) 정확도 <strong>95% 이상</strong> 달성 (LPF: 400Hz, HPF: 3.2kHz).</p>
<p class="journal-p">* 2차 필터 특성에 부합하는 <strong>-40 dB/dec</strong>의 예리한 필터 감쇠 응답(Filter Response) 확보.</p>
<p class="journal-p">* 입력 신호를 0.2배에서 5배 크기까지 선형 왜곡 없이 가변 증폭(Gain Control)할 수 있는 비반전 증폭단 설계.</p>
<p class="journal-p">* LM3914 칩 연동을 통한 주파수 대역별 5단계 LED 실시간 오차 없는 레벨 미터링 구현.</p>
<ul class="journal-ul">
<li><strong>정성 목표</strong>: </li>
</ul>
<p class="journal-p">* 각 밴드별 Sallen-Key 능동 필터 소자값($R$, $C$) 수학적 정밀 계산 및 회로 시뮬레이션 검증을 거친 하드웨어 제작.</p>
<hr class="journal-divider">
<h3 class="journal-h3">4) 내 역할</h3>
<ul class="journal-ul">
<li><strong>프로젝트 형태</strong>: 개인 설계 프로젝트</li>
<li><strong>내 역할 (주도적 기여)</strong>: </li>
</ul>
<p class="journal-p">* <strong>3-Band 능동 필터 수식 설계</strong>: 2차 Sallen-Key Butterworth 고역/저역 통과 필터 설계 수식을 도출하고 커패시터($C=1\\text{nF}$) 고정 하에 차단 주파수에 부합하는 정밀 저항값 계산 (LPF 400Hz ➔ $R=280\\text{k}\\Omega$, HPF 3.2kHz ➔ $R=35\\text{k}\\Omega$).</p>
<p class="journal-p">* <strong>프리앰프 및 가변 증폭단 설계</strong>: OPA2134PA 오디오 전용 저노이즈 OP-AMP 소자를 활용하여 이득(Av) 5배의 반전/비반전 가변 증폭 회로 인터페이스 설계.</p>
<p class="journal-p">* <strong>LED 드라이버 및 오디오 출력단 구축</strong>: LM3914 IC의 내부 비교기 전압 레퍼런스($R_1, R_2$) 설계를 통해 0~5V 오디오 입력에 따른 LED 점등 캘리브레이션 튜닝 및 LM380N(2.5W) 모노 앰프를 연동한 최종 8옴 스피커 구동단 제작.</p>
<hr class="journal-divider">
<h3 class="journal-h3">5) 적용 공정 / 기술 / 도구</h3>
<table class="journal-table">
<thead>
<tr>
  <th>구분</th>
  <th>내용</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>오디오 앰프 IC</strong></td>
  <td>OPA2134PA (고성능, 초저왜곡 8핀 Dual Audio Operational Amplifier)</td>
</tr>
<tr>
  <td><strong>능동 필터 토폴로지</strong></td>
  <td>Sallen-Key 2nd-Order Active Filter (Butterworth 특성 구현)</td>
</tr>
<tr>
  <td><strong>LED 레벨 드라이버</strong></td>
  <td>LM3914 (Dot/Bar Display Driver, 선형 전압 레벨 비교기 내장)</td>
</tr>
<tr>
  <td><strong>파워 오디오 드라이버</strong></td>
  <td>LM380N (2.5W Mono Audio Power Amplifier)</td>
</tr>
<tr>
  <td><strong>스피커 유닛</strong></td>
  <td>UNISON U508B25G (8 ohm, 3W, 직경 50mm dynamic speaker)</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">6) 진행 과정</h3>
<h4 class="journal-h4">1) 2차 Sallen-Key 고역 및 저역 통과 필터의 수학적 소자 매칭</h4>
<ul class="journal-ul">
<li><strong>LPF (저역통과필터, Cutoff 400Hz)</strong>: 2차 Butterworth 필터 특성($Q=0.707$)을 달성하기 위해, $C_1=1\\text{nF}$, $C_2=2\\text{nF}$로 설정하고 다음 차단 주파수 식을 기반으로 저항 설계:</li>
</ul>
<p class="journal-p">$$f_p = \\frac{1}{2\\pi R\\sqrt{C_1 C_2}} = 400\\text{Hz} \\implies R = 280\\text{k}\\Omega$$</p>
<ul class="journal-ul">
<li><strong>HPF (고역통과필터, Cutoff 3.2kHz)</strong>: 동일 공식을 역적용하여 $C=1\\text{nF}$ 기준 최적의 Butterworth 감쇠 저항값 도출:</li>
</ul>
<p class="journal-p">$$f_p = \\frac{1}{2\\pi C\\sqrt{R_1 R_2}} = 3.2\\text{kHz} \\implies R_2=35\\text{k}\\Omega, R_1=2R_2=70\\text{k}\\Omega$$</p>
<p class="journal-p">> 💡 <strong>비유 예시</strong>: 특정 주파수의 소리 신호만 걸러내는 필터 설계는 체에 흙을 치는 과정과 같습니다. LPF는 굵은 알갱이(고음)를 거르고 아주 미세한 모래(저음)만 통과시키는 미세한 체이고, HPF는 미세 모래(저음)를 밑으로 빠지게 만들고 큰 돌(고음)만 남기는 구조의 굵은 체와 같습니다.</p>
<h4 class="journal-h4">2) 주파수 대역 분리 및 Adder 결합 시스템 설계 (주요 설계)</h4>
<ul class="journal-ul">
<li>콘덴서 마이크(CMIC-6027)를 통해 입력된 신호는 프리앰프를 거쳐 LPF, BPF, HPF의 3갈래 경로로 완벽하게 병렬 분기됨.</li>
<li>BPF(대역통과필터)는 <strong>[원신호 - (LPF + HPF)]</strong>의 감산 연산 회로(Adder 활용) 방식을 적용하여 하드웨어 소자 오차율과 설계 공간을 획기적으로 줄이는 설계 지혜를 적용.</li>
<li>분리된 주파수 신호들은 개별 비반전 게인 조절(Gain control) 볼륨 회로를 통과하며 스위치를 통해 앰프단으로 선별 전송되도록 시스템 설계도 완성.</li>
</ul>
<h4 class="journal-h4">3) 전압 레벨 캘리브레이션 및 출력 검증 (실험 및 분석)</h4>
<ul class="journal-ul">
<li>입력되는 아날로그 신호 세기(0~5V 범위)에 맞추어 LM3914 레벨 미터 회로의 기준 저항 $R_1=1.21\\text{k}\\Omega, R_2=3.83\\text{k}\\Omega$로 바이어스를 정밀 매핑하여 5단계 LED 어레이(HBSR-55)가 노이즈 없이 부드럽게 Bar 상태로 켜지는 것을 물리적으로 검증 완료.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">7) 핵심 문제 해결 포인트</h3>
<ul class="journal-ul">
<li><strong>가장 어려웠던 문제</strong>: "필터 통과 대역 경계면에서의 감쇄율(Roll-Off) 부족 및 인접 대역 신호 겹침 간섭"</li>
<li><strong>해결 방법</strong>: </li>
</ul>
<p class="journal-p">* 초기 회로 구성 시 1차 패시브 RC 필터를 썼을 때는 경계대역(예: 600Hz 부근)에서 LPF와 BPF의 경계가 모호하여 저음과 중음의 LED가 동시에 켜지는 레벨 분리 실패 문제가 발생했습니다.</p>
<p class="journal-p">* 이를 해결하기 위해, 차단 주파수 너머에서 데시벨 감소율이 2배나 매끄럽고 급격한 <strong>2차 Sallen-Key Butterworth 능동 필터(-40 dB/dec)</strong> 토폴로지를 선용하여 액티브 OP-AMP 피드백 회로를 도입했습니다.</p>
<p class="journal-p">* 추가적으로 $Q$(품질계수) 인자를 0.707로 맞춰 필터 통과 대역에서 이득이 갑자기 튀는 3-dB peaking 현상을 최대로 억제하여, 대역 간 간섭 없이 깨끗하게 3개 대역으로 완벽 분할 계측하는 데 성공했습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">8) 결과 및 성과</h3>
<ul class="journal-ul">
<li><strong>고성능 3-Band 오디오 계측기 성공적 설계</strong>: </li>
</ul>
<p class="journal-p">* LPF(400Hz), HPF(3.2kHz) 기준 정확도 오차 3.5% 미만 달성.</p>
<p class="journal-p">* -40 dB/dec의 예리한 Roll-Off 감쇄율 확보로 대역 간 간섭 차단.</p>
<p class="journal-p">* OPA2134PA 고음질 앰프단을 통한 0.2~5배의 왜곡 없는 가변 증폭 실현.</p>
<h4 class="journal-h4">필터 설계 최적화 지표 요약</h4>
<table class="journal-table">
<thead>
<tr>
  <th>주파수 대역 필터</th>
  <th>이론 설계 규격 (Cutoff)</th>
  <th>실제 2차 필터 특성 측정치</th>
  <th>비고 / 롤오프 특성</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>LPF (저음 대역)</strong></td>
  <td>400 Hz</td>
  <td><strong>414 Hz</strong></td>
  <td>2차 Sallen-Key 저역 통과, -40 dB/dec</td>
</tr>
<tr>
  <td><strong>HPF (고음 대역)</strong></td>
  <td>3200 Hz (3.2kHz)</td>
  <td><strong>3110 Hz (3.11kHz)</strong></td>
  <td>2차 Sallen-Key 고역 통과, -40 dB/dec</td>
</tr>
<tr>
  <td><strong>BPF (중음 대역)</strong></td>
  <td>800 Hz ~ 1.6 kHz</td>
  <td><strong>820 Hz ~ 1.62 kHz</strong></td>
  <td>원신호 감산 연산(Adder) 결합 필터</td>
</tr>
<tr>
  <td><strong>가변 이득(Gain)</strong></td>
  <td>0.2 ~ 5.0 V/V</td>
  <td><strong>0.2 ~ 5.0 V/V</strong></td>
  <td>비반전 가변 저항(Potentiometer) 증폭단</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">9) 내가 배운 점</h3>
<ul class="journal-ul">
<li>아날로그 회로 소자($R$, $C$) 오차에 의해 차단 주파수가 민감하게 이동할 수 있으므로, 실제 하드웨어 제작 시에는 <strong>오차 1% 미만의 정밀 금속 피막 저항</strong>을 활용하는 실무 엔지니어링 세심함을 키웠습니다.</li>
<li>주파수 스펙트럼(FFT)의 물리적 신호 흐름을 직접 아날로그 필터 단계를 통해 구현해 보며, 아날로그 신호 처리 및 임베디드 오디오 드라이버의 신뢰성 인터페이스를 구축하는 실전 감각을 확립했습니다.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">10) 후공정 직무와의 연결점</h3>
<ul class="journal-ul">
<li><strong>후공정/품질/평가 직무와의 관련성</strong>: 반도체 후공정 최종 테스트 시, 고속 통신 칩이나 CIS(CMOS 이미지 센서) 소자의 미세 전압 신호를 왜곡 없이 포착해내기 위한 계측기 전단부의 신호 바이어스 캘리브레이션 및 아날로그 노이즈 차단 필터 기술과 근본 원리가 같습니다.</li>
<li><strong>실무 적용 가능 업무</strong>: </li>
</ul>
<p class="journal-p">* OSAT 기술 연구소 및 테스트 엔지니어링 부서 입사 후, <strong>고속 전송 칩용 테스트 보드 설계 시 발생할 수 있는 노이즈 감쇠 능동 필터 회로 설계 및 위상 지연 오차 보정</strong> 업무에 최고의 공학적 통찰로 기여할 것입니다.</p>
<p class="journal-p">* 정밀 다단 비교 계계(Comparative logic)를 이해하고 있어 장비 수율 모니터링 시스템 구축에도 기여도가 높습니다.</p>
      `
    },
    8: {
      meta: `전력 제어 / 스마트 리튬이온 차저 설계`,
      title: `Design & Verification of a Smart CC-CV Li-Ion Battery Charger with Precision Telemetry`,
      date: `2024. 09. 01. ~ 2024. 12. 31.`,
      prose: `
<p class="journal-p"><em>(고정밀 실시간 모니터링 및 보호 회로를 탑재한 스마트 CC-CV 리튬이온 배터리 충전기 설계 및 제작)</em></p>
<hr class="journal-divider">
<h3 class="journal-h3">1) 프로젝트 개요</h3>
<ul class="journal-ul">
<li><strong>기간</strong>: 2024. 09. 01. ~ 2024. 12. 31.</li>
<li><strong>유형</strong>: 아날로그/디지털 혼성 전력 변환 회로 설계, MCU 제어 및 실시간 전력 텔레메트리 계측</li>
<li><strong>소속/수행 환경</strong>: 광운대학교 전기공학과 (교류및전자회로실험 2-2 종합 설계 과제)</li>
<li><strong>한 줄 소개</strong>: </li>
</ul>
<p class="journal-p">> 이 프로젝트는 3.7V 싱글 셀 리튬 이온 배터리(18650 규격, 500mAh 이상)의 안전하고 정밀한 충전을 위해, <strong>정전류-정전압(CC-CV) 제어 알고리즘과 아날로그 전류/전압 센싱 회로를 하드웨어로 구현하고, 아두이노 MCU를 통해 1초 주기로 전력 데이터를 수집/기록하는 고효율 배터리 차징 시스템을 기판에 직접 조립 제작한 프로젝트</strong>이다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">2) 배경 및 문제 정의</h3>
<ul class="journal-ul">
<li><strong>배경</strong>: 전력 에너지의 패러다임이 배터리 기반의 포터블 기기와 전기차(EV)로 대전환되면서, 배터리의 신뢰성을 보장하고 화재 폭발을 차단하는 <strong>스마트 충전 관리 IC(PMIC) 및 배터리 보호 시스템(BMS)</strong>의 중요성이 극도로 대두되었습니다.</li>
<li><strong>문제 정의</strong>: </li>
</ul>
<p class="journal-p">* 리튬이온 배터리는 충전 시 물리적 활성 물질 붕괴를 막기 위해 초기에는 정전류(CC)로 충전하다가 만충 전압인 4.2V 부근에 도달하면 정전압(CV)으로 부드럽게 전송 모드를 차단 및 전환해야 합니다. 이 CV 임계점에서 제어가 조금만 늦어져 과충전(Overcharge)이 발생하면 화재나 폭발을 일으키는 치명적인 위협이 존재합니다.</p>
<p class="journal-p">* 또한, 전류를 실시간 측정할 때 센서의 삽입 손실(Insert Loss)로 인한 전압 강하(IR Drop) 오차를 최소화하고, 외부 전원(5~14VDC)이 불안정하게 흔들려도 배터리 유닛에 일정한 5V 충전 바이어스를 공급하는 <strong>고효율 DC-DC Buck 컨버터 회로 설계</strong> 장벽을 극복해야 했습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">3) 목표</h3>
<ul class="journal-ul">
<li><strong>정량 목표</strong>: </li>
</ul>
<p class="journal-p">* 리튬 이온 18650 싱글 셀에 최적화된 <strong>CC-CV 2단계 스마트 충전 차단 제어(만충 4.2V 차단)</strong> 정확도 99% 확보.</p>
<p class="journal-p">* 배터리 화재 예방을 위해 충전 최대 전류값을 배터리 용량의 <strong>0.5C(250mA)</strong> 이내로 엄격히 통제.</p>
<p class="journal-p">* 충전 전압/전류의 1초 주기 실시간 센싱 계측 오차율 <strong>소수점 둘째 자리</strong> 정밀도(오차 3.5% 이내) 달성 및 텍스트 파일 데이터 로깅.</p>
<p class="journal-p">* DC-DC Buck 컨버터 에너지 변환 효율 <strong>85% 이상</strong> 달성.</p>
<ul class="journal-ul">
<li><strong>정성 목표</strong>: </li>
</ul>
<p class="journal-p">* 아두이노 시리얼 통신 연동 실시간 PC 모니터링 셋업, PCB 기판 납땜 조립 및 시험 작동 시연 완료.</p>
<hr class="journal-divider">
<h3 class="journal-h3">4) 내 역할</h3>
<ul class="journal-ul">
<li><strong>프로젝트 형태</strong>: 팀 프로젝트 (인원: 3명)</li>
<li><strong>내 역할 (주도적 기여)</strong>: </li>
</ul>
<p class="journal-p">* <strong>전력 변환 및 CC-CV 컨트롤러 회로 설계</strong>: 리튬이온 충전 전용 IC와 주변 저항 분배 피드백 루프를 활용해 5VDC 입력을 받아 CC(Constant Current) ➔ CV(Constant Voltage)로 동작 모드가 기계적으로 부드럽게 스위칭되는 충전 베이스보드 아날로그 회로 설계 및 납땜 제작.</p>
<p class="journal-p">* <strong>고정밀 텔레메트리 계측단 설계</strong>: 배터리 직렬 충전 경로에 초정밀 션트 저항(Shunt resistor)과 로우사이드 전류 센서(INA219 또는 자체 OP-AMP 차동 증폭단)를 삽입하여, 충전 전류와 단자 전압을 ADC로 계측하는 전용 센싱 기판 설계.</p>
<p class="journal-p">* <strong>임베디드 로깅 및 캘리브레이션 펌웨어 개발</strong>: 1초 간격으로 측정된 전압/전류 데이터를 멀티미터 실측값과 비교하여 오프셋 오차를 보정(Software Calibration)하고, 시리얼 통신을 통해 PC 상에 실시간으로 기록 및 \<code>.txt\</code> 파일로 매초 자동 저장하는 전용 코드 구축.</p>
<hr class="journal-divider">
<h3 class="journal-h3">5) 적용 공정 / 기술 / 도구</h3>
<table class="journal-table">
<thead>
<tr>
  <th>구분</th>
  <th>내용</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>충전 컨트롤</strong></td>
  <td>리튬 이온 2차 전지 전용 CC-CV 제어 회로 및 충전 상태 지시단 설계</td>
</tr>
<tr>
  <td><strong>제어 코어</strong></td>
  <td>ATmega328P MCU (아두이노 실시간 전력 텔레메트리 데이터 펌웨어 포팅)</td>
</tr>
<tr>
  <td><strong>전력 변환</strong></td>
  <td>고효율 스위칭 DC-DC Buck Converter 설계 (효율 85% 타겟 전압 스위칭)</td>
</tr>
<tr>
  <td><strong>인터페이스</strong></td>
  <td>Molex C5264RB 커넥터 규격화 배선 조립 및 배터리 전용 Molex 소켓 적용</td>
</tr>
<tr>
  <td><strong>데이터 계측</strong></td>
  <td>Shunt Resistor & OP-AMP Differential Amplifier (소수점 둘째 자리 정밀도 보정)</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">6) 진행 과정</h3>
<h4 class="journal-h4">1) CC-CV 2단계 충전 모드 제어 설계 (상황 & 과제)</h4>
<ul class="journal-ul">
<li>리튬이온 배터리의 충전 특성곡선(Charge Profile)을 바탕으로, 전압이 4.2V 미만일 때는 배터리 손상을 방지하기 위해 0.5C C-rate(250mA) 미만의 일정한 전류로 가압하는 CC 충전 구현.</li>
<li>단자 전압이 4.2V에 도달하는 즉시 CV 모드로 진입하여 전류를 완만하게 감소시키고, 완전히 충전이 끝나 충전 전류가 10mA 이하로 떨어지면 화재 위험 방지를 위해 충전을 물리적으로 차단(Cut-Off)하는 안전 메커니즘 구축.</li>
</ul>
<h4 class="journal-h4">2) 기생 저항에 의한 계측 왜곡(IR Drop) 현상 추적 (원인 분석)</h4>
<ul class="journal-ul">
<li>배터리와 충전기 연결 단자의 기생 저항과 전류 측정용 션트 저항에서 발생하는 미세 전압 강하(<strong>IR Drop</strong>)로 인해, MCU가 인식하는 배터리 단자 전압과 실제 셀 내부 전압 간에 오차가 발생하여 충전이 조기에 차단되는 현상 식별.</li>
</ul>
<p class="journal-p">> 💡 <strong>비유 예시</strong>: 수도꼭지 끝(배선 연결 단자)에 마찰이 심한 이물질(기생 저항)이 껴 있으면 물을 약하게 틀었을 때는 괜찮지만 세게 틀었을 때 압력(전압)이 비정상적으로 높게 걸려, 계량기(MCU)가 "벌써 물탱크(배터리)가 다 찼다"고 착각하고 밸브를 일찍 잠가버리는 현상과 같습니다.</p>
<h4 class="journal-h4">3) 소프트웨어 캘리브레이션 및 실시간 PC 로깅 검증 (동작 테스트)</h4>
<ul class="journal-ul">
<li>이 오류를 극복하기 위해 통계적인 보정 상수($V_{actual} = V_{measured} - I \\times R_{parasitic}$)를 임베디드 코드에 반영하여 기생 오차를 실시간 상쇄.</li>
<li>결과적으로 실시간 디지털 멀티미터 계측값과 소수점 둘째 자리까지 완벽하게 정합하는 정밀 전류/전압 텔레메트리 시스템을 성공적으로 구동하였으며, 매초 충전 전압/전류 데이터를 PC 내부 텍스트 파일로 저장하는 안정성을 100% 확보함.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">7) 핵심 문제 해결 포인트</h3>
<ul class="journal-ul">
<li><strong>가장 어려웠던 문제</strong>: "외부 입력 전원(5~14VDC) 가변 변동 하에서의 배터리 과충전 폭발 방지 및 효율 확보"</li>
<li><strong>해결 방법</strong>: </li>
</ul>
<p class="journal-p">* 입력 전압이 가변(5~14VDC)될 때, 단순 선형 레귤레이터(LDO)를 쓰면 과도한 열이 발생(효율 50% 미만)하고 칩 손상으로 과전압이 배터리로 직결되는 폭발 리스크가 존재했습니다.</p>
<p class="journal-p">* 이를 해결하기 위해 고효율 <strong>스위칭 Buck 컨버터</strong>를 전단에 배치하여 입력 전원 강하를 유기적으로 제어하였고, 인덕터와 스위칭 커패시터의 리플을 최소화하는 하드웨어 필터를 보완하여 외부 서지 전압을 차단했습니다.</p>
<p class="journal-p">* 과충전을 원천 봉쇄하기 위해 MCU 상에 아날로그 전압 비교기(Interrupt)를 통한 이중 하드웨어 차단 루프를 구성하여 5V ~ 14V 사이의 광범위한 입력 흔들림 속에서도 배터리에 입력되는 충전 전압을 일정한 4.2V 만충 스펙으로 완벽하게 수렴시키는 데 성공했습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">8) 결과 및 성과</h3>
<ul class="journal-ul">
<li><strong>안전용 스마트 CC-CV 충전기 하드웨어 제작 성공</strong>: </li>
</ul>
<p class="journal-p">* 입력 전압 가변 범위 5V ~ 14V에 대응하는 고효율(최대 효율 87.2%) 전력 변환 달성.</p>
<p class="journal-p">* 실시간 1초 주기 전압/전류 데이터의 소수점 둘째 자리 오차율 3.0% 미만 캘리브레이션 확보.</p>
<p class="journal-p">* JEDEC/MIT 규격을 충족하는 안전한 C-rate(0.5C 이하) 전류 제어 및 4.2V 만충 시 자동 릴레이 차단 차단 회로 입증.</p>
<h4 class="journal-h4">배터리 충전기 성능 지표</h4>
<table class="journal-table">
<thead>
<tr>
  <th>평가지표</th>
  <th>설계 요구 사양</th>
  <th>최종 제작 하드웨어 성능</th>
  <th>비고 / 디버깅 성과</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>충전 전압 제어 정밀도</strong></td>
  <td>4.2V $\\pm$ 0.1V</td>
  <td><strong>4.204 V</strong></td>
  <td>과충전 원천 봉쇄 (이중 안전 차단)</td>
</tr>
<tr>
  <td><strong>최대 충전 전류 (0.5C)</strong></td>
  <td>250 mA 이내</td>
  <td><strong>242 mA (CC 모드)</strong></td>
  <td>배터리 수명 극대화 전류 제어 완료</td>
</tr>
<tr>
  <td><strong>계측 해상도 (Resolution)</strong></td>
  <td>소수점 둘째 자리</td>
  <td><strong>소수점 둘째 자리</strong></td>
  <td>IR Drop 기생 저항 오차 상쇄 알고리즘</td>
</tr>
<tr>
  <td><strong>전력 변환 효율</strong></td>
  <td>85.0% 이상</td>
  <td><strong>87.2% (Buck 변환)</strong></td>
  <td>입력 가변 5~14V 대응 고효율 달성</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">9) 내가 배운 점</h3>
<ul class="journal-ul">
<li>배터리와 같은 화학적 2차전지 디바이스를 충전할 때는 하드웨어의 기생 저항(IR Drop) 및 열적 스트레스가 시스템 수명과 정밀도에 미치는 영향력을 면밀하게 정량 평가해야 함을 배웠습니다.</li>
<li>전력 관리 소자(PMIC) 데이터시트(Datasheet)의 내부 블록과 마킹 사양을 분석하고 주변 회로를 셋업하는 과정에서, <strong>회로 해석 및 부품 사양 선정 능력</strong>이 대폭 성장했습니다.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">10) 후공정 직무와의 연결점</h3>
<ul class="journal-ul">
<li><strong>후공정/품질/PMIC 테스트 직무와의 관련성</strong>: 스마트폰, 모바일 기기의 핵심 반도체인 <strong>PMIC(전력 관리 반도체) 및 배터리 충전 관리 IC의 웨이퍼/패키지 최종 신뢰성 테스트</strong> 공정과 직무 성격이 100% 일치합니다.</li>
<li><strong>실무 적용 가능 업무</strong>: </li>
</ul>
<p class="journal-p">* Amkor Technology 등 글로벌 후공정 OSAT 패키지 연구소 및 테스트 엔지니어 입사 후, <strong>배터리 충전 제어 IC 패키지의 특성 분석 시 CC-CV 거동 불량을 잡아내는 테스트 벤치 셋업 및 계측 데이터 보정 캘리브레이션 업무</strong>에 독보적인 즉전력으로 활약할 수 있습니다.</p>
<p class="journal-p">* Buck Converter 등 스위칭 효율 평가 능력을 바탕으로 모바일 패키지의 전력 무결성(PI) 특성 검증 부서에서도 두각을 나타낼 것입니다.</p>
      `
    },
    9: {
      meta: `배터리 텔레메트리 / 배터리 잔량 테스터 설계`,
      title: `Development of a Multi-Battery SOC Tester with OCV-CCV Dynamic Compensation`,
      date: `2024. 03. 01. ~ 2024. 06. 30.`,
      prose: `
<p class="journal-p"><em>(OCV-CCV 동적 보상 알고리즘을 적용한 멀티 배터리 잔량 계측 테스터 설계 및 제작)</em></p>
<hr class="journal-divider">
<h3 class="journal-h3">1) 프로젝트 개요</h3>
<ul class="journal-ul">
<li><strong>기간</strong>: 2024. 03. 01. ~ 2024. 06. 30.</li>
<li><strong>유형</strong>: 아날로그 회로 설계, 배터리 방전 물리 데이터 분석 및 하드웨어 디스플레이 제어</li>
<li><strong>소속/수행 환경</strong>: 광운대학교 전기공학과 (2학년 1학기 전기공학실험 종합 설계 과제)</li>
<li><strong>한 줄 소개</strong>: </li>
</ul>
<p class="journal-p">> 이 프로젝트는 1.5V AA/AAA 건전지, 9V 건전지, 3.7V 리튬 이온 배터리를 대상으로, <strong>배터리 부하 인가 시 발생하는 개방 전압(OCV)과 부하 전압(CCV)의 물리적 차이를 분석하고, 아두이노 MCU 및 인코더/디코더 IC 회로를 통해 잔량(SOC)을 5단계 및 7세그먼트로 정밀 시각화 구동한 배터리 계측 프로젝트</strong>이다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">2) 배경 및 문제 정의</h3>
<ul class="journal-ul">
<li><strong>배경</strong>: 전기차 및 모바일 스마트 디바이스 산업의 폭발적 성장으로, 배터리 내부의 남은 에너지 용량(State of Charge, SOC)을 안정적으로 실시간 예측하는 <strong>배터리 연료 게이지(Fuel Gauge) 반도체 및 잔량 계측 기술</strong>의 중요성이 날로 높아지고 있습니다.</li>
<li><strong>문제 정의</strong>: </li>
</ul>
<p class="journal-p">* 배터리는 사용하지 않을 때의 개방 전압(OCV, Open Circuit Voltage)과 실제 부하 회로가 연결되어 동작할 때의 전압(CCV, Closed Circuit Voltage) 사이에 물리적인 전압 차이가 발생합니다.</p>
<p class="journal-p">* 이는 배터리 내부의 <strong>기생 화학적 내부 저항(IR, Internal Resistance)</strong>에 의한 전압 강하 때문이며, 단순히 부하가 걸린 상태의 전압(CCV)만 측정하여 잔량을 판단하면 배터리 용량을 실제보다 과소평가하게 되는 심각한 계측 왜곡 오류가 나타납니다.</p>
<p class="journal-p">* 이에 따라 배터리 종류별 방전 특성 곡선 데이터를 정량적으로 수집하여, <strong>OCV-CCV 편차를 수치적으로 제어 보상하는 지능형 배터리 잔량 분석기 설계</strong>가 요구되었습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">3) 목표</h3>
<ul class="journal-ul">
<li><strong>정량 목표</strong>: </li>
</ul>
<p class="journal-p">* 1.5V(알칼라인), 3.7V(리튬이온), 9V(탄소/알칼라인) 멀티 배터리 전압 인식 및 <strong>5단계 잔량 분해능</strong> 100% 확보.</p>
<p class="journal-p">* 아두이노 시리얼 플로터를 활용한 10옴 저항 방전 조건하에서의 배터리 방전 특성 그래프 실시간 데이터 로깅(txt 파일 변환).</p>
<p class="journal-p">* BCD 인코더/디코더 디지털 IC 회로 배치를 통한 7세그먼트(HEX) 숫자 표기 제어 및 LED 점등 매핑 정확도 100% 달성.</p>
<ul class="journal-ul">
<li><strong>정성 목표</strong>: </li>
</ul>
<p class="journal-p">* 소켓 및 Molex 커넥터를 활용한 착탈식 배터리 안착 보드 납땜 제작 및 시연 합격.</p>
<hr class="journal-divider">
<h3 class="journal-h3">4) 내 역할</h3>
<ul class="journal-ul">
<li><strong>프로젝트 형태</strong>: 팀 프로젝트 (인원: 3명)</li>
<li><strong>내 역할 (주도적 기여)</strong>: </li>
</ul>
<p class="journal-p">* <strong>방전 실험 및 OCV-CCV 물리 특성 규명</strong>: 10옴 방전 저항을 배터리 출력단에 결합하여 방전 전류량 추이를 모니터링하고, 부하 인가 즉시 기생 내부 저항(IR)에 의해 강하되는 전압 오차값을 실측 통계 데이터로 정립.</p>
<p class="journal-p">* <strong>디지털 로직 및 디스플레이 회로 설계</strong>: 7세그먼트 및 5단 바그래프 LED(LTA-1000HR)를 구동하기 위한 아날로그-디지털 인터페이스 설계. 특히 가산점 항목인 <strong>인코더/디코더 IC 칩</strong>을 결합하여 MCU의 디지털 I/O 핀 점유를 획기적으로 줄이는 최적화 회로 셋업.</p>
<p class="journal-p">* <strong>SOC 판단 알고리즘 코딩</strong>: 배터리 케미컬별 방전 전압 프로파일 데이터를 아두이노 상에 데이터 매핑(Look-up Table)하여, 동적으로 SOC를 연산하고 출력하는 펌웨어 개발.</p>
<hr class="journal-divider">
<h3 class="journal-h3">5) 적용 공정 / 기술 / 도구</h3>
<table class="journal-table">
<thead>
<tr>
  <th>구분</th>
  <th>내용</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>제어 코어</strong></td>
  <td>ATmega328P MCU (아두이노 임베디드 펌웨어 설계)</td>
</tr>
<tr>
  <td><strong>방전 부하</strong></td>
  <td>10 ohm / 5W High-power Cement Resistor (방전 테스트용 기준 부하)</td>
</tr>
<tr>
  <td><strong>로직 IC</strong></td>
  <td>74LS147 BCD Encoder, 74LS47 BCD-to-7Segment Decoder</td>
</tr>
<tr>
  <td><strong>디스플레이</strong></td>
  <td>LTA-1000HR Bargraph LED, FND507 7-Segment Display, I2C LCD</td>
</tr>
<tr>
  <td><strong>커넥터 배선</strong></td>
  <td>Molex 소켓 및 착탈형 슬라이드 배터리 홀더 모듈 매핑</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">6) 진행 과정</h3>
<h4 class="journal-h4">1) 10옴 기준 부하 방전 실험 및 데이터 수집 (상황 & 과제)</h4>
<ul class="journal-ul">
<li>배터리의 화학적 용량 거동을 분석하기 위해, 10옴 시멘트 저항을 18650 셀에 연결하여 강제 방전 테스트 수행.</li>
<li>아두이노의 10비트 ADC를 통해 1초 단위로 실시간 방전 전압 데이터를 덤프받아 PC 내부 텍스트 파일로 로깅하고 Excel을 활용해 <strong>배터리 방전 특성곡선(Discharge Profile)</strong> 도출.</li>
</ul>
<h4 class="journal-h4">2) 기생 내부 저항(IR)에 의한 OCV-CCV 편차 분석 (원인 분석)</h4>
<ul class="journal-ul">
<li>배터리가 무부하 상태(Open Circuit)일 때는 기생 저항에 전류가 흐르지 않아 완벽한 기저 전압(OCV)이 계측되나, 부하가 동작(Closed Circuit)하면 다음 옴의 법칙에 의해 셀 단자 전압이 급락함을 분석:</li>
</ul>
<p class="journal-p">$$V_{ccv} = V_{ocv} - I \\times R_{internal}$$</p>
<p class="journal-p">> 💡 <strong>비유 예시</strong>: 수도꼭지 밸브를 완전히 잠갔을 때는 물탱크 내부 수압(OCV)이 그대로 가득 찬 것처럼 높게 측정되지만, 물을 콸콸 틀어놓으면(부하 동작) 배관 내부 마찰(내부 저항 IR) 때문에 호스 끝에서 나오는 물의 압력(CCV)은 뚝 떨어져서 낮게 측정되는 물리 현상과 같습니다.</p>
<h4 class="journal-h4">3) 인코더/디코더 하드웨어 연동 및 잔량 시각화 (작동 검증)</h4>
<ul class="journal-ul">
<li>OCV-CCV 동적 전압 보상 공식을 알고리즘에 반영하여, 부하 인가 유무와 상관없이 동일한 배터리 잔량(SOC) 수치를 도출해내는 계측 정밀도 확보.</li>
<li>가공된 SOC 데이터를 74LS147 인코더와 74LS47 디코더 논리 IC를 통과시켜 7세그먼트와 5단 LED 바그래프에 실시간으로 표시되도록 회로 기판을 납땜 구축하여 최종 구동 성공.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">7) 핵심 문제 해결 포인트</h3>
<ul class="journal-ul">
<li><strong>가장 어려웠던 문제</strong>: "전압 측정을 위한 ADC 포트 내의 기생 임피던스 노이즈 및 접촉 단자 저항에 의한 계측 편차"</li>
<li><strong>해결 방법</strong>: </li>
</ul>
<p class="journal-p">* 초기 만능 기판 브레드보드 테스트 시 배터리 슬롯 단자의 미세한 흔들림 및 접촉 면적에 따라 접촉 저항(Contact Resistance)이 변해 ADC 계측 신호가 출렁이고 SOC 수치가 요동치는 고장 현상이 발견되었습니다.</p>
<p class="journal-p">* 이를 해결하기 위해 측정부 접촉 구조를 분리가 쉽고 접촉면이 완벽히 고정되는 <strong>Molex 소켓 및 스프링 안착식 배터리 홀더</strong>로 변경하여 물리 계계 결합 신뢰성을 높였습니다.</p>
<p class="journal-p">* 또한 아날로그 입력단에 커패시터를 병렬 연결한 하드웨어 RC 필터를 결합하여 서지 노이즈를 1차 차단하고, 임베디드 소스 상에 <strong>이동 평균 필터(Moving Average Filter)</strong> 코드를 탑재해 최종 센싱 노이즈 변동 편차를 <strong>0.02V</strong> 이내로 완벽하게 안정화시켰습니다.</p>
<hr class="journal-divider">
<h3 class="journal-h3">8) 결과 및 성과</h3>
<ul class="journal-ul">
<li><strong>멀티 배터리 잔량 테스터 기판 제작 완료</strong>: </li>
</ul>
<p class="journal-p">* OCV-CCV 동적 기생 저항 편차 상쇄 알고리즘을 통한 SOC 정확도 96% 달성.</p>
<p class="journal-p">* 아두이노 데이터 수집을 통해 10옴 시멘트 저항 조건 방전 데이터의 완벽한 텍스트 파일 축적.</p>
<p class="journal-p">* 74LS 계열 인코더/디코더 IC를 활용한 디지털 디스플레이 제어 완벽 구동.</p>
<h4 class="journal-h4">배터리 테스터 계측 신뢰성 데이터</h4>
<table class="journal-table">
<thead>
<tr>
  <th>계측 대상 배터리</th>
  <th>기준 화학 전압</th>
  <th>만충 판단 전압 (100% SOC)</th>
  <th>방전 한계 전압 (0% SOC)</th>
  <th>계측 전압 노이즈 변동폭</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>AA 알칼라인 건전지</strong></td>
  <td>1.5 V</td>
  <td><strong>1.62 V</strong></td>
  <td><strong>1.05 V</strong></td>
  <td>$\\pm$ 0.015 V</td>
</tr>
<tr>
  <td><strong>리튬이온 18650 셀</strong></td>
  <td>3.7 V</td>
  <td><strong>4.20 V</strong></td>
  <td><strong>3.00 V</strong></td>
  <td>$\\pm$ 0.020 V</td>
</tr>
<tr>
  <td><strong>9V 사각 건전지</strong></td>
  <td>9.0 V</td>
  <td><strong>9.54 V</strong></td>
  <td><strong>6.50 V</strong></td>
  <td>$\\pm$ 0.035 V</td>
</tr>
</tbody>
</table>

<hr class="journal-divider">
<h3 class="journal-h3">9) 내가 배운 점</h3>
<ul class="journal-ul">
<li>배터리는 전압 측정 시 외부 부하 전류량과 내부 저항(IR)의 곱에 의해 유기적으로 거동하는 '동적 아날로그 물리 시스템'임을 실험 데이터를 통해 뼈저리게 체득했습니다.</li>
<li>디지털 IC(74LS 계열)의 Logic Table을 분석하여 MCU와의 최적 인터페이스 회로를 설계해 보며, <strong>논리 게이트 조합 및 임베디드 인터페이스 제어 역량</strong>을 키웠습니다.</li>
</ul>
<hr class="journal-divider">
<h3 class="journal-h3">10) 후공정 직무와의 연결점</h3>
<ul class="journal-ul">
<li><strong>후공정/품질/평가 직무와의 관련성</strong>: 반도체 패키징 완료 후 패키지 내부 기생 저항(IR)을 측정하여 정상 접합 유무를 가려내는 <strong>OSAT 및 소자 품질 검사 신뢰성 평가</strong> 원리와 직접 연결됩니다.</li>
<li><strong>실무 적용 가능 업무</strong>: </li>
</ul>
<p class="journal-p">* OSAT 기술 부서 입사 후, <strong>패키지 핀 계면의 접합 기생 저항(IR Drop) 수치를 정밀 분석하여 패키지 결합 신뢰성을 검증</strong>하거나, 테스트 보드 하드웨어 상의 미세 저항 오차를 보정 캘리브레이션하는 품질 보증(QA) 직무에 핵심 역량으로 기여할 것입니다.</p>
<p class="journal-p">* 디지털 디코더 하드웨어 논리 회로 분석 능력을 바탕으로 테스트 패턴 디버깅 업무에서도 빠른 적응을 보장합니다.</p>
      `
    },
  },
  en: {
    1: {
      meta: `SEMICONDUCTOR / WIRE BONDING CAPILLARY RELIABILITY`,
      title: `Effect of Ceramic Capillary Geometry on 1st Bond Morphology and Strength in Wire Bonding`,
      date: `2026. 05. 01. ~ 2026. 05. 18.`,
      prose: `
<h3 class="journal-h3">1) Project Overview</h3>
        <ul class="journal-ul">
          <li><strong>Duration:</strong> 2026. 05. 01. ~ 2026. 05. 18.</li>
          <li><strong>Type:</strong> Technical Seminar & Process Variable Optimization Analysis</li>
          <li><strong>Affiliation:</strong> Kwangwoon University, Dept. of Electronic Engineering (Senior Seminar / Prep course for Amkor Packaging & Test Engineer)</li>
          <li><strong>Overview:</strong> Analyzed the physical mechanisms by which <strong>ceramic capillary micro-dimensions impact 1st bond (ball bond) defects and joint reliability</strong> under ultra-fine pitch (50μm) boundaries, establishing an optimal parameter balance.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">2) Background & Problem Statement</h3>
        <p class="journal-p">As chip geometries scale down under 0.13μm, package pad pitches have shrunk to fine-pitch limits of 50μm. In this environment, even minor lateral ball squeeze or decentering causes short-circuits with neighboring pads. Conventional troubleshooting relies on adjusting energy recipes (Force/Ultrasonic Power), but without optimizing the structural geometry of the capillary tool, fundamental failure modes remain unresolved.</p>
        <hr class="journal-divider">
        <h3 class="journal-h3">3) Project Goals</h3>
        <ul class="journal-ul">
          <li><strong>Quantitative:</strong> Maximize pull strength to achieve a 99% normal wire break rate at Point C, and ensure a 0% adjacent pad short-circuit rate via Mashed Ball Diameter (MBD) control.</li>
          <li><strong>Qualitative:</strong> Define physical correlation between capillary geometric parameters (IHD, ICAD, ICBA) and mechanical failures to establish standard design tolerances.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">4) Engineering Methodology & Role</h3>
        <p class="journal-p">Conducted statistical data extraction based on academic research (Cao et al., Micromachines 2020) and formulated mechanical interpretations of stress concentration at the gold wire neck. Developed CAD schemas and presented wire loop and ball bonding morphologic analysis during the technical OSAT seminar.</p>
        <blockquote class="journal-quote tip"><span class="quote-icon">💡</span> <strong>Analogy:</strong> Like baking cookies, if the baking mold (capillary geometry) is distorted, adjusting the oven temperature (process parameters) will never yield a perfect shape.</blockquote>
        <hr class="journal-divider">
        <h3 class="journal-h3">5) Applied Processes & Process Tools</h3>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Category</th>
          <th>Technical Details</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Process/Tech</strong></td>
          <td>Thermosonic Wire Bonding (Intermetallic joint via heat, pressure & ultrasonic energy)</td>
        </tr>
        <tr>
          <td><strong>Tools</strong></td>
          <td>KAIJO Bonder FB-988 (Process mechanism analysis) / OriginPro statistical suites</td>
        </tr>
        <tr>
          <td><strong>Key Variables</strong></td>
          <td><strong>IHD</strong> (Inner Hole Diameter), <strong>ICAD</strong> (Inside Chamfer Diameter), <strong>ICBA</strong> (Inside Chamfer Angle)</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">6) Implementation Process</h3>
        <h4 class="journal-h4">1) Literature Review & Base Modeling (Week 1)</h4>
        <ul class="journal-ul">
          <li>Conducted theoretical review on capillary tip dimensions and formulated baseline physical modeling parameters using the gold wire diameter (25μm) as a standard.</li>
          <li>Analyzed the mechanisms of Free Air Ball (FAB) formation and established process margins between capillary inner geometry and wire thickness.</li>
        </ul>
        <h4 class="journal-h4">2) Cause Hypothesis Setting (Core Defect-Variable Causal Mechanics)</h4>
        <ul class="journal-ul">
          <li><strong>Hypothesis 1:</strong> A narrow Inner Hole Diameter (IHD) will maximize friction between the hole wall and wire, focusing stress concentration on the wire neck and reducing bond strength.</li>
          <li><strong>Hypothesis 2:</strong> A narrow Inside Chamfer Diameter (ICAD) will cause the FAB volume to overflow past the internal chamfer bounds, causing adjacent pad short-circuits.</li>
          <li><strong>Hypothesis 3:</strong> An excessively wide Inside Chamfer Angle (ICBA) will lead to over-deformation of the ball laterally under load, increasing shear strength but violating fine-pitch margin limits.</li>
        </ul>
        <h4 class="journal-h4">3) Analysis & Data Verification (Statistical Proof)</h4>
        <ul class="journal-ul">
          <li><strong>IHD Analysis:</strong> Confirmed that an IHD of 26μm (too small) caused wire neck breakage due to severe friction. Conversely, an IHD of 41μm (too large) caused wire wobbling and degraded vertical alignment. Proven via statistical data that a ratio of <strong>1.3 times the wire diameter (33μm)</strong> provides the optimal balance.</li>
          <li><strong>ICAD Analysis:</strong> Captured SEM micrographs revealing ball overflow when ICAD was 51μm. Deduced that an ICAD of 76μm distributes the pressure too widely, reducing the bonded interface and causing a 26% drop in shear strength. Established <strong>64μm</strong> as the optimal threshold.</li>
          <li><strong>ICBA Analysis:</strong> Proven that an ICBA of 70° causes eccentric ball anomalies due to sharp gradients. An ICBA of 120° provides high shear strength but causes excessive radial squeezing, violating fine-pitch pad margins. Proven that <strong>100°</strong> represents the optimal trade-off limit.</li>
        </ul>
        <h4 class="journal-h4">4) Verification & Final Conclusion</h4>
        <ul class="journal-ul">
          <li>Demonstrated that under the geometrically optimized condition <strong>(IHD 33μm, ICAD 64μm, ICBA 100°)</strong>, wire pull strength is maximized to <strong>11.26g</strong>, achieving a normal break behavior rate (break at wire main body / Point C) of over 99%.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">7) Key Problem-Solving Points</h3>
        <ul class="journal-ul">
          <li><strong>Core Dilemma Resolved:</strong> Resolving the paradox of whether high shear strength values always signify a safe, robust process window.</li>
          <li><strong>Solution Methodology:</strong>
            <ul class="journal-ul">
              <li>Statistical data indicated that a 120° chamfer angle (ICBA) yielded the highest shear strength.</li>
              <li>However, applying this in ultra-fine pitch (50μm) packaging environments led to excessive Mashed Ball Diameter (MBD), causing catastrophic adjacent pad short-circuits.</li>
              <li>Hence, instead of maximizing a single mechanical metric, we analyzed the engineering trade-offs between mechanical strength and process short margins, establishing <strong>100°</strong> as the process standard.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">8) Results & Achievements</h3>
        <ul class="journal-ul">
          <li><strong>Optimal Process Design Standards Established:</strong>
            <ul class="journal-ul">
              <li><strong>IHD 33μm (1.3x wire diameter):</strong> Guarantees a 99% normal C-break rate and optimal pull strength of 11.26g (deviation causes up to a 76% drop in pull strength).</li>
              <li><strong>ICAD 64μm:</strong> Prevents ball overflow and shear strength degradation.</li>
              <li><strong>ICBA 100°:</strong> Secures an optimal safety window separating eccentric ball anomalies and adjacent short-circuits.</li>
            </ul>
          </li>
        </ul>
        <h4 class="journal-h4">Performance Outcome Summary</h4>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Evaluation Metric</th>
          <th>Sub-optimal Specifications</th>
          <th>Optimal Specification</th>
          <th>Improvement Outcome / Failure Mode</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Pull Test C-Break Rate</strong></td>
          <td>19% (IHD 26μm)</td>
          <td><strong>99%</strong></td>
          <td>Prevents neck-broken and joint lift defects</td>
        </tr>
        <tr>
          <td><strong>Pull Strength</strong></td>
          <td>~ 7.4 g</td>
          <td><strong>11.26 g</strong></td>
          <td>&gt; 50% increase in mechanical durability</td>
        </tr>
        <tr>
          <td><strong>Shear Strength</strong></td>
          <td>48.7 g (ICAD 76μm)</td>
          <td><strong>66.2 g</strong></td>
          <td>26% increase in interfacial adhesion</td>
        </tr>
        <tr>
          <td><strong>Short Circuit Risk</strong></td>
          <td>High (ICBA 120°)</td>
          <td><strong>0% (Safe Margin)</strong></td>
          <td>MBD perfectly controlled within 50μm pad limits</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">9) Lessons Learned</h3>
        <ul class="journal-ul">
          <li>Deeply realized through statistical data and physical proof that "even if process parameters are adjusted continuously, if the core capillary tool geometry itself is mismatching, fundamental physical defects cannot be resolved."</li>
          <li>Learned to balance isolated performance metrics with overall layout margins, cultivating a holistic engineering perspective.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">10) Connection to Back-end Engineering Roles</h3>
        <ul class="journal-ul">
          <li><strong>Relevance to Back-end Operations:</strong> Wire bonding remains a fundamental process determining reliability in conventional as well as advanced packaging.</li>
          <li><strong>Practical Application in Work:</strong>
            <ul class="journal-ul">
              <li>Applies directly to tool optimization engineering, validating process margins and preventing short-circuits when introducing new fine wire dimensions at world-class OSAT firms.</li>
              <li>Leverages data-driven failure analysis and SEM inspection expertise to contribute immediately to QA and Yield enhancement departments.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">11) Attachments</h3>
        <ul class="journal-ul">
          <li><strong>Figure 1:</strong> Detailed structural drawings of the three key capillary geometric parameters (IHD, ICAD, ICBA)</li>
          <li><strong>Figure 2:</strong> Comparative SEM micrographs of ball morphology and ball overflow shorts according to chamfer angles (ICBA)</li>
          <li><strong>Table 1:</strong> Pull/Shear test data distribution graphs according to capillary geometric design conditions</li>
        </ul>
      `
    },
    2: {
      meta: `SEMICONDUCTOR / PACKAGING & TEST THEORY INTEGRATION`,
      title: `Semiconductor Packaging & Test Engineering Fundamentals Integration`,
      date: `2026. 04. 01. ~`,
      prose: `
<h3 class="journal-h3">1) Project Overview</h3>
        <ul class="journal-ul">
          <li><strong>Duration:</strong> 2026. 04. 01. ~ In Progress</li>
          <li><strong>Type:</strong> Technical Book Analysis & Core Process Technology Systematization Project</li>
          <li><strong>Affiliation/Environment:</strong> Private Research & Professional Theory Enhancement Project (Recommended Reading: <em>Introduction to Semiconductor Packaging and Test</em>)</li>
          <li><strong>Overview:</strong> Systematically researched back-end semiconductor packaging and test methodologies, from test equipment operation processes to conventional/wafer-level packaging (WLCSP), next-generation stacking technologies (TSV/SiP), and computer simulations (thermal, structural, electrical analysis), establishing a solid theoretical foundation as a junior engineer.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">2) Background & Problem Statement</h3>
        <ul class="journal-ul">
          <li><strong>Background:</strong> The back-end packaging and testing phase is a critical step in semiconductor manufacturing. It divides the fabricated wafer into individual chips, protects them, and establishes electrical connections to the external environment, ultimately determining the final product yield.</li>
          <li><strong>Problem Statement:</strong>
            <ul class="journal-ul">
              <li>In undergraduate courses, it is difficult to acquire in-depth practical knowledge regarding back-end packaging, test equipment, and reliability evaluation.</li>
              <li>Furthermore, complex physical phenomena such as thermal/structural warpage caused by heterogeneous material bonding or high-speed signal integrity degradation cannot be effectively resolved for design optimization through simple rote memorization.</li>
              <li>Therefore, by combining professional textbooks used by industry engineers with market trend analysis, this project was designed to cultivate a robust engineering foundation (phenomenon identification ➔ root cause analysis ➔ solution derivation).</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">3) Project Goals</h3>
        <ul class="journal-ul">
          <li><strong>Quantitative Goals:</strong>
            <ul class="journal-ul">
              <li>Completely master key chapters (totaling 280 pages) over 14 days and compile daily keyword reports.</li>
              <li>Achieve a 100% technical completion and summary rate across <strong>seven major domains</strong>, including test processes, package classification, structural analysis, and reliability evaluation.</li>
            </ul>
          </li>
          <li><strong>Qualitative Goals:</strong> Beyond conceptual understanding, acquire the professional capability to explain the physical mechanisms of failure modes (e.g., routing optimization via Pad Swap, package-level repair using e-Fuse) at each process step.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">4) Engineering Methodology & Role</h3>
        <ul class="journal-ul">
          <li><strong>Project Type:</strong> Individual Project (14-day study roadmap and technical analysis notes compilation)</li>
          <li><strong>My Role (Key Contribution):</strong>
            <ul class="journal-ul">
              <li>Compared, analyzed, and summarized complex structures and tables (Conventional vs. WLCSP, SoC vs. SiP) from the perspective of core job competencies.</li>
              <li>Integrated physical models and mathematical equations of electrical/thermal analysis techniques (SI, PI, EMI, and thermal resistance $R_{j-a}$) with undergraduate-level knowledge (electromagnetics, mechanics of materials).</li>
              <li>Traced the process paths of visual figures (probe cards, fan-in/fan-out, bump structures) to maximize understanding of real-world manufacturing flows.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">5) Applied Processes & Process Tools</h3>
        <p class="journal-p">List of actual semiconductor back-end processes, tools, and technologies systematized through academic research:</p>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Category</th>
          <th>Technical Details</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Semiconductor Test</strong></td>
          <td>Probe Card (Cantilever, Vertical), Burn-In Test (TDBI), Laser/e-Fuse Repair</td>
        </tr>
        <tr>
          <td><strong>Package Classification</strong></td>
          <td>Conventional (Leadframe, Substrate BGA), WLCSP (Fan-In, Fan-Out, RDL First)</td>
        </tr>
        <tr>
          <td><strong>Interconnect Technology</strong></td>
          <td>Flip-Chip bonding, Capillary Stud Bump, ACF, Copper Pillar Bump, TSV (Via-Middle)</td>
        </tr>
        <tr>
          <td><strong>Stacking & Package Structure</strong></td>
          <td>TMV (Through Mold Via), PoP, HBM (X1024), 2.5D/3D SiP, Silicon Interposer</td>
        </tr>
        <tr>
          <td><strong>Simulation & Analysis</strong></td>
          <td>FEM (Finite Element Method), Structural (Warpage, Solder Joint Reliability), Thermal/Electrical (SI/PI/EMI)</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">6) Implementation Process</h3>
        <h4 class="journal-h4">1) Week 1: Semiconductor Test Infrastructure & Packaging Classification Systematization</h4>
        <ul class="journal-ul">
          <li><strong>Test & Repair Mechanisms:</strong> Analyzed probe card operations and lifetime extension mechanisms enabling wafer-level testing. Specifically studied the <strong>e-Fuse Repair</strong> mechanism, which disconnects and restores circuits without exposing wires even after packaging, along with high current/voltage reduction principles.</li>
          <li><strong>Production System Analysis:</strong> Categorized the pros/cons and business strategies of memory-oriented high-volume, low-variety production (focusing on process efficiency and cost reduction) versus foundry/OSAT-centric low-volume, high-variety production (focusing on customer delivery and high-value-added products).</li>
        </ul>
        <h4 class="journal-h4">2) Week 2: Mastering Next-Gen Packaging (WLCSP) & Stacking (TSV) Technologies</h4>
        <ul class="journal-ul">
          <li><strong>Fan-In vs. Fan-Out:</strong> Identified physical vulnerabilities in Fan-In packaging, where the chip size equals the package size, and verified the advantages of the Fan-Out reallocation method. Explored the rise of <strong>RDL First</strong> technology to prevent misalignment caused by molding fluid flow.</li>
          <li><strong>Interconnect Innovation (Flip-Chip & TSV):</strong> Analyzed flip-chip bump technology that overcomes the physical length limitations of wire bonding. Investigated copper pillar bumps that dramatically reduce pitch intervals, and researched the <strong>TSV-based stacking structure (X1024)</strong> enabling high-speed transmission of 1024-bit signals simultaneously in High Bandwidth Memory (HBM).</li>
        </ul>
        <blockquote class="journal-quote tip"><span class="quote-icon">💡</span> <strong>Analogy:</strong> Rather than sending data through a 2-lane road (wire bonding), constructing a 1024-lane ultra-wide highway (TSV HBM) allows a massive volume of data to flow rapidly without congestion.</blockquote>
        <h4 class="journal-h4">3) Week 3: Reliability Analysis & Physical Limits Breakthrough</h4>
        <ul class="journal-ul">
          <li><strong>Warpage & Solder Joint Reliability:</strong> Evaluated warpage behavior in heterogeneous materials arising from the differences in Coefficient of Thermal Expansion (CTE) between silicon chips and substrates. Analyzed the failure mechanisms of solder joints subjected to complex stresses of planar shear and axial tensile forces.</li>
          <li><strong>Electrical & Thermal Analysis (SI/PI/EMI):</strong> Derived factors of signal propagation distortion (time delay, crosstalk, skew, reflection, jitter) in high-frequency packages and the importance of solder/PCB impedance matching (termination). Understood PI analysis flows for placing decoupling capacitors to stabilize impedance.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">7) Key Problem-Solving Points</h3>
        <ul class="journal-ul">
          <li><strong>Core Job Analysis:</strong> "Understanding the complex organic correlation between chip design and package design, and resolving process challenges via Pad Swap."</li>
          <li><strong>Solution Methodology:</strong>
            <ul class="journal-ul">
              <li>Discovered that idealized routing during standalone chip design could lead to critical packaging assembly failures, such as capillary tool entry blockage or crosstalk.</li>
              <li>Analyzed the importance of <strong>Pad Swap</strong> technology, which rearranges contact coordinates on the chip edge to prevent routing entanglement on the substrate. Systematized mutual optimization protocols to secure both process feasibility and electrical stability (SI) simultaneously.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">8) Results & Achievements</h3>
        <ul class="journal-ul">
          <li><strong>Back-end Job Portfolio Foundation Established:</strong>
            <ul class="journal-ul">
              <li>Completed the 14-day study roadmap without delay, compiling a comprehensive technical compendium and reading notes.</li>
              <li>Formulated cross-reference correlation tables matching causes, impacts, and solutions for each process instead of simple definitions.</li>
            </ul>
          </li>
        </ul>
        <h4 class="journal-h4">Core Analysis Domain Summary</h4>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Process/Analysis Domain</th>
          <th>Key Failure Mode</th>
          <th>Engineering Countermeasures</th>
          <th>Job Application Point</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Testing Process</strong></td>
          <td>Early product failure shipment</td>
          <td>Burn-In testing with artificial stress acceleration</td>
          <td>Pre-screen defects to secure customer trust</td>
        </tr>
        <tr>
          <td><strong>RDL Packaging</strong></td>
          <td>Chip misalignment via molding fluid flow</td>
          <td>Implement RDL First method</td>
          <td>Secure ultra-fine pattern tolerances and routing designs</td>
        </tr>
        <tr>
          <td><strong>Physical Structural Analysis</strong></td>
          <td>Warpage from CTE mismatch</td>
          <td>FEM-based thermal deformation computer simulation</td>
          <td>Optimize EMC thickness and substrate material properties</td>
        </tr>
        <tr>
          <td><strong>Electrical Analysis (SI)</strong></td>
          <td>Signal reflection from impedance mismatch</td>
          <td>Termination resistance matching and minimizing vias</td>
          <td>Transmission line routing design for high-speed packaging</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">9) Lessons Learned</h3>
        <ul class="journal-ul">
          <li>Deeply realized through 2.5D/3D SiP and HBM technology trends that the center of semiconductor performance improvement has shifted from front-end scaling (Scale-down) to advanced back-end packaging (Advanced Packaging).</li>
          <li>Understood the importance of an integrated engineering perspective, looking beyond isolated process conditions to connect <strong>material properties (CTE, Poisson's ratio) ➔ equipment characteristics (Capillary, Decap) ➔ electrical/structural reliability (SI, Solder Reliability)</strong>.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">10) Connection to Back-end Engineering Roles</h3>
        <ul class="journal-ul">
          <li><strong>Practical Application in Work:</strong>
            <ul class="journal-ul">
              <li>During new packaging technology introduction or conventional yield improvements, this theoretical background can be immediately applied as a powerful tool for <strong>process troubleshooting</strong>, establishing hypotheses and pinpointing physical causes rapidly.</li>
              <li>When collaborating with substrate design and device analysis departments, I will act as a <strong>multidisciplinary collaborative engineer</strong> who accurately understands and communicates package design rules, dimensions, and line/space margins.</li>
            </ul>
          </li>
        </ul>
      `
    },
    3: {
      meta: `DIGITAL DESIGN / FPGA & VERILOG HDL SYSTEM`,
      title: `FPGA & Verilog HDL Digital Logic Circuit Design & Verification`,
      date: `2026. 03. 01. ~ 2026. 06. 30.`,
      prose: `
<h3 class="journal-h3">1) Project Overview</h3>
        <ul class="journal-ul">
          <li><strong>Duration:</strong> 2026. 03. 01. ~ 2026. 06. 30.</li>
          <li><strong>Type:</strong> FPGA Board & Verilog HDL Digital System Design and Hardware Debugging</li>
          <li><strong>Affiliation:</strong> Kwangwoon University, Dept. of Electronic Engineering (Digital System Design Lab)</li>
          <li><strong>Overview:</strong> Designed and validated digital logic modules (Modulo-N counters, variable speed decimal counters, 7-segment display controllers, debouncer filters) in Verilog HDL using an Altera Cyclone II FPGA board, Quartus II, and ModelSim. Analyzed gate propagation delay and mechanical bouncing noise in hardware environments to verify system reliability.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">2) Background & Problem Statement</h3>
        <ul class="journal-ul">
          <li><strong>Background:</strong> Back-end and test engineers must design test patterns to identify chip malfunctions and reliably synchronize signals between Automated Test Equipment (ATE) and FPGA interfaces.</li>
          <li><strong>Problem Statement:</strong>
            <ul class="journal-ul">
              <li>Mechanical bouncing or <strong>glitches</strong> occurring at switch contacts cause severe logic errors, causing the digital counter to register multiple counts from a single press.</li>
              <li>Moreover, using the high-speed system clock (50MHz) directly makes real-time visual observation of counter behavior impossible, requiring systematic tuning between hardware clock dividers and simulation parameters.</li>
              <li>To address these challenges, we designed an integrated system featuring a debouncer filter, clock divider, BCD counter, and 7-segment driver to build robust <strong>board-level hardware design capabilities</strong>.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">3) Project Goals</h3>
        <ul class="journal-ul">
          <li><strong>Quantitative Goals:</strong>
            <ul class="journal-ul">
              <li>Drive a 4-digit BCD counter (0000~9999) on 7-segment displays using Active-Low signals without error.</li>
              <li>Achieve a <strong>0%</strong> error count recognition rate by designing a debouncing circuit to filter button noise.</li>
              <li>Establish a 5ns propagation delay prediction model in ModelSim timing simulations.</li>
            </ul>
          </li>
          <li><strong>Qualitative Goals:</strong> Master Verilog coding standards, utilizing asynchronous resets and bit concatenation operators (\`{}\`), and build hardware mapping and debugging expertise.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">4) Engineering Methodology & Role</h3>
        <ul class="journal-ul">
          <li><strong>Project Type:</strong> Individual Project (Weekly hardware board validation and Verilog programming assignments)</li>
          <li><strong>My Role (Key Contribution):</strong>
            <ul class="journal-ul">
              <li>Designed co-modeling structures integrating Block Diagram Files (BDF) and Verilog HDL in Quartus II.</li>
              <li>Connected LPM library adders (\`LPM_ADD_SUB\`) with custom adder modules (\`add3\`) on the BDF schematic.</li>
              <li>Created scalable ModelSim TestBenches using named port mappings (\`.a(a)\`) and applied dynamic parameter divisions (\`WIDTH=2\`) to accelerate simulation speeds.</li>
              <li>Analyzed gate-level timing delay waveforms using Cyclone II libraries and led debouncing circuit debugging for POF file conversion and FPGA programming.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">5) Applied Processes & Process Tools</h3>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Category</th>
          <th>Technical Details</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Development Board</strong></td>
          <td>Altera Cyclone II FPGA Board (EP2C35F672C6 - DE2)</td>
        </tr>
        <tr>
          <td><strong>EDA Software</strong></td>
          <td>Quartus II 13.0sp1, ModelSim-Altera Starter Edition</td>
        </tr>
        <tr>
          <td><strong>Design Language</strong></td>
          <td>Verilog HDL (Compliant with IEEE 1364 standards)</td>
        </tr>
        <tr>
          <td><strong>Verification Tech</strong></td>
          <td>Timing Simulation (Gate-level Delay), Testbench, Waveform Analysis</td>
        </tr>
        <tr>
          <td><strong>Digital IP</strong></td>
          <td>LPM_ADD_SUB, SEG7_LUT (7-Segment Lookup Table), Debouncer</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">6) Implementation Process</h3>
        <h4 class="journal-h4">1) 4-bit Adder & Block BDF Integration (Week 3 ~ 6)</h4>
        <ul class="journal-ul">
          <li>Designed an \`add3\` module with inputs \`a, b[3:0]\` and output \`sum[5:0]\`, using the bit concatenation operator (\`temp = {cout, result}\`) to merge the carry-out (cout) seamlessly.</li>
          <li>Mapped switches and LEDs using Quartus II's <strong>Pin Planner</strong> in precise alignment with Terasic DE2 board pinout specifications.</li>
        </ul>
        <h4 class="journal-h4">2) Propagation Delay & Simulation Verification (Week 5 & 9)</h4>
        <ul class="journal-ul">
          <li>While ideal code (.v) simulations showed zero delay, timing simulations using the \`.vo\` file (which reflects the chip's internal layout routing) captured a <strong>5ns physical gate propagation delay</strong>.</li>
        </ul>
        <blockquote class="journal-quote tip"><span class="quote-icon">💡</span> <strong>Analogy:</strong> In a virtual map, moving between two points appears instantaneous (ideal code simulation), but driving on actual roads takes time due to traffic signals and friction (physical 5ns gate delay).</blockquote>
        <h4 class="journal-h4">3) Speed-Controllable Up Counter Design (Week 10 ~ 11)</h4>
        <ul class="journal-ul">
          <li>Built a clock divider to slow down the DE2 board's 50MHz reference clock for visual verification.</li>
          <li>Developed a variable BCD counter that adjusts system clock division ratios based on slide switch inputs (\`sw[6:0]\`) to change the 7-segment count speed in real time.</li>
          <li>Optimized simulation runtimes by using a \`WIDTH\` parameter set to \`2\` (4 clocks) during simulation and switching to \`20\` or \`22\` for actual hardware execution.</li>
        </ul>
        <h4 class="journal-h4">4) Debouncer Circuit Design & Final Hardware Test (Week 12)</h4>
        <ul class="journal-ul">
          <li>Designed a <strong>multi-stage register shift filter</strong> using D Flip-Flops to eliminate high-frequency bouncing noise when pushing buttons.</li>
          <li>Validated the debouncing algorithm, ensuring button inputs were registered as a valid \`data_out\` only after maintaining a stable signal level for a set duration (\`counter_max = 50\`).</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">7) Key Problem-Solving Points</h3>
        <ul class="journal-ul">
          <li><strong>Major Challenge:</strong> "Resolving FPGA compilation errors and Pin Planner descending pin configuration errors."</li>
          <li><strong>Solution Methodology:</strong>
            <ul class="journal-ul">
              <li>During early pin assignment, the alphabetical/numerical sorting in Quartus II (\`a[3], a[2], a[1], a[0]\`) led to reverse pin mapping, causing the MSB \`a[3]\` to malfunction when switch 0 was toggled.</li>
              <li>We also identified a board freezing defect after programming due to the compiled SOF file size exceeding the EPCS4 memory capacity (4MB).</li>
              <li>Realigned the FPGA pin mapping 1:1 at the physical level and converted the program file format into a <strong>POF format optimized for EPCS16 (supporting 6MB devices)</strong>, resolving the hardware freeze and verifying normal operation.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">8) Results & Achievements</h3>
        <ul class="journal-ul">
          <li><strong>Variable Speed Decimal Counter Completed:</strong>
            <ul class="journal-ul">
              <li>Verified active-low inverted outputs (\`~seg_sig\`) displaying digits correctly on the 7-segment board.</li>
              <li>Successfully controlled switch bouncing via the debouncing filter.</li>
            </ul>
          </li>
        </ul>
        <h4 class="journal-h4">Hardware Design Performance Metrics</h4>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Design Element</th>
          <th>Before (Ideal No-Delay Model)</th>
          <th>After (Physical Real-World Model)</th>
          <th>Remarks / Debugging Outcome</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Propagation Delay</strong></td>
          <td>0 ns</td>
          <td><strong>5 ns</strong></td>
          <td>Reflects physical wire routing inside silicon</td>
        </tr>
        <tr>
          <td><strong>Button Press Accuracy</strong></td>
          <td>80% (Glitch-prone)</td>
          <td><strong>100% (Error-Free)</strong></td>
          <td>Debouncer (D-FF shift) filtering effect</td>
        </tr>
        <tr>
          <td><strong>Simulation Compile Time</strong></td>
          <td>~ 5 min (WIDTH 22)</td>
          <td><strong>&lt; 10 sec</strong></td>
          <td>Optimized via transient WIDTH=2 scaling</td>
        </tr>
        <tr>
          <td><strong>FPGA Capacity Yield</strong></td>
          <td>Capacity overflow (EPCS4)</td>
          <td><strong>100% Normal Operation</strong></td>
          <td>Successful conversion to EPCS16 POF format</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">9) Lessons Learned</h3>
        <ul class="journal-ul">
          <li>Learned that when idealized code meets real silicon, analog constraints such as <strong>gate delay</strong> and <strong>external mechanical bouncing</strong> are always present.</li>
          <li>Cultivated expertise in structured hardware architectures by adhering to top-level entity naming conventions and implementing asynchronous resets to minimize signal disconnections and errors.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">10) Connection to Back-end Engineering Roles</h3>
        <ul class="journal-ul">
          <li><strong>Relevance to Back-end & Test:</strong> To test packaged chips, precise digital signal synchronization and data sequence inputs between ATE (Automated Test Equipment) and the load board/probe card are mandatory.</li>
          <li><strong>Practical Application in Work:</strong>
            <ul class="journal-ul">
              <li>Provides the ability to **setup board-level digital circuits to control test pattern logic** or analyze timing margins to debug yield evaluation equipment errors.</li>
              <li>Aids in collaborating on noise reduction (PI) at the board level or understanding debouncing pattern layouts within packages.</li>
            </ul>
          </li>
        </ul>
      `
    },
    4: {
      meta: `NEXT-GEN LITHOGRAPHY / EUV INORGANIC PHOTORESIST`,
      title: `TinNO₃: Next-Gen EUV Photoresist Innovation by Integrating Photoactive Nitrate Anion`,
      date: `2025. 11. 17. ~ 2025. 12. 04.`,
      prose: `
<h3 class="journal-h3">1) Project Overview</h3>
        <ul class="journal-ul">
          <li><strong>Duration:</strong> 2025. 11. 17. ~ 2025. 12. 04.</li>
          <li><strong>Type:</strong> Next-Gen Semiconductor Lithography/Etch Materials Analysis & Device Reliability Seminar</li>
          <li><strong>Affiliation:</strong> Kwangwoon University, Dept. of Electronic Engineering (Academic Seminar on Advanced Electrical Engineering)</li>
          <li><strong>Overview:</strong> Quantitatively analyzed and presented the capabilities of \`TinNO₃\` (a next-generation inorganic tin oxo cluster photoresist integrating photoactive nitrate anions) in extreme ultraviolet (EUV) sensitivity, post-exposure bake (PEB) reliability, fine pattern resolution, and dry etching resistance to overcome nano-lithography limits.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">2) Background & Problem Statement</h3>
        <ul class="journal-ul">
          <li><strong>Background:</strong> As semiconductor manufacturing scales below 10nm nodes, implementing Extreme Ultraviolet (EUV) lithography with a short 13.5nm wavelength is mandatory.</li>
          <li><strong>Problem Statement:</strong>
            <ul class="journal-ul">
              <li>Conventional organic photoresists (PR) suffer from low light absorption under highly energetic EUV photons (92 eV) and induce significant shot noise, making uniform exposure difficult.</li>
              <li>Additionally, wet development leads to <strong>pattern collapse</strong> in fine structures, while random acid diffusion in chemically amplified resists (CARs) causes severe Line Edge Roughness (LER).</li>
              <li>While inorganic tin oxo clusters emerged as candidates, materials like \`TinOH\` suffer from thermal sensitivity drift during post-exposure bake (PEB), demanding a highly stable alternative.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">3) Project Goals</h3>
        <ul class="journal-ul">
          <li><strong>Quantitative Goals:</strong>
            <ul class="journal-ul">
              <li>Achieve an EUV sensitivity of <strong>32 mJ/cm²</strong> or below, overcoming the low sensitivity of existing inorganic PRs (a 3x improvement).</li>
              <li>Secure a dry etch selectivity of <strong>13.2:1</strong> against amorphous carbon layers (ACL) to overcome wet processing limitations.</li>
              <li>Restrict LER variation below <strong>8nm</strong> for 140nm line CD patterns.</li>
            </ul>
          </li>
          <li><strong>Qualitative Goals:</strong> Elucidate the photochemical activation mechanisms of the nitrate anion and establish why it provides robust physical and chemical stability under EUV exposure.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">4) Engineering Methodology & Role</h3>
        <ul class="journal-ul">
          <li><strong>Project Type:</strong> Individual Project (Academic seminar analysis and presentation)</li>
          <li><strong>My Role (Key Contribution):</strong>
            <ul class="journal-ul">
              <li>Analyzed state-of-the-art research published in Applied Surface Science (IF 6.9, CiteScore 13.4) to prove the four core process advantages of \`TinNO₃\` (EUV sensitivity, PEB reliability, LER precision, and etch resistance).</li>
              <li>Evaluated etch selectivity variations across heterogeneous thin films based on spectroscopic ellipsometry, field-emission scanning electron microscopy (FE-SEM), and atomic force microscopy (AFM).</li>
              <li>Established a physical linkage showing how improving front-end EUV photoresist resolution increases the alignment margins for fine-pitch bumps and pads during back-end packaging.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">5) Applied Processes & Process Tools</h3>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Category</th>
          <th>Technical Details</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>EUV exposure tools</strong></td>
          <td>ASML XT1250D (Comparative analysis of 193nm ArF dry vs. 13.5nm EUV lithography)</td>
        </tr>
        <tr>
          <td><strong>Metrology equipment</strong></td>
          <td>FE-SEM (Field Emission Scanning Electron Microscopy), AFM (Atomic Force Microscope)</td>
        </tr>
        <tr>
          <td><strong>Thin film measurement</strong></td>
          <td>Ellipsometry (Refractive index and thin-film thickness analysis using polarization)</td>
        </tr>
        <tr>
          <td><strong>Etching systems</strong></td>
          <td>ICP (Inductively Coupled Plasma) Dry Etcher using a mixture of $Cl_2$ and $Ar$ gases</td>
        </tr>
        <tr>
          <td><strong>Key materials</strong></td>
          <td><strong>TinNO₃</strong> (Inorganic tin oxo cluster + photoactive nitrate anion), BARC (Bottom Anti-Reflective Coating)</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">6) Implementation Process</h3>
        <h4 class="journal-h4">1) EUV Photosensitivity & Process Behavior (Core Achievement 1)</h4>
        <ul class="journal-ul">
          <li>Evaluated contrast curves under PLS-II beamline conditions to analyze the minimum dose required for pattern definition.</li>
          <li>\`TinNO₃\` displayed an excellent sensitivity of <strong>32 mJ/cm²</strong>, which is <strong>3.25 times faster</strong> than existing inorganic PR \`TinTos\` (104 mJ/cm²) and 156% better than the industry baseline (50 mJ/cm²), promising dramatic wafer throughput improvements.</li>
        </ul>
        <h4 class="journal-h4">2) PEB (Post-Exposure Bake) Reliability Assessment (Core Achievement 2)</h4>
        <ul class="journal-ul">
          <li>Existing \`TinOH\` resists showed thermal sensitivity drift (time dependence) when PEB temperatures fluctuated (90°C ➔ 110°C ➔ 130°C).</li>
          <li>In contrast, ellipsometry thickness profiles proved that \`TinNO₃\` with stable nitrate anion binding maintained uniform sensitivity across temperature variations.</li>
        </ul>
        <blockquote class="journal-quote tip"><span class="quote-icon">💡</span> <strong>Analogy:</strong> Like replacing a machine whose performance fluctuates with weather changes with an ultra-precision sensor that maintains 100% accuracy in extreme temperatures from the South Pole to the Sahara.</blockquote>
        <h4 class="journal-h4">3) Fine L/S Pattern Resolution & LER Optimization (Core Achievement 3)</h4>
        <ul class="journal-ul">
          <li>Applied Bottom Anti-Reflective Coating (BARC) to block harmful reflections returning from the substrate.</li>
          <li>Proven by AFM/SEM, the LER (roughness making lines look like centipede legs) for a 140nm line CD decreased dramatically from 16.9nm to <strong>7.87nm</strong>.</li>
          <li>For an ultra-fine 84nm L/S pattern, it recorded an LER of 10.68nm, verifying the feasibility of implementing **45nm ultra-fine circuit pitches**.</li>
        </ul>
        <h4 class="journal-h4">4) ICP Dry Etch Resistance & Selectivity Verification (Core Achievement 4)</h4>
        <ul class="journal-ul">
          <li>Applied <strong>ICP dry etching</strong> to bypass pattern undercut and resolution degradation common in wet etching.</li>
          <li>During Si layer etching, \`TinNO₃\` demonstrated a high selectivity of <strong>3.1:1</strong>, vastly outperforming organic PR (0.4:1).</li>
          <li>Against amorphous carbon hardmasks (ACL), it achieved a remarkable selectivity of <strong>13.2:1</strong>, maintaining a stable etch barrier even under bias DC voltage fluctuations.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">7) Key Problem-Solving Points</h3>
        <ul class="journal-ul">
          <li><strong>Unifying Front-End (EUV) & Back-End (Packaging) Synergies:</strong>
            <ul class="journal-ul">
              <li>Elucidated that LER defects not only compromise transistor performance in the front-end, but also shrink the alignment tolerance (misalignment margin) of fine-pitch bumps and pads during back-end assembly, directly <strong>harming packaging yields</strong>.</li>
              <li>Severe LER distorts the pad shape, leading to uneven bump contacts and subsequent solder cracking.</li>
              <li>Showed that the **LER reduction (16.9nm to 7.87nm) by \`TinNO₃\` doubles the interface bonding reliability margin**, establishing a unique, comprehensive engineering insight.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">8) Results & Achievements</h3>
        <ul class="journal-ul">
          <li><strong>Validated Four Key Strengths of Next-Gen EUV PR:</strong>
            <ul class="journal-ul">
              <li><strong>Sensitivity:</strong> 32 mJ/cm² (3.25x improvement over TinTos, maximizing productivity).</li>
              <li><strong>Process Stability:</strong> Negligible sensitivity drift across PEB temperature variations.</li>
              <li><strong>Resolution:</strong> 45nm fine circuit capabilities with a 53% reduction in LER.</li>
              <li><strong>Dry Etch Resistance:</strong> Selectivity of 3.1:1 for Si and 13.2:1 for ACL.</li>
            </ul>
          </li>
        </ul>
        <h4 class="journal-h4">Photoresist Process Comparison Summary</h4>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Metric</th>
          <th>Conventional Organic / Inorganic (TinTos)</th>
          <th>Next-Gen TinNO₃</th>
          <th>Remarks / Process Comparison</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>EUV Photosensitivity</strong></td>
          <td>104 mJ/cm² (TinTos)</td>
          <td><strong>32 mJ/cm²</strong></td>
          <td>3.25x faster (dramatically boosts throughput)</td>
        </tr>
        <tr>
          <td><strong>PEB Sensitivity Drift</strong></td>
          <td>High (temperature dependent)</td>
          <td><strong>Stable (No shift)</strong></td>
          <td>Resists external thermal stress</td>
        </tr>
        <tr>
          <td><strong>Line Edge Roughness (LER)</strong></td>
          <td>16.9 nm</td>
          <td><strong>7.87 nm</strong></td>
          <td>53% improvement (prevents short-circuits)</td>
        </tr>
        <tr>
          <td><strong>Si Etch Selectivity</strong></td>
          <td>0.4 : 1 (Organic PR)</td>
          <td><strong>3.1 : 1</strong></td>
          <td>7x higher chemical resistance</td>
        </tr>
        <tr>
          <td><strong>ACL Hardmask Selectivity</strong></td>
          <td>Low</td>
          <td><strong>13.2 : 1</strong></td>
          <td>Provides perfect barrier during deep etching</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">9) Lessons Learned</h3>
        <ul class="journal-ul">
          <li>Understood that ultra-fine nodes require not only advanced lithography machines but also **materials-level innovations (inorganic tin clusters and anion engineering)** working in harmony.</li>
          <li>Internalized the physical measurement principles of metrology tools (AFM, FE-SEM, Ellipsometry) to objectively evaluate the reliability of engineering datasets.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">10) Connection to Back-end Engineering Roles</h3>
        <ul class="journal-ul">
          <li><strong>Relevance to Back-end & Quality:</strong> As front-end line pitches scale down to 45nm, BGA substrate design rules (Line & Space margins) must achieve extreme precision.</li>
          <li><strong>Practical Application in Work:</strong>
            <ul class="journal-ul">
              <li>In OSAT and packaging QA (Quality Assurance) roles, this expertise applies directly to **using FE-SEM and AFM for cross-sectional micro-roughness evaluations** to analyze substrate defects.</li>
              <li>A thorough understanding of lithography margins will enable smooth technical communication with front-end foundries to coordinate substrate specifications.</li>
            </ul>
          </li>
        </ul>
      `
    },
    5: {
      meta: `BIG DATA / SPOTFIRE-BASED SEMICONDUCTOR YIELD ANALYSIS`,
      title: `Spotfire-based Semiconductor Manufacturing Process Data Analytics for Yield & Defect Optimization`,
      date: `2025. 10. 20. ~ 2025. 11. 09.`,
      prose: `
<h3 class="journal-h3">1) Project Overview</h3>
        <ul class="journal-ul">
          <li><strong>Duration:</strong> 2025. 10. 20. ~ 2025. 11. 09.</li>
          <li><strong>Type:</strong> Semiconductor Manufacturing Data Analysis & Yield/Defect Optimization (Root Cause Analysis)</li>
          <li><strong>Affiliation:</strong> Semiconductor Manufacturing Data Visualization & Spotfire Statistical Analysis Professional Training Program</li>
          <li><strong>Overview:</strong> Leveraged massive production datasets using TIBCO Spotfire to analyze chip/wafer metrology parameters, equipment sensor histories, and process routing paths. Conducted statistical validations (linear regression, ANOVA) to isolate key predictors compromising manufacturing yield.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">2) Background & Problem Statement</h3>
        <ul class="journal-ul">
          <li><strong>Background:</strong> Modern semiconductor fabs involve hundreds of micro-processing steps, generating gigabytes of sensor and metrology data daily. Extracting hidden process correlation variables is essential to boost yield and cut defect rates.</li>
          <li><strong>Problem Statement:</strong>
            <ul class="journal-ul">
              <li>Fabs often rely on historical intuition to tweak process recipes when defects or yield drops occur, struggling to prove the root causes of failures through systematic data.</li>
              <li>Additionally, there was a critical need to merge fragmented equipment log sensors with wafer defect tables, identifying statistically significant parameters (p-value &lt; 0.05) to establish robust Statistical Process Control (SPC) structures.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">3) Project Goals</h3>
        <ul class="journal-ul">
          <li><strong>Quantitative Goals:</strong>
            <ul class="journal-ul">
              <li>Build a linear regression model linking chip-level metrics (Defect, CD, THK) to wafer yields, isolating key factors (p-value &lt; 0.05).</li>
              <li>Execute join analyses between tool logs and wafer defects to extract dominant predictors with a coefficient of determination ($R^2$) above 0.95.</li>
              <li>Calculate statistical contributions of categorical routing variables (recipe_id, eqp_id, path) using ANOVA to evaluate their impact on final yield.</li>
            </ul>
          </li>
          <li><strong>Qualitative Goals:</strong> Systematize data merging (join) and aggregation workflows, generating data-driven manufacturing analysis reports using Spotfire visualizations and statistical validations.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">4) Engineering Methodology & Role</h3>
        <ul class="journal-ul">
          <li><strong>Project Type:</strong> Individual Project (Spotfire Practical Analysis Course & Technical Report Writing)</li>
          <li><strong>My Role (Key Contribution):</strong>
            <ul class="journal-ul">
              <li>Engineered data processing pipelines to clean, aggregate, and calculate wafer-level yield based on raw chip-level tables.</li>
              <li>Designed and built Spotfire dashboards across three distinct sub-analyses:
                <ul class="journal-ul">
                  <li><strong>Analysis 1:</strong> Linear regression of chip metrology parameters (Defects, Thickness, CD) against yield.</li>
                  <li><strong>Analysis 2:</strong> Multi-variable regression joining 4 key sensor variables (precursor flow, pressure, rf power, reflect power) with Defect counts.</li>
                  <li><strong>Analysis 3:</strong> ANOVA and box plots tracing equipment paths and recipe IDs.</li>
                </ul>
              </li>
              <li>Interpreted p-values and R-square metrics to filter out statistically insignificant noise (e.g., CD, rf_power) from process control.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">5) Applied Processes & Process Tools</h3>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Category</th>
          <th>Technical Details</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Data Analytics Tools</strong></td>
          <td>TIBCO Spotfire (Specialized software for semiconductor data visualization & statistical modeling)</td>
        </tr>
        <tr>
          <td><strong>Statistical Methods</strong></td>
          <td>Linear Regression, ANOVA (Analysis of Variance), Correlation Analysis</td>
        </tr>
        <tr>
          <td><strong>Visualization Models</strong></td>
          <td>Scatter Plot Matrix, Box Plot, Line / Bar Charts</td>
        </tr>
        <tr>
          <td><strong>Key Database Keys</strong></td>
          <td>\`lot_id\`, \`wafer_id\`, \`recipe_id\`, \`eqp_id\`, \`BIN\` (Good/Bad binning data)</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">6) Implementation Process</h3>
        <h4 class="journal-h4">🔬 Sub-Project 1: Analyzing Common Factors in Chip Defect and Yield</h4>
        <ul class="journal-ul">
          <li><strong>Objective:</strong> Isolate the dominant factors among chip thickness (THK), critical dimension (CD), and Defect count that impact wafer yield.</li>
          <li><strong>Statistical Validation:</strong> Ran linear regression with yield as the dependent variable (Y).
            <ul class="journal-ul">
              <li><strong>Sum(Defect):</strong> p-value of $6.93 	imes 10^{-23}$ (&lt;&lt; 0.05), $R^2$ of 0.09, proving a highly significant **negative linear correlation**.</li>
              <li><strong>Avg(THK):</strong> p-value of $6.77 	imes 10^{-10}$ (&lt;&lt; 0.05), $R^2$ of 0.04, confirming a significant **negative correlation**, proving thickness variation directly harms yield.</li>
              <li><strong>Avg(CD):</strong> p-value of 0.456 (&gt; 0.05), showing no statistical relation, filtered out as noise.</li>
            </ul>
          </li>
        </ul>
        <blockquote class="journal-quote tip"><span class="quote-icon">💡</span> <strong>Analogy:</strong> Like mathematically proving that a student's grades (yield) are linked to study hours (defects) and sleep duration (thickness), but have nothing to do with the color of their clothes (CD).</blockquote>
        <h4 class="journal-h4">🔬 Sub-Project 2: Process Split Evaluation (Equipment Sensors vs. Defects)</h4>
        <ul class="journal-ul">
          <li><strong>Objective:</strong> Evaluate the impact of internal physical tool sensors on defect generation.</li>
          <li><strong>Statistical Validation:</strong> Merged tables using \`lot_id\` and \`wafer_id\` to run a multi-variable regression of 4 sensors against defects.
            <ul class="journal-ul">
              <li><strong>Max(reflect_power):</strong> Unveiled an exceptionally strong positive correlation with a p-value of <strong>0.00E+000</strong> and an $R^2$ of <strong>0.99</strong>, proving reflect power instability is the dominant driver of defects.</li>
              <li><strong>Other Variables:</strong> rf_power (p=0.513), precursor_flow (p=0.637), and chamber_pressure (p=0.867) showed no statistical relation, preventing wasted engineering resources.</li>
            </ul>
          </li>
        </ul>
        <h4 class="journal-h4">🔬 Sub-Project 3: Wafer-Level Yield Tracing (Process Path Tracking)</h4>
        <ul class="journal-ul">
          <li><strong>Objective:</strong> Identify bottlenecks by tracing the equipment and recipe paths of low-yield wafers.</li>
          <li><strong>Statistical Validation:</strong> Aggregated bin data to calculate yields and ran ANOVA across process paths.
            <ul class="journal-ul">
              <li><strong>recipe_id:</strong> p-value of $6.77 	imes 10^{-297}$ (&lt;&lt; 0.05), identifying it as the most critical factor. Visualized clear yield gaps between low-yield groups like F108C... (72%) and high-yield groups like HF601 (97.6%).</li>
              <li><strong>eqp_id & Path:</strong> Confirmed that specific tools (p=$1.26 	imes 10^{-9}$) and cumulative paths (p=$4.88 	imes 10^{-133}$) also introduce statistically significant yield variances.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">7) Key Problem-Solving Points</h3>
        <ul class="journal-ul">
          <li><strong>Multidisciplinary Root Cause Identification:</strong>
            <ul class="journal-ul">
              <li>Blindly feeding all variables into a regression model risks multicollinearity and misleading conclusions.</li>
              <li>To prevent this, we filtered outliers and missing values using box plots in Spotfire before running regression.</li>
              <li>This proved that rather than RF Power input, the **maximum threshold of reflected power (\`reflect_power\`)** triggered electrical arcing inside the chamber, causing massive defects, successfully tracing and resolving the failure.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">8) Results & Achievements</h3>
        <ul class="journal-ul">
          <li><strong>Yield Optimization Baseline Derived:</strong>
            <ul class="journal-ul">
              <li><strong>Defect Drivers:</strong> Confirmed \`Sum(Defect)\` and \`Avg(THK)\` are the primary drivers of yield loss.</li>
              <li><strong>Predictive Accuracy:</strong> Established a regression formula with $R^2=0.99$ predicting defect rates based on \`Max(reflect_power)\`.</li>
              <li><strong>Optimal Paths:</strong> Designated recipe group HF601 via ANOVA, ensuring yields above 97.6%.</li>
            </ul>
          </li>
        </ul>
        <h4 class="journal-h4">Statistical Analysis Results Summary</h4>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Independent Variable (X)</th>
          <th>Dependent Variable (Y)</th>
          <th>Statistical Method</th>
          <th>p-value</th>
          <th>$R^2$</th>
          <th>Decision / Conclusion</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Sum(Defect)</strong></td>
          <td>Wafer Yield</td>
          <td>Linear Regression</td>
          <td>$6.93 	imes 10^{-23}$</td>
          <td>0.09</td>
          <td><strong>Significant negative correlation (Control parameter)</strong></td>
        </tr>
        <tr>
          <td><strong>Avg(THK) (Thickness)</strong></td>
          <td>Wafer Yield</td>
          <td>Linear Regression</td>
          <td>$6.77 	imes 10^{-10}$</td>
          <td>0.04</td>
          <td><strong>Significant negative correlation (Control parameter)</strong></td>
        </tr>
        <tr>
          <td><strong>Avg(CD) (Line Width)</strong></td>
          <td>Wafer Yield</td>
          <td>Linear Regression</td>
          <td>0.456</td>
          <td>-</td>
          <td>No statistical significance (Exclude from control)</td>
        </tr>
        <tr>
          <td><strong>Max(reflect_power)</strong></td>
          <td>Defect Sum</td>
          <td>Linear Regression</td>
          <td><strong>0.00E+000</strong></td>
          <td><strong>0.99</strong></td>
          <td><strong>Extremely strong positive correlation (Priority control)</strong></td>
        </tr>
        <tr>
          <td><strong>recipe_id</strong></td>
          <td>Wafer Yield</td>
          <td>ANOVA</td>
          <td>$6.77 	imes 10^{-297}$</td>
          <td>-</td>
          <td><strong>Most dominant categorical factor driving yield drift</strong></td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">9) Lessons Learned</h3>
        <ul class="journal-ul">
          <li>Internalized that modern engineering is not just tweaking knobs but **interpreting p-values and using data to scientifically backtrack equipment malfunctions**.</li>
          <li>Grew quantitative engineering insight by filtering out false correlations from genuine process drivers using statistical methods.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">10) Connection to Back-end Engineering Roles</h3>
        <ul class="journal-ul">
          <li><strong>Relevance to Back-end/Yield Roles:</strong> Packaging involves numerous variables (EMC dispensing rates, bonding force, vacuum parameters) that interact to dictate solder joint quality and yield.</li>
          <li><strong>Practical Application in Work:</strong>
            <ul class="journal-ul">
              <li>Allows immediate contribution by **joining tool logs with packaging yield tables in Spotfire to rapidly isolate low-yield equipment (\`eqp_id\`) or assembly recipe bottlenecks**.</li>
              <li>Prepared to contribute as an asset ready to implement Statistical Process Control (SPC) and Six Sigma yield management techniques.</li>
            </ul>
          </li>
        </ul>
      `
    },
    6: {
      meta: `EMBEDDED CIRCUIT / MCU-BASED AC POWER METER DESIGN`,
      title: `Development of a Microcontroller-based Digital Single-Phase AC Power Meter Board`,
      date: `2025. 09. 01. ~ 2025. 12. 31.`,
      prose: `
<h3 class="journal-h3">1) Project Overview</h3>
        <ul class="journal-ul">
          <li><strong>Duration:</strong> 2025. 09. 01. ~ 2025. 12. 31.</li>
          <li><strong>Type:</strong> Analog Sensor Circuit Design, MCU Embedded Systems Development, and PCB Assembly (Soldering)</li>
          <li><strong>Affiliation:</strong> Kwangwoon University, Dept. of Electrical Engineering (3rd Year 2nd Semester Capstone Project)</li>
          <li><strong>Overview:</strong> Designed, soldered, and calibrated a microcontroller-based single-phase AC power meter on a custom PCB, measuring residential 220Vac / 1500W loads. Features real-time voltage/current sensing, active low-pass filtering, active/reactive power calculations within a 5% error margin, and software-controlled relay trip protection with THD/FFT harmonic monitoring.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">2) Background & Problem Statement</h3>
        <ul class="journal-ul">
          <li><strong>Background:</strong> Smart Grid and Energy Management Systems (EMS) rely on precision power metering to monitor real-time power consumption, trace leakage, and trigger protection mechanisms.</li>
          <li><strong>Problem Statement:</strong>
            <ul class="journal-ul">
              <li>In AC grids, apparent power (voltage $	imes$ current) does not equal actual active power. Inductive loads introduce <strong>reactive power</strong> and degrade the **power factor**, leading to transmission losses.</li>
              <li>Furthermore, during load transient transitions (sudden activation/deactivation), inrush currents can destroy sensitive instrumentation circuits or degrade measurement precision.</li>
              <li>To address this, we needed to implement real-time Root-Mean-Square (RMS) algorithms on an ATmega328P MCU and integrate a hardware protection relay and total harmonic distortion (THD) monitoring.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">3) Project Goals</h3>
        <ul class="journal-ul">
          <li><strong>Quantitative Goals:</strong>
            <ul class="journal-ul">
              <li>Maintain active power measurement errors **below 5.0%** across a 220Vac / 1500W load range (achieved 3.2% error).</li>
              <li>Ensure 100% operational reliability under rapid transient load switching.</li>
              <li>Integrate FFT (Fast Fourier Transform) algorithms to display THD percentages on LCD/7-segment outputs.</li>
            </ul>
          </li>
          <li><strong>Qualitative Goals:</strong> Design analog OP-AMP amplifiers, low-pass filters, safety relay interfaces, and complete hand-soldering and testing on a prototype board.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">4) Engineering Methodology & Role</h3>
        <ul class="journal-ul">
          <li><strong>Project Type:</strong> Team Project (3 members)</li>
          <li><strong>My Role (Key Contribution):</strong>
            <ul class="journal-ul">
              <li><strong>Analog Sensing & Front-end Design (HW):</strong> Designed active low-pass filters and DC-bias offset circuits using LM358 OP-AMPs to scale transformer/CT sensor outputs into the MCU's safe ADC range (0~5V). Soldered and assembled the prototype board.</li>
              <li><strong>Real-time RMS Algorithm Porting (Embedded SW):</strong> Programmed discrete RMS integration equations on the MCU to process fast ADC sampling data.</li>
              <li><strong>Protection Logic Development:</strong> Programmed real-time overcurrent/overvoltage sensing triggers to actuate a 5V relay trip circuit within 0.05 seconds.</li>
              <li><strong>Troubleshooting & Optimization:</strong> Reduced transient voltage ripples using decoupling capacitors to calibrate and lower measurement errors.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">5) Applied Processes & Process Tools</h3>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Category</th>
          <th>Technical Details</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Control Core</strong></td>
          <td>ATmega328P Microcontroller (Arduino-based firmware)</td>
        </tr>
        <tr>
          <td><strong>Analog Sensing</strong></td>
          <td>Voltage sensing transformer, Current Transformer (CT) transducer</td>
        </tr>
        <tr>
          <td><strong>Signal Conditioning</strong></td>
          <td>2.5V DC Offset circuit, Active Low-pass Filter (LM358 OP-AMP)</td>
        </tr>
        <tr>
          <td><strong>Display / Interface</strong></td>
          <td>I2C 16x2 Character LCD (Outputs real-time $V_{rms}$, $I_{rms}$, $P$, $Q$, THD, PF)</td>
        </tr>
        <tr>
          <td><strong>Protection Actuator</strong></td>
          <td>5V SPDT Relay Module (overcurrent protection circuit trip)</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">6) Implementation Process</h3>
        <h4 class="journal-h4">1) Analog Signal Conditioning & Bias Design (Sensing Optimization)</h4>
        <ul class="journal-ul">
          <li>Since AC 220V exceeds MCU ADC limits, we stepped down the voltage via isolated transformers and designed a <strong>2.5V DC Bias Offset circuit</strong> to eliminate negative wave segments.</li>
          <li>To prevent aliasing from the ADC sampling frequency limits and remove high-frequency surges, we integrated an **active low-pass filter (LPF)** using an LM358 OP-AMP.</li>
        </ul>
        <blockquote class="journal-quote tip"><span class="quote-icon">💡</span> <strong>Analogy:</strong> Rather than drinking directly from a high-velocity river (220Vac AC power), we build a bypass channel (isolation transformer) and add filters (LPF and Offset) to obtain clean, drinkable tap water (0~5V stable DC biased signal) for safe measurement.</blockquote>
        <h4 class="journal-h4">2) Discrete RMS & Power Computation Algorithm (Embedded firmware)</h4>
        <ul class="journal-ul">
          <li>Ported fast mathematical integrations on the ATmega328P to compute discrete RMS values:
            $$V_{rms} = \\sqrt{\\frac{1}{N}\\sum_{i=1}^{N} v(i)^2}$$
          </li>
          <li>Calculated real-time average power (Active Power P), extracted Reactive Power (Q) and Apparent Power (S) mathematically, and derived the Power Factor (PF).</li>
          <li>Calibrated timer interrupts to sample at least 100 times per 50Hz AC cycle (20ms) to minimize integration error.</li>
        </ul>
        <h4 class="journal-h4">3) Transient Load Testing & Overcurrent Protection (Verification)</h4>
        <ul class="journal-ul">
          <li>Connected high-wattage hair dryers and heaters to simulate sudden transient load changes.</li>
          <li>Validated the **overcurrent protection interface**, which triggers a relay trip within 0.05 seconds of detecting a surge, verifying system physical safety.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">7) Key Problem-Solving Points</h3>
        <ul class="journal-ul">
          <li><strong>Major Challenge:</strong> "Resolving measurement errors and noise when connecting inductive motor loads."</li>
          <li><strong>Solution Methodology:</strong>
            <ul class="journal-ul">
              <li>While error rates remained under 2% for resistive loads (lamps), introducing an inductive motor (fan) caused active power errors to surge to 12%.</li>
              <li>Discovered that mismatched parasitic inductances between voltage and current sensors introduced a micro phase shift, distorting active power calculations.</li>
              <li>Resolved this by programming a **Phase Correction Constant** to align sensor sampling indexes in software, combined with bypass capacitors to filter board-level noise, bringing final active power errors down to **3.2%**.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">8) Results & Achievements</h3>
        <ul class="journal-ul">
          <li><strong>High-Precision AC Power Meter Completed:</strong>
            <ul class="journal-ul">
              <li>Achieved a 3.2% active power error, outperforming the 5% target specification.</li>
              <li>Successfully tracked reactive power and power factors while verifying transient protection.</li>
            </ul>
          </li>
        </ul>
        <h4 class="journal-h4">Power Meter Design & Metrology Outcomes</h4>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Evaluation Metric</th>
          <th>Design Target</th>
          <th>Achieved Performance</th>
          <th>Remarks / Debugging Outcome</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Active Power Error</strong></td>
          <td>&lt; 5.0%</td>
          <td><strong>3.2%</strong></td>
          <td>Achieved via phase correction & LPF calibration</td>
        </tr>
        <tr>
          <td><strong>Maximum Operating Load</strong></td>
          <td>220 Vac / 1500 W</td>
          <td><strong>220 Vac / 1500 W</strong></td>
          <td>Stable execution without thermal dissipation issues</td>
        </tr>
        <tr>
          <td><strong>Transient Reliability</strong></td>
          <td>No malfunction on load step</td>
          <td><strong>100% Stable Recovery</strong></td>
          <td>Verified transient switching robustness</td>
        </tr>
        <tr>
          <td><strong>Overcurrent Safety Trip</strong></td>
          <td>Relay trip on overcurrent</td>
          <td><strong>&lt; 0.05 seconds</strong></td>
          <td>Software sensing integrated with SPDT relay</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">9) Lessons Learned</h3>
        <ul class="journal-ul">
          <li>Learned that conditioning analog sensor waveforms (LPF, Bias Offset) dictates the mathematical accuracy of digital MCU calculations.</li>
          <li>Acquired hands-on debugging skills regarding parasitic inductances and capacitances while soldering and calibrating prototype boards.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">10) Connection to Back-end Engineering Roles</h3>
        <ul class="journal-ul">
          <li><strong>Relevance to Back-end & Test:</strong> Analogous to the operation of Burn-In test boards and Source Measure Units (SMU) in ATE, which apply high temperature/voltage stress to packaged chips while monitoring real-time leakage currents.</li>
          <li><strong>Practical Application in Work:</strong>
            <ul class="journal-ul">
              <li>Enables **diagnosing and filtering voltage bias offset and power noise on test load boards**, or debugging hardware safety interlocks in wafer sorting systems.</li>
              <li>Brings practical expertise in metrology calibration and protection circuit debugging to technical teams.</li>
            </ul>
          </li>
        </ul>
      `
    },
    7: {
      meta: `ANALOG CIRCUIT / ACTIVE FILTER AUDIO LEVEL METER`,
      title: `Design & Verification of a 3-Band Audio Level Meter with Sallen-Key Active Filters`,
      date: `2025. 03. 01. ~ 2025. 06. 30.`,
      prose: `
<h3 class="journal-h3">1) Project Overview</h3>
        <ul class="journal-ul">
          <li><strong>Duration:</strong> 2025. 03. 01. ~ 2025. 06. 30.</li>
          <li><strong>Type:</strong> Analog Active Filter Circuit Design, Audio Signal Processing, and System Fabrication</li>
          <li><strong>Affiliation:</strong> Kwangwoon University, Dept. of Electrical Engineering (Capstone Design Project for Machine Learning in Electrical Engineering)</li>
          <li><strong>Overview:</strong> Designed and built an analog 3-band audio level meter using active Butterworth filters to separate low, mid, and high acoustic frequencies. The system incorporates an OPA2134PA high-performance preamplifier, mathematically optimized 2nd-order Sallen-Key active filters, LM3914 LED array drivers, and an LM380N power amplifier to drive a speaker unit.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">2) Background & Problem Statement</h3>
        <ul class="journal-ul">
          <li><strong>Background:</strong> Audio mixers, communication nodes, and scientific instruments rely on precise frequency band separation and noise filtering to visualize real-time signal amplitudes.</li>
          <li><strong>Problem Statement:</strong>
            <ul class="journal-ul">
              <li>Low-voltage analog signals from microphones are highly vulnerable to electromagnetic noise. Inadequate roll-off slopes in filters lead to <strong>inter-band interference</strong>, generating measurement errors.</li>
              <li>Additionally, we had to prevent phase distortion in high-fidelity audio signals and implement adjustable gains (0.2x to 5x) for low (below 400Hz), mid (800Hz~1.6kHz), and high (above 3.2kHz) frequency bands.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">3) Project Goals</h3>
        <ul class="journal-ul">
          <li><strong>Quantitative Goals:</strong>
            <ul class="journal-ul">
              <li>Maintain cutoff frequency ($f_c$) accuracy **above 95%** using 2nd-order Butterworth active filters (LPF: 400Hz, HPF: 3.2kHz).</li>
              <li>Secure a sharp filter attenuation rate of **-40 dB/dec** in compliance with 2nd-order slopes.</li>
              <li>Design a non-inverting gain stage providing linear, distortion-free amplification from 0.2x to 5.0x.</li>
              <li>Drive an error-free 5-stage LED level meter using the LM3914.</li>
            </ul>
          </li>
          <li><strong>Qualitative Goals:</strong> Calculate passive component values ($R, C$) for the Sallen-Key filters, run SPICE simulations, and assemble the physical system.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">4) Engineering Methodology & Role</h3>
        <ul class="journal-ul">
          <li><strong>Project Type:</strong> Individual Design Project</li>
          <li><strong>My Role (Key Contribution):</strong>
            <ul class="journal-ul">
              <li><strong>3-Band Active Filter Derivation:</strong> Solved Sallen-Key Butterworth equations to calculate precise resistor values under a fixed capacitor constraint ($C=1\\text{nF}$), obtaining $R=280\\text{k}\\Omega$ for LPF (400Hz) and $R_2=35\\text{k}\\Omega, R_1=70\\text{k}\\Omega$ for HPF (3.2kHz).</li>
              <li><strong>Preamplifier & Variable Gain Circuitry:</strong> Built a variable gain stage ($A_v \\le 5.0$) utilizing an OPA2134PA audio OP-AMP to scale incoming signals.</li>
              <li><strong>LED Driver & Power Amp Integration:</strong> Calibrated the LM3914 display controllers using a reference resistor divider ($R_1=1.21\\text{k}\\Omega, R_2=3.83\\text{k}\\Omega$) to map 0~5V audio levels into smooth LED bar displays, and integrated an LM380N (2.5W) power amplifier to drive a 50mm speaker.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">5) Applied Processes & Process Tools</h3>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Category</th>
          <th>Technical Details</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Audio Op-Amp IC</strong></td>
          <td>OPA2134PA (High-performance, ultra-low distortion dual audio operational amplifier)</td>
        </tr>
        <tr>
          <td><strong>Filter Topology</strong></td>
          <td>Sallen-Key 2nd-Order Active Filter (Butterworth response profile)</td>
        </tr>
        <tr>
          <td><strong>LED Level Driver</strong></td>
          <td>LM3914 (Dot/Bar display driver with internal linear comparators)</td>
        </tr>
        <tr>
          <td><strong>Power Amplifier</strong></td>
          <td>LM380N (2.5W Mono Audio Power Amplifier)</td>
        </tr>
        <tr>
          <td><strong>Speaker Unit</strong></td>
          <td>UNISON U508B25G (8-ohm, 3W, 50mm dynamic speaker)</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">6) Implementation Process</h3>
        <h4 class="journal-h4">1) Sallen-Key 2nd-Order Active Filter Mathematical Design</h4>
        <ul class="journal-ul">
          <li><strong>LPF (Bass Band, Cutoff 400Hz):</strong> To achieve a Butterworth profile ($Q=0.707$), we fixed $C_1=1\\text{nF}$, $C_2=2\\text{nF}$, yielding:
            $$f_p = \\frac{1}{2\\pi R\\sqrt{C_1 C_2}} = 400\\text{Hz} \\implies R = 280\\text{k}\\Omega$$
          </li>
          <li><strong>HPF (Treble Band, Cutoff 3.2kHz):</strong> Solved the transfer function for $C=1\\text{nF}$, resulting in:
            $$f_p = \\frac{1}{2\\pi C\\sqrt{R_1 R_2}} = 3.2\\text{kHz} \\implies R_2=35\\text{k}\\Omega, R_1=2R_2=70\\text{k}\\Omega$$
          </li>
        </ul>
        <blockquote class="journal-quote tip"><span class="quote-icon">💡</span> <strong>Analogy:</strong> Designing filters is like sifting sand. An LPF acts as a fine mesh, blocking large pebbles (high frequencies) and letting fine sand (low frequencies) pass, whereas an HPF holds the pebbles and lets the sand fall through.</blockquote>
        <h4 class="journal-h4">2) Parallel Band Separation & Adder Combination (System Architecture)</h4>
        <ul class="journal-ul">
          <li>Signals from the condenser microphone were routed in parallel into LPF, BPF, and HPF channels after pre-amplification.</li>
          <li>To save physical board space and bypass complex passive component matching, we implemented the BPF by subtracting the LPF and HPF signals from the original wave: **[Original - (LPF + HPF)]** using an active adder.</li>
          <li>Each band was routed through independent potentiometers, enabling real-time volume and gain adjustments.</li>
        </ul>
        <h4 class="journal-h4">3) Voltage Level Calibration & Output Verification (Metrology)</h4>
        <ul class="journal-ul">
          <li>Calibrated the reference voltages of the LM3914 comparators to ensure the 5-stage LED bar graph (HBSR-55) reacted smoothly to 0~5V signals without noise fluctuations.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">7) Key Problem-Solving Points</h3>
        <ul class="journal-ul">
          <li><strong>Major Challenge:</strong> "Resolving poor roll-off rates and inter-band interference using passive filters."</li>
          <li><strong>Solution Methodology:</strong>
            <ul class="journal-ul">
              <li>Early tests using 1st-order passive RC filters resulted in blurry boundaries (e.g., around 600Hz), causing low and mid LEDs to light up simultaneously.</li>
              <li>Resolved this by adopting **2nd-order Sallen-Key Butterworth active filters** providing a sharp **-40 dB/dec** attenuation slope.</li>
              <li>Tuned the quality factor ($Q$) to exactly 0.707 to suppress 3-dB peaking in the passband, successfully isolating all three frequency bands.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">8) Results & Achievements</h3>
        <ul class="journal-ul">
          <li><strong>High-Performance 3-Band Audio Level Meter Completed:</strong>
            <ul class="journal-ul">
              <li>Maintained frequency errors under 3.5% for LPF (400Hz) and HPF (3.2kHz).</li>
              <li>Secured a sharp -40 dB/dec roll-off slope to eliminate inter-band interference.</li>
              <li>Achieved distortion-free variable gain (0.2x to 5.0x) using the OPA2134PA stage.</li>
            </ul>
          </li>
        </ul>
        <h4 class="journal-h4">Filter Design and Attenuation Outcomes</h4>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Filter Band</th>
          <th>Design Target (Cutoff)</th>
          <th>Measured Performance</th>
          <th>Roll-Off / Performance Profile</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>LPF (Bass Band)</strong></td>
          <td>400 Hz</td>
          <td><strong>414 Hz</strong></td>
          <td>2nd-order Sallen-Key, -40 dB/dec</td>
        </tr>
        <tr>
          <td><strong>HPF (Treble Band)</strong></td>
          <td>3200 Hz (3.2 kHz)</td>
          <td><strong>3110 Hz</strong></td>
          <td>2nd-order Sallen-Key, -40 dB/dec</td>
        </tr>
        <tr>
          <td><strong>BPF (Mid Band)</strong></td>
          <td>800 Hz ~ 1.6 kHz</td>
          <td><strong>820 Hz ~ 1.62 kHz</strong></td>
          <td>Subtractive active adder filter design</td>
        </tr>
        <tr>
          <td><strong>Variable Gain</strong></td>
          <td>0.2 ~ 5.0 V/V</td>
          <td><strong>0.2 ~ 5.0 V/V</strong></td>
          <td>Linear adjustment via non-inverting trim</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">9) Lessons Learned</h3>
        <ul class="journal-ul">
          <li>Learned that passive component tolerances can shift cutoff frequencies. Used **1% metal film resistors** during fabrication to secure circuit precision.</li>
          <li>Acquired practical insight into analog signal conditioning and high-fidelity audio driver interfaces by executing physical frequency-separation layouts.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">10) Connection to Back-end Engineering Roles</h3>
        <ul class="journal-ul">
          <li><strong>Relevance to Back-end & Quality:</strong> Parallels the technology used in front-end instrumentation of ATE (Automated Test Equipment) for high-speed telecom chips and CIS (CMOS Image Sensors), which requires capturing micro-volt signals while filtering high-frequency noise.</li>
          <li><strong>Practical Application in Work:</strong>
            <ul class="journal-ul">
              <li>Applies to **designing noise-reduction active filters on load boards** or calibrating signal bias lines to evaluate high-speed chip interfaces.</li>
              <li>A thorough understanding of multi-stage comparative logic aids in building real-time tool yield monitoring setups.</li>
            </ul>
          </li>
        </ul>
      `
    },
    8: {
      meta: `POWER CONTROL / SMART LI-ION CHARGER DESIGN`,
      title: `Design & Verification of a Smart CC-CV Li-Ion Battery Charger with Precision Telemetry`,
      date: `2024. 09. 01. ~ 2024. 12. 31.`,
      prose: `
<h3 class="journal-h3">1) Project Overview</h3>
        <ul class="journal-ul">
          <li><strong>Duration:</strong> 2024. 09. 01. ~ 2024. 12. 31.</li>
          <li><strong>Type:</strong> Analog/Digital Mixed-Signal Power Conversion Design, MCU control, and Real-time Telemetry</li>
          <li><strong>Affiliation:</strong> Kwangwoon University, Dept. of Electrical Engineering (Comprehensive Design Course for AC and Electronic Circuits)</li>
          <li><strong>Overview:</strong> Designed and assembled a smart 3.7V single-cell Li-ion battery charger (18650 format, &ge; 500mAh) featuring a buck-converter topology and a CC-CV (Constant Current - Constant Voltage) charging algorithm. Integrated a real-time analog sensing telemetry network controlled by an ATmega328P MCU to log charging curves via serial communication.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">2) Background & Problem Statement</h3>
        <ul class="journal-ul">
          <li><strong>Background:</strong> The rapid expansion of EVs and portable electronics demands intelligent power management ICs (PMIC) and Battery Management Systems (BMS) to ensure reliability and prevent thermal runaway.</li>
          <li><strong>Problem Statement:</strong>
            <ul class="journal-ul">
              <li>Li-ion cells must be charged in Constant Current (CC) mode initially, switching to Constant Voltage (CV) at 4.2V. Overcharging beyond 4.2V triggers thermal runaway and catastrophic explosions, requiring fail-safe cutoff controls.</li>
              <li>Additionally, we had to minimize telemetry measurement errors caused by insertion loss and <strong>IR drop</strong> across the shunt resistor, and maintain a stable charging bias under volatile input power fluctuations (5~14VDC).</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">3) Project Goals</h3>
        <ul class="journal-ul">
          <li><strong>Quantitative Goals:</strong>
            <ul class="journal-ul">
              <li>Achieve 99% accuracy in **CC-to-CV transition and 4.2V cutoff control** for a single 18650 cell.</li>
              <li>Restrict maximum charging current strictly below **0.5C (250mA)** to prolong battery health.</li>
              <li>Record voltage/current parameters at 1-second intervals, maintaining errors within 3.5% (precision to 2 decimal places).</li>
              <li>Achieve a DC-DC Buck converter efficiency **above 85%**.</li>
            </ul>
          </li>
          <li><strong>Qualitative Goals:</strong> Implement serial communication logging, solder prototype boards, and demonstrate safe charging executions.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">4) Engineering Methodology & Role</h3>
        <ul class="journal-ul">
          <li><strong>Project Type:</strong> Team Project (3 members)</li>
          <li><strong>My Role (Key Contribution):</strong>
            <ul class="journal-ul">
              <li><strong>CC-CV Power Loop Design:</strong> Designed the charging baseboard using dedicated Li-ion management IC feedback loops to scale 5VDC inputs and execute CC-to-CV transitions.</li>
              <li><strong>Precision Telemetry Network:</strong> Configured a low-side current sensing network using a shunt resistor and differential amplifier stage, reading voltages and currents via MCU ADC ports.</li>
              <li><strong>Embedded Firmware & Calibration:</strong> Developed serial-logging software storing metrics into \`.txt\` formats, integrating mathematical offset calibrations to eliminate measurement errors.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">5) Applied Processes & Process Tools</h3>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Category</th>
          <th>Technical Details</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Charge Control</strong></td>
          <td>Li-ion CC-CV charging circuitry and LED status interfaces</td>
        </tr>
        <tr>
          <td><strong>Control Core</strong></td>
          <td>ATmega328P MCU (Telemetry firmware and serial communications)</td>
        </tr>
        <tr>
          <td><strong>Power Conversion</strong></td>
          <td>High-efficiency DC-DC Buck Converter (designed for > 85% conversion efficiency)</td>
        </tr>
        <tr>
          <td><strong>Wiring / Enclosure</strong></td>
          <td>Molex C5264RB series socket connections and standardized battery slots</td>
        </tr>
        <tr>
          <td><strong>Metrology</strong></td>
          <td>Shunt Resistor & OP-AMP Differential Amplifier (2-decimal precision calibration)</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">6) Implementation Process</h3>
        <h4 class="journal-h4">1) CC-CV Staged Charging Control Design</h4>
        <ul class="journal-ul">
          <li>Below 4.2V, the cell is charged under a Constant Current (CC) profile at 0.5C (250mA) to prevent anode plating.</li>
          <li>Upon hitting 4.2V, the system switches to Constant Voltage (CV) mode, reducing charging current. Once current drops below 10mA, the MCU trips a safety relay to isolate the cell.</li>
        </ul>
        <h4 class="journal-h4">2) Tracking IR Drop Measurement Distortions (Root Cause Analysis)</h4>
        <ul class="journal-ul">
          <li>Detected early charging cutoffs caused by parasitic contact resistance. The resulting **IR drop** across the shunt resistor artificially inflated the measured cell voltage, deceiving the MCU.</li>
        </ul>
        <blockquote class="journal-quote tip"><span class="quote-icon">💡</span> <strong>Analogy:</strong> If there is debris (parasitic resistance) inside a water pipe, turning the tap on high creates high back-pressure. The flow meter (MCU) mistakenly assumes the tank is full and shuts the valve early.</blockquote>
        <h4 class="journal-h4">3) Software Calibration & Telemetry Logging</h4>
        <ul class="journal-ul">
          <li>Programmed a calibration factor ($V_{actual} = V_{measured} - I \\times R_{parasitic}$) in the firmware to dynamically subtract parasitic voltage drops in real time.</li>
          <li>Achieved perfect alignment with handheld digital multimeters down to two decimal places, logging data smoothly into \`.txt\` logs.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">7) Key Problem-Solving Points</h3>
        <ul class="journal-ul">
          <li><strong>Major Challenge:</strong> "Preventing overcharge explosions and maximizing efficiency under volatile inputs (5~14VDC)."</li>
          <li><strong>Solution Methodology:</strong>
            <ul class="journal-ul">
              <li>Using linear regulators (LDO) would waste power (efficiency &lt; 50%) and risk thermal runaway, which could dump high voltages directly into the cell.</li>
              <li>We integrated a **switching Buck converter** to step down inputs, combined with LC filters to suppress switching ripples and block voltage surges.</li>
              <li>Engineered a redundant protection loop in the firmware using MCU analog comparators, ensuring charge voltages clamped at exactly 4.2V despite wide input voltage swings.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">8) Results & Achievements</h3>
        <ul class="journal-ul">
          <li><strong>Fail-Safe Smart CC-CV Charger Completed:</strong>
            <ul class="journal-ul">
              <li>Achieved a peak conversion efficiency of 87.2% across a 5V ~ 14V input range.</li>
              <li>Calibrated telemetry logging to 1-second intervals with errors under 3.0%.</li>
              <li>Enforced safe C-rate charging and automatic cutoff configurations meeting JEDEC/MIT specifications.</li>
            </ul>
          </li>
        </ul>
        <h4 class="journal-h4">Battery Charger Performance Outcomes</h4>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Evaluation Metric</th>
          <th>Design Target</th>
          <th>Achieved Performance</th>
          <th>Remarks / Debugging Outcome</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Charge Voltage Accuracy</strong></td>
          <td>4.2V $\\pm$ 0.1V</td>
          <td><strong>4.204 V</strong></td>
          <td>Zero overcharge defect (Redundant isolation loop)</td>
        </tr>
        <tr>
          <td><strong>Max Charging Current (0.5C)</strong></td>
          <td>&lt; 250 mA</td>
          <td><strong>242 mA (CC Mode)</strong></td>
          <td>Preserves cell lifecycle via current limits</td>
        </tr>
        <tr>
          <td><strong>Measurement Precision</strong></td>
          <td>2 decimal places</td>
          <td><strong>2 decimal places</strong></td>
          <td>IR-drop offset cancellation algorithm integrated</td>
        </tr>
        <tr>
          <td><strong>Power Conversion Efficiency</strong></td>
          <td>&gt; 85.0%</td>
          <td><strong>87.2% (Buck)</strong></td>
          <td>Maintains high efficiency across 5~14V inputs</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">9) Lessons Learned</h3>
        <ul class="journal-ul">
          <li>Understood that when charging chemical cells, parasitic resistances and thermal stresses must be quantitatively evaluated to secure system health.</li>
          <li>Acquired experience in component matching and datasheet analysis by building Buck converter stages.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">10) Connection to Back-end Engineering Roles</h3>
        <ul class="journal-ul">
          <li><strong>Relevance to PMIC & Test:</strong> Directly matches the engineering principles of **PMIC (Power Management IC) wafer/package testing**, which requires evaluating CC-CV behaviors, transition times, and efficiency profiles.</li>
          <li><strong>Practical Application in Work:</strong>
            <ul class="journal-ul">
              <li>Applies to **setting up test load boards to evaluate PMIC package characteristics** or calibrating high-current measurement telemetry.</li>
              <li>Buck converter design skills translate to analyzing Power Integrity (PI) behaviors in high-speed packaging.</li>
            </ul>
          </li>
        </ul>
      `
    },
    9: {
      meta: `BATTERY TELEMETRY / BATTERY CAPACITY TESTER DESIGN`,
      title: `Development of a Multi-Battery SOC Tester with OCV-CCV Dynamic Compensation`,
      date: `2024. 03. 01. ~ 2024. 06. 30.`,
      prose: `
<h3 class="journal-h3">1) Project Overview</h3>
        <ul class="journal-ul">
          <li><strong>Duration:</strong> 2024. 03. 01. ~ 2024. 06. 30.</li>
          <li><strong>Type:</strong> Analog Circuit Design, Battery Discharge Profiling, and Digital Display Logic Integration</li>
          <li><strong>Affiliation:</strong> Kwangwoon University, Dept. of Electrical Engineering (2nd Year 1st Semester Capstone Project)</li>
          <li><strong>Overview:</strong> Designed and built a multi-battery capacity tester supporting 1.5V AA/AAA, 9V, and 3.7V Li-ion cells. Developed an OCV-CCV dynamic compensation algorithm to measure the true State of Charge (SOC) under active loads, driven via digital decoder ICs, 7-segment displays, and LED bargraphs.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">2) Background & Problem Statement</h3>
        <ul class="journal-ul">
          <li><strong>Background:</strong> The growth of EVs and smart mobile devices highlights the need for precise State of Charge (SOC) estimation, placing significant focus on **battery fuel gauge ICs and telemetry architectures**.</li>
          <li><strong>Problem Statement:</strong>
            <ul class="journal-ul">
              <li>Batteries exhibit a physical voltage gap between their Open Circuit Voltage (OCV, no-load) and Closed Circuit Voltage (CCV, under load).</li>
              <li>This is caused by the battery's **internal resistance (IR)**. Evaluating capacity based solely on the raw CCV understates the true SOC.</li>
              <li>To prevent this measurement distortion, we needed to log discharge profiles and engineer a tester that dynamically compensates for OCV-CCV deviations.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">3) Project Goals</h3>
        <ul class="journal-ul">
          <li><strong>Quantitative Goals:</strong>
            <ul class="journal-ul">
              <li>Differentiate 1.5V, 3.7V, and 9V cells, and secure **5-level SOC resolution**.</li>
              <li>Log discharge parameters into \`.txt\` logs under a continuous 10-ohm load via MCU interfaces.</li>
              <li>Integrate BCD encoder/decoder ICs to drive 7-segment and LED bar displays with 100% logic mapping accuracy.</li>
            </ul>
          </li>
          <li><strong>Qualitative Goals:</strong> Assemble a physical battery test board incorporating secure, swappable battery slots.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">4) Engineering Methodology & Role</h3>
        <ul class="journal-ul">
          <li><strong>Project Type:</strong> Team Project (3 members)</li>
          <li><strong>My Role (Key Contribution):</strong>
            <ul class="journal-ul">
              <li><strong>Discharge Characterization:</strong> Conducted 10-ohm discharge runs to trace voltage decay profiles, establishing internal resistance (IR) models to isolate drop errors.</li>
              <li><strong>Digital Logic & Interface Design:</strong> Built display control networks using a **74LS147 BCD Encoder** and a **74LS47 BCD-to-7Segment Decoder**, minimizing MCU pin utilization.</li>
              <li><strong>SOC Estimation Algorithm:</strong> Coded lookup tables matching battery chemistry curves inside the ATmega328P to dynamically calculate real-time SOC levels.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">5) Applied Processes & Process Tools</h3>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Category</th>
          <th>Technical Details</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>Control Core</strong></td>
          <td>ATmega328P Microcontroller (Arduino C-based firmware)</td>
        </tr>
        <tr>
          <td><strong>Discharge Load</strong></td>
          <td>10-ohm / 5W High-power Cement Resistor (standard discharge reference)</td>
        </tr>
        <tr>
          <td><strong>Logic ICs</strong></td>
          <td>74LS147 BCD Encoder, 74LS47 BCD-to-7Segment Decoder</td>
        </tr>
        <tr>
          <td><strong>Visual Display</strong></td>
          <td>LTA-1000HR Bargraph LED, FND507 7-Segment Display, I2C LCD Character Screen</td>
        </tr>
        <tr>
          <td><strong>Connectors / Slots</strong></td>
          <td>Molex wire sockets and physical slide battery holders</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">6) Implementation Process</h3>
        <h4 class="journal-h4">1) 10-ohm Reference Load Discharge Experiments</h4>
        <ul class="journal-ul">
          <li>Conducted continuous discharge tests on 18650 cells using 10-ohm cement resistors.</li>
          <li>Captured voltage decay points at 1-second intervals via a 10-bit MCU ADC, outputting data to \`.txt\` files to trace **Discharge Profiles**.</li>
        </ul>
        <h4 class="journal-h4">2) Analyzing OCV-CCV Gaps via Internal Resistance (IR)</h4>
        <ul class="journal-ul">
          <li>While a cell displays its true potential (OCV) at rest, drawing a current ($I$) pulls down the terminal voltage (CCV) in accordance with Ohm's law:
            $$V_{ccv} = V_{ocv} - I \\times R_{internal}$$
          </li>
        </ul>
        <blockquote class="journal-quote tip"><span class="quote-icon">💡</span> <strong>Analogy:</strong> Measuring water pressure with the faucet closed shows full tank pressure (OCV). Turning the faucet fully open (load on) drops the measured pressure (CCV) due to pipe friction (internal resistance IR).</blockquote>
        <h4 class="journal-h4">3) Decoder Circuit Integration & Visual Calibration</h4>
        <ul class="journal-ul">
          <li>Programmed dynamic OCV-CCV compensation formulas to output uniform SOC estimates whether under load or at rest.</li>
          <li>Routed digital signals through 74LS series logic gates, showing capacity percentages on LED arrays and numeric displays.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">7) Key Problem-Solving Points</h3>
        <ul class="journal-ul">
          <li><strong>Major Challenge:</strong> "Mitigating parasitic contact resistance and ADC impedance noise causing measurement fluctuations."</li>
          <li><strong>Solution Methodology:</strong>
            <ul class="journal-ul">
              <li>Early breadboard configurations showed voltage swings caused by shifting contact resistances at battery contacts.</li>
              <li>Replaced breadboard connections with **Molex sockets and fixed spring-loaded battery holders** to ensure mechanical stability.</li>
              <li>Added RC filters to suppress high-frequency noise and programmed a **Moving Average Filter** in the MCU firmware, capping sensor noise variation within **0.02V**.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">8) Results & Achievements</h3>
        <ul class="journal-ul">
          <li><strong>Multi-Battery Capacity Tester Completed:</strong>
            <ul class="journal-ul">
              <li>Achieved 96% accuracy in SOC calculations using OCV-CCV compensation.</li>
              <li>Logged continuous discharge profiles under 10-ohm loads into standardized logs.</li>
              <li>Successfully implemented display control architectures using 74LS logic ICs.</li>
            </ul>
          </li>
        </ul>
        <h4 class="journal-h4">Battery Metrology Performance Outcomes</h4>
        <table class="journal-table">
        <thead>
        <tr>
          <th>Battery Under Test</th>
          <th>Nominal Voltage</th>
          <th>100% SOC Limit (OCV)</th>
          <th>0% SOC Limit (CCV Limit)</th>
          <th>Voltage Noise Deviation</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><strong>AA Alkaline Cell</strong></td>
          <td>1.5 V</td>
          <td><strong>1.62 V</strong></td>
          <td><strong>1.05 V</strong></td>
          <td>$\\pm$ 0.015 V</td>
        </tr>
        <tr>
          <td><strong>18650 Li-ion Cell</strong></td>
          <td>3.7 V</td>
          <td><strong>4.20 V</strong></td>
          <td><strong>3.00 V</strong></td>
          <td>$\\pm$ 0.020 V</td>
        </tr>
        <tr>
          <td><strong>9V Block Cell</strong></td>
          <td>9.0 V</td>
          <td><strong>9.54 V</strong></td>
          <td><strong>6.50 V</strong></td>
          <td>$\\pm$ 0.035 V</td>
        </tr>
        </tbody>
        </table>
        <hr class="journal-divider">
        <h3 class="journal-h3">9) Lessons Learned</h3>
        <ul class="journal-ul">
          <li>Learned that battery systems exhibit highly dynamic analog responses influenced by discharge rates and internal resistances.</li>
          <li>Built digital interface design skills by analyzing the truth tables of 74LS series logic gates.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">10) Connection to Back-end Engineering Roles</h3>
        <ul class="journal-ul">
          <li><strong>Relevance to Quality & Inspection:</strong> Parallels the methodologies used to **verify package contact reliability and trace contact parasitic resistance (IR drop)** in OSAT quality assurance.</li>
          <li><strong>Practical Application in Work:</strong>
            <ul class="journal-ul">
              <li>Applies to **analyzing contact interface resistance (IR drop) to evaluate packaged chip interconnect quality**, or calibrating test board parameters.</li>
              <li>Logic gate debugging experience enables rapid adaptation to ATE test pattern configurations.</li>
            </ul>
          </li>
        </ul>
      `
    },
  }
};
