# 🔬 Junseo Oh // Semiconductor Back-end Engineering Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.x-F4F4F4?style=flat-square&logo=nextdotjs&logoColor=191818" alt="Next.js" />
  <img src="https://img.shields.io/badge/Notion%20API-Live%20Bound-f0ece4?style=flat-square&logo=notion&logoColor=191818" alt="Notion API" />
  <img src="https://img.shields.io/badge/Localization-KO%20%2F%20EN%20Dual-1b5def?style=flat-square" alt="i18n Localization" />
  <img src="https://img.shields.io/badge/Theme-Cream%20Editorial-e25327?style=flat-square" alt="Cream Editorial Theme" />
</p>

---

## 👤 About Me (오준서, Junseo Oh)

> **"반도체 불량은 양산 후에 사후 대응하는 것이 아닙니다. 예방과 근본 원인 역추적을 통해 신뢰성을 확보하는 것이 엔지니어로서의 오너십입니다."**

안녕하세요. **반도체 후공정 (패키징 & 테스트)** 직무를 지향하며, 데이터 기반 결함 분석 및 설비 신뢰성 평가 역량을 보유한 엔지니어 **오준서(Junseo Oh)**입니다.

* 📧 **Contact**: [junseo.oh.kr@gmail.com](mailto:junseo.oh.kr@gmail.com)
* 🏫 **Academic**: 광운대학교 전기공학과 전공 (반도체소자공학, 디지털논리회로설계 이수)
* 🏆 **Key Career & Training**:
  - **SK하이닉스 주관** 청년 반도체 인재 양성 과정 **`SK Hy-Po 8기`** 과정 수료
  - 세계적 반도체 후공정 1티어 대기업 **`Amkor Technology`** 직무 연계 스터디 및 경력 궤적 완성
  - **`TIBCO Spotfire`** 및 Python 기반 반도체 공정 결함 상관관계 분석 및 수율 최적화 분석 R&D 진행

---

## 🖥️ About The Portfolio Website

이 저장소는 저의 실무 프로젝트, 학술 연표, 핵심 전공 역량 데이터베이스를 한눈에 볼 수 있도록 자체 설계하고 배포한 **프리미엄 크림 에디토리얼 테마(Light Cream Editorial Terminal) 포트폴리오 웹사이트**입니다.

### 🌟 Key Engineering Features

1. **Notion API 실시간 바인딩 (CMS)**:
   - 노션의 개인 포트폴리오 데이터베이스(스킬 엔트리 28개 및 프로젝트 리포트)를 실시간으로 Next.js 백엔드 서버에 바인딩하여, 노션에서 내용을 갱신하는 즉시 웹사이트에 점진적 정적 재생성(ISR) 방식으로 즉각 반영되도록 유기적으로 설계했습니다.
2. **원클릭 고해상도 로컬 번역 시스템 (KO/EN Translation)**:
   - 반도체 패키징 공정의 핵심 용어인 *치핑, 보이드, 전단강도, 와이어 쏠림* 등의 전공 표현들을 JEDEC 국제 규격(JESD22) 표준 용어인 **`Chipping`, `Voiding`, `Shear Strength`, `Wire Sweep`**으로 100% 부합하게 번역한 로컬 딕셔너리 시스템을 구축했습니다.
   - 단 하나의 버튼 토글로 모달 팝업 상세 내용, 실물 이력, UI 텍스트 사전 전체가 매끄럽게 영문/국문으로 전환되어 외국계 기업(OSAT/IDM) 스크리닝에도 최적화되어 있습니다.
3. **Codedgar-style 프리미엄 에디토리얼 미학 (`codedgar.com` 벤치마킹)**:
   - 차분한 크림 화이트(`#F4F4F4`)와 샌드 베이지(`#f0ece4`), 소프트 차콜 블랙(`#191818`) 톤을 조율한 미니멀리즘 잡지 감성을 구현했습니다.
   - **Fraunces** Serif 서체와 **Plus Jakarta Sans** 산세리프 서체를 연동하여 독창적이고 고급스러운 레이아웃을 제공합니다.
   - macOS 스타일 3색 윈도우 도트 제어판, 디지털 블루 스캔라인 애니메이션, 스크롤 위치 연동 세로 눈금 내비게이터(Wayfinding Nav)를 탑재했습니다.
4. **VIM Editor 감성의 하단 고정 상태 표시줄 (Bottom Status Bar)**:
   - 현재 작동 모드(`mode: live_notion`), 파일 경로(`~/portfolio/junseo.oh`), 실시간 학습 중인 직무 트랙 및 사용자의 로컬 실제 시간을 dynamic하게 추적해 띄워주는 터미널 인터페이스를 구현했습니다.

---

## 🎯 Core Competencies (핵심 역량)

