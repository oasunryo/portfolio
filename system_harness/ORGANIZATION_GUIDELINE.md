# 🗂️ 반도체 포트폴리오 워크스페이스 자동 파일 정리 및 AI 프롬프트 가이드라인

이 문서는 포트폴리오 빌더 내에 생성되는 수많은 마크다운(MD) 및 PDF 파일을 최적의 구조로 자동 분류하고 유지하기 위해 설계된 **AI 에이전트 전용 가이드라인(Harness)**입니다.

AI 모델(Antigravity 등)은 새로운 파일이 감지되거나 사용자가 파일을 일괄 배치했을 때, 이 가이드라인의 규칙에 따라 스스로 파일의 메타데이터 및 내용을 파악하고 적절한 디렉토리로 자동 라우팅해야 합니다.

---

## 1. 🏗️ 워크스페이스 최적 아키텍처 (Perfect Directory Structure)

AI와 사람이 모두 혼란 없이 작업할 수 있는 가장 완벽한 폴더 트리 구조는 다음과 같습니다.

```text
portfolio_website_builder/
├── 📁 projects/                      # 개별 포트폴리오 프로젝트 폴더군
│   ├── 📁 project_01_capillary/       # 프로젝트별 독립 폴더 (MD + PDF 세트)
│   │   ├── project_01_capillary_geometry.md
│   │   └── 260518 Capillary in Wire Bonding.pdf
│   ├── 📁 project_02_packaging_test/
│   │   └── project_02_semiconductor_packaging_test_fundamentals.md
│   ├── 📁 project_03_fpga_verilog/
│   │   └── project_03_fpga_verilog_design.md
│   ├── 📁 project_04_euv_photoresist/
│   │   ├── project_04_euv_photoresist_innovation.md
│   │   └── project_04_seminar.pdf
│   ├── 📁 project_05_semiconductor_analytics/
│   │   ├── project_05_semiconductor_data_analytics.md
│   │   ├── project5_Project_1_Chip_Yield_Factor_Analysis.pdf
│   │   ├── project5_Project_2_Process_Split_Defect_Analysis.pdf
│   │   └── project5_Project_3_Wafer_Yield_Factor_Analysis.pdf
│   ├── 📁 project_06_digital_ac_power_meter/
│   │   ├── project_06_digital_ac_power_meter.md
│   │   └── project6.pdf
│   ├── 📁 project_07_audio_level_meter/
│   │   ├── project_07_audio_level_meter.md
│   │   └── project7.pdf
│   ├── 📁 project_08_battery_charger_mcu/
│   │   ├── project_08_battery_charger_mcu.md
│   │   └── project8.pdf
│   └── 📁 project_09_battery_tester_soc/
│       ├── project_09_battery_tester_soc.md
│       └── project9.pdf
├── 📁 system_harness/                # AI 가이드라인, 템플릿, 메타 문서 모음
│   ├── README.md
│   ├── requirements.md
│   ├── project_template.md
│   ├── prompt_harness.md
│   └── ORGANIZATION_GUIDELINE.md     # 본 파일
└── 📁 web_output/                    # 빌드 및 퍼블리싱용 웹 정적 파일 (HTML/CSS/JS)
```

---

## 2. 🤖 AI 자동 파일 분류 및 라우팅 알고리즘 (AI File Router)

새로운 파일(사용자 수동 업로드 또는 AI 생성)이 워크스페이스에 감지되었을 때 AI가 실행해야 하는 **4단계 분석 절차**입니다.

### [1단계] 파일 타입 및 내용 분석 (Content Inspection)
- **마크다운 (.md)**: 파일 상단의 헤더(`#`), 파일명(`project_XX`), 내용을 읽어 프로젝트 순번과 도메인(반도체, 회로, 데이터 분석 등)을 식별합니다.
- **PDF (.pdf)**: 텍스트 내용 또는 파일명을 분석하여 관련된 하위 프로젝트(예: `project5_*` 또는 `260518 Capillary...` 등)를 추적합니다.
- **기타 웹 리소스 (HTML, CSS, JS, Image)**: 웹 퍼블리싱 리소스인지, 문서 템플릿인지 구분합니다.

### [2단계] 소속 디렉토리 판정 (Target Routing)
- 분석 결과를 기반으로 목적지 폴더를 동적으로 매핑합니다.
  - **프로젝트 설명 및 증빙 PDF** 👉 `projects/project_XX_이름/`
  - **템플릿/가이드/시스템 문서** 👉 `system_harness/`
  - **정적 웹 빌드 파일** 👉 `web_output/` 또는 루트

### [3단계] 폴더 자동 생성 및 이동 (Move Execution)
- 만약 해당 프로젝트 번호의 폴더가 존재하지 않는다면, `mkdir -p` 명령어를 통해 먼저 신규 폴더를 자동 생성한 후 파일을 안전하게 이동시킵니다.

### [4단계] 매핑 리포팅 (Feedback Loop)
- 사용자에게 정리 결과를 투명하게 보고하고, 정리된 경로 링크를 제공합니다.

---

## 💡 이해를 돕기 위한 파일 분류의 구체적인 예시 (Examples)

### 📌 예시 1: 사용자가 새로운 보고서 PDF를 루트에 던져놓았을 때 (`project10_Sputter_Deposition.pdf`)
1. **AI 분석**: 파일명에 `project10`과 반도체 장비 공정인 `Sputter Deposition`이 포함되어 있음을 파악합니다.
2. **폴더 매핑**: `projects/project_10_sputter_deposition/` 경로가 타겟으로 잡힙니다.
3. **이동 수행**: 기존 폴더가 없으므로 `mkdir`로 폴더를 신설하고 `mv project10_Sputter_Deposition.pdf projects/project_10_sputter_deposition/`를 수행합니다.
4. **결과**: `projects/project_10_sputter_deposition/project10_Sputter_Deposition.pdf`

### 📌 예시 2: AI가 새로운 웹 프론트엔드 스타일 파일을 작성했을 때 (`main.css`)
1. **AI 분석**: 웹 애플리케이션의 핵심 스타일 가이드라인이 담긴 CSS 파일입니다.
2. **폴더 매핑**: 포트폴리오 웹사이트 결과물이 모이는 `web_output/` 혹은 루트 디렉토리로 잡힙니다.
3. **이동 수행**: `web_output/css/main.css`로 자동 이관합니다.

---

## 3. 🎯 AI 강제 규칙 (Strict Prompt Harness Rule)

AI 모델은 이 파일을 워크스페이스 루트에서 읽은 순간부터 다음 명령 규칙을 100% 준수해야 합니다:

> **[RULE]**
> 사용자가 임의의 새로운 파일(예: `.pdf`, `.md`, `.png` 등)을 워크스페이스 내에 생성하거나 올려두었을 때, AI는 **첫 응답의 첫머리에 "📂 신규 감지 파일 정리 프로세스 진행"을 명시**하고, 본 `ORGANIZATION_GUIDELINE.md` 규칙에 따라 최적의 프로젝트 폴더를 판단하여 **스스로 파일을 먼저 정리하는 명령어 구동을 제안**해야 합니다.
