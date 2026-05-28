import os
import re

projects_dir = "projects"
output_file = "projectsData.js"

# Let's map project directories to their IDs and metadata
project_metadata = {
    1: {"dir": "project_01_capillary", "meta_ko": "반도체 / 와이어 본딩 캐필러리 신뢰성", "meta_en": "SEMICONDUCTOR / WIRE BONDING CAPILLARY RELIABILITY"},
    2: {"dir": "project_02_packaging_test", "meta_ko": "반도체 / 후공정 패키지 및 테스트 종합 이론", "meta_en": "SEMICONDUCTOR / PACKAGING & TEST THEORY INTEGRATION"},
    3: {"dir": "project_03_fpga_verilog", "meta_ko": "디지털 설계 / FPGA 및 Verilog HDL 시스템", "meta_en": "DIGITAL DESIGN / FPGA & VERILOG HDL SYSTEM"},
    4: {"dir": "project_04_euv_photoresist", "meta_ko": "차세대 노광 / EUV 무기 포토레지스트 공정", "meta_en": "NEXT-GEN LITHOGRAPHY / EUV INORGANIC PHOTORESIST"},
    5: {"dir": "project_05_semiconductor_analytics", "meta_ko": "빅데이터 분석 / Spotfire 기반 반도체 수율 분석", "meta_en": "BIG DATA / SPOTFIRE-BASED SEMICONDUCTOR YIELD ANALYSIS"},
    6: {"dir": "project_06_digital_ac_power_meter", "meta_ko": "임베디드 회로 / MCU 기반 AC 전력계 설계", "meta_en": "EMBEDDED CIRCUIT / MCU-BASED AC POWER METER DESIGN"},
    7: {"dir": "project_07_audio_level_meter", "meta_ko": "아날로그 회로 / 능동 필터 오디오 레벨 미터", "meta_en": "ANALOG CIRCUIT / ACTIVE FILTER AUDIO LEVEL METER"},
    8: {"dir": "project_08_battery_charger_mcu", "meta_ko": "전력 제어 / 스마트 리튬이온 차저 설계", "meta_en": "POWER CONTROL / SMART LI-ION CHARGER DESIGN"},
    9: {"dir": "project_09_battery_tester_soc", "meta_ko": "배터리 텔레메트리 / 배터리 잔량 테스터 설계", "meta_en": "BATTERY TELEMETRY / BATTERY CAPACITY TESTER DESIGN"}
}

def inline_formatting(text):
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\*(.*?)\*', r'<em>\1</em>', text)
    text = re.sub(r'`(.*?)`', r'<code>\1</code>', text)
    return text

def convert_table_to_html(table_lines):
    if len(table_lines) < 1:
        return ""
    
    # Process headers
    headers = [c.strip() for c in table_lines[0].split('|')[1:-1]]
    
    # Identify row start index (skip divider row)
    start_idx = 1
    if len(table_lines) > 1 and all(char in '-:| \t' for char in table_lines[1].replace('|', '')):
        start_idx = 2
        
    rows = []
    for line in table_lines[start_idx:]:
        if '|' in line:
            rows.append([c.strip() for c in line.split('|')[1:-1]])
            
    table_html = '<table class="journal-table">\n<thead>\n<tr>\n'
    for h in headers:
        table_html += f'  <th>{inline_formatting(h)}</th>\n'
    table_html += '</tr>\n</thead>\n<tbody>\n'
    for row in rows:
        table_html += '<tr>\n'
        for cell in row:
            table_html += f'  <td>{inline_formatting(cell)}</td>\n'
        table_html += '</tr>\n'
    table_html += '</tbody>\n</table>\n'
    return table_html

