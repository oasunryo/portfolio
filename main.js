document.addEventListener('DOMContentLoaded', () => {
  console.log("Semiconductor Portfolio Builder: Javascript Mounting...");

  // ==========================================================================
  // 0. DYNAMIC TREE VIEW FOLDER COLLAPSE & CHEVRON ICONS INJECTION
  // ==========================================================================
  const treeToggles = document.querySelectorAll('.tree-toggle');
  treeToggles.forEach(toggle => {
    // Force fold closed on load
    toggle.checked = false;

    // Find the next label and inject Lucide chevron icons
    const label = toggle.nextElementSibling;
    if (label && label.classList.contains('tree-label')) {
      // Remove any existing chevrons to prevent duplicates
      label.querySelectorAll('.chevron-icon').forEach(el => el.remove());

      // Create closed chevron (chevron-down)
      const closedChevron = document.createElement('i');
      closedChevron.setAttribute('data-lucide', 'chevron-down');
      closedChevron.className = 'chevron-icon closed-chevron';

      // Create open chevron (chevron-up)
      const openChevron = document.createElement('i');
      openChevron.setAttribute('data-lucide', 'chevron-up');
      openChevron.className = 'chevron-icon open-chevron';

      label.appendChild(closedChevron);
      label.appendChild(openChevron);
    }
  });

  // Re-initialize Lucide icons so our new chevrons are drawn
  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }

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

  // Board constraints for viewport boundaries
  const BOARD_WIDTH = 2500;
  const BOARD_HEIGHT = 1800;
  const MIN_PAN_X = -1500;
  const MAX_PAN_X = 1500;
  const MIN_PAN_Y = -1200;
  const MAX_PAN_Y = 1200;

  // Real-time minimap viewport bounding box updater
  function updateMinimapViewport() {
    if (!minimapViewport) return;
    const MINIMAP_W = 200;
    const MINIMAP_H = 150;

    const zoomFrac = zoomLevel / 100;
    const canvasWidth = designerCanvas ? (designerCanvas.clientWidth || window.innerWidth - 380) : 1000;
    const canvasHeight = designerCanvas ? (designerCanvas.clientHeight || window.innerHeight) : 800;

    const visibleW = canvasWidth / zoomFrac;
    const visibleH = canvasHeight / zoomFrac;

    const viewCenterX = (BOARD_WIDTH / 2) - (panX / zoomFrac);
    const viewCenterY = (BOARD_HEIGHT / 2) - (panY / zoomFrac);

    const leftPercent = ((viewCenterX - visibleW / 2) / BOARD_WIDTH) * 100;
    const topPercent = ((viewCenterY - visibleH / 2) / BOARD_HEIGHT) * 100;
    const widthPercent = (visibleW / BOARD_WIDTH) * 100;
    const heightPercent = (visibleH / BOARD_HEIGHT) * 100;

    minimapViewport.style.left = `${Math.max(0, Math.min(100, leftPercent))}%`;
    minimapViewport.style.top = `${Math.max(0, Math.min(100, topPercent))}%`;
    minimapViewport.style.width = `${Math.max(5, Math.min(100, widthPercent))}%`;
    minimapViewport.style.height = `${Math.max(5, Math.min(100, heightPercent))}%`;
  }

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

      const projW = 290;
      const projH = 72; // Slimmed down to music streaming track row height

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
      const projW = 290;
      const projH = 72;
      const gapX = 20; // compact gap
      const gapY = 16; 

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
  // 3. MOVE TOOL: DRAG INDIVIDUAL BLOCKS (Pointer Events API Integrated)
  // ==========================================================================
  let isDraggingCard = false;
  let activeDragCard = null;
  let cardStartX = 0;
  let cardStartY = 0;
  let initialCardX = 0;
  let initialCardY = 0;

  // Track pointer movements for smooth drag and drop
  allCards.forEach(c => {
    if (c.id === 'portfolio-preview-card') return;

    // Set touch-action none to prevent browser gesture conflicts
    c.style.touchAction = 'none';

    c.addEventListener('pointerdown', (e) => {
      // Don't drag if we are on mobile/tablet view (<= 1024px)
      if (window.innerWidth <= 1024) return;

      // Only drag on left click (button === 0) for mice
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      // Skip if clicking interactive elements inside the card
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || e.target.closest('textarea')) {
        return;
      }

      isDraggingCard = true;
      activeDragCard = c;
      
      try {
        c.setPointerCapture(e.pointerId);
      } catch (err) {
        console.warn("Failed to set pointer capture:", err);
      }

      cardStartX = e.clientX;
      cardStartY = e.clientY;

      const currentPos = cardPositions[c.id] || { x: 0, y: 0 };
      initialCardX = currentPos.x || parseInt(c.style.left) || 0;
      initialCardY = currentPos.y || parseInt(c.style.top) || 0;

      // Bring active card to front
      allCards.forEach(card => {
        if (card.id !== 'portfolio-preview-card') {
          card.style.zIndex = '10';
        }
      });
      c.style.zIndex = '100';

      c.style.setProperty('--card-pos-transition', 'none');
    });

    c.addEventListener('pointermove', (e) => {
      if (!isDraggingCard || activeDragCard !== c) return;
      if (window.innerWidth <= 1024) return;

      const deltaX = e.clientX - cardStartX;
      const deltaY = e.clientY - cardStartY;

      let newX = initialCardX + deltaX;
      let newY = initialCardY + deltaY;

      const dims = getCanvasDimensions();
      const screenW = dims.width;
      const screenH = dims.height;

      const projW = c.offsetWidth || 320;
      const projH = c.offsetHeight || 260;

      newX = Math.max(10, Math.min(screenW - projW - 10, newX));
      newY = Math.max(70, Math.min(screenH - projH - 20, newY));

      cardPositions[c.id] = { x: newX, y: newY };
      c.style.left = `${newX}px`;
      c.style.top = `${newY}px`;

      updateMinimapDotsRealtime(c.id, newX, newY);
    });

    const endDrag = (e) => {
      if (!isDraggingCard || activeDragCard !== c) return;
      
      isDraggingCard = false;
      activeDragCard = null;

      try {
        c.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Safe check
      }

      c.style.setProperty('--card-pos-transition', '0.4s cubic-bezier(0.16, 1, 0.3, 1)');
      
      if (typeof buildMinimapDots === 'function') {
        buildMinimapDots();
      }
    };

    c.addEventListener('pointerup', endDrag);
    c.addEventListener('pointercancel', endDrag);
  });

  // ==========================================================================
  // MOBILE DRAWER TOGGLE INTERACTION
  // ==========================================================================
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const btnMobileMenu = document.getElementById('btn-mobile-menu');

  const openSidebarDrawer = () => {
    if (sidebar) sidebar.classList.add('open');
    if (sidebarOverlay) sidebarOverlay.classList.add('open');
  };

  const closeSidebarDrawer = () => {
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('open');
  };

  if (btnMobileMenu) {
    btnMobileMenu.addEventListener('click', openSidebarDrawer);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebarDrawer);
  }

  // Auto-close sidebar on mobile when clicking navigation links or skill tags
  const listItems = document.querySelectorAll('.list-item, .skill-tree-item, .project-item');
  listItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        closeSidebarDrawer();
      }
    });
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
        durSuffix: "주",

        // Minimalist Growth Journey Timeline
        journeyTrigger: "성장 여정 보기 ↗",
        journeyBadge: "Odyssey",
        journeyTitle: "Growth Journey",
        stepTitle1: "기초 충전",
        stepDesc1: "대학 전기공학 입문 및 전자기학 학술 기초 확립",
        stepTitle2: "아날로그 이해",
        stepDesc2: "전력 회로 제어 및 아날로그 능동 필터 응용 설계",
        stepTitle3: "논리의 도약",
        stepDesc3: "FPGA 칩 실기기 합성 및 Verilog HDL 디지털 시스템 개발",
        stepTitle4: "나노공정 연구",
        stepDesc4: "Spotfire 수율 분석 및 EUV 무기 PR 신소재 공정 연구",
        stepTitle5: "OSAT 합격",
        stepDesc5: "Amkor Technology OSAT 패키징 엔지니어 최종 합격"
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
        durSuffix: " wks",

        // Minimalist Growth Journey Timeline
        journeyTrigger: "Growth Journey ↗",
        journeyBadge: "Odyssey",
        journeyTitle: "Growth Journey",
        stepTitle1: "EE Foundation",
        stepDesc1: "Enrolled in EE at Kwangwoon Univ. & established solid core physics foundation",
        stepTitle2: "Analog Core",
        stepDesc2: "Mastered power circuit control & Sallen-Key active filter boards design",
        stepTitle3: "Logic Synthesis",
        stepDesc3: "Programmed FPGA microchips and synthesised digital logic using Verilog",
        stepTitle4: "Nano-Litho Study",
        stepDesc4: "Mastered Spotfire yield analytics and researched inorganic PR EUV material",
        stepTitle5: "Amkor Admission",
        stepDesc5: "Officially hired as a Semiconductor Packaging & Test Engineer at Amkor Technology"
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

  // Audio context cache for elegant micro web audio click sound
  let audioCtx = null;
  const playMinimalistSound = (type = 'click') => {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } else if (type === 'open') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      }
    } catch(e) {
      console.warn("AudioContext block/not supported:", e);
    }
  };

  const openSidePeek = (projId) => {
    try {
      const id = parseInt(projId);
      if (isNaN(id) || id < 1 || id > 9) {
        console.warn(`[SidePeek] Invalid project ID: "${projId}"`);
        return;
      }
      
      playMinimalistSound('open');

      const langData = projectProseData[currentLang];
      const data = langData ? (langData[id] || langData[String(id)]) : null;
      if (!data) {
        console.warn(`[SidePeek] No data found for lang="${currentLang}", id=${id}`);
        return;
      }

      // Automatically add glass magnifier HTML structure to images inside prose
      let modifiedProse = data.prose;
      // Search for img tags in prose and wrap them with side-peek-image-container
      const imgRegex = /<img([^>]+)src="([^"]+)"([^>]*)>/g;
      if (imgRegex.test(modifiedProse)) {
        modifiedProse = modifiedProse.replace(imgRegex, (match, p1, src, p3) => {
          return `
            <div class="side-peek-image-container">
              <img${p1}src="${src}"${p3}>
              <div class="image-magnifier-glass"></div>
            </div>
          `;
        });
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
            ${modifiedProse}
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

      // Initialize side-peek image zoom magnifier glass mechanics dynamically
      const containers = peekMarkdownBody.querySelectorAll('.side-peek-image-container');
      containers.forEach(container => {
        const img = container.querySelector('img');
        const glass = container.querySelector('.image-magnifier-glass');
        if (!img || !glass) return;

        container.addEventListener('mouseenter', () => {
          glass.style.display = 'block';
          glass.style.backgroundImage = `url('${img.src}')`;
          // Retrieve natural image dimensions vs screen layout dimensions
          const zoomRatio = 2.5; // 2.5x Zoom Magnifier
          glass.style.backgroundSize = `${img.width * zoomRatio}px ${img.height * zoomRatio}px`;
        });

        container.addEventListener('mousemove', (e) => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Prevent glass border overflowing containers
          glass.style.left = `${x - 60}px`;
          glass.style.top = `${y - 60}px`;

          const zoomRatio = 2.5;
          const bgX = (x * zoomRatio) - 60;
          const bgY = (y * zoomRatio) - 60;
          glass.style.backgroundPosition = `-${bgX}px -${bgY}px`;
        });

        container.addEventListener('mouseleave', () => {
          glass.style.display = 'none';
        });
      });

      // Update Sound Spectrum visual wave state inside cards thumbnail
      document.querySelectorAll('.project-block-card').forEach(card => {
        card.classList.remove('playing');
      });
      const activeCard = document.getElementById(`proj-card-${id}`);
      if (activeCard) {
        activeCard.classList.add('playing');
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
      playMinimalistSound('click');
      document.querySelectorAll('.project-block-card').forEach(card => {
        card.classList.remove('playing');
      });
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

      // Update Copy Toast Text
      const copyToast = document.getElementById('copy-toast');
      if (copyToast) {
        copyToast.textContent = lang === 'ko' ? '✓ 복사됨' : '✓ Copied';
      }

      // ==========================================================================
      // 6.5 SKILLS TREE MAPPING TOOLTIPS (Max 20 chars, dynamic translation)
      // ==========================================================================
      const skillTooltips = {
        ko: {
          notion: "노션 문서화 포트폴리오",
          matlab: "매틀랩 수치해석 시뮬",
          "verilog-hdl": "Verilog HDL 설계",
          "ai-prompting": "AI 프롬프팅 업무 자동화",
          figma: "피그마 UI 프로토타이핑",
          "ms-office": "MS오피스 보고서 작성",
          simulink: "시뮬링크 모델 기반 검증",
          simscape: "심스케이프 물리 모형",
          "quartus-ii": "쿼터스 FPGA 회로 합성",
          modelsim: "모델심 HDL 파형 검증",
          spotfire: "스팟파이어 수율 시각화",
          "circuit-design": "아날로그 회로 설계 분석",
          github: "깃허브 버전 관리 협업",
          mermaid: "머메이드 다이어그램",
          "battery-system": "배터리 충방전 모니터링",
          "power-system": "전력 회로 고효율 변환",
          sql: "SQL 데이터베이스 쿼리",
          tableau: "태블로 데이터 대시보드",
          "active-listening": "적극적 경청 협력 소통",
          aftercare: "고객 사후 관리 조율",
          "customer-service": "고객 맞춤 대응 서비스",
          linkedin: "링크드인 프로 네트워킹",
          entrepreneurship: "기업가 정신 창의 도전",
          rca: "근본 원인 분석 문제해결",
          troubleshooting: "시스템 트러블슈팅 해결",
          b2b: "B2B 기업 비즈니스",
          b2c: "B2C 일반 소비자 판매",
          economics: "시장 경제 효율 분석"
        },
        en: {
          notion: "Notion Documentation",
          matlab: "MATLAB Simulation",
          "verilog-hdl": "Verilog HDL Design",
          "ai-prompting": "AI Prompt Automation",
          figma: "Figma UI Prototyping",
          "ms-office": "MS Office Reporting",
          simulink: "Simulink Verification",
          simscape: "Simscape Modeling",
          "quartus-ii": "Quartus Synthesis",
          modelsim: "ModelSim Verification",
          spotfire: "Spotfire Analytics",
          "circuit-design": "Analog Circuit Design",
          github: "GitHub Git Control",
          mermaid: "Mermaid Diagramming",
          "battery-system": "Battery System Design",
          "power-system": "Power Conversion Design",
          sql: "SQL DB Querying",
          tableau: "Tableau Dashboards",
          "active-listening": "Active Listening",
          aftercare: "Aftercare Support",
          "customer-service": "Customer Relations",
          linkedin: "Professional Network",
          entrepreneurship: "Entrepreneurship Spirit",
          rca: "Root Cause Analysis",
          troubleshooting: "System Debugging",
          b2b: "B2B Relations",
          b2c: "B2C Consumer Sales",
          economics: "Market Analysis"
        }
      };

      // Update Skill Tree Item Tooltips
      const skillTreeItems = document.querySelectorAll('.skill-tree-item');
      skillTreeItems.forEach(item => {
        const id = item.getAttribute('data-skill-id');
        if (id && skillTooltips[lang][id]) {
          item.setAttribute('data-tooltip', skillTooltips[lang][id]);
        }
      });

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
      const helperTextEl = document.getElementById('canvas-helper-msg');
      if (helperTextEl) helperTextEl.textContent = data.labels.helper;

      // 5.5 Update Growth Journey Timeline Labels & Steps
      const journeyTriggerText = document.getElementById('journey-trigger-text');
      if (journeyTriggerText) journeyTriggerText.textContent = data.labels.journeyTrigger;
      
      const journeyBadgeTxt = document.getElementById('journey-badge-txt');
      if (journeyBadgeTxt) journeyBadgeTxt.textContent = data.labels.journeyBadge;

      const journeyTitleTxt = document.getElementById('journey-title-txt');
      if (journeyTitleTxt) journeyTitleTxt.textContent = data.labels.journeyTitle;

      for (let s = 1; s <= 5; s++) {
        const stepTitleEl = document.getElementById(`step-title-${s}`);
        if (stepTitleEl) stepTitleEl.textContent = data.labels[`stepTitle${s}`];
        
        const stepDescEl = document.getElementById(`step-desc-${s}`);
        if (stepDescEl) stepDescEl.textContent = data.labels[`stepDesc${s}`];
      }

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

      // 13. Dynamically update floating music player text language on the fly!
      if (typeof loadTrack === 'function') {
        loadTrack(currentTrackIdx);
        if (typeof renderPlaylist === 'function') renderPlaylist();
      }
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
    // Click behavior (Persistent Toggle Filter)
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

    // Hover Highlight Connection (Real-time micro interaction)
    btn.addEventListener('mouseenter', () => {
      const targetSkill = btn.getAttribute('data-skill-id');
      if (!targetSkill) return;

      // Enable visual highlight mode container class
      if (cardContainer) cardContainer.classList.add('skills-filtering');

      allCards.forEach(c => {
        const associatedSkills = c.getAttribute('data-skills');
        if (associatedSkills && associatedSkills.includes(targetSkill)) {
          c.classList.add('skill-matched');
        } else {
          c.classList.remove('skill-matched');
        }
      });
    });

    btn.addEventListener('mouseleave', () => {
      // Restore normal view styles when mouse leaves
      if (cardContainer) cardContainer.classList.remove('skills-filtering');
      allCards.forEach(c => {
        c.classList.remove('skill-matched');
      });
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

  // ==========================================================================
  // 14. INTEGRATED HIGH-FIDELITY BACKGROUND MUSIC STREAMING SYSTEM
  // ==========================================================================
  // Premium royalty-free ambient audio tracks perfectly curated for programming focus
  const playlistTracks = [
    {
      titleKo: "Late Cleanroom",
      titleEn: "Late Cleanroom",
      commentKo: "심야 클린룸 감성의 따뜻한 LP 노이즈 Lofi",
      commentEn: "Rainy lofi beat with warm analog vinyl crackle",
      url: "https://raw.githubusercontent.com/SamirSaad786/lofi-room/main/Crackling%20Coffee%20Cups.mp3"
    },
    {
      titleKo: "Silicon Breeze",
      titleEn: "Silicon Breeze",
      commentKo: "귀가 편안해지는 재즈 기타 리프 Lofi 백그라운드",
      commentEn: "Super gentle jazzy guitar lofi study focus",
      url: "https://raw.githubusercontent.com/SamirSaad786/lofi-room/main/Crackling%20Coffee%20Cups%20(1).mp3"
    },
    {
      titleKo: "Wafer Glow",
      titleEn: "Wafer Glow",
      commentKo: "마음을 안정시켜 주는 로즈 피아노 코드 Lofi",
      commentEn: "Calming Rhodes piano chords chill study wave",
      url: "https://raw.githubusercontent.com/SamirSaad786/lofi-room/main/Sunlit%20Breakers.mp3"
    },
    {
      titleKo: "Quantum Sleep",
      titleEn: "Quantum Sleep",
      commentKo: "잡념을 없애고 뇌파를 조율하는 미니멀 진정 Lofi",
      commentEn: "Cozy minimal vinyl lounge lofi for pure study",
      url: "https://raw.githubusercontent.com/SamirSaad786/lofi-room/main/Sunlit%20Breakers%20(1).mp3"
    },
    {
      titleKo: "Capillary Flow",
      titleEn: "Capillary Flow",
      commentKo: "영감을 주는 지극히 고요하고 시적인 피아노 Lofi",
      commentEn: "Extremely quiet poetic acoustic piano study beat",
      url: "https://raw.githubusercontent.com/SamirSaad786/lofi-room/main/Tideglass%20Afternoon.mp3"
    }
  ];

  // State Management
  let currentTrackIdx = Math.floor(Math.random() * playlistTracks.length); // Auto-Shuffle on load!
  let isPlaying = false;
  let isLoop = false;
  let isShuffle = true; // Enabled by default as requested!
  
  // HTML5 Audio Engine & DOM Nodes
  const bgAudio = new Audio();
  bgAudio.loop = false; // Custom logic handles looping perfectly
  bgAudio.volume = 0.35; // Calibrate default starting volume to 35% for ultra-chill low volume!

  const playerContainer = document.getElementById('canvas-music-player');
  const songTitleEl = document.getElementById('music-song-title');
  const artistCommentEl = document.getElementById('music-artist-comment');
  
  const btnPlay = document.getElementById('btn-music-play');
  const btnPrev = document.getElementById('btn-music-prev');
  const btnNext = document.getElementById('btn-music-next');
  const btnLoop = document.getElementById('btn-music-loop');
  const btnShuffle = document.getElementById('btn-music-shuffle');

  // Detailed Interactive Music Card DOM Nodes
  const detailedCard = document.getElementById('main-music-card');
  const cardTrackTitle = document.getElementById('card-track-title');
  const cardArtistName = document.getElementById('card-artist-name');
  const cardPlaylistMenu = document.getElementById('card-playlist-menu');
  const musicTimeSlider = document.getElementById('music-time-slider');
  const musicCurrentTime = document.getElementById('music-current-time');
  const musicRemainingTime = document.getElementById('music-remaining-time');
  const miniAlbumCover = document.querySelector('.music-album-cover');

  // Synchronize dynamic active shuffle & loop button styling states
  const syncPlayerUIControls = () => {
    if (btnLoop) {
      if (isLoop) btnLoop.classList.add('active');
      else btnLoop.classList.remove('active');
    }
    if (btnShuffle) {
      if (isShuffle) btnShuffle.classList.add('active');
      else btnShuffle.classList.remove('active');
    }
  };

  // Helper function to format time (seconds -> M:SS)
  const formatTime = (secs) => {
    if (isNaN(secs) || secs === Infinity) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Dynamic Playlist UI Renderer
  const renderPlaylist = () => {
    if (!cardPlaylistMenu) return;
    cardPlaylistMenu.innerHTML = '';

    playlistTracks.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = 'playlist-item';
      item.setAttribute('data-index', index);
      
      const title = currentLang === 'ko' ? track.titleKo : track.titleEn;
      const comment = currentLang === 'ko' ? track.commentKo : track.commentEn;

      item.innerHTML = `
        <div class="playlist-item-meta">
          <span class="playlist-item-title">${title}</span>
          <span class="playlist-item-comment">${comment}</span>
        </div>
        <div class="playlist-active-eq">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;

      item.addEventListener('click', () => {
        const wasPlaying = isPlaying;
        loadTrack(index);
        isPlaying = true;
        bgAudio.play().then(() => {
          if (playerContainer) playerContainer.classList.add('playing');
          if (detailedCard) detailedCard.classList.add('playing');
          
          // Sync card sound wave triggers
          updateCardSoundWaves(true);
        }).catch(err => console.warn(err));
      });

      cardPlaylistMenu.appendChild(item);
    });

    updatePlaylistUIHighlight();
  };

  // Playlist Active highlight syncer
  const updatePlaylistUIHighlight = () => {
    if (!cardPlaylistMenu) return;
    const items = cardPlaylistMenu.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
      if (index === currentTrackIdx) {
        item.classList.add('active');
        if (isPlaying) {
          item.classList.add('playing');
        } else {
          item.classList.remove('playing');
        }
      } else {
        item.classList.remove('active', 'playing');
      }
    });
  };

  // Helper to sync sound visualizer bars inside cards
  const updateCardSoundWaves = (playState) => {
    const sidePeekOpen = sidePeekPanel && sidePeekPanel.classList.contains('open');
    if (sidePeekOpen) {
      const peekTitle = document.querySelector('.newsletter-title')?.textContent;
      if (peekTitle) {
        document.querySelectorAll('.project-block-card').forEach(card => {
          const title = card.getAttribute('data-proj-title');
          if (title && peekTitle.includes(title)) {
            if (playState) card.classList.add('playing');
            else card.classList.remove('playing');
          }
        });
      }
    }
  };

  // Set selected song details matching current language
  const loadTrack = (index) => {
    try {
      currentTrackIdx = index;
      const track = playlistTracks[currentTrackIdx];
      if (!track) return;

      bgAudio.src = track.url;
      bgAudio.load();

      // Render Title & Commentary matching language state
      if (currentLang === 'ko') {
        if (songTitleEl) songTitleEl.textContent = track.titleKo;
        if (artistCommentEl) artistCommentEl.textContent = track.commentKo;
        if (cardTrackTitle) cardTrackTitle.textContent = track.titleKo;
        if (cardArtistName) cardArtistName.textContent = track.commentKo;
      } else {
        if (songTitleEl) songTitleEl.textContent = track.titleEn;
        if (artistCommentEl) artistCommentEl.textContent = track.commentEn;
        if (cardTrackTitle) cardTrackTitle.textContent = track.titleEn;
        if (cardArtistName) cardArtistName.textContent = track.commentEn;
      }

      // Reset seek bar values immediately
      if (musicTimeSlider) {
        musicTimeSlider.value = 0;
      }
      if (musicCurrentTime) {
        musicCurrentTime.textContent = "0:00";
      }
      if (musicRemainingTime) {
        musicRemainingTime.textContent = "-0:00";
      }

      updatePlaylistUIHighlight();
    } catch(e) {
      console.error("Audio Load Error:", e);
    }
  };

  // Play / Pause toggler action
  const togglePlay = () => {
    try {
      if (isPlaying) {
        bgAudio.pause();
        isPlaying = false;
        if (playerContainer) playerContainer.classList.remove('playing');
        if (detailedCard) detailedCard.classList.remove('playing');
        
        // Turn off sound waves inside preview cards too
        document.querySelectorAll('.project-block-card').forEach(card => {
          card.classList.remove('playing');
        });
        updatePlaylistUIHighlight();
      } else {
        // Enforce audio hardware wakeup securely
        bgAudio.play().then(() => {
          isPlaying = true;
          if (playerContainer) playerContainer.classList.add('playing');
          if (detailedCard) detailedCard.classList.add('playing');
          
          updateCardSoundWaves(true);
          updatePlaylistUIHighlight();
        }).catch(err => {
          console.warn("Audio hardware play triggered blocked by browser user interaction policy:", err);
        });
      }
    } catch(e) {
      console.error("Play Toggle Failure:", e);
    }
  };

  const nextTrack = () => {
    let targetIdx = currentTrackIdx;
    if (isShuffle) {
      // Pick random index that is different from current if possible
      if (playlistTracks.length > 1) {
        while (targetIdx === currentTrackIdx) {
          targetIdx = Math.floor(Math.random() * playlistTracks.length);
        }
      } else {
        targetIdx = 0;
      }
    } else {
      targetIdx = (currentTrackIdx + 1) % playlistTracks.length;
    }
    
    loadTrack(targetIdx);
    if (isPlaying) {
      bgAudio.play().then(() => {
        if (playerContainer) playerContainer.classList.add('playing');
        if (detailedCard) detailedCard.classList.add('playing');
        updatePlaylistUIHighlight();
      }).catch(err => console.log(err));
    }
  };

  const prevTrack = () => {
    let targetIdx = currentTrackIdx;
    if (isShuffle) {
      if (playlistTracks.length > 1) {
        while (targetIdx === currentTrackIdx) {
          targetIdx = Math.floor(Math.random() * playlistTracks.length);
        }
      } else {
        targetIdx = 0;
      }
    } else {
      targetIdx = (currentTrackIdx - 1 + playlistTracks.length) % playlistTracks.length;
    }

    loadTrack(targetIdx);
    if (isPlaying) {
      bgAudio.play().then(() => {
        if (playerContainer) playerContainer.classList.add('playing');
        if (detailedCard) detailedCard.classList.add('playing');
        updatePlaylistUIHighlight();
      }).catch(err => console.log(err));
    }
  };

  // Event bindings for mini player
  if (btnPlay) btnPlay.addEventListener('click', togglePlay);
  if (btnNext) btnNext.addEventListener('click', nextTrack);
  if (btnPrev) btnPrev.addEventListener('click', prevTrack);

  if (btnLoop) {
    btnLoop.addEventListener('click', () => {
      isLoop = !isLoop;
      syncPlayerUIControls();
    });
  }

  if (btnShuffle) {
    btnShuffle.addEventListener('click', () => {
      isShuffle = !isShuffle;
      syncPlayerUIControls();
    });
  }

  // Toggle show detailed music controller card
  if (miniAlbumCover) {
    miniAlbumCover.style.cursor = 'pointer';
    miniAlbumCover.addEventListener('click', (e) => {
      e.stopPropagation();
      if (detailedCard) {
        detailedCard.classList.toggle('open');
      }
    });
  }

  // Detailed Growth Journey Timeline UI Logic
  const journeyCard = document.getElementById('minimal-journey-card');
  const btnOpenJourney = document.getElementById('btn-open-journey');
  const btnCloseJourney = document.getElementById('btn-close-journey');
  const journeySteps = document.querySelectorAll('.minimal-step');

  if (btnOpenJourney) {
    btnOpenJourney.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close music card if open
      if (detailedCard) detailedCard.classList.remove('open');
      if (journeyCard) {
        journeyCard.classList.toggle('open');
      }
    });
  }

  if (btnCloseJourney) {
    btnCloseJourney.addEventListener('click', () => {
      if (journeyCard) journeyCard.classList.remove('open');
    });
  }

  // Hovering steps dynamically updates the .active class
  journeySteps.forEach(step => {
    step.addEventListener('mouseenter', () => {
      journeySteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });

  // Close when clicking outside of detailed card or journey card
  document.addEventListener('click', (e) => {
    if (detailedCard && detailedCard.classList.contains('open')) {
      if (!detailedCard.contains(e.target) && !miniAlbumCover.contains(e.target)) {
        detailedCard.classList.remove('open');
      }
    }
    if (journeyCard && journeyCard.classList.contains('open')) {
      if (!journeyCard.contains(e.target) && (!btnOpenJourney || !btnOpenJourney.contains(e.target))) {
        journeyCard.classList.remove('open');
      }
    }
  });

  // Handle automatic progression when track ends
  bgAudio.addEventListener('ended', () => {
    if (isLoop) {
      // Restart current song
      bgAudio.currentTime = 0;
      bgAudio.play().catch(e => console.log(e));
    } else {
      nextTrack();
    }
  });

  // HTML5 audio event listeners for seeking & real-time slider sync
  bgAudio.addEventListener('timeupdate', () => {
    if (isNaN(bgAudio.duration)) return;
    
    // Update slider position
    if (musicTimeSlider) {
      musicTimeSlider.value = bgAudio.currentTime;
    }
    
    // Update timers text
    if (musicCurrentTime) {
      musicCurrentTime.textContent = formatTime(bgAudio.currentTime);
    }
    
    if (musicRemainingTime) {
      const remaining = bgAudio.duration - bgAudio.currentTime;
      musicRemainingTime.textContent = `-${formatTime(remaining)}`;
    }
  });

  bgAudio.addEventListener('loadedmetadata', () => {
    if (musicTimeSlider) {
      musicTimeSlider.max = bgAudio.duration;
      musicTimeSlider.value = bgAudio.currentTime;
    }
    if (musicCurrentTime) {
      musicCurrentTime.textContent = formatTime(bgAudio.currentTime);
    }
    if (musicRemainingTime) {
      musicRemainingTime.textContent = `-${formatTime(bgAudio.duration)}`;
    }
  });

  // Handle Dragging Slider (Seeking)
  if (musicTimeSlider) {
    musicTimeSlider.addEventListener('input', () => {
      bgAudio.currentTime = musicTimeSlider.value;
      if (musicCurrentTime) {
        musicCurrentTime.textContent = formatTime(bgAudio.currentTime);
      }
      if (musicRemainingTime) {
        const remaining = bgAudio.duration - bgAudio.currentTime;
        musicRemainingTime.textContent = `-${formatTime(remaining)}`;
      }
    });
  }

  // ==========================================================================
  // 13. INITIALISATION & MOUNT
  // ==========================================================================
  try {
    // 1st: Scatter cards randomly inside visible screen space on load
    scatterCardsRandomly();

    // 2nd: Mount audio engine default track securely
    loadTrack(currentTrackIdx);
    renderPlaylist();
    syncPlayerUIControls();

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
