/**
 * ARUZ CORE 360 DIGITAL ECOSYSTEM - 3D INTERACTIVE CORE & HUD ENGINE
 * Luxury High-Tech Minimalist (Iron Man / After Effects Concept)
 * Paleta: Carbon & Gold (#161213 y #EEB623)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initParticleCanvas();
  init3DHudOrbit();
  initPropertyFilters();
  initAdvisorForm();
  initIntersectionAnimations();
  initDynamicKPIs();
});

/* --------------------------------------------------------------------------
   NAVBAR & MOBILE MENU
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');

  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   CANVAS 3D PARTICLES FIELD (SUSPENDED GOLDEN DUST)
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('heroParticleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  const particleCount = 70;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.targetX = (e.clientX - rect.left - width / 2) * 0.0008;
    mouse.targetY = (e.clientY - rect.top - height / 2) * 0.0008;
  });

  // Create particles with 3D depth (x, y, z)
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: (Math.random() - 0.5) * width * 1.2,
      y: (Math.random() - 0.5) * height * 1.2,
      z: Math.random() * 800 + 200,
      radius: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.3 ? '#EEB623' : '#D8C9AE'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse damping
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    const cx = width / 2;
    const cy = height / 2;
    const fov = 450;

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];

      p.x += p.vx + mouse.x * 20;
      p.y += p.vy + mouse.y * 20;

      // Wrap around bounds
      if (p.x < -width) p.x = width;
      if (p.x > width) p.x = -width;
      if (p.y < -height) p.y = height;
      if (p.y > height) p.y = -height;

      // Perspective projection
      const scale = fov / (fov + p.z);
      const projX = cx + p.x * scale;
      const projY = cy + p.y * scale;
      const projRadius = Math.max(0.4, p.radius * scale);

      if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
        ctx.beginPath();
        ctx.arc(projX, projY, projRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * scale * 1.2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#EEB623';
        ctx.fill();
      }
    }

    ctx.shadowBlur = 0;
    requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   3D HUD ORBIT ENGINE & REAL-TIME CALLOUT LEADER LINES (ON HOVER)
   -------------------------------------------------------------------------- */
