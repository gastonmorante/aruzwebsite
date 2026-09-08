/**
 * ============================================================================
 * ARUZ - GOHIGHLEVEL (GHL) INTEGRATION & CONVERSION MACHINERY
 * Features:
 * - Asynchronous Non-blocking Tracking Script & Web Chat Loader (Zero-LCP Impact)
 * - Dual-Dispatch Lead Submission to /api/ghl-webhook
 * - Custom Event Tracking (window.trackGHLEvent)
 * - Interactive Responsive GHL Booking Calendar (window.openGHLCalendar)
 * - Two-Step Lead Gate Modal for Dossiers & Blueprints
 * ============================================================================
 */

(function initGHLClientEngine() {
  // Global GHL Configuration (Can be overridden dynamically)
  window.GHL_CONFIG = {
    locationId: window.GHL_LOCATION_ID || '',
    calendarId: window.GHL_CALENDAR_ID || 'aruz-vip-tour-booking',
    chatWidgetId: window.GHL_CHAT_WIDGET_ID || '',
    webhookEndpoint: '/api/ghl-webhook'
  };

  // 1. Asynchronous Tracking Script Injection (Deferred to idle)
  function injectGHLTracking() {
    if (window._ghlTrackingLoaded) return;
    window._ghlTrackingLoaded = true;

    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  // 2. Schedule Non-blocking execution on User Idle / Interaction
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(injectGHLTracking, { timeout: 4000 });
  } else {
    setTimeout(injectGHLTracking, 3000);
  }

  // Listen for first user interaction to eagerly initialize widgets
  const interactionEvents = ['scroll', 'mousemove', 'touchstart', 'click'];
  function onFirstInteraction() {
    injectGHLTracking();
    interactionEvents.forEach(e => window.removeEventListener(e, onFirstInteraction, { passive: true }));
  }
  interactionEvents.forEach(e => window.addEventListener(e, onFirstInteraction, { passive: true, once: true }));
})();

// ============================================================================
// CUSTOM EVENT TRACKING ENGINE
// ============================================================================
window.trackGHLEvent = function (eventName, eventData = {}) {
  const attribution = typeof window.getARUZAttribution === 'function' ? window.getARUZAttribution() : {};
  
  const payload = {
    eventName: eventName,
    data: eventData,
    attribution: attribution,
    path: window.location.pathname,
    timestamp: new Date().toISOString()
  };

  // A. Push to Google Tag Manager dataLayer
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      event_category: 'GoHighLevel Conversion',
      ...eventData,
      ...attribution
    });
  } catch (e) {}

  // B. Push to Meta Pixel if active
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, eventData);
    }
  } catch (e) {}

  // C. Send to Server Event Bridge (/api/ghl-event)
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/ghl-event', JSON.stringify(payload));
    } else {
      fetch('/api/ghl-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(() => {});
    }
  } catch (e) {}

  console.log(`[GHL Event Tracked]: ${eventName}`, eventData);
};

// ============================================================================
// DUAL-DISPATCH LEAD SUBMISSION PIPELINE
// ============================================================================
window.dispatchLeadToCRM = async function (leadData) {
  const attribution = typeof window.getARUZAttribution === 'function' ? window.getARUZAttribution() : {};
  
  const payload = {
    name: leadData.name || '',
    firstName: (leadData.name || '').split(' ')[0],
    lastName: (leadData.name || '').split(' ').slice(1).join(' ') || '',
    phone: leadData.phone || '',
    email: leadData.email || '',
    interest: leadData.interest || 'Preventas Ciudad Mayakoba',
    message: leadData.message || '',
    page: window.location.pathname,
    attribution: attribution,
    timestamp: new Date().toISOString()
  };

  // Track Lead Submission Event
  window.trackGHLEvent('lead_form_submitted', {
    property_interest: payload.interest,
    lead_email: payload.email
  });

  // Primary Dispatch via server-side bridge (/api/ghl-webhook)
  try {
    const response = await fetch('/api/ghl-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      console.log('[GHL Dispatch] Lead enviado exitosamente al pipeline de GoHighLevel.');
      return true;
    }
  } catch (err) {
    console.warn('[GHL Dispatch] Reintento de respaldo local:', err);
  }

  // Backup Queue in localStorage
  try {
    const queue = JSON.parse(localStorage.getItem('aruz_lead_queue') || '[]');
    queue.push(payload);
    localStorage.setItem('aruz_lead_queue', JSON.stringify(queue));
  } catch (e) {}

  return false;
};

