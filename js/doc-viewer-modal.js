/**
 * ARUZ CORE 360 - INTERACTIVE DOCUMENT & VIDEO VIEWER MODAL ("REACT-STYLE" SPA VIEWER)
 * Displays Architectural Blueprints, Technical Datasheets, Brochures, Sales Terms, and 4K Video Tours
 * seamlessly in-page without leaving the site or forcing raw downloads.
 */

(function () {
  'use strict';

  // Comprehensive Property Documentation Data Matrix
  const PROPERTY_DOCS = {
    'eternity-jol': {
      title: 'Casa Eternity Jol',
      subtitle: 'Senderos Norte Mz 18 Lt 03 · Ciudad Mayakoba',
      price: '$5,450,000 MXN',
      area: '305.31 m²',
      levels: 'Planta Baja + Nivel 1 + Roof Deck Privado',
      videoUrl: '../assets/properties/eternity-jol/videos/eternity-esp.mp4',
      posterUrl: '../assets/properties/eternity-jol/exteriores/fachada_frontal.webp',
      pdfPlanos: '../assets/properties/eternity-jol/docs/MZ_18_L_03.pdf',
      pdfFicha: '../assets/properties/eternity-jol/docs/CARACTERISTICAS_SN_MZ18LT03_Eternity_Jol.pdf',
      pdfBrochure: '../assets/properties/eternity-jol/docs/CARACTERISTICAS_SN_MZ18LT03_Eternity_Jol.pdf',
      pdfCondiciones: '../assets/docs/ARUZ_CONDICIONES_DE_VENTA.pdf',
      specs: [
        { label: 'Superficie de Construcción', val: '305.31 m² habitables' },
        { label: 'Superficie de Lote', val: '272.50 m²' },
        { label: 'Cimentación', val: 'Zapata Corrida CADE f\'c=250 kg/cm² sobre roca sólida' },
        { label: 'Estructura', val: 'Concreto armado antisísmico con varilla corrugada grado 42' },
        { label: 'Muros y Cerramientos', val: 'Block vibrocomprimido 15x20x40 con castillos ahogados' },
        { label: 'Carpintería de Autor', val: 'Madera de Tzalam macizo tropicalizado con sellador marino' },
        { label: 'Pisos y Revestimientos', val: 'Mármol Travertino Veracruz en placas gran formato' },
        { label: 'Alberca Privada', val: 'Acabado Chukum artesanal 100% natural con sistema de filtrado' },
        { label: 'Climatización', val: 'Sistema Inverter VRF de alta eficiencia energética' },
        { label: 'Cancelería', val: 'Aluminio anodizado negro línea española Serie 80 con cristal templado 9mm' }
      ],
      blueprintLevels: [
        { name: 'Planta Baja', desc: 'Acceso principal, cochera 2 autos, sala-comedor doble altura, cocina integral en isla con granito, terraza con alberca Chukum y jardín tropical.' },
        { name: 'Primer Nivel', desc: 'Master Suite con vestidor y baño en mármol, 2 Junior Suites cada una con baño privado y clóset de Tzalam, family room.' },
        { name: 'Roof Deck', desc: 'Área lounge semicubierta con pérgola de Tzalam, barra de bar con tarja, asador de acero inoxidable y jacuzzi panorámico.' },
        { name: 'Cortes & Fachadas', desc: 'Elevación frontal bioclimática, cortes transversales con altura libre de 2.85m y memorias de cálculo estructural CADE.' }
      ],
      terms: [
        { title: 'Esquema de Inversión en Preventa', desc: '30% de enganche a la firma del contrato privado de compraventa notariado.' },
        { title: 'Calendario de Pagos a Obra', desc: '60% diferido en mensualidades vinculadas directamente al avance de obra CADE verificado en bitácora.' },
        { title: 'Saldo a la Entrega y Escrituración', desc: '10% contra entrega física de llaves y escrituración notarial ante Notario Público en Playa del Carmen.' },
        { title: 'Bono de Equipamiento de $450,000 MXN', desc: 'Incluye paquete de muebles de autor en Tzalam o bonificación para sistema de paneles solares fotovoltaicos.' },
        { title: 'Garantía Estructural CADE', desc: '5 años de garantía estructural por escrito y 1 año en vicios ocultos e impermeabilización.' }
      ]
    },
    'tuux': {
      title: 'Casa Tu\'ux',
      subtitle: 'Senderos Norte Mz 11 Lt 18 · Ciudad Mayakoba',
      price: '$5,290,000 MXN',
      area: '333.59 m²',
      levels: 'Planta Baja + Nivel 1 + Roof Top & Cine Exterior',
      videoUrl: null,
      posterUrl: '../assets/properties/tuux/exteriores/img_0.webp',
      pdfPlanos: '../assets/properties/tuux/docs/MANZANA_11_LT18.pdf',
      pdfFicha: '../assets/properties/tuux/docs/Brochure_Tuux.pdf',
      pdfBrochure: '../assets/properties/tuux/docs/Brochure_Tuux.pdf',
      pdfCondiciones: '../assets/docs/ARUZ_CONDICIONES_DE_VENTA.pdf',
      specs: [
        { label: 'Superficie de Construcción', val: '333.59 m²' },
        { label: 'Superficie de Lote', val: '280.00 m²' },
        { label: 'Cimentación', val: 'Zapata Corrida CADE f\'c=250 kg/cm² con impermeabilización integral' },
        { label: 'Estructura', val: 'Columnas y trabes de concreto armado calculadas para zona costera' },
        { label: 'Carpintería', val: 'Tzalam macizo en puertas principales, clósets y vanity' },
        { label: 'Acabados en Muros', val: 'Chukum artesanal impermeable y piedra maya natural en fachada' },
        { label: 'Alberca', val: 'Alberca privada en Chukum con deck perimetral de Tzalam' },
        { label: 'Climatización', val: 'Equipos Inverter VRF multizona en todas las estancias' }
      ],
      blueprintLevels: [
        { name: 'Planta Baja', desc: 'Vestíbulo de acceso, estancia doble altura, cocina abierta con isla de cuarzo, suite de visitas con baño, terraza con alberca.' },
        { name: 'Primer Nivel', desc: '3 suites completas con baño privado, recámara principal con walk-in closet y balcón privado hacia el jardín.' },
        { name: 'Roof Deck & Cine', desc: 'Rooftop panorámico con proyector exterior para cine al aire libre, asador, medio baño y área de camastros.' }
      ],
      terms: [
        { title: 'Enganche', desc: '30% a la firma del contrato notarial.' },
        { title: 'Pagos Durante Construcción', desc: '60% mensualidades durante la obra CADE.' },
        { title: 'Finiquito', desc: '10% a la entrega y firma notarial.' },
        { title: 'Bono $450,000 MXN', desc: 'Equipamiento de autor o paneles solares incluidos.' }
      ]
    },
    'sak-luum': {
      title: 'Casa Sak Lu\'um',
      subtitle: 'Senderos Norte Mz 14 Lt 04 · Ciudad Mayakoba',
      price: '$5,380,000 MXN',
      area: '318.45 m²',
      levels: 'Planta Baja + Nivel 1 + Roof Deck & Alberca',
      videoUrl: '../assets/properties/sak-luum/videos/sak-luum-esp.mp4',
      posterUrl: '../assets/properties/sak-luum/exteriores/3_1.webp',
      pdfPlanos: '../assets/properties/sak-luum/docs/MANZANA_14_LT_4.pdf',
      pdfFicha: '../assets/properties/sak-luum/docs/MANZANA_14_LT_4.pdf',
      pdfBrochure: '../assets/properties/sak-luum/docs/MANZANA_14_LT_4.pdf',
      pdfCondiciones: '../assets/docs/ARUZ_CONDICIONES_DE_VENTA.pdf',
      specs: [
        { label: 'Superficie de Construcción', val: '318.45 m²' },
        { label: 'Superficie de Lote', val: '275.00 m²' },
        { label: 'Cimentación', val: 'Zapata Corrida CADE f\'c=250 kg/cm²' },
        { label: 'Maderas', val: 'Tzalam macizo en vestidores y puertas' },
        { label: 'Alberca', val: 'Acabado Chukum con iluminación subacuática LED' }
      ],
      blueprintLevels: [
        { name: 'Planta Baja', desc: 'Cochera 2 autos, sala, comedor, cocina en isla, terraza, alberca privada y jardín.' },
        { name: 'Primer Nivel', desc: '3 Recámaras con baño privado y clóset vestidor, sala de TV.' },
        { name: 'Roof Deck', desc: 'Barra de asador, pérgola de madera dura y vista panorámica a la selva maya.' }
      ],
      terms: [
        { title: 'Enganche', desc: '30% en promesa de compraventa notariada.' },
        { title: 'Plan de Obra', desc: '60% en ministraciones de avance constructivo.' },
        { title: 'Entrega Final', desc: '10% a la entrega de llaves y notaría.' }
      ]
    },
    'kaak-naajal': {
      title: 'Casa Ka\'ak Naajal',
      subtitle: 'Senderos Poniente Mz 12 Lt 08 · Ciudad Mayakoba',
      price: '$5,150,000 MXN',
      area: '310.00 m²',
      levels: 'Planta Baja + Nivel 1 + Roof Deck Lounge',
      videoUrl: '../assets/properties/kaak-naajal/videos/kaak-naajal-esp.mp4',
      posterUrl: '../assets/properties/kaak-naajal/exteriores/img_0.webp',
      pdfPlanos: '../assets/properties/kaak-naajal/docs/MANZANA_12_LT_8.pdf',
      pdfFicha: '../assets/properties/kaak-naajal/docs/CARACTERISTICAS_SP_MZ12LT08_Kaak_Naajal.pdf',
      pdfBrochure: '../assets/properties/kaak-naajal/docs/CARACTERISTICAS_SP_MZ12LT08_Kaak_Naajal.pdf',
      pdfCondiciones: '../assets/docs/ARUZ_CONDICIONES_DE_VENTA.pdf',
      specs: [
        { label: 'Superficie de Construcción', val: '310.00 m²' },
        { label: 'Superficie de Lote', val: '270.00 m²' },
        { label: 'Estructura', val: 'Concreto CADE alta resistencia y varilla corrugada' },
        { label: 'Carpintería', val: 'Tzalam tropical con acabado semimate' },
        { label: 'Alberca', val: 'Chukum artesanal con sistema de bombeo silencioso' }
      ],
      blueprintLevels: [
        { name: 'Planta Baja', desc: 'Recámara en PB con baño, sala doble altura, cocina de autor con isla, alberca Chukum.' },
        { name: 'Primer Nivel', desc: 'Master Suite con vestidor, 2 recámaras secundarias en suite, estar de TV.' },
        { name: 'Roof Deck', desc: 'Terraza apergolada, asador de acero inoxidable y área lounge con vista a la selva.' }
      ],
      terms: [
        { title: 'Enganche', desc: '30% a la firma del contrato privado de preventa.' },
        { title: 'Ministraciones', desc: '60% durante el proceso de construcción.' },
        { title: 'Finiquito', desc: '10% contra entrega de posesión y título de propiedad.' }
      ]
    }
  };

  class AruzDocViewerModal {
    constructor() {
      this.isOpen = false;
      this.currentPropKey = 'eternity-jol';
      this.activeTab = 'planos'; // 'planos' | 'ficha' | 'brochure' | 'condiciones' | 'video'
      this.viewMode = 'interactive'; // 'interactive' | 'pdf'
      this.init();
    }

    init() {
      this.detectPropertyFromURL();
      this.renderModal();
      this.bindTriggers();
    }

    detectPropertyFromURL() {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('tuux')) this.currentPropKey = 'tuux';
      else if (path.includes('sak-luum') || path.includes('sak_luum')) this.currentPropKey = 'sak-luum';
      else if (path.includes('kaak-naajal') || path.includes('kaak_naajal')) this.currentPropKey = 'kaak-naajal';
      else this.currentPropKey = 'eternity-jol';
    }

    renderModal() {
      if (document.getElementById('aruz-doc-modal')) return;

      const prop = PROPERTY_DOCS[this.currentPropKey] || PROPERTY_DOCS['eternity-jol'];

      const modalWrap = document.createElement('div');
      modalWrap.id = 'aruz-doc-modal';
      modalWrap.className = 'fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-6 opacity-0 pointer-events-none transition-all duration-300';
      modalWrap.innerHTML = `
        <!-- Dark Backdrop with Luxury Blur -->
        <div id="aruz-doc-modal-backdrop" class="absolute inset-0 bg-carbon-aruz/80 backdrop-blur-md transition-opacity"></div>

        <!-- Modal Dialog Container -->
        <div class="relative w-full max-w-5xl bg-surface-card rounded-3xl border border-dorado-aruz/40 shadow-2xl shadow-carbon-aruz/50 overflow-hidden flex flex-col max-h-[92vh] z-10 scale-95 transition-transform duration-300">
          
          <!-- Header Bar -->
          <div class="px-6 py-4 bg-carbon-aruz text-white border-b border-dorado-aruz/30 flex items-center justify-between gap-4 shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-dorado-aruz/20 border border-dorado-aruz/50 flex items-center justify-center text-dorado-aruz">
                <span class="material-symbols-outlined text-2xl">folder_open</span>
              </div>
              <div>
                <h3 id="doc-modal-title" class="font-serif text-lg md:text-xl font-bold text-white tracking-wide">${prop.title}</h3>
                <p id="doc-modal-subtitle" class="text-xs text-piedra-maya/80 font-mono">${prop.subtitle} · ${prop.price}</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <!-- View Mode Toggle (Interactive vs PDF) -->
              <div id="doc-view-mode-pill" class="hidden sm:inline-flex items-center bg-white/10 p-1 rounded-xl border border-white/10 text-xs">
                <button type="button" id="btn-mode-interactive" class="px-3 py-1 rounded font-bold text-dorado-aruz bg-white/10 transition-all">Interactiva</button>
                <button type="button" id="btn-mode-pdf" class="px-3 py-1 rounded text-white/60 hover:text-white transition-all">PDF Vectorial</button>
              </div>
              <button type="button" id="aruz-doc-modal-close" class="w-9 h-9 rounded-full bg-white/10 hover:bg-dorado-aruz hover:text-carbon-aruz text-white flex items-center justify-center transition-all" aria-label="Cerrar">
                <span class="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
          </div>

          <!-- Tab Switcher Bar ("React-Style" Segmented Tabs) -->
          <div class="px-6 py-3 bg-surface-container-highest/60 border-b border-outline-variant/40 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            <button type="button" data-tab="planos" class="doc-tab-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 bg-carbon-aruz text-dorado-aruz shadow-sm">
              <span class="material-symbols-outlined text-base">architecture</span>
              <span>Planos</span>
            </button>
            <button type="button" data-tab="ficha" class="doc-tab-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 text-carbon-aruz/70 hover:bg-black/5">
              <span class="material-symbols-outlined text-base">description</span>
              <span>Ficha Técnica</span>
            </button>
            <button type="button" data-tab="brochure" class="doc-tab-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 text-carbon-aruz/70 hover:bg-black/5">
              <span class="material-symbols-outlined text-base">menu_book</span>
              <span>Brochure</span>
            </button>
            <button type="button" data-tab="condiciones" class="doc-tab-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 text-carbon-aruz/70 hover:bg-black/5">
              <span class="material-symbols-outlined text-base">verified</span>
              <span>Condiciones</span>
            </button>
            <button type="button" data-tab="video" class="doc-tab-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 text-carbon-aruz/70 hover:bg-black/5">
              <span class="material-symbols-outlined text-base text-dorado-profundo">play_circle</span>
              <span>Video Tour</span>
            </button>
          </div>

          <!-- Body Content Area -->
          <div id="doc-modal-body" class="p-6 md:p-8 overflow-y-auto flex-1 text-carbon-aruz">
            <!-- Dynamic Content will be injected here -->
          </div>

          <!-- Footer Action Bar -->
          <div class="px-6 py-4 bg-surface-container-low border-t border-outline-variant/40 flex flex-wrap items-center justify-between gap-4 shrink-0">
            <div class="flex items-center gap-2 text-xs text-gris-grafito">
              <span class="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse"></span>
              <span>Documentación oficial validada por Consortium GPRuiz S.A. de C.V.</span>
            </div>

            <div class="flex items-center gap-3">
              <a id="btn-download-raw-pdf" href="#" target="_blank" rel="noopener" class="px-4 py-2 rounded-xl border border-carbon-aruz/20 hover:border-dorado-aruz text-carbon-aruz hover:text-dorado-profundo text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all">
                <span class="material-symbols-outlined text-base">download</span>
                <span>Descargar PDF</span>
              </a>
              <a id="btn-modal-director-wa" href="https://api.whatsapp.com/send?phone=5216674069523&text=Hola%20Carlos%20Alfredo%2C%20estoy%20viendo%20los%20planos%20y%20dossier%20técnico%20y%20deseo%20asesoría%20directa." target="_blank" rel="noopener" class="px-5 py-2 rounded-xl bg-carbon-aruz hover:bg-dorado-profundo text-dorado-aruz hover:text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-md">
                <span class="material-symbols-outlined text-base">phone</span>
                <span>Hablar con el Director</span>
              </a>
            </div>
          </div>

        </div>
      `;

      document.body.appendChild(modalWrap);

      // Bind Modal Internal Events
      document.getElementById('aruz-doc-modal-close').addEventListener('click', () => this.close());
      document.getElementById('aruz-doc-modal-backdrop').addEventListener('click', () => this.close());

      // Keydown ESC to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) this.close();
      });

      // Tabs click handler
      modalWrap.querySelectorAll('.doc-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tab = btn.getAttribute('data-tab');
          this.setTab(tab);
        });
      });

      // View Mode Toggle handler
      const btnInt = document.getElementById('btn-mode-interactive');
      const btnPdf = document.getElementById('btn-mode-pdf');
      btnInt.addEventListener('click', () => this.setViewMode('interactive'));
      btnPdf.addEventListener('click', () => this.setViewMode('pdf'));
    }

    bindTriggers() {
      // Find all buttons in documentation cards across all pages
      document.querySelectorAll('a[data-i18n^="btn.descargar_planos"], a[data-i18n^="btn.descargar_ficha"], a[data-i18n^="btn.ver_brochure"], a[data-i18n^="btn.ver_condiciones"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const i18n = btn.getAttribute('data-i18n');
          let tab = 'planos';
          if (i18n.includes('ficha')) tab = 'ficha';
          else if (i18n.includes('brochure')) tab = 'brochure';
          else if (i18n.includes('condiciones')) tab = 'condiciones';

          this.open(tab);
        });
      });

      // Fallback selector for buttons matching text or parent card
      document.querySelectorAll('.grid > div a[href*=".pdf"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const text = btn.textContent.toLowerCase();
          let tab = 'planos';
          if (text.includes('ficha')) tab = 'ficha';
          else if (text.includes('brochure')) tab = 'brochure';
          else if (text.includes('condicion')) tab = 'condiciones';

          this.open(tab);
        });
      });
    }

    open(tab = 'planos', propKey = null) {
      if (propKey) this.currentPropKey = propKey;
      else this.detectPropertyFromURL();

      const modal = document.getElementById('aruz-doc-modal');
      if (!modal) return;

      this.isOpen = true;
      this.activeTab = tab;
      this.viewMode = 'interactive';

      this.updateHeaderAndTabs();
      this.renderBodyContent();

      // Show Modal with smooth animation
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.querySelector('.max-w-5xl').classList.remove('scale-95');
      modal.querySelector('.max-w-5xl').classList.add('scale-100');
      document.body.style.overflow = 'hidden';
    }

    close() {
      const modal = document.getElementById('aruz-doc-modal');
      if (!modal) return;

      // Pause any running modal video
      const v = modal.querySelector('video');
      if (v) v.pause();

      this.isOpen = false;
      modal.classList.add('opacity-0', 'pointer-events-none');
      modal.querySelector('.max-w-5xl').classList.remove('scale-100');
      modal.querySelector('.max-w-5xl').classList.add('scale-95');
      document.body.style.overflow = '';
    }

    setTab(tab) {
      // Pause any running video before changing tabs
      const v = document.querySelector('#doc-modal-body video');
      if (v) v.pause();

      this.activeTab = tab;
      this.updateHeaderAndTabs();
      this.renderBodyContent();
    }

    setViewMode(mode) {
      this.viewMode = mode;
      const btnInt = document.getElementById('btn-mode-interactive');
      const btnPdf = document.getElementById('btn-mode-pdf');

      if (mode === 'interactive') {
        btnInt.className = 'px-3 py-1 rounded font-bold text-dorado-aruz bg-white/10 transition-all';
        btnPdf.className = 'px-3 py-1 rounded text-white/60 hover:text-white transition-all';
      } else {
        btnPdf.className = 'px-3 py-1 rounded font-bold text-dorado-aruz bg-white/10 transition-all';
        btnInt.className = 'px-3 py-1 rounded text-white/60 hover:text-white transition-all';
      }

      this.renderBodyContent();
    }

    updateHeaderAndTabs() {
      const prop = PROPERTY_DOCS[this.currentPropKey] || PROPERTY_DOCS['eternity-jol'];
      
      document.getElementById('doc-modal-title').textContent = prop.title;
      document.getElementById('doc-modal-subtitle').textContent = `${prop.subtitle} · ${prop.price}`;

      // Update active tab buttons styling
      document.querySelectorAll('#aruz-doc-modal .doc-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === this.activeTab) {
          btn.className = 'doc-tab-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 bg-carbon-aruz text-dorado-aruz shadow-md scale-[1.02]';
        } else {
          btn.className = 'doc-tab-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 text-carbon-aruz/70 hover:bg-black/5';
        }
      });

      // Update download PDF link
      let pdfTarget = prop.pdfPlanos;
      if (this.activeTab === 'ficha') pdfTarget = prop.pdfFicha;
      else if (this.activeTab === 'brochure') pdfTarget = prop.pdfBrochure;
      else if (this.activeTab === 'condiciones') pdfTarget = prop.pdfCondiciones;
      else if (this.activeTab === 'video' && prop.videoUrl) pdfTarget = prop.videoUrl;
      
      document.getElementById('btn-download-raw-pdf').href = pdfTarget;

      // Update WhatsApp action message
      const waLink = `https://api.whatsapp.com/send?phone=5216674069523&text=Hola%20Carlos%20Alfredo%2C%20estoy%20revisando%20los%20${encodeURIComponent(this.activeTab.toUpperCase())}%20de%20${encodeURIComponent(prop.title)}%20en%20el%20sitio%20y%20solicito%20asesoría%20directa.`;
      document.getElementById('btn-modal-director-wa').href = waLink;
    }

    renderBodyContent() {
      const prop = PROPERTY_DOCS[this.currentPropKey] || PROPERTY_DOCS['eternity-jol'];
      const body = document.getElementById('doc-modal-body');

      let currentPdf = prop.pdfPlanos;
      if (this.activeTab === 'ficha') currentPdf = prop.pdfFicha;
      else if (this.activeTab === 'brochure') currentPdf = prop.pdfBrochure;
      else if (this.activeTab === 'condiciones') currentPdf = prop.pdfCondiciones;

      // If PDF View Mode is active, render the embedded native PDF Viewer
      if (this.viewMode === 'pdf' && this.activeTab !== 'video') {
        body.innerHTML = `
          <div class="w-full h-[62vh] rounded-2xl overflow-hidden border border-outline-variant/50 shadow-inner bg-carbon-aruz/5">
            <iframe src="${currentPdf}#toolbar=1&navpanes=0&scrollbar=1" class="w-full h-full border-0" title="Visor de Documento PDF">
              <p class="p-8 text-center text-sm text-gris-grafito">
                Tu navegador no soporta visualización directa de PDF. 
                <a href="${currentPdf}" target="_blank" class="text-dorado-profundo font-bold underline ml-1">Haz clic aquí para abrirlo</a>.
              </p>
            </iframe>
          </div>
        `;
        return;
      }

      // Render Video Tab
      if (this.activeTab === 'video') {
        if (prop.videoUrl) {
          body.innerHTML = `
            <div class="space-y-4">
              <div class="flex items-center justify-between bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40">
                <div>
                  <span class="text-[10px] uppercase font-bold tracking-widest text-dorado-profundo">Recorrido Cinematográfico</span>
                  <h4 class="font-serif text-lg font-bold text-carbon-aruz">Video Tour Guiado · ${prop.title}</h4>
                </div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-carbon-aruz text-dorado-aruz text-xs font-mono font-bold">
                  <span class="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                  <span>4K AUDIO ESPAÑOL</span>
                </div>
              </div>
              <div class="relative rounded-2xl overflow-hidden border border-dorado-aruz/40 shadow-xl bg-black">
                <video controls preload="metadata" playsinline poster="${prop.posterUrl}" class="w-full aspect-video object-cover">
                  <source src="${prop.videoUrl}" type="video/mp4">
                  Tu navegador no soporta reproducción de video.
                </video>
              </div>
            </div>
          `;
        } else {
          body.innerHTML = `
            <div class="p-12 text-center text-gris-grafito bg-surface-container-lowest rounded-2xl border border-outline-variant/40">
              <span class="material-symbols-outlined text-4xl text-dorado-profundo mb-2">videocam</span>
              <h5 class="font-serif font-bold text-carbon-aruz text-lg">Video en Renderizado Final</h5>
              <p class="text-xs mt-1">El recorrido cinematográfico 4K para esta residencia se encuentra en postproducción.</p>
            </div>
          `;
        }
        return;
      }

      // Render Interactive Rich Tab Views ("React-Style")
      if (this.activeTab === 'planos') {
        body.innerHTML = `
          <div class="space-y-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
              <div>
                <span class="text-[10px] uppercase font-bold tracking-widest text-dorado-profundo">Memoria Ejecutiva CAD Registrada</span>
                <h4 class="font-serif text-xl font-bold text-carbon-aruz">Distribución de Plantas y Cotas Milimétricas</h4>
                <p class="text-xs text-gris-grafito mt-1">Superficie Total: <strong>${prop.area}</strong> · ${prop.levels}</p>
              </div>
              <button type="button" onclick="window.AruzDocViewerInstance.setViewMode('pdf')" class="inline-flex items-center gap-2 px-4 py-2 bg-dorado-profundo text-white font-label-caps uppercase text-xs font-bold rounded-xl hover:bg-dorado-aruz hover:text-carbon-aruz transition-all shadow shrink-0">
                <span class="material-symbols-outlined text-base">visibility</span>
                <span>Ver Plano Vectorial en PDF</span>
              </button>
            </div>

            <!-- Interactive Floor Level Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${prop.blueprintLevels.map((lvl, idx) => `
                <div class="p-5 bg-white rounded-2xl border border-outline-variant/40 shadow-sm hover:border-dorado-aruz/60 transition-all group">
                  <div class="flex items-center gap-3 mb-2">
                    <span class="w-7 h-7 rounded-lg bg-carbon-aruz text-dorado-aruz font-mono text-xs font-bold flex items-center justify-center">0${idx + 1}</span>
                    <h5 class="font-serif font-bold text-carbon-aruz text-base group-hover:text-dorado-profundo transition-colors">${lvl.name}</h5>
                  </div>
                  <p class="text-xs text-gris-grafito leading-relaxed">${lvl.desc}</p>
                </div>
              `).join('')}
            </div>

            <!-- Engineering Specs Table -->
            <div class="bg-surface-container-highest/40 rounded-2xl p-5 border border-outline-variant/30">
              <h5 class="font-serif font-bold text-sm text-carbon-aruz mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-base text-dorado-profundo">verified</span>
                <span>Criterios Estructurales & Cimentación Oficial CADE</span>
              </h5>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div class="bg-white p-3 rounded-xl border border-outline-variant/30">
                  <span class="text-[10px] text-gris-grafito uppercase block">Cimentación</span>
                  <span class="font-bold text-carbon-aruz">Zapata Corrida f'c=250 kg/cm²</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-outline-variant/30">
                  <span class="text-[10px] text-gris-grafito uppercase block">Altura Libre</span>
                  <span class="font-bold text-carbon-aruz">2.85 m en todas las áreas</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-outline-variant/30">
                  <span class="text-[10px] text-gris-grafito uppercase block">Alberca Privada</span>
                  <span class="font-bold text-carbon-aruz">Chukum Artesanal Maya</span>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (this.activeTab === 'ficha') {
        body.innerHTML = `
          <div class="space-y-6">
            <div class="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
              <span class="text-[10px] uppercase font-bold tracking-widest text-dorado-profundo">Ficha Técnica & Memoria de Materiales</span>
              <h4 class="font-serif text-xl font-bold text-carbon-aruz">Especificaciones Constructivas de Autor</h4>
              <p class="text-xs text-gris-grafito mt-1">Supervisión directa por CADE Diseño y Construcción con bitácora colegiada.</p>
            </div>

            <!-- Specs Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              ${prop.specs.map(spec => `
                <div class="flex items-start justify-between p-3.5 bg-white rounded-xl border border-outline-variant/30 hover:border-dorado-aruz/50 transition-all">
                  <span class="text-xs font-bold text-carbon-aruz pr-3">${spec.label}</span>
                  <span class="text-xs text-gris-grafito text-right font-medium">${spec.val}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (this.activeTab === 'brochure') {
        body.innerHTML = `
          <div class="space-y-6">
            <div class="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span class="text-[10px] uppercase font-bold tracking-widest text-verde-manglar">Catálogo de Presentación & Lifestyle</span>
                <h4 class="font-serif text-xl font-bold text-carbon-aruz">Concepto Bioclimático & Amenidades Mayakoba</h4>
                <p class="text-xs text-gris-grafito mt-1">Inversión Preventa: <strong class="text-dorado-profundo text-sm">${prop.price}</strong></p>
              </div>
              <button type="button" onclick="window.AruzDocViewerInstance.setViewMode('pdf')" class="inline-flex items-center gap-2 px-4 py-2 bg-verde-manglar text-white font-label-caps uppercase text-xs font-bold rounded-xl hover:bg-carbon-aruz transition-all shadow shrink-0">
                <span class="material-symbols-outlined text-base">menu_book</span>
                <span>Ver Brochure Completo en PDF</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-4 bg-white rounded-2xl border border-outline-variant/40 shadow-sm text-center">
                <span class="material-symbols-outlined text-3xl text-dorado-profundo mb-2">solar_power</span>
                <h6 class="font-serif font-bold text-sm text-carbon-aruz">Eficiencia Térmica</h6>
                <p class="text-[11px] text-gris-grafito mt-1">Orientación bioclimática para ventilación cruzada y menor consumo de energía.</p>
              </div>
              <div class="p-4 bg-white rounded-2xl border border-outline-variant/40 shadow-sm text-center">
                <span class="material-symbols-outlined text-3xl text-verde-manglar mb-2">park</span>
                <h6 class="font-serif font-bold text-sm text-carbon-aruz">Entorno Senderos</h6>
                <p class="text-[11px] text-gris-grafito mt-1">Cenotes naturales, ciclovías, seguridad 24/7 y acceso a campo de golf El Camaleón.</p>
              </div>
              <div class="p-4 bg-white rounded-2xl border border-outline-variant/40 shadow-sm text-center">
                <span class="material-symbols-outlined text-3xl text-carbon-aruz mb-2">shield_with_heart</span>
                <h6 class="font-serif font-bold text-sm text-carbon-aruz">Bono $450K MXN</h6>
                <p class="text-[11px] text-gris-grafito mt-1">Paquete de muebles de autor en Tzalam o paneles solares incluidos en preventa.</p>
              </div>
            </div>
          </div>
        `;
      } else if (this.activeTab === 'condiciones') {
        body.innerHTML = `
          <div class="space-y-6">
            <div class="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
              <span class="text-[10px] uppercase font-bold tracking-widest text-dorado-profundo">Certeza Jurídica & Respaldo Notarial</span>
              <h4 class="font-serif text-xl font-bold text-carbon-aruz">Esquema Contractual y Garantías Consortium GPRuiz</h4>
              <p class="text-xs text-gris-grafito mt-1">Contratos notariados con hitos de pago validados contra avance de obra en bitácora.</p>
            </div>

            <div class="space-y-3">
              ${prop.terms.map((term, i) => `
                <div class="p-4 bg-white rounded-xl border border-outline-variant/30 flex items-start gap-4">
                  <span class="w-6 h-6 rounded-full bg-dorado-aruz/20 text-dorado-profundo font-bold text-xs flex items-center justify-center shrink-0">${i + 1}</span>
                  <div>
                    <h6 class="font-serif font-bold text-sm text-carbon-aruz">${term.title}</h6>
                    <p class="text-xs text-gris-grafito mt-0.5 leading-relaxed">${term.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
    }
  }

  // Auto initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.AruzDocViewerInstance = new AruzDocViewerModal();
    });
  } else {
    window.AruzDocViewerInstance = new AruzDocViewerModal();
  }
})();