function init3DHudOrbit() {
  const stage = document.getElementById('hudStage');
  const svg = document.getElementById('hudCalloutSvg');
  const nodes = document.querySelectorAll('.hud-orbit-node');
  const cards = document.querySelectorAll('.hud-callout-card');

  if (!stage || !svg || !nodes.length) return;

  // 4 Integrated Sub-brands initial orbital angles
  let currentAngle = 0;
  let targetSpeed = 0.0032;
  let currentSpeed = 0.0032;
  let activeHoverIndex = -1;
  let leaveTimer = null;

  const nodeOffsets = [
    0,                  // 0 rad (ARUZ Desarrolladora)
    Math.PI / 2,        // PI/2 rad (ARUZ Inmobiliaria)
    Math.PI,            // PI rad (CADE Constructora)
    (3 * Math.PI) / 2   // 3PI/2 rad (ARUZ Maquinaria)
  ];

  function setActive(idx) {
    if (leaveTimer) clearTimeout(leaveTimer);
    activeHoverIndex = idx;
    targetSpeed = 0.0003; // Gentle slow motion inspection
    
    nodes.forEach((n, i) => {
      if (i === idx) n.classList.add('active');
      else n.classList.remove('active');
    });

    cards.forEach((c, i) => {
      if (i === idx) c.classList.add('visible');
      else c.classList.remove('visible');
    });
  }

  function clearActive() {
    leaveTimer = setTimeout(() => {
      activeHoverIndex = -1;
      targetSpeed = 0.0032;
      nodes.forEach(n => n.classList.remove('active'));
      cards.forEach(c => c.classList.remove('visible'));
    }, 180);
  }

  // Node hover events
  nodes.forEach((node, idx) => {
    node.addEventListener('mouseenter', () => setActive(idx));
    node.addEventListener('mouseleave', clearActive);
    // Touch support for mobile devices
    node.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && activeHoverIndex !== idx) {
        e.preventDefault();
        setActive(idx);
      }
    });
  });

  // Card hover events to maintain visibility
  cards.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => setActive(idx));
    card.addEventListener('mouseleave', clearActive);
  });

  // Mouse tilt parallax on the 3D stage
  let stageTiltX = 0;
  let stageTiltY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;

  window.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
    targetTiltY = nx * 6;  // Rotate Y in deg
    targetTiltX = -ny * 5; // Rotate X in deg
  });

  function updateOrbit() {
    // Smooth speed interpolation
    currentSpeed += (targetSpeed - currentSpeed) * 0.08;
    currentAngle += currentSpeed;

    // Smooth stage 3D tilt
    stageTiltX += (targetTiltX - stageTiltX) * 0.06;
    stageTiltY += (targetTiltY - stageTiltY) * 0.06;
    stage.style.transform = `rotateX(${stageTiltX}deg) rotateY(${stageTiltY}deg)`;

    const stageWidth = stage.offsetWidth;
    const stageHeight = stage.offsetHeight;
    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2;

    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const rx = isMobile ? stageWidth * 0.40 : isTablet ? Math.min(320, stageWidth * 0.35) : Math.min(410, stageWidth * 0.38);
    const ry = isMobile ? stageHeight * 0.30 : isTablet ? Math.min(140, stageHeight * 0.28) : Math.min(165, stageHeight * 0.30);

    // Dynamic quadrant anchor positions for Callout Cards
    const cardPositions = [
      { x: centerX + rx * 0.85, y: centerY - ry * 1.25 }, // Top Right (Desarrolladora)
      { x: centerX + rx * 0.85, y: centerY + ry * 0.85 }, // Bottom Right (Inmobiliaria)
      { x: centerX - rx * 1.35, y: centerY + ry * 0.85 }, // Bottom Left (CADE)
      { x: centerX - rx * 1.35, y: centerY - ry * 1.25 }  // Top Left (Maquinaria)
    ];

    // Clear SVG dynamic lines
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Update each node in 3D orbit
    nodes.forEach((node, idx) => {
      const angle = currentAngle + nodeOffsets[idx];
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const nodeX = centerX + cosA * rx;
      const nodeY = centerY + sinA * ry;

      // 3D Depth calculation
      const depthFactor = (sinA + 1) / 2; // 0 (far) to 1 (near)
      const scale = (idx === activeHoverIndex ? 1.18 : 0.88) + depthFactor * 0.28;
      const opacity = idx === activeHoverIndex ? 1.0 : (0.75 + depthFactor * 0.25);
      const zIndex = Math.round((idx === activeHoverIndex ? 35 : 5) + depthFactor * 20);
      const shadowBlur = Math.round(15 + depthFactor * 25);

      // Draw 3D Energy Conduit from Center Core to Node
      const conduit = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      conduit.setAttribute('x1', centerX);
      conduit.setAttribute('y1', centerY);
      conduit.setAttribute('x2', nodeX);
      conduit.setAttribute('y2', nodeY);
      conduit.setAttribute('stroke', idx === activeHoverIndex ? '#EEB623' : 'rgba(238, 182, 35, 0.32)');
      conduit.setAttribute('stroke-width', idx === activeHoverIndex ? '2.2' : '1.2');
      conduit.setAttribute('stroke-dasharray', idx === activeHoverIndex ? 'none' : '4 3');
      svg.appendChild(conduit);

      // Traveling Energy Photon Pulse
      const pulseT = ((currentAngle * 2.2 + idx * 0.25) % 1);
      const pulseX = centerX + (nodeX - centerX) * pulseT;
      const pulseY = centerY + (nodeY - centerY) * pulseT;
      const photon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      photon.setAttribute('cx', pulseX);
      photon.setAttribute('cy', pulseY);
      photon.setAttribute('r', idx === activeHoverIndex ? 3.5 : 2.5);
      photon.setAttribute('fill', '#EEB623');
      photon.style.filter = 'drop-shadow(0 0 6px #EEB623)';
      svg.appendChild(photon);

      node.style.left = `${nodeX}px`;
      node.style.top = `${nodeY}px`;
      node.style.transform = `translate(-50%, -50%) scale(${scale})`;
      node.style.opacity = opacity;
      node.style.zIndex = zIndex;

      // Update card positioning
      const card = cards[idx];
      if (card) {
        if (!isMobile) {
          const cardW = card.offsetWidth || 280;
          const rawX = cardPositions[idx].x;
          // Clamp cardX within stage bounds with margin
          const cardX = Math.max(8, Math.min(rawX, stageWidth - cardW - 8));
          const cardY = Math.max(8, Math.min(cardPositions[idx].y, stageHeight - card.offsetHeight - 8));
          card.style.left = `${cardX}px`;
          card.style.top = `${cardY}px`;
        }

        // ONLY draw Technical Callout Leader Line if this node/card is currently active/hovered!
        if (!isMobile && idx === activeHoverIndex) {
          const cardW = card.offsetWidth || 280;
          const rawX = cardPositions[idx].x;
          const cardX = Math.max(8, Math.min(rawX, stageWidth - cardW - 8));
          const cardY = Math.max(8, Math.min(cardPositions[idx].y, stageHeight - card.offsetHeight - 8));
          const cardAnchorX = idx < 2 ? cardX : cardX + cardW;
          const cardAnchorY = cardY + card.offsetHeight / 2;

          const kneeX = nodeX + (cardAnchorX > nodeX ? 35 : -35);
          const kneeY = cardAnchorY;

          // Leader Polyline
          const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          const d = `M ${nodeX} ${nodeY} L ${kneeX} ${nodeY} L ${kneeX} ${kneeY} L ${cardAnchorX} ${cardAnchorY}`;
          polyline.setAttribute('d', d);
          polyline.setAttribute('class', 'hud-leader-line active');
          polyline.style.opacity = '1';
          svg.appendChild(polyline);

          // Node Anchor Dot
          const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dot.setAttribute('cx', nodeX);
          dot.setAttribute('cy', nodeY);
          dot.setAttribute('r', 4.5);
          dot.setAttribute('class', 'hud-leader-dot');
          svg.appendChild(dot);

          // Card Anchor Dot
          const dotCard = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dotCard.setAttribute('cx', cardAnchorX);
          dotCard.setAttribute('cy', cardAnchorY);
          dotCard.setAttribute('r', 3.5);
          dotCard.setAttribute('class', 'hud-leader-dot');
          svg.appendChild(dotCard);
        }
      }
    });

    requestAnimationFrame(updateOrbit);
  }

  updateOrbit();
}

