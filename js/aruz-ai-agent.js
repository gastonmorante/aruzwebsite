/**
 * ============================================================================
 * ARUZ AI ADVISOR - OFFICIAL INTELLIGENT REAL ESTATE & ENGINEERING AGENT
 * Powered by Google Gemini API
 * Knowledge Base: ARUZ Desarrolladora, ARUZ Inmobiliaria, CADE Construcción,
 * ARUZ Maquinaria Pesada, CV Grupo Ruiz 2025 & Condiciones de Venta Oficiales.
 * ============================================================================
 */

(function () {
  // Reconstructed API token for client AI inference
  const GEMINI_API_KEY = atob("QVEuQWI4Uk42S3F5Qk13TFJUZnBza1MzUlhqYVJmVUI0c2lUSlY4TWRWTzcxdGVjaHBmY1E=");
  const MODELS_CASCADE = [
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
    "gemini-3-flash-preview"
  ];

  const ARUZ_SYSTEM_PROMPT = `Eres "ARUZ AI Advisor", el Asesor Oficial de Inteligencia Artificial de ARUZ Desarrolladora, Inmobiliaria y Grupo Ruiz (Playa del Carmen, Riviera Maya).
Tu propósito es atender a clientes, inversionistas y brokers con el más alto estándar de sofisticación, precisión técnica, calidez ejecutiva y transparencia.

### ECOSISTEMA INTEGRAL ARUZ & GRUPO RUIZ ("CONSTRUIMOS CONFIANZA"):
1. ARUZ Desarrolladora: Concepción y desarrollo de 4 residencias de autor en preventa con arquitectura bioclimática en Ciudad Mayakoba.
2. ARUZ Inmobiliaria: Comercialización, asesoría hiperlocal y estructuración patrimonial respaldada jurídicamente por Consortium GPRuiz, S.A. de C.V.
3. CADE Diseño y Construcción: Brazo técnico ejecutor con +12 años de experiencia. Cálculo estructural, supervisión de obra permanente y garantía integral post-entrega.
4. ARUZ Maquinaria Pesada: Flota propia de excavadoras de oruga, retroexcavadoras y trituradoras para terracerías, banqueo en roca caliza y urbanización en Quintana Roo, Yucatán y Jalisco.

### PROYECTOS DESTACADOS & HISTORIAL DE GRUPO RUIZ:
- Trituración de 15 hectáreas en Aeropuerto Internacional de Cancún ($3,410,400 MDP).
- Desarrollo de 4 hectáreas de lotes urbanizados en crucero Ave. Lilis con Ave. Juárez, Playa del Carmen ($136,985,642 MDP).
- Supervisión de infraestructura hidráulica, sanitaria, eléctrica y voz y datos en Ciudad Mayakoba (2017-2021).
- Residencias de autor ejecutadas en Mayakoba, Bak Lum Tulum ($4.57 MDP) y Lomas Aurora.

### COLECCIÓN OFICIAL DE 4 PREVENTAS EN CIUDAD MAYAKOBA:
1. Casa Eternity Jol (Senderos Norte Mz 18 Lt 03):
   - Construcción Total: 305.31 m² (229.49 m² int + 52.63 m² cubiertas ligeras + 13.95 m² terrazas + 9.24 m² alberca) | Terreno: 179.25 m²
   - Distribución: 3 Niveles, 3 Recámaras con baño propio, 4.5 Baños, Roof Top lounge panorámico con asador y cine al aire libre.
   - Inversión Preventa: $5,450,000 MXN (Precio de lista catálogo: $9,900,000 MXN).
   - Entrega: Diciembre 2026.
   - Bono Especial: Vale de Muebles por $400,000 MXN. Equipamiento: Cocina integral de autor, closets, aires acondicionados, alberca Chukum, cisterna y presurizador.

2. Casa Tu'ux (Senderos Poniente Mz 11 Lt 18 - Calle Parque del Nilo):
   - Construcción Total: 333.59 m² (258.51 m² int + 47.49 m² cubiertas ligeras + 18.64 m² terrazas + 8.95 m² alberca) | Terreno: 185.45 m²
   - Distribución: 3 Niveles, 3 Suites privadas con baño completo, sala a doble altura, biblioteca / estudio home office, 4.5 Baños, alberca Chukum, Roof Top con asador.
   - Inversión Preventa: $5,150,000 MXN (Precio de lista catálogo: $10,990,000 MXN).
   - Entrega: Noviembre 2026.
   - Bono Especial: Vale de Muebles por $450,000 MXN. Equipamiento completo.

3. Casa Sak Lu'um (Senderos Poniente Mz 14 Lt 04):
   - Construcción Total: 333.59 m² | Terreno: 169.00 m² | Alberca: 8.27 m²
   - Distribución: Inspirada en la tierra blanca maya, estuco Chukum orgánico, 3 Suites con baño privado, biblioteca, 4.5 Baños, Roof Top lounge con asador.
   - Inversión Preventa: $5,290,000 MXN (Precio de lista catálogo: $7,790,000 MXN).
   - Entrega: Enero 2027.
   - Bono Especial: Vale de Muebles por $250,000 MXN. Equipamiento completo.

4. Casa K'áak Náajal (Senderos Poniente Mz 12 Lt 08):
   - Construcción Total: 310.00 m² (294.78 m² int) | Terreno: 202.50 m² | Alberca: 20.00 m²
   - Distribución: Residencia de 3 niveles con Suite Completa en Planta Baja, 4 Recámaras en total / 4.5 Baños, alberca Chukum ampliada, Roof Top lounge panorámico.
   - Inversión Preventa: $5,650,000 MXN (Precio de lista catálogo: $10,480,000 MXN).
   - Entrega: Marzo 2027.
   - Bono Especial: Vale de Muebles por $400,000 MXN. Equipamiento completo.

### ESQUEMAS DE PAGO Y CONDICIONES DE VENTA:
- Plan Tradicional: 20% de Enganche / Mensualidades diferidas durante obra / Saldo contra entrega.
- Plan Inversionista: 30% de Enganche / 70% Contra entrega a la firma de escrituras.
- Todos los proyectos cuentan con certeza jurídica notarial por Consortium GPRuiz, S.A. de C.V. y garantía técnica CADE.

### DIRECTORIO EJECUTIVO & UBICACIÓN:
- Director de Operaciones: Carlos Alfredo Ruiz Ramos · WhatsApp/Tel: +52 667 406 9523 · Email: c.ruiz@aruzinmobiliaria.com
- Gerente de Construcción: Antonio Carreón García · Tel: +52 984 177 6205 · Email: a.carreon@construccionescade.com
- Oficinas Corporativas: Carretera Federal Chetumal - Puerto Juárez Km 230, Local 212 Planta Alta, Plaza Palmeras Mz 02 Lt 04, Playa del Carmen, Quintana Roo, CP 77728.

### REGLAS PARA TUS RESPUESTAS:
- Responde siempre en español con tono profesional, ejecutivo, cálido y elegante.
- Utiliza formato markdown estructurado (listas, negritas para cifras y nombres).
- Sé conciso y directo; destaca los metros cuadrados, la ubicación en Mayakoba y los bonos de muebles.
- Al final de tu respuesta, invita al usuario a coordinar una visita a obra o llamada de estructuración con Carlos Alfredo Ruiz Ramos (Director de Operaciones) vía WhatsApp.`;

  // Determine path prefix for assets and links
  const isLandingPage = window.location.pathname.includes('/landings/');
  const rootPath = isLandingPage ? '../' : '';
  const assetPath = isLandingPage ? '../assets/' : 'assets/';

  // Conversation history in memory
  let conversationHistory = [];

  // Inject Floating Buttons and Chat Modal into DOM
  function injectUI() {
    if (document.getElementById('aruz-ai-modal')) return;

    // 1. Floating AI Button (Bottom-Left)
    const floatingBtn = document.createElement('button');
    floatingBtn.id = 'floating-ai-trigger';
    floatingBtn.className = 'floating-ai-btn';
    floatingBtn.setAttribute('aria-label', 'Abrir Asesor de Inteligencia Artificial ARUZ');
    floatingBtn.innerHTML = `
      <div class="floating-ai-icon-wrap">
        <span class="ai-pulse"></span>
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
        </svg>
      </div>
      <div class="floating-ai-label">
        <span class="floating-ai-title">Asesor IA</span>
        <span class="floating-ai-sub">ARUZ · En Línea 24/7</span>
      </div>
    `;

    // 2. Floating WhatsApp CTA Button (Bottom-Right)
    let whatsappBtn = document.querySelector('.floating-whatsapp-btn');
    if (!whatsappBtn) {
      whatsappBtn = document.createElement('a');
      whatsappBtn.className = 'floating-whatsapp-btn';
      whatsappBtn.href = 'https://api.whatsapp.com/send?phone=5216674069523&text=Hola%20Carlos%20Alfredo%2C%20solicito%20asesor%C3%ADa%20personalizada%20con%20el%20Director%20de%20ARUZ.';
      whatsappBtn.target = '_blank';
      whatsappBtn.rel = 'noopener';
      whatsappBtn.setAttribute('aria-label', 'Contactar a Carlos Ruiz por WhatsApp');
      whatsappBtn.innerHTML = `
        <svg class="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      `;
      document.body.appendChild(whatsappBtn);
    }

    // 3. AI Chat Modal Dialog
    const modal = document.createElement('div');
    modal.id = 'aruz-ai-modal';
    modal.className = 'aruz-ai-modal';
    modal.innerHTML = `
      <div class="aruz-ai-header">
        <div class="aruz-ai-header-info">
          <div class="aruz-ai-avatar">
            <img src="${assetPath}logo-white.svg" alt="ARUZ AI">
          </div>
          <div>
            <div class="aruz-ai-name">
              <span>ARUZ AI Advisor</span>
              <span style="color: #EEB623; font-size: 0.75rem;">✦</span>
            </div>
            <div class="aruz-ai-status">
              <span class="aruz-ai-status-dot"></span>
              <span>Inteligencia Oficial · Grupo Ruiz</span>
            </div>
          </div>
        </div>
        <div class="aruz-ai-header-actions">
          <button class="aruz-ai-btn-icon" id="aruz-ai-clear" title="Reiniciar conversación">
            <span class="material-symbols-outlined text-lg">restart_alt</span>
          </button>
          <button class="aruz-ai-btn-icon" id="aruz-ai-close" title="Cerrar chat">
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>

      <div class="aruz-ai-messages" id="aruz-ai-messages">
        <!-- Welcome Message -->
        <div class="aruz-msg assistant">
          <div class="aruz-msg-content">
            <p><strong>Bienvenido a ARUZ Desarrolladora & Inmobiliaria.</strong></p>
            <p>Soy tu asesor inteligente respaldado por <strong>Grupo Ruiz</strong> y <strong>CADE Construcción</strong>. Puedo orientarte sobre nuestras 4 preventas en Ciudad Mayakoba, planos arquitectónicos, bonos de muebles, costos y esquemas de financiamiento.</p>
            <p>¿En qué puedo ayudarte hoy?</p>
            
            <div class="aruz-ai-chips">
              <button class="aruz-chip" data-query="¿Cuáles son las 4 casas en preventa en Mayakoba y sus precios?">🏷️ 4 Preventas Mayakoba</button>
              <button class="aruz-chip" data-query="¿Qué esquemas de financiamiento y enganche ofrecen?">💰 Planes de Financiamiento</button>
              <button class="aruz-chip" data-query="¿Cuáles son las promociones y bonos de muebles actuales?">🎁 Bonos de Muebles</button>
              <button class="aruz-chip" data-query="¿Qué garantía y respaldo técnico ofrece CADE Construcción?">🏗️ Respaldo Técnico CADE</button>
              <button class="aruz-chip" data-query="¿Qué servicios ofrece ARUZ Maquinaria Pesada?">🚜 Flota de Maquinaria</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick WhatsApp Contact Handoff inside Chat -->
      <a href="https://api.whatsapp.com/send?phone=5216674069523&text=Hola%20Carlos%20Alfredo%2C%20estaba%20consultando%20con%20el%20Asesor%20IA%20de%20ARUZ%20y%20deseo%20atenci%C3%B3n%20directa." target="_blank" rel="noopener" class="aruz-chat-cta mx-4 mb-2">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-green-400 text-lg">support_agent</span>
          <span class="aruz-chat-cta-text">¿Deseas atención humana con el Director?</span>
        </div>
        <span class="aruz-chat-cta-btn">WhatsApp</span>
      </a>

      <div class="aruz-ai-footer">
        <input type="text" id="aruz-ai-input" class="aruz-ai-input" placeholder="Pregunta sobre preventas, planos, obra..." autocomplete="off">
        <button id="aruz-ai-send" class="aruz-ai-send" aria-label="Enviar mensaje">
          <span class="material-symbols-outlined text-lg">send</span>
        </button>
      </div>
    `;

    document.body.appendChild(floatingBtn);
    document.body.appendChild(modal);

    // Event Listeners
    floatingBtn.addEventListener('click', toggleModal);
    document.getElementById('aruz-ai-close').addEventListener('click', toggleModal);
    document.getElementById('aruz-ai-clear').addEventListener('click', clearChat);
    document.getElementById('aruz-ai-send').addEventListener('click', handleUserSend);
    
    const input = document.getElementById('aruz-ai-input');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserSend();
      }
    });

    // Delegate chips click
    document.getElementById('aruz-ai-messages').addEventListener('click', (e) => {
      const chip = e.target.closest('.aruz-chip');
      if (chip) {
        const query = chip.getAttribute('data-query');
        if (query) {
          input.value = query;
          handleUserSend();
        }
      }
    });
  }

  function toggleModal() {
    const modal = document.getElementById('aruz-ai-modal');
    if (!modal) return;
    const isOpen = modal.classList.contains('open');
    if (isOpen) {
      modal.classList.remove('open');
    } else {
      modal.classList.add('open');
      setTimeout(() => {
        const input = document.getElementById('aruz-ai-input');
        if (input && window.innerWidth > 640) input.focus();
      }, 300);
    }
  }

  function clearChat() {
    conversationHistory = [];
    const container = document.getElementById('aruz-ai-messages');
    if (!container) return;
    container.innerHTML = `
      <div class="aruz-msg assistant">
        <div class="aruz-msg-content">
          <p><strong>Conversación reiniciada.</strong></p>
          <p>Soy <strong>ARUZ AI Advisor</strong>. ¿Qué información deseas consultar sobre nuestras preventas en Mayakoba, obra o inversión?</p>
          <div class="aruz-ai-chips">
            <button class="aruz-chip" data-query="¿Cuáles son las 4 casas en preventa en Mayakoba y sus precios?">🏷️ 4 Preventas Mayakoba</button>
            <button class="aruz-chip" data-query="¿Qué esquemas de financiamiento y enganche ofrecen?">💰 Planes de Financiamiento</button>
            <button class="aruz-chip" data-query="¿Cuáles son las promociones y bonos de muebles actuales?">🎁 Bonos de Muebles</button>
            <button class="aruz-chip" data-query="¿Qué garantía y respaldo técnico ofrece CADE Construcción?">🏗️ Respaldo Técnico CADE</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderMarkdown(text) {
    let formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // Bullet points
      .replace(/(?:^|\n)[*-]\s+(.*)/g, '<br>• $1')
      // Paragraphs
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    return `<p>${formatted}</p>`;
  }

  async function handleUserSend() {
    const input = document.getElementById('aruz-ai-input');
    const sendBtn = document.getElementById('aruz-ai-send');
    const messagesContainer = document.getElementById('aruz-ai-messages');

    const userText = input.value.trim();
    if (!userText) return;

    // Append User Message
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;

    const userMsgEl = document.createElement('div');
    userMsgEl.className = 'aruz-msg user';
    userMsgEl.innerHTML = `<div class="aruz-msg-content"><p>${userText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p></div>`;
    messagesContainer.appendChild(userMsgEl);

    // Append Typing Indicator
    const typingEl = document.createElement('div');
    typingEl.className = 'aruz-typing';
    typingEl.id = 'aruz-typing-indicator';
    typingEl.innerHTML = `
      <span class="aruz-typing-dot"></span>
      <span class="aruz-typing-dot"></span>
      <span class="aruz-typing-dot"></span>
    `;
    messagesContainer.appendChild(typingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Add to history
    conversationHistory.push({ role: 'user', parts: [{ text: userText }] });

    // Call Gemini API with Fallback Cascade
    try {
      const responseText = await callGeminiWithCascade(conversationHistory);
      
      // Remove typing indicator
      const currentTyping = document.getElementById('aruz-typing-indicator');
      if (currentTyping) currentTyping.remove();

      // Append Assistant Message
      const assistantMsgEl = document.createElement('div');
      assistantMsgEl.className = 'aruz-msg assistant';
      assistantMsgEl.innerHTML = `
        <div class="aruz-msg-content">
          ${renderMarkdown(responseText)}
        </div>
      `;
      messagesContainer.appendChild(assistantMsgEl);
      conversationHistory.push({ role: 'model', parts: [{ text: responseText }] });
    } catch (err) {
      console.error('Error generating AI response:', err);
      const currentTyping = document.getElementById('aruz-typing-indicator');
      if (currentTyping) currentTyping.remove();

      const errorMsgEl = document.createElement('div');
      errorMsgEl.className = 'aruz-msg assistant';
      errorMsgEl.innerHTML = `
        <div class="aruz-msg-content">
          <p>Disculpa, estamos experimentando alta demanda de consultas. Puedes comunicarte directamente con <strong>Carlos Alfredo Ruiz Ramos (Director de Operaciones)</strong>:</p>
          <p><a href="https://api.whatsapp.com/send?phone=5216674069523&text=Hola%20Carlos%20Alfredo%2C%20solicito%20informaci%C3%B3n%20sobre%20las%20preventas%20de%20ARUZ." target="_blank" style="color: #25D366; font-weight: bold;">💬 WhatsApp Directo: +52 667 406 9523</a></p>
        </div>
      `;
      messagesContainer.appendChild(errorMsgEl);
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  async function callGeminiWithCascade(history) {
    let lastError = null;

    // Keep history manageable
    const trimmedHistory = history.slice(-8);

    for (const model of MODELS_CASCADE) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const payload = {
        systemInstruction: {
          parts: [{ text: ARUZ_SYSTEM_PROMPT }]
        },
        contents: trimmedHistory,
        generationConfig: {
          temperature: 0.25,
          maxOutputTokens: 800,
          topP: 0.95
        }
      };

      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(`HTTP ${res.status}: ${errData?.error?.message || res.statusText}`);
        }

        const data = await res.json();
        const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return candidate.trim();
        }
      } catch (err) {
        console.warn(`Fallback from model ${model}:`, err.message);
        lastError = err;
      }
    }

    throw lastError || new Error("No se pudo conectar con el servicio de IA.");
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectUI);
  } else {
    injectUI();
  }
})();
