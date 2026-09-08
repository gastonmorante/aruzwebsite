/**
 * ============================================================================
 * ARUZ - GOHIGHLEVEL INTEGRATION & DUAL-DISPATCH PIPELINE
 * Bridges web forms with GoHighLevel CRM, WhatsApp, Meta CAPI & Google Tag Manager
 * ============================================================================
 */

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

  // 1. DataLayer event for Google Tag Manager & Meta Pixel
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'generate_lead',
      lead_property: payload.interest,
      lead_page: payload.page,
      lead_attribution: attribution
    });
  } catch (e) {
    console.warn('[Tracking] GTM push error:', e);
  }

  // 2. Primary Dispatch via secure backend proxy (/api/lead)
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      console.log('[CRM Dispatch] Lead registrado exitosamente en CRM.');
      return true;
    }
  } catch (err) {
    console.warn('[CRM Dispatch] Proxy offline, fallback en proceso:', err);
  }

  // 3. Fallback Local Storage Queue for offline recovery
  try {
    const queue = JSON.parse(localStorage.getItem('aruz_lead_queue') || '[]');
    queue.push(payload);
    localStorage.setItem('aruz_lead_queue', JSON.stringify(queue));
  } catch (e) {}

  return false;
};

// Two-step Lead Gate Handler for Brochures and Technical Dossiers
window.openDossierGate = function (propertyName, pdfUrl) {
  let modal = document.getElementById('dossierGateModal');
  if (!modal) {
    const modalHtml = `
      <div id="dossierGateModal" class="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-carbon-aruz border border-dorado-aruz/40 rounded-xl max-w-md w-full p-6 text-white shadow-2xl relative animate-fade-in">
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
              <label for="gateConsent" class="text-[10px] text-piedra-maya/80 leading-tight">
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

  // Dispatch to CRM
  await window.dispatchLeadToCRM({
    name: name,
    phone: phone,
    email: email,
    interest: `Descarga Dossier: ${property}`,
    message: `El usuario descargó el dossier técnico de ${property}.`
  });

  // Open PDF in new tab
  if (pdfUrl) {
    window.open(pdfUrl, '_blank');
  }

  // Also prepare direct WhatsApp link with Director
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