/* --------------------------------------------------------------------------
   PROPERTY FILTER SYSTEM (ARUZ INMOBILIARIA)
   -------------------------------------------------------------------------- */
function initPropertyFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const propertyCards = document.querySelectorAll('.property-card[data-category]');

  if (!filterBtns.length || !propertyCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = btn.getAttribute('data-filter');

      propertyCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCat === targetCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   SMART ADVISOR PRE-FILTER & DIRECT WHATSAPP GENERATOR
   -------------------------------------------------------------------------- */
function initAdvisorForm() {
  const form = document.getElementById('advisorPrequalForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('advName')?.value.trim() || 'Inversionista';
    const motivation = document.getElementById('advMotivation')?.value || 'Patrimonial / Inversión';
    const division = document.getElementById('advDivision')?.value || 'ARUZ Desarrolladora';
    const budget = document.getElementById('advBudget')?.value || '$2.5M - $5M MXN';
    const message = document.getElementById('advMessage')?.value.trim() || '';

    const directorPhone = '5216674069523'; // Carlos Alfredo Ruiz Ramos
    
    let text = `Hola Carlos Alfredo Ruiz Ramos (Director de Operaciones ARUZ),\n\n`;
    text += `Mi nombre es *${name}* y solicito asesoría técnica y comercial:\n`;
    text += `• *Objetivo:* ${motivation}\n`;
    text += `• *Submarca de Interés:* ${division}\n`;
    text += `• *Rango de Presupuesto:* ${budget}\n`;
    if (message) {
      text += `• *Comentarios específicos:* ${message}\n`;
    }
    text += `\nSolicito agendar una llamada de asesoría bajo el criterio experto del ecosistema ARUZ + CADE.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${directorPhone}&text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  });
}

/* --------------------------------------------------------------------------
   SMOOTH SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initIntersectionAnimations() {
  const elements = document.querySelectorAll('.section-spacing, .division-card, .property-card, .pilar-card');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   GLOBAL LEAD CAPTURE FORM SUBMISSION HANDLER
   -------------------------------------------------------------------------- */
function handleLeadSubmit(event) {
  if (event) event.preventDefault();

  const name = document.getElementById('leadName')?.value.trim() || '';
  const phone = document.getElementById('leadPhone')?.value.trim() || '';
  const email = document.getElementById('leadEmail')?.value.trim() || '';
  const interest = document.getElementById('leadInterest')?.value || 'Preventas Ciudad Mayakoba';
  const message = document.getElementById('leadMessage')?.value.trim() || '';

  if (!name || !phone || !email) return;

  const btn = document.getElementById('btnSubmitLead');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>Procesando Solicitud...</span><span class="material-symbols-outlined text-sm animate-spin">refresh</span>`;
  }

  // Build WhatsApp payload for Director Carlos Ruiz
  const directorPhone = '5216674069523';
  let text = `*NUEVO LEAD DESDE SITIO WEB ARUZ*\n\n`;
  text += `👤 *Nombre:* ${name}\n`;
  text += `📱 *Tel / WhatsApp:* ${phone}\n`;
  text += `📧 *Correo:* ${email}\n`;
  text += `🏛️ *División / Interés:* ${interest}\n`;
  if (message) {
    text += `💬 *Mensaje:* ${message}\n`;
  }
  text += `\n_Solicito atención directa de la dirección operativa y envío de dossier técnico._`;

  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${directorPhone}&text=${encodedText}`;

  setTimeout(() => {
    const successMsg = document.getElementById('leadSuccessMsg');
    if (successMsg) {
      successMsg.classList.remove('hidden');
    }
    if (btn) {
      btn.innerHTML = `<span>Solicitud Enviada a Dirección</span><span class="material-symbols-outlined text-sm">check_circle</span>`;
      btn.className = "w-full bg-verde-manglar text-white font-button py-3.5 px-6 rounded-lg font-label-caps uppercase text-xs font-bold tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2";
    }

    // Open WhatsApp in new tab with prefilled lead data
    window.open(whatsappUrl, '_blank');
  }, 500);
}

// Make handleLeadSubmit globally accessible
window.handleLeadSubmit = handleLeadSubmit;

/* --------------------------------------------------------------------------
   HIGH-PRECISION DYNAMIC KPI COUNTER ENGINE & INTERACTIVE TELEMETRY
   -------------------------------------------------------------------------- */
function initDynamicKPIs() {
  const kpiElements = document.querySelectorAll('.dynamic-kpi, [data-counter], [data-target]');
  
  if (!kpiElements.length) return;

  function parseKPIValue(text, el) {
    const rawTarget = (el.getAttribute('data-target') || el.getAttribute('data-counter') || text).trim();
    
    // Prefix extraction (+, $, >, ~, etc.)
    let prefix = el.getAttribute('data-prefix');
    if (prefix === null) {
      const matchPrefix = rawTarget.match(/^[+$><~]/);
      prefix = matchPrefix ? matchPrefix[0] : '';
    }

    // Suffix extraction (%, /7, m², MXN, Años, k, K, +, etc.)
    let suffix = el.getAttribute('data-suffix');
    if (suffix === null) {
      const matchSuffix = rawTarget.match(/(%|\/7|m²|MXN|Años|k|K|\+|Cuadrillas|Desarrollos|Unidades)$/i);
      suffix = matchSuffix ? matchSuffix[0] : '';
    }

    // Clean numeric extraction
    let clean = rawTarget;
    if (prefix && clean.startsWith(prefix)) {
      clean = clean.substring(prefix.length).trim();
    }
    if (suffix && clean.endsWith(suffix)) {
      clean = clean.substring(0, clean.length - suffix.length).trim();
    }
    clean = clean.replace(/,/g, '').trim();

    const targetNum = parseFloat(clean);
    
    // Decimal precision
    let decimals = 0;
    if (el.getAttribute('data-decimals')) {
      decimals = parseInt(el.getAttribute('data-decimals'), 10);
    } else if (clean.includes('.')) {
      decimals = clean.split('.')[1].length;
    }

    const useCommas = rawTarget.includes(',') || targetNum >= 1000;

    return {
      raw: rawTarget,
      target: isNaN(targetNum) ? 0 : targetNum,
      prefix: prefix || '',
      suffix: suffix || '',
      decimals: decimals,
      useCommas: useCommas
    };
  }

  function formatValue(current, config) {
    let numStr = config.decimals > 0 
      ? current.toFixed(config.decimals) 
      : Math.round(current).toString();

    if (config.useCommas) {
      const parts = numStr.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      numStr = parts.join('.');
    }

    const s = config.suffix;
    const space = (s && !s.startsWith('%') && !s.startsWith('/7') && !s.startsWith('m²') && !s.startsWith('K') && !s.startsWith('k')) ? ' ' : '';
    return `${config.prefix}${numStr}${s ? space + s : ''}`;
  }

  function animateKPI(el) {
    if (el.dataset.animating === 'true') return;
    el.dataset.animating = 'true';

    const text = el.textContent.trim();
    const config = parseKPIValue(text, el);
    const duration = parseInt(el.getAttribute('data-duration'), 10) || 1900;
    const startTime = performance.now();

    el.classList.add('counting');
    el.classList.remove('counted');

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // High-luxury easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = config.target * ease;

      el.textContent = formatValue(currentVal, config);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = formatValue(config.target, config);
        el.classList.remove('counting');
        el.classList.add('counted');
        el.dataset.animating = 'false';
      }
    }

    requestAnimationFrame(update);
  }

  // Use IntersectionObserver with threshold
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateKPI(entry.target);
          // Interactive hover to re-trigger
          entry.target.addEventListener('mouseenter', () => {
            if (entry.target.dataset.animating !== 'true') {
              animateKPI(entry.target);
            }
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    kpiElements.forEach(el => observer.observe(el));
  } else {
    kpiElements.forEach(el => animateKPI(el));
  }
}

// Make initDynamicKPIs globally accessible
window.initDynamicKPIs = initDynamicKPIs;

