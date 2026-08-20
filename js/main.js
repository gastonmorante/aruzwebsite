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
    const rx = isMobile ? stageWidth * 0.38 : Math.min(380, stageWidth * 0.34);
    const ry = isMobile ? stageHeight * 0.32 : Math.min(140, stageHeight * 0.28);

    // Dynamic quadrant anchor positions for Callout Cards
    const cardPositions = [
      { x: centerX + rx * 0.88, y: centerY - ry * 1.35 }, // Top Right (Desarrolladora)
      { x: centerX + rx * 0.88, y: centerY + ry * 0.85 }, // Bottom Right (Inmobiliaria)
      { x: centerX - rx * 1.35, y: centerY + ry * 0.85 }, // Bottom Left (CADE)
      { x: centerX - rx * 1.35, y: centerY - ry * 1.35 }  // Top Left (Maquinaria)
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
      const scale = (idx === activeHoverIndex ? 1.15 : 0.85) + depthFactor * 0.3;
      const opacity = idx === activeHoverIndex ? 1.0 : (0.7 + depthFactor * 0.3);
      const zIndex = Math.round((idx === activeHoverIndex ? 30 : 5) + depthFactor * 15);

      node.style.left = `${nodeX}px`;
      node.style.top = `${nodeY}px`;
      node.style.transform = `translate(-50%, -50%) scale(${scale})`;
      node.style.opacity = opacity;
      node.style.zIndex = zIndex;

      // Update card positioning
      const card = cards[idx];
      if (card) {
        if (!isMobile) {
          const cardX = cardPositions[idx].x;
          const cardY = cardPositions[idx].y;
          card.style.left = `${cardX}px`;
          card.style.top = `${cardY}px`;
        }

        // ONLY draw Technical Callout Leader Line if this node/card is currently active/hovered!
        if (!isMobile && idx === activeHoverIndex) {
          const cardX = cardPositions[idx].x;
          const cardY = cardPositions[idx].y;
          const cardAnchorX = idx < 2 ? cardX : cardX + card.offsetWidth;
          const cardAnchorY = cardY + card.offsetHeight / 2;

          const kneeX = nodeX + (cardAnchorX > nodeX ? 40 : -40);
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
          dot.setAttribute('r', 4);
          dot.setAttribute('class', 'hud-leader-dot');
          svg.appendChild(dot);

          // Card Anchor Dot
          const dotCard = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dotCard.setAttribute('cx', cardAnchorX);
          dotCard.setAttribute('cy', cardAnchorY);
          dotCard.setAttribute('r', 3);
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