// ============================================================================
// GOHIGHLEVEL RESPONSIVE CALENDAR BOOKING MODAL
// ============================================================================
window.openGHLCalendar = function (calendarId, propertyName = 'Asesoría VIP ARUZ') {
  const calId = calendarId || window.GHL_CONFIG.calendarId || 'aruz-vip-tour-booking';
  
  window.trackGHLEvent('calendar_booking_initiated', {
    property: propertyName,
    calendar_id: calId
  });

  let modal = document.getElementById('ghlCalendarModal');
  if (!modal) {
    const modalHtml = `
      <div id="ghlCalendarModal" class="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in">
        <div class="bg-carbon-aruz border border-dorado-aruz/40 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col text-white shadow-2xl relative overflow-hidden">
          
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-dorado-aruz text-xl">event_available</span>
              <div>
                <h3 id="calModalTitle" class="text-sm font-bold text-white font-display">Agendar Recorrido o Videollamada VIP</h3>
                <span class="text-[10px] font-mono text-piedra-maya/80 uppercase">Atención Directa · Dirección de Operaciones ARUZ</span>
              </div>
            </div>
            <button onclick="window.closeGHLCalendar()" class="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors" aria-label="Cerrar calendario">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <!-- Calendar Body / Iframe Container -->
          <div class="flex-1 overflow-y-auto p-2 sm:p-4 bg-surface-lowest">
            <div id="ghlCalFrameWrap" class="w-full min-h-[580px] flex items-center justify-center">
              <iframe 
                id="ghlCalIframe"
                src="" 
                style="width: 100%; border:none; min-height: 600px; border-radius: 8px;"
                scrolling="yes"
                title="Calendario Oficial GoHighLevel ARUZ"
              ></iframe>
            </div>
          </div>

          <!-- Footer Contact Bar -->
          <div class="px-6 py-3 border-t border-white/10 bg-black/50 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span class="text-piedra-maya text-[11px]">¿Prefieres atención inmediata por chat?</span>
            <a href="https://api.whatsapp.com/send?phone=5219841308260&text=Hola%2C%20deseo%20coordinar%20una%20cita%20con%20Direcci%C3%B3n%20de%20Operaciones%20de%20ARUZ." target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-dorado-aruz hover:underline font-bold">
              <span class="material-symbols-outlined text-sm">chat</span>
              <span>Abrir WhatsApp (+52 984 130 8260)</span>
            </a>
          </div>

        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modal = document.getElementById('ghlCalendarModal');
  }

  // Pre-load Calendar URL with UTM params
  const attribution = typeof window.getARUZAttribution === 'function' ? window.getARUZAttribution() : {};
  const utmQuery = new URLSearchParams(attribution).toString();
  const iframeSrc = `https://api.leadconnectorhq.com/widget/booking/${calId}${utmQuery ? '?' + utmQuery : ''}`;

  document.getElementById('ghlCalIframe').src = iframeSrc;
  document.getElementById('calModalTitle').textContent = `Agendar Cita VIP: ${propertyName}`;
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};

window.closeGHLCalendar = function () {
  const modal = document.getElementById('ghlCalendarModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    const iframe = document.getElementById('ghlCalIframe');
    if (iframe) iframe.src = '';
  }
};

// ============================================================================
// TWO-STEP LEAD GATE MODAL FOR DOSSIERS & BLUEPRINTS
// ============================================================================
window.openDossierGate = function (propertyName, pdfUrl) {
  window.trackGHLEvent('dossier_gate_opened', { property: propertyName });

  let modal = document.getElementById('dossierGateModal');
  if (!modal) {
    const modalHtml = `
      <div id="dossierGateModal" class="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
        <div class="bg-carbon-aruz border border-dorado-aruz/40 rounded-xl max-w-md w-full p-6 text-white shadow-2xl relative">
          <button onclick="window.closeDossierGate()" class="absolute top-4 right-4 text-white/60 hover:text-white p-1 text-lg font-bold" aria-label="Cerrar modal">✕</button>
          
          <div class="text-center mb-5">
            <span class="text-[10px] font-serif text-dorado-aruz tracking-widest uppercase font-bold">Acceso a Documentación Oficial</span>
            <h3 id="gateTitle" class="text-base font-bold mt-1 text-white">Descargar Dossier & Lista de Precios</h3>
            <p class="text-xs text-piedra-maya/80 mt-1">Ingresa tus datos para desbloquear y recibir los planos arquitectónicos de autor al instante.</p>
          </div>

          <form id="gateForm" onsubmit="window.handleDossierGateSubmit(event)" class="space-y-3">
            <input type="hidden" id="gateProperty" value="">
            <input type="hidden" id="gatePdfUrl" value="">
            
            <div>
              <label for="gateName" class="block text-[10px] uppercase font-mono text-piedra-maya mb-1">Nombre Completo *</label>
              <input type="text" id="gateName" required placeholder="Ej. Carlos Mendoza" class="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-dorado-aruz focus:outline-none">
            </div>

            <div>
              <label for="gatePhone" class="block text-[10px] uppercase font-mono text-piedra-maya mb-1">WhatsApp / Teléfono *</label>
              <input type="tel" id="gatePhone" required placeholder="Ej. 984 123 4567" class="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-dorado-aruz focus:outline-none">
            </div>

            <div>
              <label for="gateEmail" class="block text-[10px] uppercase font-mono text-piedra-maya mb-1">Correo Electrónico *</label>
              <input type="email" id="gateEmail" required placeholder="carlos@ejemplo.com" class="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-dorado-aruz focus:outline-none">
            </div>

            <div class="flex items-start gap-2 pt-1">
              <input type="checkbox" id="gateConsent" required checked class="mt-0.5 w-3.5 h-3.5 rounded border-white/20 bg-carbon-aruz text-dorado-aruz focus:ring-dorado-aruz cursor-pointer">
              <label for="gateConsent" class="text-[10px] text-piedra-maya/80 leading-tight select-none">
                Acepto el <a href="/aviso-de-privacidad.html" target="_blank" class="text-dorado-aruz underline">Aviso de Privacidad</a> para envío de información técnica oficial.
              </label>
            </div>

            <button type="submit" id="btnGateSubmit" class="w-full mt-2 bg-dorado-profundo hover:bg-dorado-aruz text-white hover:text-carbon-aruz py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
              <span>Desbloquear Dossier PDF Oficial</span>
              <span class="material-symbols-outlined text-sm">download</span>
            </button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modal = document.getElementById('dossierGateModal');
  }

  document.getElementById('gateProperty').value = propertyName || 'Propiedad ARUZ';
  document.getElementById('gatePdfUrl').value = pdfUrl || '';
  document.getElementById('gateTitle').textContent = `Dossier Técnico: ${propertyName || 'Residencia de Autor'}`;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};

window.closeDossierGate = function () {
  const modal = document.getElementById('dossierGateModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }
};

window.handleDossierGateSubmit = async function (e) {
  if (e) e.preventDefault();
  
  const name = document.getElementById('gateName')?.value.trim() || '';
  const phone = document.getElementById('gatePhone')?.value.trim() || '';
  const email = document.getElementById('gateEmail')?.value.trim() || '';
  const property = document.getElementById('gateProperty')?.value || 'Dossier General';
  const pdfUrl = document.getElementById('gatePdfUrl')?.value || '';

  const btn = document.getElementById('btnGateSubmit');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>Procesando...</span><span class="material-symbols-outlined text-sm animate-spin">refresh</span>`;
  }

  // Dispatch to GHL CRM
  await window.dispatchLeadToCRM({
    name: name,
    phone: phone,
    email: email,
    interest: `Descarga Dossier: ${property}`,
    message: `El usuario descargó el dossier técnico de ${property}.`
  });

  window.trackGHLEvent('dossier_downloaded', {
    property: property,
    lead_email: email
  });

  // Open PDF in new tab
  if (pdfUrl) {
    window.open(pdfUrl, '_blank');
  }

  // Direct WhatsApp Link
  const directorPhone = '5219841308260';
  const text = encodeURIComponent(`Hola, acabo de solicitar el dossier técnico de *${property}* (${name} - ${phone}). Solicito información personalizada de preventa.`);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${directorPhone}&text=${text}`;

  if (btn) {
    btn.innerHTML = `<span>¡Dossier Desbloqueado!</span><span class="material-symbols-outlined text-sm">check_circle</span>`;
    btn.className = "w-full mt-2 bg-verde-manglar text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider";
  }

  setTimeout(() => {
    window.closeDossierGate();
    window.open(whatsappUrl, '_blank');
  }, 800);
};
