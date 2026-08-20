/**
 * ARUZ CORE 360 DIGITAL ECOSYSTEM - JAVASCRIPT CONTROLLER
 * High-Tech Minimalist Interactive Experience & WhatsApp Lead Pre-qualifier
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFlow360();
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

  // Scroll glass state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });

    // Close when clicking link
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
   HERO 360 ECOSYSTEM INTERACTIVE FLOW
   -------------------------------------------------------------------------- */
const flowData = {
  1: {
    title: "1. Diseño & Planeación Arquitectónica",
    desc: "Desarrollo conceptual bioclimático, análisis topográfico hiperlocal y modelado BIM de alta precisión para optimizar costos y tiempos de ejecución desde el día cero.",
    evidence: "Estudios estructurales y de impacto ambiental integrados antes de mover un solo metro cúbico."
  },
  2: {
    title: "2. CADE Construcción & Control de Calidad",
    desc: "Ejecución de obra directa con cuadrillas y maquinaria pesada propia. Más de 12 años trabajando con los expertos de Ciudad Mayakoba respaldan cada colado.",
    evidence: "Supervisión diaria, bitácora digital de obra y cero intermediarios en la cadena de suministro."
  },
  3: {
    title: "3. ARUZ Inmobiliaria & Criterio Experto",
    desc: "Asesoría patrimonial y de inversión con ticket mínimo de $2.5M MXN. Análisis financiero honesto sin falsas promesas de 'paraíso'.",
    evidence: "Acompañamiento legal, dictamen de certeza jurídica y asesoría para clientes locales e internacionales."
  },
  4: {
    title: "4. Entrega & Programa Círculo ARUZ",
    desc: "La relación no termina con la llave en mano. Seguimiento estructurado a 30, 90 y 180 días con garantías de vicios ocultos y mantenimiento preventivo.",
    evidence: "Inspecciones técnicas post-entrega coordinadas directamente por el Gerente de Construcción."
  }
};

function initFlow360() {
  const cards = document.querySelectorAll('.flow-card');
  const bannerTitle = document.getElementById('flowActiveTitle');
  const bannerDesc = document.getElementById('flowActiveDesc');

  if (!cards.length || !bannerTitle || !bannerDesc) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const step = card.getAttribute('data-step');
      if (flowData[step]) {
        bannerTitle.textContent = flowData[step].title;
        bannerDesc.textContent = `${flowData[step].desc} — Evidencia: ${flowData[step].evidence}`;
      }
    });
  });
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
          card.style.animation = 'fadeInCard 0.4s ease forwards';
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
    const division = document.getElementById('advDivision')?.value || 'Desarrollos ARUZ';
    const budget = document.getElementById('advBudget')?.value || '$2.5M - $5M MXN';
    const message = document.getElementById('advMessage')?.value.trim() || '';

    // Official WhatsApp format adhering to Brand Manual v2.0
    const directorPhone = '5216674069523'; // Carlos Alfredo Ruiz Ramos
    
    let text = `Hola Carlos Alfredo Ruiz Ramos (Director de Operaciones ARUZ),\n\n`;
    text += `Mi nombre es *${name}* y solicito asesoría técnica y comercial:\n`;
    text += `• *Objetivo:* ${motivation}\n`;
    text += `• *División de Interés:* ${division}\n`;
    text += `• *Rango de Presupuesto:* ${budget}\n`;
    if (message) {
      text += `• *Comentarios específicos:* ${message}\n`;
    }
    text += `\nSolicito agendar una llamada de asesoría bajo el criterio experto del ecosistema ARUZ + CADE.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${directorPhone}&text=${encodedText}`;

    // Open WhatsApp
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