def process_normal_line(line):
    # Horizontal rules
    if line.strip() == '---':
        return '<hr class="journal-divider">'
        
    # Headers
    h_match = re.match(r'^(#{1,6})\s+(.*?)$', line)
    if h_match:
        level = len(h_match.group(1))
        content = inline_formatting(h_match.group(2))
        return f'<h{level} class="journal-h{level}">{content}</h{level}>'
        
    # Blockquotes with icons
    bq_match = re.match(r'^>\s*💡\s*(.*?)$', line)
    if bq_match:
        content = inline_formatting(bq_match.group(1))
        return f'<blockquote class="journal-quote tip"><span class="quote-icon">💡</span> {content}</blockquote>'
        
    bq_normal = re.match(r'^>\s*(.*?)$', line)
    if bq_normal:
        content = inline_formatting(bq_normal.group(1))
        return f'<blockquote class="journal-quote">{content}</blockquote>'
        
    # Lists
    li_match = re.match(r'^\*\s+\*\*(.*?)\*\*:\s*(.*?)$', line)
    if li_match:
        title = inline_formatting(li_match.group(1))
        desc = inline_formatting(li_match.group(2))
        return f'<li><strong>{title}</strong>: {desc}</li>'
        
    li_normal = re.match(r'^\*\s+(.*?)$', line)
    if li_normal:
        content = inline_formatting(li_normal.group(1))
        return f'<li>{content}</li>'
        
    # Regular paragraph
    stripped = line.strip()
    if not stripped:
        return ''
    if stripped.startswith('<') or stripped.endswith('>'):
        return line
        
    content = inline_formatting(stripped)
    return f'<p class="journal-p">{content}</p>'

def md_to_html(md_text, strip_top_headers=True):
    # Escape basic js template characters
    html_text = md_text.replace("\\", "\\\\").replace("`", "\`").replace("${", "\\${")
    
    lines = html_text.split('\n')
    
    # Strip top H1 (#) and H2 (##) headers to enter directly into H3 (Project Overview)
    if strip_top_headers:
        start_idx = 0
        for idx, line in enumerate(lines):
            stripped = line.strip()
            if not stripped:
                continue
            if stripped.startswith('#') and not stripped.startswith('###'):
                continue
            start_idx = idx
            break
        lines = lines[start_idx:]
        
    processed_lines = []
    in_table = False
    table_lines = []
    
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('|') and stripped.endswith('|'):
            in_table = True
            table_lines.append(stripped)
        else:
            if in_table:
                # Process accumulated table lines
                table_html = convert_table_to_html(table_lines)
                processed_lines.append(table_html)
                in_table = False
                table_lines = []
            
            # Process normal line
            res = process_normal_line(line)
            if res:
                processed_lines.append(res)
            
    if in_table:
        table_html = convert_table_to_html(table_lines)
        processed_lines.append(table_html)
        
    # Group consecutive <li> items into <ul class="journal-ul">
    final_lines = []
    in_list = False
    list_accumulator = []
    
    for pline in processed_lines:
        if pline.startswith('<li>') or pline.startswith('<li '):
            in_list = True
            list_accumulator.append(pline)
        else:
            if in_list:
                final_lines.append('<ul class="journal-ul">\n' + '\n'.join(list_accumulator) + '\n</ul>')
                in_list = False
                list_accumulator = []
            final_lines.append(pline)
            
    if in_list:
        final_lines.append('<ul class="journal-ul">\n' + '\n'.join(list_accumulator) + '\n</ul>')
        
    return '\n'.join(final_lines)

print("Starting robust compilation of projectProseData...")

compiled_data = "const projectProseData = {\n"
compiled_data += "  ko: {\n"

