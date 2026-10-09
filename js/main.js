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
   3D HUD ORBIT ENGINE & REAL-TIME CALLOUT LEADER LINES (OPTIMIZED)
   -------------------------------------------------------------------------- */
function init3DHudOrbit() {
  const stage = document.getElementById('hudStage');
  const svg = document.getElementById('hudCalloutSvg');
  const nodes = document.querySelectorAll('.hud-orbit-node');
  const cards = document.querySelectorAll('.hud-callout-card');

  if (!stage || !svg || !nodes.length) return;

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

  let stageWidth = stage.offsetWidth || 1100;
  let stageHeight = stage.offsetHeight || 480;
  let centerX = stageWidth / 2;
  let centerY = stageHeight / 2;
  let rx = isMobile ? stageWidth * 0.40 : isTablet ? Math.min(320, stageWidth * 0.35) : Math.min(410, stageWidth * 0.38);
  let ry = isMobile ? stageHeight * 0.30 : isTablet ? Math.min(140, stageHeight * 0.28) : Math.min(165, stageHeight * 0.30);

  function updateDimensions() {
    stageWidth = stage.offsetWidth || 1100;
    stageHeight = stage.offsetHeight || 480;
    centerX = stageWidth / 2;
    centerY = stageHeight / 2;
    const mob = window.innerWidth <= 768;
    const tab = window.innerWidth > 768 && window.innerWidth <= 1024;
    rx = mob ? stageWidth * 0.40 : tab ? Math.min(320, stageWidth * 0.35) : Math.min(410, stageWidth * 0.38);
    ry = mob ? stageHeight * 0.30 : tab ? Math.min(140, stageHeight * 0.28) : Math.min(165, stageHeight * 0.30);
  }
  window.addEventListener('resize', updateDimensions, { passive: true });

  const nodeOffsets = [
    0,                  // 0 rad (ARUZ Desarrolladora)
    Math.PI / 2,        // PI/2 rad (ARUZ Inmobiliaria)
    Math.PI,            // PI rad (ARUZ Construcción)
    (3 * Math.PI) / 2   // 3PI/2 rad (ARUZ Maquinaria)
  ];

  let currentAngle = 0;
  let targetSpeed = 0.0032;
  let currentSpeed = 0.0032;
  let activeHoverIndex = -1;
  let leaveTimer = null;
  let isVisible = true;
  let animId = null;

  // Pre-create conduits and photons in SVG once (zero DOM allocation in animation loop)
  const conduits = [];
  const photons = [];
  for (let i = 0; i < 4; i++) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('stroke', 'rgba(238, 182, 35, 0.32)');
    line.setAttribute('stroke-width', '1.2');
    line.setAttribute('stroke-dasharray', '4 3');
    svg.appendChild(line);
    conduits.push(line);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '2.5');
    circle.setAttribute('fill', '#EEB623');
    svg.appendChild(circle);
    photons.push(circle);
  }

  // Pre-create leader elements for active card hover
  const leaderPolyline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  leaderPolyline.setAttribute('class', 'hud-leader-line active');
  leaderPolyline.style.opacity = '0';
  svg.appendChild(leaderPolyline);

  const leaderDotNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  leaderDotNode.setAttribute('r', '4.5');
  leaderDotNode.setAttribute('class', 'hud-leader-dot');
  leaderDotNode.style.opacity = '0';
  svg.appendChild(leaderDotNode);

  const leaderDotCard = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  leaderDotCard.setAttribute('r', '3.5');
  leaderDotCard.setAttribute('class', 'hud-leader-dot');
  leaderDotCard.style.opacity = '0';
  svg.appendChild(leaderDotCard);

  function setActive(idx) {
    if (leaveTimer) clearTimeout(leaveTimer);
    activeHoverIndex = idx;
    targetSpeed = 0.0003;
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
      leaderPolyline.style.opacity = '0';
      leaderDotNode.style.opacity = '0';
      leaderDotCard.style.opacity = '0';
    }, 180);
  }

  nodes.forEach((node, idx) => {
    node.addEventListener('mouseenter', () => setActive(idx));
    node.addEventListener('mouseleave', clearActive);
    node.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && activeHoverIndex !== idx) {
        e.preventDefault();
        setActive(idx);
      }
    });
  });

  cards.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => setActive(idx));
    card.addEventListener('mouseleave', clearActive);
  });

  let stageTiltX = 0, stageTiltY = 0, targetTiltX = 0, targetTiltY = 0;
  if (!isMobile) {
    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      targetTiltY = nx * 5;
      targetTiltX = -ny * 4;
    }, { passive: true });
  }

  function updateOrbit() {
    if (!isVisible) return;

    if (isMobile) {
      // On mobile: position static balanced nodes once without continuous CPU animation
      nodes.forEach((node, idx) => {
        const angle = nodeOffsets[idx] + 0.4;
        const nodeX = centerX + Math.cos(angle) * rx;
        const nodeY = centerY + Math.sin(angle) * ry;
        node.style.left = `${nodeX}px`;
        node.style.top = `${nodeY}px`;
        node.style.transform = 'translate(-50%, -50%) scale(1)';
        conduits[idx].setAttribute('x1', centerX);
        conduits[idx].setAttribute('y1', centerY);
        conduits[idx].setAttribute('x2', nodeX);
        conduits[idx].setAttribute('y2', nodeY);
        photons[idx].style.display = 'none';
      });
      return; // Stop animation loop on mobile! Saves 100% CPU!
    }

    currentSpeed += (targetSpeed - currentSpeed) * 0.08;
    currentAngle += currentSpeed;

    stageTiltX += (targetTiltX - stageTiltX) * 0.06;
    stageTiltY += (targetTiltY - stageTiltY) * 0.06;
    stage.style.transform = `rotateX(${stageTiltX}deg) rotateY(${stageTiltY}deg)`;

    const cardPositions = [
      { x: centerX + rx * 0.85, y: centerY - ry * 1.25 },
      { x: centerX + rx * 0.85, y: centerY + ry * 0.85 },
      { x: centerX - rx * 1.35, y: centerY + ry * 0.85 },
      { x: centerX - rx * 1.35, y: centerY - ry * 1.25 }
    ];

    nodes.forEach((node, idx) => {
      const angle = currentAngle + nodeOffsets[idx];
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const nodeX = centerX + cosA * rx;
      const nodeY = centerY + sinA * ry;

      const depthFactor = (sinA + 1) / 2;
      const scale = (idx === activeHoverIndex ? 1.18 : 0.88) + depthFactor * 0.28;
      const opacity = idx === activeHoverIndex ? 1.0 : (0.75 + depthFactor * 0.25);
      const zIndex = Math.round((idx === activeHoverIndex ? 35 : 5) + depthFactor * 20);

      const conduit = conduits[idx];
      conduit.setAttribute('x1', centerX);
      conduit.setAttribute('y1', centerY);
      conduit.setAttribute('x2', nodeX);
      conduit.setAttribute('y2', nodeY);
      conduit.setAttribute('stroke', idx === activeHoverIndex ? '#EEB623' : 'rgba(238, 182, 35, 0.32)');
      conduit.setAttribute('stroke-width', idx === activeHoverIndex ? '2.2' : '1.2');

      const pulseT = ((currentAngle * 2.2 + idx * 0.25) % 1);
      const pulseX = centerX + (nodeX - centerX) * pulseT;
      const pulseY = centerY + (nodeY - centerY) * pulseT;
      const photon = photons[idx];
      photon.setAttribute('cx', pulseX);
      photon.setAttribute('cy', pulseY);
      photon.setAttribute('r', idx === activeHoverIndex ? 3.5 : 2.5);

      node.style.left = `${nodeX}px`;
      node.style.top = `${nodeY}px`;
      node.style.transform = `translate(-50%, -50%) scale(${scale})`;
      node.style.opacity = opacity;
      node.style.zIndex = zIndex;

      const card = cards[idx];
      if (card) {
        const cardW = 280;
        const rawX = cardPositions[idx].x;
        const cardX = Math.max(8, Math.min(rawX, stageWidth - cardW - 8));
        const cardY = Math.max(8, Math.min(cardPositions[idx].y, stageHeight - 120));
        card.style.left = `${cardX}px`;
        card.style.top = `${cardY}px`;

        if (idx === activeHoverIndex) {
          const cardAnchorX = idx < 2 ? cardX : cardX + cardW;
          const cardAnchorY = cardY + 50;
          const kneeX = nodeX + (cardAnchorX > nodeX ? 35 : -35);
          const kneeY = cardAnchorY;
          leaderPolyline.setAttribute('d', `M ${nodeX} ${nodeY} L ${kneeX} ${nodeY} L ${kneeX} ${kneeY} L ${cardAnchorX} ${cardAnchorY}`);
          leaderPolyline.style.opacity = '1';
          leaderDotNode.setAttribute('cx', nodeX);
          leaderDotNode.setAttribute('cy', nodeY);
          leaderDotNode.style.opacity = '1';
          leaderDotCard.setAttribute('cx', cardAnchorX);
          leaderDotCard.setAttribute('cy', cardAnchorY);
          leaderDotCard.style.opacity = '1';
        }
      }
    });

    animId = requestAnimationFrame(updateOrbit);
  }

  // IntersectionObserver: Pause completely when offscreen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible = true;
          if (!isMobile && !animId) updateOrbit();
        } else {
          isVisible = false;
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      });
    }, { threshold: 0.05 });
    observer.observe(stage);
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

    const directorPhone = '5219841308260'; // Dirección de Operaciones
    
    let text = `Hola Dirección de Operaciones (Director de Operaciones ARUZ),\n\n`;
    text += `Mi nombre es *${name}* y solicito asesoría técnica y comercial:\n`;
    text += `• *Objetivo:* ${motivation}\n`;
    text += `• *Submarca de Interés:* ${division}\n`;
    text += `• *Rango de Presupuesto:* ${budget}\n`;
    if (message) {
      text += `• *Comentarios específicos:* ${message}\n`;
    }
    text += `\nSolicito agendar una llamada de asesoría bajo el criterio experto del ecosistema ARUZ.`;

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
async function handleLeadSubmit(event) {
  if (event) event.preventDefault();

  const name = document.getElementById('leadName')?.value.trim() || '';
  const phone = document.getElementById('leadPhone')?.value.trim() || '';
  const email = document.getElementById('leadEmail')?.value.trim() || '';
  const interest = document.getElementById('leadInterest')?.value || document.getElementById('leadProperty')?.value || 'Preventas Ciudad Mayakoba';
  const message = document.getElementById('leadMessage')?.value.trim() || '';
  const consentBox = document.getElementById('leadConsent');

  if (consentBox && !consentBox.checked) {
    alert('Por favor, acepta el Aviso de Privacidad para continuar.');
    return;
  }

  if (!name || !phone || !email) return;

  const btn = document.getElementById('btnSubmitLead');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>Registrando en CRM...</span><span class="material-symbols-outlined text-sm animate-spin">refresh</span>`;
  }

  // 1. Dual-Dispatch to GoHighLevel CRM via async proxy
  if (typeof window.dispatchLeadToCRM === 'function') {
    await window.dispatchLeadToCRM({
      name: name,
      phone: phone,
      email: email,
      interest: interest,
      message: message
    });
  }

  // 2. Build WhatsApp Payload for Direct Instant Contact
  const directorPhone = '5219841308260';
  let text = `*NUEVO LEAD REGISTRADO EN CRM ARUZ*

`;
  text += `👤 *Nombre:* ${name}
`;
  text += `📱 *Tel / WhatsApp:* ${phone}
`;
  text += `📧 *Correo:* ${email}
`;
  text += `🏛️ *División / Interés:* ${interest}
`;
  if (message) {
    text += `💬 *Mensaje:* ${message}
`;
  }
  text += `
_Solicito atención directa de la dirección operativa y envío de dossier técnico._`;

  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${directorPhone}&text=${encodedText}`;

  const successMsg = document.getElementById('leadSuccessMsg');
  if (successMsg) {
    successMsg.classList.remove('hidden');
  }
  if (btn) {
    btn.innerHTML = `<span>¡Solicitud Enviada a Dirección!</span><span class="material-symbols-outlined text-sm">check_circle</span>`;
    btn.className = "w-full bg-verde-manglar text-white font-button py-3.5 px-6 rounded-lg font-label-caps uppercase text-xs font-bold tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2";
  }

  // Open WhatsApp in new tab
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
  }, 400);
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
    
    // Start value extraction for countdown animations (e.g. starting at 10,000,000)
    let startVal = null;
    if (el.getAttribute('data-start') !== null) {
      const cleanStart = el.getAttribute('data-start').replace(/[$,\sMXN]/gi, '').trim();
      startVal = parseFloat(cleanStart);
    }

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

    const useCommas = rawTarget.includes(',') || targetNum >= 1000 || (startVal !== null && startVal >= 1000);

    return {
      raw: rawTarget,
      start: startVal !== null && !isNaN(startVal) ? startVal : 0,
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
    const duration = parseInt(el.getAttribute('data-duration'), 10) || 2200;
    const startTime = performance.now();

    el.classList.add('counting');
    el.classList.remove('counted');

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // High-luxury smooth cubic-out easing
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = config.start + (config.target - config.start) * ease;

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

