/**
 * ARUZ CORE 360 DIGITAL ECOSYSTEM - JAVASCRIPT CONTROLLER
 * High-Tech Minimalist Interactive Experience & WhatsApp Lead Pre-qualifier
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSubbrand360();
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
   HERO 360 ECOSYSTEM - 4 SUBMARCAS INTEGRADAS
   -------------------------------------------------------------------------- */
const subbrandData = {
  1: {
    title: "ARUZ Desarrolladora — Proyectos Propios de Autor",
    desc: "División de desarrollo inmobiliario de Grupo Ruiz. Concepción y ejecución de proyectos residenciales de alta gama con diseño bioclimático y acabados de lujo regional.",
    badge: "4 Preventas Exclusivas",
    linkUrl: "desarrolladora.html",
    linkText: "Explorar Desarrolladora & Preventas"
  },
  2: {
    title: "ARUZ Inmobiliaria — Asesoría & Propiedades Verificadas",
    desc: "Comercialización y asesoría patrimonial basada en evidencia real. Portafolio de inmuebles de terceros auditados rigurosamente en dictamen técnico y certeza jurídica.",
    badge: "Portafolio Certificado",
    linkUrl: "inmobiliaria.html",
    linkText: "Ver Catálogo Inmobiliario"
  },
  3: {
    title: "CADE Diseño y Construcción — Brazo Constructor Oficial",
    desc: "Ejecución técnica y control de calidad de Grupo Ruiz. Más de 12 años construyendo con los expertos de Ciudad Mayakoba, Valle Aurora y Xpuha bajo el Sello CADE.",
    badge: "+12 Años de Trayectoria",
    linkUrl: "landings/cade-constructora.html",
    linkText: "Conocer División CADE"
  },
  4: {
    title: "ARUZ Maquinaria Pesada — Flota Propia & Terracerías",
    desc: "Infraestructura operativa con excavadoras, retroexcavadoras y camiones propios para garantizar que las terracerías y cimentaciones nunca dependan de terceros.",
    badge: "Flota Operativa Activa",
    linkUrl: "landings/aruz-maquinaria.html",
    linkText: "Ver Flota de Maquinaria"
  }
};

function initSubbrand360() {
  const cards = document.querySelectorAll('.flow-card');
  const bannerTitle = document.getElementById('flowActiveTitle');
  const bannerDesc = document.getElementById('flowActiveDesc');
  const bannerBtn = document.getElementById('flowActiveBtn');

  if (!cards.length || !bannerTitle || !bannerDesc) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const id = card.getAttribute('data-subbrand');
      if (subbrandData[id]) {
        bannerTitle.textContent = subbrandData[id].title;
        bannerDesc.textContent = subbrandData[id].desc;
        if (bannerBtn) {
          bannerBtn.href = subbrandData[id].linkUrl;
          bannerBtn.textContent = subbrandData[id].linkText;
        }
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
    const division = document.getElementById('advDivision')?.value || 'ARUZ Desarrolladora';
    const budget = document.getElementById('advBudget')?.value || '$2.5M - $5M MXN';
    const message = document.getElementById('advMessage')?.value.trim() || '';

    // Official WhatsApp format adhering to Brand Manual v2.0
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
