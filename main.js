document.addEventListener('DOMContentLoaded', () => {
  console.log("Semiconductor Portfolio Builder: Javascript Mounting...");

  // Safety checker wrapper for adding event listeners securely
  const safeAddListener = (elementId, event, callback) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.addEventListener(event, callback);
    } else {
      console.warn(`Element with ID '${elementId}' not found during script mounting.`);
    }
  };

  // ==========================================================================
  // 1. DOM ELEMENTS SELECTION & SANITY CHECK
  // ==========================================================================
  const inputName = document.getElementById('input-name');
  const inputRole = document.getElementById('input-role');
  const inputIntro = document.getElementById('input-intro');
  const inputEmail = document.getElementById('input-email');
  const inputLinkedin = document.getElementById('input-linkedin');

  const previewName = document.getElementById('preview-name');
  const previewRole = document.getElementById('preview-role');
  const previewIntro = document.getElementById('preview-intro');
  const previewEmail = document.getElementById('preview-email');
  const previewLinkedin = document.getElementById('preview-linkedin');

  const card = document.getElementById('portfolio-preview-card');
  const cardContainer = document.getElementById('canvas-card-holder');
  const designerCanvas = document.querySelector('.designer-canvas');
  
  const btnKo = document.getElementById('btn-ko');
  const btnEn = document.getElementById('btn-en');

  // Zoom Elements
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const zoomValueEl = document.getElementById('zoom-value');

  // Floating Tools Elements
  const btnToolMove = document.getElementById('btn-tool-move');
  const btnToolHand = document.getElementById('btn-tool-hand');
  const btnToolReset = document.getElementById('btn-tool-reset');
  const minimap = document.getElementById('minimap');

  // Notion Side Peek Panel Elements
  const sidePeekPanel = document.getElementById('side-peek-panel');
  const sidePeekOverlay = document.getElementById('side-peek-overlay');
  const btnClosePeek = document.getElementById('btn-close-peek');
  const peekMarkdownBody = document.getElementById('peek-markdown-body');

  // Search input
  const searchInput = document.getElementById('search-input');

  // Minimap Elements
  const minimapCardsLayer = document.getElementById('minimap-cards-layer');
  const minimapViewport = document.getElementById('minimap-viewport');

  // All scattered cards selector
  const allCards = document.querySelectorAll('.preview-card, .project-block-card');

  // ==========================================================================
  // 1.1 GLOBAL STATE VARIABLES & DYNAMIC TEXTAREAS (ReferenceError Fixes!)
  // ==========================================================================
  let isPanning = false;
  let startX = 0;
  let startY = 0;
  let panX = 0;
  let panY = 0;
  let zoomLevel = 98;
  let currentLang = 'ko';

  // Skill tag elements selection
  const skillBtns = document.querySelectorAll('.skill-tree-item');

  // Dynamic textarea height adjustment (Hug Contents / Auto-grow)
  const textareas = document.querySelectorAll('.auto-grow, .auto-grow-textarea, textarea');
  const adjustHeight = (textarea) => {
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  textareas.forEach(textarea => {
    textarea.addEventListener('input', () => adjustHeight(textarea));
    // Perform initial resize to wrap pre-loaded text perfectly
    setTimeout(() => adjustHeight(textarea), 100);
  });
  
  // ==========================================================================
  // 2. ABSOLUTE VIEWPORT BLOCKS LAYOUT ENGINE (Locked Inside Visible Screen Space)
  // ==========================================================================
  const cardPositions = {};

  // Boundaries fit exactly to designerCanvas client width/height dynamically on paint
  const getCanvasDimensions = () => {
    const w = designerCanvas ? (designerCanvas.clientWidth || window.innerWidth - 380) : 1000;
    const h = designerCanvas ? (designerCanvas.clientHeight || window.innerHeight) : 800;
    return { width: w, height: h };
  };

  // Generate a beautiful, scattered random layout on load (Strictly inside the screen boundaries without heavy overlap)
  const scatterCardsRandomly = () => {
    try {
      allCards.forEach(c => {
        if (c.id === 'portfolio-preview-card') {
          c.style.display = 'none';
          return;
        }
        c.style.setProperty('--card-pos-transition', '1s');
      });

      const dims = getCanvasDimensions();
      const screenW = dims.width;
      const screenH = dims.height;

      const projW = 320;
      const projH = 220; // Styled height

      // 1. Shuffled project card IDs for random sequence scattering
      const projectCardIds = [];
      for (let i = 1; i <= 9; i++) {
        projectCardIds.push(`proj-card-${i}`);
      }
      for (let i = projectCardIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [projectCardIds[i], projectCardIds[j]] = [projectCardIds[j], projectCardIds[i]];
      }

      // Distribute in a loose 3x3 grid matching the canvas area
      const cols = 3;
      const rows = 3;

      // Padding at boundaries
      const padX = 40;
      const padY = 80; // Leaves space for canvas top bar

      const cellW = (screenW - padX * 2) / cols;
      const cellH = (screenH - padY * 2) / rows;

      projectCardIds.forEach((cardId, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        // Center coordinates of cell
        const cellCenterX = padX + col * cellW + cellW / 2;
        const cellCenterY = padY + row * cellH + cellH / 2;

        // Position to center the card inside the cell
        let targetX = cellCenterX - projW / 2;
        let targetY = cellCenterY - projH / 2;

        // Add moderate, organic jitter so it looks hand-scattered but never overlaps heavily
        const jitterRangeX = Math.max(10, (cellW - projW) * 0.4);
        const jitterRangeY = Math.max(10, (cellH - projH) * 0.4);

        const jitterX = (Math.random() - 0.5) * jitterRangeX;
        const jitterY = (Math.random() - 0.5) * jitterRangeY;

        targetX += jitterX;
        targetY += jitterY;

        // Strict boundary capping to stay completely visible inside screen
        cardPositions[cardId] = { 
          x: Math.max(20, Math.min(screenW - projW - 20, targetX)), 
          y: Math.max(80, Math.min(screenH - projH - 40, targetY)) 
        };
      });

      applyCardCoordinates();
    } catch (err) {
      console.error("Error scattering cards:", err);
    }
  };

  const applyCardCoordinates = () => {
    allCards.forEach(c => {
      if (c.id === 'portfolio-preview-card') return;
      const pos = cardPositions[c.id];
      if (pos) {
        c.style.left = `${pos.x}px`;
        c.style.top = `${pos.y}px`;
      }
    });
  };

  // Re-organize cards in a neat structured grid inside visible screen space
  const organizeCardsGrid = () => {
    try {
      allCards.forEach(c => {
        if (c.id === 'portfolio-preview-card') return;
        c.style.setProperty('--card-pos-transition', '0.6s cubic-bezier(0.16, 1, 0.3, 1)');
      });

      const dims = getCanvasDimensions();
      const screenW = dims.width;
      const screenH = dims.height;

      // Centered compact layout geometry (Compact project cards are 320px wide)
      const cols = Math.max(2, Math.floor(screenW / 360));
      const projW = 320;
      const projH = 260;
      const gapX = 30; // compact gap
      const gapY = 20; 

      // Shuffle order of all cards for random grid sequence
      const shuffledCards = Array.from(allCards).filter(c => c.id !== 'portfolio-preview-card');
      for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
      }

      const totalRows = Math.ceil(shuffledCards.length / cols);
      const gridW = cols * projW + (cols - 1) * gapX; 
      const gridH = totalRows * projH + (totalRows - 1) * gapY;

      // Start centering
      const gridStartX = Math.max(20, (screenW - gridW) / 2);
      const gridStartY = Math.max(80, (screenH - gridH) / 2);

      shuffledCards.forEach((c, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);

        let x = gridStartX + col * (projW + gapX);
        let y = gridStartY + row * (projH + gapY);

        // Constrain so they don't break visible edges
        x = Math.max(20, Math.min(screenW - projW - 20, x));
        y = Math.max(80, Math.min(screenH - projH - 40, y));

        cardPositions[c.id] = { x, y };
      });

      applyCardCoordinates();
    } catch (err) {
      console.error("Error organizing cards:", err);
    }
  };

  // ==========================================================================
  // 3. MOVE TOOL: DRAG INDIVIDUAL BLOCKS
  // ==========================================================================
  let isDraggingCard = false;
  let activeDragCard = null;
  let cardStartX = 0;
  let cardStartY = 0;

  allCards.forEach(singleCard => {
    singleCard.addEventListener('mousedown', (e) => {
      // Prevent drag if clicking on interactive child components like buttons or inputs
      if (e.target.closest('.expand-btn') || e.target.closest('.editor-input') || e.target.closest('a') || e.target.closest('.modal-close-btn') || e.target.closest('.side-peek-close-btn')) {
        return; // Do NOT stopPropagation here so click fires normally
      }

      isDraggingCard = true;
      activeDragCard = singleCard;

      // Bring clicked card to front
      allCards.forEach(c => c.style.zIndex = '3');
      singleCard.style.zIndex = '5';

      // Disable card transition during drag so it follows the pointer instantly
      singleCard.style.setProperty('--card-pos-transition', '0s');

      const pos = cardPositions[singleCard.id];
      if (pos) {
        cardStartX = e.clientX - pos.x;
        cardStartY = e.clientY - pos.y;
      }

      e.stopPropagation(); // prevent panning drag bubbling
    });
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDraggingCard || !activeDragCard) return;

    const dx = e.clientX - cardStartX;
    const dy = e.clientY - cardStartY;

    const dims = getCanvasDimensions();
    const cardW = (activeDragCard.id === 'portfolio-preview-card') ? 520 : 320;
    const cardH = (activeDragCard.id === 'portfolio-preview-card') ? 500 : 260;

    // Strict boundary cap to stay within visible screen limits
    const x = Math.max(10, Math.min(dims.width - cardW - 10, dx));
    const y = Math.max(10, Math.min(dims.height - cardH - 10, dy));

    if (cardPositions[activeDragCard.id]) {
      cardPositions[activeDragCard.id].x = x;
      cardPositions[activeDragCard.id].y = y;
    }

    activeDragCard.style.left = `${x}px`;
    activeDragCard.style.top = `${y}px`;
  });

  window.addEventListener('mouseup', () => {
    if (isDraggingCard && activeDragCard) {
      isDraggingCard = false;
      // Re-enable smooth transition style
      activeDragCard.style.setProperty('--card-pos-transition', '0.4s cubic-bezier(0.16, 1, 0.3, 1)');
      activeDragCard = null;
    }
  });

  // ==========================================================================
  // 4. MULTI-LANGUAGE TRANSLATION DATABASE
  // ==========================================================================
  const langData = {
    ko: {
      name: "오준서",
      role: "후공정 엔지니어",
      intro: "안녕하세요. 광운대학교에서 전기공학을 전공하고 있으며, 반도체 전/후공정 이론 및 회로 설계에 깊은 관심을 가진 학부생 오준서입니다. 2026년 7월, 글로벌 OSAT 기업인 앰코테크놀로지(Amkor Technology)의 후공정(Packaging & Test) 분야 엔지니어로 합류할 예정입니다. 본 포트폴리오는 학부생 오준서가 실무 현장의 주니어 엔지니어로 성장하기까지 수행한 9대 프로젝트와 기술적 여정을 담고 있습니다.",
      email: "junseo.oh.kr@gmail.com",
      linkedin: "linkedin.com/in/junseokorea",
      labels: {
        name: "이름",
        role: "직무",
        intro: "소개",
        email: "이메일",
        linkedin: "링크드인",
        listView: "리스트 뷰",
        tabProjects: "프로젝트",
        tabSkills: "스킬",
        tabSearch: "검색",
        badge: "SEMICONDUCTOR JUNIOR PORTFOLIO",
        lblStatus: "STATUS",
        valStatus: "READY TO JOIN",
        lblDomain: "DOMAIN",
        valDomain: "PACKAGING & TEST",
        helper: "원하는 블록을 클릭해 보세요. 더 자세한 내용을 확인할 수 있습니다.",
        canvasTitle: "캔버스",
        badgeTitle: "동적 포트폴리오",
        searchPlaceholder: "프로젝트 및 장비 검색...",
        searchDesc: "실시간으로 매칭되는 캔버스 블록이 즉각 필터링됩니다.",
        
        proj1: "와이어 본딩 캐필러리 신뢰성",
        proj2: "후공정 패키지 및 테스트 종합 이론",
        proj3: "FPGA 및 Verilog HDL 시스템",
        proj4: "EUV 무기 포토레지스트 공정",
        proj5: "Spotfire 기반 반도체 수율 분석",
        proj6: "MCU 기반 AC 전력계 설계",
        proj7: "능동 필터 오디오 레벨 미터",
        proj8: "스마트 리튬이온 차저 설계",
        proj9: "배터리 잔량 테스터 설계",

        lblStart: "시작일",
        lblEnd: "종료일",
        lblDur: "기간",
        btnExpand: "더 보기",
        durSuffix: "주"
      }
    },
    en: {
      name: "Junseo Oh",
      role: "Semiconductor Packaging & Test Engineer",
      intro: "Hello. I am Junseo Oh, an Electrical Engineering student at Kwangwoon University specializing in semiconductor process theory and hardware system design. In July 2026, I will join Amkor Technology, a global leader in OSAT, as a Semiconductor Packaging & Test Engineer. This interactive portfolio documents my engineering odyssey and technical growth across 9 major academic and practical projects.",
      email: "junseo.oh.kr@gmail.com",
      linkedin: "linkedin.com/in/junseokorea",
      labels: {
        name: "Name",
        role: "Role",
        intro: "About",
        email: "Email",
        linkedin: "LinkedIn",
        listView: "List View",
        tabProjects: "Projects",
        tabSkills: "Skills",
        tabSearch: "Search",
        badge: "SEMICONDUCTOR JUNIOR PORTFOLIO",
        lblStatus: "STATUS",
        valStatus: "READY TO JOIN",
        lblDomain: "DOMAIN",
        valDomain: "PACKAGING & TEST",
        helper: "Try clicking any block. You can see more details.",
        canvasTitle: "Canvas",
        badgeTitle: "DYNAMIC PORTFOLIO",
        searchPlaceholder: "Search projects and equipment...",
        searchDesc: "Search function will be integrated when the actual portfolio is merged.",
        
        proj1: "Wire Bonding Capillary Geometry & Reliability",
        proj2: "Semiconductor Packaging & Test Theory Integration",
        proj3: "FPGA & Verilog HDL Digital System Design",
        proj4: "Next-Gen EUV Inorganic Photoresist Material",
        proj5: "Spotfire-based Wafer Yield & Defect Big Data Analytics",
        proj6: "ATmega328P MCU High-Precision AC Power Meter Board",
        proj7: "Sallen-Key Active Filter 3-Band Audio Level Meter",
        proj8: "Smart Li-ion Battery Charger with CC-CV Buck Converter",
        proj9: "OCV-CCV Dynamic Compensation Battery Capacity Tester",

        lblStart: "Start",
        lblEnd: "End",
        lblDur: "Duration",
        btnExpand: "Read More",
        durSuffix: " wks"
      }
    }
  };

  // ==========================================================================
  // 5. NOTION-STYLE SIDE PEEK SYSTEM WITH DYNAMIC CENTER AUTO-ZOOM
  // ==========================================================================
  const centerCardInVisibleArea = (cardId, isSidePeekOpen = true) => {
    try {
      const pos = cardPositions[cardId];
      if (!pos) return;

      // Enable smooth transition
      cardContainer.style.setProperty('--pan-transition', '0.8s cubic-bezier(0.16, 1, 0.3, 1)');

      const canvasWidth = designerCanvas.clientWidth;
      const canvasHeight = designerCanvas.clientHeight;

      // Left sidebar is exactly 380px wide. Notion Side Peek is exactly 680px wide.
      // We calculate the screen coordinate 'sx' for the exact visual center of the remaining space.
      let sx = 380 + (canvasWidth - 380) / 2; // if closed
      if (isSidePeekOpen) {
        sx = 380 + (canvasWidth - 380 - 680) / 2;
      }
      const sy = canvasHeight / 2;

      // Comfortably frame the card at 75% zoom when panel is open, otherwise return to 98%
      const targetZoom = isSidePeekOpen ? 75 : 98; 
      const zoomFrac = targetZoom / 100;

      const cardW = 520;
      const cardH = (cardId === 'portfolio-preview-card') ? 500 : 380;

      // Selected card center point in board coordinates
      const px = pos.x + cardW / 2;
      const py = pos.y + cardH / 2;

      // Virtual board center coordinates (corresponds to CSS transform-origin: center center)
      const BOARD_CENTER_X = BOARD_WIDTH / 2;
      const BOARD_CENTER_Y = BOARD_HEIGHT / 2;

      // Actual HTML container viewport center
      const ViewportCenterX = canvasWidth / 2;
      const ViewportCenterY = canvasHeight / 2;

      // Panning offset formula: moves target point (px, py) to screen coordinates (sx, sy) under zoomFrac
      let tx = sx - ViewportCenterX - (px - BOARD_CENTER_X) * zoomFrac;
      let ty = sy - ViewportCenterY - (py - BOARD_CENTER_Y) * zoomFrac;

      // Apply strict limits to avoid moving into void
      panX = Math.max(MIN_PAN_X, Math.min(MAX_PAN_X, tx));
      panY = Math.max(MIN_PAN_Y, Math.min(MAX_PAN_Y, ty));

      zoomLevel = targetZoom;
      if (zoomValueEl) zoomValueEl.textContent = `${zoomLevel}%`;
      cardContainer.style.setProperty('--zoom', zoomFrac);
      cardContainer.style.setProperty('--pan-x', `${panX}px`);
      cardContainer.style.setProperty('--pan-y', `${panY}px`);

      updateMinimapViewport();
    } catch (err) {
      console.error("Error auto-centering card:", err);
    }
  };

  const openSidePeek = (projId) => {
    try {
      const id = parseInt(projId);
      if (isNaN(id) || id < 1 || id > 9) {
        console.warn(`[SidePeek] Invalid project ID: "${projId}"`);
        return;
      }
      
      const langData = projectProseData[currentLang];
      const data = langData ? (langData[id] || langData[String(id)]) : null;
      if (!data) {
        console.warn(`[SidePeek] No data found for lang="${currentLang}", id=${id}`);
        return;
      }

      const contentHtml = `
        <article class="newsletter-article">
          <div class="newsletter-meta">${data.meta}</div>
          <h1 class="newsletter-title">${data.title}</h1>
          
          <div class="newsletter-byline">
            <div class="newsletter-author-img">JO</div>
            <div>
              <div class="newsletter-author-name">${currentLang === 'ko' ? '오준서 엔지니어' : 'Junseo Oh, Engineer'}</div>
              <div class="newsletter-date">${data.date}</div>
            </div>
          </div>

          <div class="newsletter-prose">
            ${data.prose}
          </div>
        </article>
      `;

      if (peekMarkdownBody) {
        peekMarkdownBody.innerHTML = contentHtml;
        if (window.MathJax) {
          window.MathJax.typesetPromise([peekMarkdownBody]).catch(err => console.error("MathJax typeset error:", err));
        }
      }

      if (window.lucide) {
        window.lucide.createIcons();
      }

      // Slide-in panel classes toggle
      if (sidePeekPanel) sidePeekPanel.classList.add('open');
      if (sidePeekOverlay) sidePeekOverlay.classList.add('open');
    } catch (err) {
      console.error("Error opening side peek:", err);
    }
  };

  const closeSidePeek = () => {
    try {
      if (sidePeekPanel) sidePeekPanel.classList.remove('open');
      if (sidePeekOverlay) sidePeekOverlay.classList.remove('open');
    } catch (err) {
      console.error("Error closing side peek:", err);
    }
  };

  // Unified click handler for expand buttons AND sidebar list items (document-level fallback)
  document.addEventListener('click', (e) => {
    // 1. Expand button on canvas cards
    const expandBtn = e.target.closest('.expand-btn');
    if (expandBtn) {
      e.preventDefault();
      e.stopPropagation();
      const projId = expandBtn.getAttribute('data-project-id');
      if (projId) openSidePeek(projId);
      return;
    }

    // 2. Left sidebar list-item click
    const listItem = e.target.closest('.list-item');
    if (listItem) {
      e.preventDefault();
      e.stopPropagation();
      const projId = listItem.getAttribute('data-target-proj');
      if (projId) openSidePeek(projId);
      return;
    }
  });

  if (btnClosePeek) btnClosePeek.addEventListener('click', closeSidePeek);
  if (sidePeekOverlay) sidePeekOverlay.addEventListener('click', closeSidePeek);

  // ==========================================================================
  // 5.5 EMAIL COPY & LINKEDIN LINK INTERACTIONS
  // ==========================================================================
  const emailCopyWrapper = document.getElementById('email-copy-wrapper');
  const copyToast = document.getElementById('copy-toast');
  let copyToastTimer = null;

  if (emailCopyWrapper && copyToast) {
    emailCopyWrapper.addEventListener('click', () => {
      const email = (inputEmail ? inputEmail.value : null) || 'junseo.oh.kr@gmail.com';
      try {
        navigator.clipboard.writeText(email).then(() => {
          // Show toast
          copyToast.classList.add('show');
          if (copyToastTimer) clearTimeout(copyToastTimer);
          copyToastTimer = setTimeout(() => {
            copyToast.classList.remove('show');
          }, 2000);
        });
      } catch (err) {
        // Fallback for older browsers
        const el = document.createElement('textarea');
        el.value = email;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        copyToast.classList.add('show');
        if (copyToastTimer) clearTimeout(copyToastTimer);
        copyToastTimer = setTimeout(() => copyToast.classList.remove('show'), 2000);
      }
    });
  }

  const linkedinWrapper = document.getElementById('linkedin-link-wrapper');
  if (linkedinWrapper) {
    linkedinWrapper.addEventListener('click', () => {
      const linkedinVal = (inputLinkedin ? inputLinkedin.value : null) || 'linkedin.com/in/junseokorea';
      const url = linkedinVal.startsWith('http') ? linkedinVal : `https://${linkedinVal}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // ==========================================================================
  // 6. ZOOM LEVEL CONTROL LOGIC (Enforces boundaries)
  // ==========================================================================
  const updateZoom = (level) => {
    zoomLevel = Math.max(45, Math.min(150, level));
    if (zoomValueEl) zoomValueEl.textContent = `${zoomLevel}%`;
    if (cardContainer) cardContainer.style.setProperty('--zoom', zoomLevel / 100);
    updateMinimapViewport();
  };

  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', () => {
      updateZoom(zoomLevel + 10);
    });
  }

  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', () => {
      updateZoom(zoomLevel - 10);
    });
  }

  // ==========================================================================
  // 7. LANGUAGE SWITCHER LOGIC
  // ==========================================================================
  const setLanguage = (lang) => {
    try {
      currentLang = lang;

      if (lang === 'ko') {
        if (btnKo) btnKo.classList.add('active');
        if (btnEn) btnEn.classList.remove('active');
        document.documentElement.lang = 'ko';
      } else {
        if (btnEn) btnEn.classList.add('active');
        if (btnKo) btnKo.classList.remove('active');
        document.documentElement.lang = 'en';
      }

      const data = langData[lang];
      if (!data) return;

      // 1. Update Static Input Fields
      if (inputName) inputName.value = data.name;
      if (inputRole) inputRole.value = data.role;
      if (inputIntro) inputIntro.value = data.intro;
      if (inputEmail) inputEmail.value = data.email;
      if (inputLinkedin) inputLinkedin.value = data.linkedin;

      // 2. Update Live Preview Card Values
      if (previewName) previewName.textContent = data.name;
      if (previewRole) previewRole.textContent = data.role;
      if (previewIntro) previewIntro.textContent = data.intro;
      if (previewEmail) previewEmail.textContent = data.email;
      if (previewLinkedin) previewLinkedin.textContent = data.linkedin;

      // 3. Update UI Labels (Sidebar labels & descriptions)
      const lblName = document.querySelector('label[for="input-name"]');
      if (lblName) lblName.textContent = data.labels.name;
      const lblRole = document.querySelector('label[for="input-role"]');
      if (lblRole) lblRole.textContent = data.labels.role;
      const lblIntro = document.querySelector('label[for="input-intro"]');
      if (lblIntro) lblIntro.textContent = data.labels.intro;
      const lblEmail = document.querySelector('label[for="input-email"]');
      if (lblEmail) lblEmail.textContent = data.labels.email;
      const lblLinkedin = document.querySelector('label[for="input-linkedin"]');
      if (lblLinkedin) lblLinkedin.textContent = data.labels.linkedin;
      
      const secTitle = document.querySelector('.section-title');
      if (secTitle) secTitle.textContent = data.labels.listView;
      
      const tabProjects = document.getElementById('tab-projects');
      if (tabProjects) tabProjects.firstChild.textContent = data.labels.tabProjects;
      const tabSkills = document.getElementById('tab-skills');
      if (tabSkills) tabSkills.firstChild.textContent = data.labels.tabSkills;
      const tabSearch = document.getElementById('tab-search');
      if (tabSearch) tabSearch.firstChild.textContent = data.labels.tabSearch + ' ';
      
      for (let i = 1; i <= 9; i++) {
        const projEl = document.getElementById(`txt-proj-${i}`);
        if (projEl) projEl.textContent = data.labels[`proj${i}`];
      }

      // 4. Update Card Labels
      const badgeText = document.getElementById('preview-badge-text');
      if (badgeText) badgeText.textContent = data.labels.badge;

      // 5. Update Helper Box Label
      const helperTextEl = document.querySelector('.canvas-helper-text span');
      if (helperTextEl) helperTextEl.textContent = data.labels.helper;

      // 6. Update Canvas Title Label (Multilingual Fix!)
      const canvasTitleText = document.querySelector('.canvas-title span');
      if (canvasTitleText) canvasTitleText.textContent = data.labels.canvasTitle;

      // 7. Update Badge Title
      const badgeTitleEl = document.getElementById('badge-title');
      if (badgeTitleEl) badgeTitleEl.textContent = data.labels.badgeTitle;

      // 8. Update Search Tab Elements (Multilingual Fix!)
      const searchPlaceholderInput = document.querySelector('.search-dummy-input');
      if (searchPlaceholderInput) {
        searchPlaceholderInput.placeholder = data.labels.searchPlaceholder;
      }
      const searchDescText = document.querySelector('.search-dummy-desc');
      if (searchDescText) {
        searchDescText.textContent = data.labels.searchDesc;
      }

      // 9. Update 9 project card text overlays & titles & footer dates
      for (let i = 1; i <= 9; i++) {
        const cardTitleEl = document.getElementById(`lbl-proj-title-${i}`);
        if (cardTitleEl) cardTitleEl.textContent = data.labels[`proj${i}`];
        
        const startLblEl = document.getElementById(`lbl-start-${i}`);
        if (startLblEl) startLblEl.textContent = data.labels.lblStart;
        const endLblEl = document.getElementById(`lbl-end-${i}`);
        if (endLblEl) endLblEl.textContent = data.labels.lblEnd;
        const durLblEl = document.getElementById(`lbl-dur-${i}`);
        if (durLblEl) durLblEl.textContent = data.labels.lblDur;
        
        // Custom Date Ranges for the projects mapped exactly to their respective .md files (without parentheses)
        const projectDateRanges = {
          ko: {
            1: "26.05 ~ 26.05",
            2: "26.04 ~ 진행 중",
            3: "26.03 ~ 26.06",
            4: "25.11 ~ 25.12",
            5: "25.10 ~ 25.11",
            6: "25.09 ~ 25.12",
            7: "25.03 ~ 25.06",
            8: "24.09 ~ 24.12",
            9: "24.03 ~ 24.06"
          },
          en: {
            1: "26.05 ~ 26.05",
            2: "26.04 ~ Present",
            3: "26.03 ~ 26.06",
            4: "25.11 ~ 25.12",
            5: "25.10 ~ 25.11",
            6: "25.09 ~ 25.12",
            7: "25.03 ~ 25.06",
            8: "24.09 ~ 24.12",
            9: "24.03 ~ 24.06"
          }
        };

        const durationValue = document.querySelector(`#proj-card-${i} .date-row:nth-child(3) .date-val`);
        if (durationValue) {
          durationValue.textContent = projectDateRanges[lang][i];
        }

        const expandBtn = document.querySelector(`#proj-card-${i} .expand-btn`);
        if (expandBtn) {
          expandBtn.innerHTML = `${data.labels.btnExpand} <i data-lucide="maximize-2"></i>`;
        }
      }

      // 10. Re-initialize Lucide Icons so they don't break when DOM changes
      if (window.lucide) {
        window.lucide.createIcons();
      }

      // 11. Adjust sidebar textarea height dynamically (Hug Contents)
      textareas.forEach(textarea => {
        adjustHeight(textarea);
      });
      // 12. Update Skill Slider labels for language
      document.querySelectorAll('#pane-skills [data-ko]').forEach(el => {
        el.textContent = lang === 'ko' ? el.dataset.ko : el.dataset.en;
      });
    } catch (err) {
      console.error("Error setting language:", err);
    }
  };

  if (btnKo) btnKo.addEventListener('click', () => setLanguage('ko'));
  if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));

  // ==========================================================================
  // 7.5 SKILL SLIDER ANIMATION ENGINE
  // ==========================================================================
  const animateSkillSliders = () => {
    const fills = document.querySelectorAll('.skill-mini-fill');
    fills.forEach(fill => {
      const pct = fill.style.getPropertyValue('--target-pct');
      // Small delay ensures the transition fires after paint
      requestAnimationFrame(() => {
        setTimeout(() => { fill.style.width = pct; }, 60);
      });
    });
  };

  // ==========================================================================
  // 7.6 TAB SWITCHING LOGIC (Projects ↔ Skills)  — exposed as window.switchTab
  // ==========================================================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  window.switchTab = (targetTab) => {
    // Update active button state
    tabBtns.forEach(b => {
      if (b.getAttribute('data-tab') === targetTab) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Show matching pane, hide others
    tabPanes.forEach(pane => {
      if (pane.id === `pane-${targetTab}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Trigger slider animation when Skills tab is opened
    if (targetTab === 'skills') {
      setTimeout(animateSkillSliders, 80);
    }
  };

  // ==========================================================================
  // 8. CARD ROTATION EVENT LISTENERS REMOVED (Smooth CSS translate-only used)
  // ==========================================================================
  // Custom 3D tilt handles have been removed to preserve stable flat modular grids.

  // 9. Legacy Panning system removed to enforce absolute screen bounds.

  // ==========================================================================
  // 10. MULTI-LEVEL SKILL FILTERS & REAL SEARCH LOGIC
  // ==========================================================================
  const clearFilters = () => {
    if (cardContainer) cardContainer.classList.remove('has-active-filter');
    allCards.forEach(c => {
      c.classList.remove('is-highlighted');
      c.classList.remove('is-dimmed');
    });
  };

  const applySkillFilter = (skillId) => {
    if (cardContainer) cardContainer.classList.add('has-active-filter');

    allCards.forEach(c => {
      const associatedSkills = c.getAttribute('data-skills');
      if (c.id === 'portfolio-preview-card') {
        c.classList.add('is-dimmed');
        c.classList.remove('is-highlighted');
        return;
      }

      if (associatedSkills && associatedSkills.includes(skillId)) {
        c.classList.add('is-highlighted');
        c.classList.remove('is-dimmed');
      } else {
        c.classList.add('is-dimmed');
        c.classList.remove('is-highlighted');
      }
    });
  };

  skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSkill = btn.getAttribute('data-skill-id');

      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        clearFilters();
      } else {
        skillBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applySkillFilter(targetSkill);
      }
    });
  });

  // Real Real-time Sidebar Search Input Filtering!
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      // Clear active skill buttons
      skillBtns.forEach(b => b.classList.remove('active'));

      if (query === '') {
        clearFilters();
        return;
      }

      if (cardContainer) cardContainer.classList.add('has-active-filter');

      allCards.forEach(c => {
        const cardTitle = (c.querySelector('h1, h2, h3')?.textContent || '').toLowerCase();
        const cardSkills = (c.getAttribute('data-skills') || '').toLowerCase();
        
        if (cardTitle.includes(query) || cardSkills.includes(query)) {
          c.classList.add('is-highlighted');
          c.classList.remove('is-dimmed');
        } else {
          c.classList.add('is-dimmed');
          c.classList.remove('is-highlighted');
        }
      });
    });
  }

  // ==========================================================================
  // 11. WORKING MINI-MAP SYSTEM ( Obsidian Canvas-Minimap Style Bounding Box )
  // ==========================================================================
  function buildMinimapDots() {
    try {
      if (!minimapCardsLayer) return;
      minimapCardsLayer.innerHTML = '';

      // Minimap visual dimensions (matching CSS: 200x150)
      const MINIMAP_W = 200;
      const MINIMAP_H = 150;
      
      allCards.forEach(c => {
        const pos = cardPositions[c.id];
        if (!pos) return;

        const dot = document.createElement('div');
        dot.className = `minimap-card-dot ${c.id === 'portfolio-preview-card' ? 'intro' : ''}`;
        dot.id = `mini-dot-${c.id}`;

        // Calculate position as percent of board
        const leftPercent = (pos.x / BOARD_WIDTH) * 100;
        const topPercent = (pos.y / BOARD_HEIGHT) * 100;

        // Card dimensions as percent of board -> pixel size on minimap
        const cardW = 520;
        const cardH = (c.id === 'portfolio-preview-card') ? 500 : 380;
        const dotW = Math.max(4, (cardW / BOARD_WIDTH) * MINIMAP_W);
        const dotH = Math.max(3, (cardH / BOARD_HEIGHT) * MINIMAP_H);

        dot.style.left = `${leftPercent}%`;
        dot.style.top = `${topPercent}%`;
        dot.style.width = `${dotW}px`;
        dot.style.height = `${dotH}px`;
        // Use top-left as anchor
        dot.style.transform = 'none';

        minimapCardsLayer.appendChild(dot);
      });
      updateMinimapViewport();
    } catch (err) {
      console.error("Error drawing minimap:", err);
    }
  }

  function updateMinimapDotsRealtime(cardId, x, y) {
    const dot = document.getElementById(`mini-dot-${cardId}`);
    if (dot) {
      dot.style.left = `${(x / BOARD_WIDTH) * 100}%`;
      dot.style.top = `${(y / BOARD_HEIGHT) * 100}%`;
    }
  }

  // Old viewport, minimap, and zoom engine calculations have been completely cleared to prevent DOM ReferenceErrors.

  // Re-organize cards in a neat structured grid upon window resize
  window.addEventListener('resize', () => {
    scatterCardsRandomly();
  });

  // ==========================================================================
  // 13. INITIALISATION & MOUNT
  // ==========================================================================
  try {
    // 1st: Scatter cards randomly inside visible screen space on load
    scatterCardsRandomly();

    // Initialize default language and dates formatting
    setLanguage('ko');

    // Attach load fallback for perfect dimensions
    window.addEventListener('load', () => {
      scatterCardsRandomly();
    });
  } catch (err) {
    console.error("Initialization error:", err);
  }

});