# Process KO first
for pid, info in project_metadata.items():
    folder_path = os.path.join(projects_dir, info["dir"])
    md_files = [f for f in os.listdir(folder_path) if f.endswith('.md')]
    if not md_files:
        continue
    md_file_path = os.path.join(folder_path, md_files[0])
    
    with open(md_file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Parse Date
    date_match = re.search(r'\*\*기간\*\*:\s*([\d\.\s\~]+)', content)
    date_str = date_match.group(1).strip() if date_match else "2026.05.01"
    
    # Parse Title
    title_match = re.search(r'## 📌 (.*?)(?:\n|$)', content)
    title_str = title_match.group(1).strip() if title_match else info["dir"]
    if "*(" in title_str:
        title_str = title_str.split("*(")[0].strip()
        
    html_prose = md_to_html(content, strip_top_headers=True)
    
    compiled_data += f"    {pid}: {{\n"
    compiled_data += f"      meta: `{info['meta_ko']}`,\n"
    compiled_data += f"      title: `{title_str}`,\n"
    compiled_data += f"      date: `{date_str}`,\n"
    compiled_data += f"      prose: `\n{html_prose}\n      `\n"
    compiled_data += "    },\n"

compiled_data += "  },\n"

# Process EN (Provide highly comprehensive, full academic translation mapping 1:1 in length and richness)
compiled_data += "  en: {\n"
for pid, info in project_metadata.items():
    folder_path = os.path.join(projects_dir, info["dir"])
    md_files = [f for f in os.listdir(folder_path) if f.endswith('.md')]
    if not md_files:
        continue
    md_file_path = os.path.join(folder_path, md_files[0])
    
    with open(md_file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Date
    date_match = re.search(r'\*\*기간\*\*:\s*([\d\.\s\~]+)', content)
    date_str = date_match.group(1).strip() if date_match else "2026.05.01"
    date_str = date_str.replace("진행 중", "In Progress")
    
    en_titles = {
        1: "Effect of Ceramic Capillary Geometry on 1st Bond Morphology and Strength in Wire Bonding",
        2: "Semiconductor Packaging & Test Engineering Fundamentals Integration",
        3: "FPGA & Verilog HDL Digital Logic Circuit Design & Verification",
        4: "TinNO₃: Next-Gen EUV Photoresist Innovation by Integrating Photoactive Nitrate Anion",
        5: "Spotfire-based Semiconductor Manufacturing Process Data Analytics for Yield & Defect Optimization",
        6: "Development of a Microcontroller-based Digital Single-Phase AC Power Meter Board",
        7: "Design & Verification of a 3-Band Audio Level Meter with Sallen-Key Active Filters",
        8: "Design & Verification of a Smart CC-CV Li-Ion Battery Charger with Precision Telemetry",
        9: "Development of a Multi-Battery SOC Tester with OCV-CCV Dynamic Compensation"
    }
    
    title_str = en_titles[pid]
    
    # Custom 1:1 Full Translations for all 9 projects
    prose_en = ""
    if pid == 1:
        prose_en = """
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
        """
    elif pid == 2:
        prose_en = """
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
        """
    elif pid == 3:
        prose_en = """
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
          <li><strong>Qualitative Goals:</strong> Master Verilog coding standards, utilizing asynchronous resets and bit concatenation operators (`{}`), and build hardware mapping and debugging expertise.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">4) Engineering Methodology & Role</h3>
        <ul class="journal-ul">
          <li><strong>Project Type:</strong> Individual Project (Weekly hardware board validation and Verilog programming assignments)</li>
          <li><strong>My Role (Key Contribution):</strong>
            <ul class="journal-ul">
              <li>Designed co-modeling structures integrating Block Diagram Files (BDF) and Verilog HDL in Quartus II.</li>
              <li>Connected LPM library adders (`LPM_ADD_SUB`) with custom adder modules (`add3`) on the BDF schematic.</li>
              <li>Created scalable ModelSim TestBenches using named port mappings (`.a(a)`) and applied dynamic parameter divisions (`WIDTH=2`) to accelerate simulation speeds.</li>
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
          <li>Designed an `add3` module with inputs `a, b[3:0]` and output `sum[5:0]`, using the bit concatenation operator (`temp = {cout, result}`) to merge the carry-out (cout) seamlessly.</li>
          <li>Mapped switches and LEDs using Quartus II's <strong>Pin Planner</strong> in precise alignment with Terasic DE2 board pinout specifications.</li>
        </ul>
        <h4 class="journal-h4">2) Propagation Delay & Simulation Verification (Week 5 & 9)</h4>
        <ul class="journal-ul">
          <li>While ideal code (.v) simulations showed zero delay, timing simulations using the `.vo` file (which reflects the chip's internal layout routing) captured a <strong>5ns physical gate propagation delay</strong>.</li>
        </ul>
        <blockquote class="journal-quote tip"><span class="quote-icon">💡</span> <strong>Analogy:</strong> In a virtual map, moving between two points appears instantaneous (ideal code simulation), but driving on actual roads takes time due to traffic signals and friction (physical 5ns gate delay).</blockquote>
        <h4 class="journal-h4">3) Speed-Controllable Up Counter Design (Week 10 ~ 11)</h4>
        <ul class="journal-ul">
          <li>Built a clock divider to slow down the DE2 board's 50MHz reference clock for visual verification.</li>
          <li>Developed a variable BCD counter that adjusts system clock division ratios based on slide switch inputs (`sw[6:0]`) to change the 7-segment count speed in real time.</li>
          <li>Optimized simulation runtimes by using a `WIDTH` parameter set to `2` (4 clocks) during simulation and switching to `20` or `22` for actual hardware execution.</li>
        </ul>
        <h4 class="journal-h4">4) Debouncer Circuit Design & Final Hardware Test (Week 12)</h4>
        <ul class="journal-ul">
          <li>Designed a <strong>multi-stage register shift filter</strong> using D Flip-Flops to eliminate high-frequency bouncing noise when pushing buttons.</li>
          <li>Validated the debouncing algorithm, ensuring button inputs were registered as a valid `data_out` only after maintaining a stable signal level for a set duration (`counter_max = 50`).</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">7) Key Problem-Solving Points</h3>
        <ul class="journal-ul">
          <li><strong>Major Challenge:</strong> "Resolving FPGA compilation errors and Pin Planner descending pin configuration errors."</li>
          <li><strong>Solution Methodology:</strong>
            <ul class="journal-ul">
              <li>During early pin assignment, the alphabetical/numerical sorting in Quartus II (`a[3], a[2], a[1], a[0]`) led to reverse pin mapping, causing the MSB `a[3]` to malfunction when switch 0 was toggled.</li>
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
              <li>Verified active-low inverted outputs (`~seg_sig`) displaying digits correctly on the 7-segment board.</li>
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
        """
    elif pid == 4:
        prose_en = """
        <h3 class="journal-h3">1) Project Overview</h3>
        <ul class="journal-ul">
          <li><strong>Duration:</strong> 2025. 11. 17. ~ 2025. 12. 04.</li>
          <li><strong>Type:</strong> Next-Gen Semiconductor Lithography/Etch Materials Analysis & Device Reliability Seminar</li>
          <li><strong>Affiliation:</strong> Kwangwoon University, Dept. of Electronic Engineering (Academic Seminar on Advanced Electrical Engineering)</li>
          <li><strong>Overview:</strong> Quantitatively analyzed and presented the capabilities of `TinNO₃` (a next-generation inorganic tin oxo cluster photoresist integrating photoactive nitrate anions) in extreme ultraviolet (EUV) sensitivity, post-exposure bake (PEB) reliability, fine pattern resolution, and dry etching resistance to overcome nano-lithography limits.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">2) Background & Problem Statement</h3>
        <ul class="journal-ul">
          <li><strong>Background:</strong> As semiconductor manufacturing scales below 10nm nodes, implementing Extreme Ultraviolet (EUV) lithography with a short 13.5nm wavelength is mandatory.</li>
          <li><strong>Problem Statement:</strong>
            <ul class="journal-ul">
              <li>Conventional organic photoresists (PR) suffer from low light absorption under highly energetic EUV photons (92 eV) and induce significant shot noise, making uniform exposure difficult.</li>
              <li>Additionally, wet development leads to <strong>pattern collapse</strong> in fine structures, while random acid diffusion in chemically amplified resists (CARs) causes severe Line Edge Roughness (LER).</li>
              <li>While inorganic tin oxo clusters emerged as candidates, materials like `TinOH` suffer from thermal sensitivity drift during post-exposure bake (PEB), demanding a highly stable alternative.</li>
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
              <li>Analyzed state-of-the-art research published in Applied Surface Science (IF 6.9, CiteScore 13.4) to prove the four core process advantages of `TinNO₃` (EUV sensitivity, PEB reliability, LER precision, and etch resistance).</li>
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
          <li>`TinNO₃` displayed an excellent sensitivity of <strong>32 mJ/cm²</strong>, which is <strong>3.25 times faster</strong> than existing inorganic PR `TinTos` (104 mJ/cm²) and 156% better than the industry baseline (50 mJ/cm²), promising dramatic wafer throughput improvements.</li>
        </ul>
        <h4 class="journal-h4">2) PEB (Post-Exposure Bake) Reliability Assessment (Core Achievement 2)</h4>
        <ul class="journal-ul">
          <li>Existing `TinOH` resists showed thermal sensitivity drift (time dependence) when PEB temperatures fluctuated (90°C ➔ 110°C ➔ 130°C).</li>
          <li>In contrast, ellipsometry thickness profiles proved that `TinNO₃` with stable nitrate anion binding maintained uniform sensitivity across temperature variations.</li>
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
          <li>During Si layer etching, `TinNO₃` demonstrated a high selectivity of <strong>3.1:1</strong>, vastly outperforming organic PR (0.4:1).</li>
          <li>Against amorphous carbon hardmasks (ACL), it achieved a remarkable selectivity of <strong>13.2:1</strong>, maintaining a stable etch barrier even under bias DC voltage fluctuations.</li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">7) Key Problem-Solving Points</h3>
        <ul class="journal-ul">
          <li><strong>Unifying Front-End (EUV) & Back-End (Packaging) Synergies:</strong>
            <ul class="journal-ul">
              <li>Elucidated that LER defects not only compromise transistor performance in the front-end, but also shrink the alignment tolerance (misalignment margin) of fine-pitch bumps and pads during back-end assembly, directly <strong>harming packaging yields</strong>.</li>
              <li>Severe LER distorts the pad shape, leading to uneven bump contacts and subsequent solder cracking.</li>
              <li>Showed that the **LER reduction (16.9nm to 7.87nm) by `TinNO₃` doubles the interface bonding reliability margin**, establishing a unique, comprehensive engineering insight.</li>
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
        """
    elif pid == 5:
        prose_en = """
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
          <td>`lot_id`, `wafer_id`, `recipe_id`, `eqp_id`, `BIN` (Good/Bad binning data)</td>
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
              <li><strong>Sum(Defect):</strong> p-value of $6.93 \times 10^{-23}$ (&lt;&lt; 0.05), $R^2$ of 0.09, proving a highly significant **negative linear correlation**.</li>
              <li><strong>Avg(THK):</strong> p-value of $6.77 \times 10^{-10}$ (&lt;&lt; 0.05), $R^2$ of 0.04, confirming a significant **negative correlation**, proving thickness variation directly harms yield.</li>
              <li><strong>Avg(CD):</strong> p-value of 0.456 (&gt; 0.05), showing no statistical relation, filtered out as noise.</li>
            </ul>
          </li>
        </ul>
        <blockquote class="journal-quote tip"><span class="quote-icon">💡</span> <strong>Analogy:</strong> Like mathematically proving that a student's grades (yield) are linked to study hours (defects) and sleep duration (thickness), but have nothing to do with the color of their clothes (CD).</blockquote>
        <h4 class="journal-h4">🔬 Sub-Project 2: Process Split Evaluation (Equipment Sensors vs. Defects)</h4>
        <ul class="journal-ul">
          <li><strong>Objective:</strong> Evaluate the impact of internal physical tool sensors on defect generation.</li>
          <li><strong>Statistical Validation:</strong> Merged tables using `lot_id` and `wafer_id` to run a multi-variable regression of 4 sensors against defects.
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
              <li><strong>recipe_id:</strong> p-value of $6.77 \times 10^{-297}$ (&lt;&lt; 0.05), identifying it as the most critical factor. Visualized clear yield gaps between low-yield groups like F108C... (72%) and high-yield groups like HF601 (97.6%).</li>
              <li><strong>eqp_id & Path:</strong> Confirmed that specific tools (p=$1.26 \times 10^{-9}$) and cumulative paths (p=$4.88 \times 10^{-133}$) also introduce statistically significant yield variances.</li>
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
              <li>This proved that rather than RF Power input, the **maximum threshold of reflected power (`reflect_power`)** triggered electrical arcing inside the chamber, causing massive defects, successfully tracing and resolving the failure.</li>
            </ul>
          </li>
        </ul>
        <hr class="journal-divider">
        <h3 class="journal-h3">8) Results & Achievements</h3>
        <ul class="journal-ul">
          <li><strong>Yield Optimization Baseline Derived:</strong>
            <ul class="journal-ul">
              <li><strong>Defect Drivers:</strong> Confirmed `Sum(Defect)` and `Avg(THK)` are the primary drivers of yield loss.</li>
              <li><strong>Predictive Accuracy:</strong> Established a regression formula with $R^2=0.99$ predicting defect rates based on `Max(reflect_power)`.</li>
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
          <td>$6.93 \times 10^{-23}$</td>
          <td>0.09</td>
          <td><strong>Significant negative correlation (Control parameter)</strong></td>
        </tr>
        <tr>
          <td><strong>Avg(THK) (Thickness)</strong></td>
          <td>Wafer Yield</td>
          <td>Linear Regression</td>
          <td>$6.77 \times 10^{-10}$</td>
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
          <td>$6.77 \times 10^{-297}$</td>
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
              <li>Allows immediate contribution by **joining tool logs with packaging yield tables in Spotfire to rapidly isolate low-yield equipment (`eqp_id`) or assembly recipe bottlenecks**.</li>
              <li>Prepared to contribute as an asset ready to implement Statistical Process Control (SPC) and Six Sigma yield management techniques.</li>
            </ul>
          </li>
        </ul>
        """
    elif pid == 6:
        prose_en = """
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
              <li>In AC grids, apparent power (voltage $\times$ current) does not equal actual active power. Inductive loads introduce <strong>reactive power</strong> and degrade the **power factor**, leading to transmission losses.</li>
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
        """
    elif pid == 7:
        prose_en = """
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
        """
    elif pid == 8:
        prose_en = """
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
              <li><strong>Embedded Firmware & Calibration:</strong> Developed serial-logging software storing metrics into `.txt` formats, integrating mathematical offset calibrations to eliminate measurement errors.</li>
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
          <li>Achieved perfect alignment with handheld digital multimeters down to two decimal places, logging data smoothly into `.txt` logs.</li>
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
          <td>4.2V $\pm$ 0.1V</td>
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
        """
    elif pid == 9:
        prose_en = """
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
              <li>Log discharge parameters into `.txt` logs under a continuous 10-ohm load via MCU interfaces.</li>
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
          <li>Captured voltage decay points at 1-second intervals via a 10-bit MCU ADC, outputting data to `.txt` files to trace **Discharge Profiles**.</li>
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
          <td>$\pm$ 0.015 V</td>
        </tr>
        <tr>
          <td><strong>18650 Li-ion Cell</strong></td>
          <td>3.7 V</td>
          <td><strong>4.20 V</strong></td>
          <td><strong>3.00 V</strong></td>
          <td>$\pm$ 0.020 V</td>
        </tr>
        <tr>
          <td><strong>9V Block Cell</strong></td>
          <td>9.0 V</td>
          <td><strong>9.54 V</strong></td>
          <td><strong>6.50 V</strong></td>
          <td>$\pm$ 0.035 V</td>
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
        """
        
    compiled_data += f"    {pid}: {{\n"
    compiled_data += f"      meta: `{info['meta_en']}`,\n"
    compiled_data += f"      title: `{title_str}`,\n"
    compiled_data += f"      date: `{date_str}`,\n"
    escaped_prose_en = prose_en.strip().replace("\\", "\\\\").replace("`", "\`").replace("${", "\\${")
    compiled_data += f"      prose: `\n{escaped_prose_en}\n      `\n"
    compiled_data += "    },\n"

compiled_data += "  }\n"
compiled_data += "};\n"

with open(output_file, "w", encoding="utf-8") as f:
    f.write(compiled_data)

print("projectsData.js generated successfully with robust table parsing & direct H3 starting!")