### 📊 1. Data-Driven Defect Analysis & Yield Optimization
* **Spotfire & Python**: 웨이퍼 맵상의 불량 스크래치, 링, 엣지 결함 유형을 분류하는 머신러닝 클러스터링 모델을 시뮬레이션하고, TIBCO Spotfire 대시보드로 불량률 패턴과 공정 파라미터(온도, 압력, 가스 유량) 데이터 간의 상관관계를 통계적으로 도출(결함 검출 정확도 93% 확보).

### 🔬 2. Semiconductor Packaging & Reliability Engineering (JEDEC)
* **JEDEC 표준에 입각한 신뢰성 검증**: HAST(Highly Accelerated Stress Test), ESD, Temperature Cycling 등의 패키지 신뢰성 검증 규격(JESD22) 분석력을 보유했습니다.
* **열응력 해석 및 기계 물리 모델링**: 실리콘 칩(Die)과 서브스트레이트 기판 간의 CTE(열팽창계수) 불일치로 인한 휨(Warping) 및 크랙 메커니즘을 탐구하고, 고온 에폭시 몰딩 컴파운드(EMC) 점도 유동으로 인한 와이어 휩(Wire Sweep, 쏠림) 및 몰드 기포(Void) 불량을 제어하기 위한 물성(Tg 등) 최적화 가이드를 수립했습니다.

### 🛠️ 3. Physical Root-Cause Analysis (RCA) & Troubleshooting
* **RCA 프레임워크**: 공정 결함 및 오동작 발생 시 단순 기록에 머물지 않고 **5Why 및 피시본(Fishbone) 다이어그램**을 가동해 장비 인자와 소재 특성을 역추적해 근본적 대책을 도출합니다.
* **크로스펑셔널 소통 & 오너십**: 앰코테크놀로지 연계 교육 및 공정 부트캠프를 거치며, 원청 종합반도체사(IDM) 및 협력사 이해관계자 요구 조율과 적극적인 사후 팔로우업(Aftercare) 능력을 갖추었습니다.

---

## 🛠️ Technical Toolchain (기술 툴 박스)

| 분류 | 세부 보유 기술 및 도구 |
| :--- | :--- |
| **데이터 & 분석** | **TIBCO Spotfire**, Python, Pandas, NumPy, SQL, Tableau, Matplotlib |
| **회로 & 시뮬레이션** | **MATLAB**, **Simulink**, **Simscape** (열-기계-전기 다중 도메인 가상 검증), Verilog HDL, ModelSim, Quartus II |
| **품질 및 규격** | **JEDEC Standards (JESD22)**, FMEA, SPC (통계적 공정 제어), HAST/ESD/TC Spec |
| **협업 & 문서화** | Notion (SOP/지식 베이스 구축), Git/GitHub (형상 관리), Figma (대시보드 UI 설계), Mermaid |

---

## 🏆 Career & Education Trajectory

* **2026.04 ~ 현재** | **OSAT 엔지니어 직무 연계 스터디 (Amkor Technology)**
  - 1티어 글로벌 OSAT 대기업 앰코 실무 연계 교육 및 패키지 사양 분석
* **2026.01 ~ 2026.03** | **SK하이닉스 청년 반도체 인재 양성 과정 (SK Hy-Po 8기)**
  - 전공 노하우(포토, 식각, 박막 등) 및 백엔드 테스트/패키징 품질 신뢰성 학업 수료
* **2025.07 ~ 2025.09** | **반도체 제조 공정 및 불량 데이터 분석 프로젝트 (Letuin)**
  - Spotfire 기반 공정 파라미터 결함 상관관계 분산 분석 및 기계적 메커니즘 분석
* **2021.03 ~ 2025.02** | **광운대학교 전기공학과 학사 졸업**
  - 핵심 전공: 반도체소자공학, 디지털논리회로설계, 전기전자재료물성학, 회로이론 정복

---

## 📂 Repository Directory Structure

```bash
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── PortfolioClient.js   # ⭐ 메인 대시보드 컴포넌트 (KO/EN 다국어 사전 내장)
│   │   ├── api/
│   │   │   └── project-content/     # Notion API 실시간 마크다운 본문 파서 API
│   │   ├── globals.css              # ⭐ 크림 에디토리얼 테마 HSL 토큰 & 애니메이션
│   │   ├── layout.js                # 메인 레이아웃 및 SEO 최적화 메타 데이터
│   │   └── page.js                  # Notion SDK 연동 정적 페이지 컨트롤러 (ISR 60s)
```

---

## ✉️ Contact & Collaboration

반도체 후공정 혁신을 만들어 갈 주도적인 엔지니어, **오준서**입니다.   
공동의 기술 탐구, 프로젝트 협업 문의, 채용 관련 연락은 언제나 환영합니다!

* **Email**: [junseo.oh.kr@gmail.com](mailto:junseo.oh.kr@gmail.com)
* **LinkedIn**: [Junseo Oh 프로필 바로가기](https://linkedin.com)
* **GitHub**: [github.com/oasunryo](https://github.com/oasunryo)

---
<p align="center">
  <i>Inspired by codedgar.com | Built by Junseo Oh. © 2026. All rights reserved.</i>
</p>
