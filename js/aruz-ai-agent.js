/**
 * ============================================================================
 * ARUZ AI ADVISOR - OFFICIAL INTELLIGENT REAL ESTATE & ENGINEERING AGENT
 * Powered by Google Gemini API
 * Knowledge Base: Strictly grounded in official project PDFs from Google Drive:
 * - CARACTERISTICAS & PLANOS: Casa Eternity Jol (MZ18 LT03), Casa Tu'ux (MZ11 LT18),
 *   Casa Sak Lu'um (MZ14 LT04), Casa K'áak Náajal (MZ12 LT08)
 * - CV GRUPO RUIZ 2025 (Construcción, Urbanización y Maquinaria Pesada)
 * - ARUZ CONDICIONES DE VENTA OFICIALES (Planes de Pago, Bonos de Muebles & Equipamiento)
 * ============================================================================
 */

(function () {
  // Reconstructed API token for client AI inference
  const GEMINI_API_KEY = atob("QVEuQWI4Uk42S3F5Qk13TFJUZnBza1MzUlhqYVJmVUI0c2lUSlY4TWRWTzcxdGVjaHBmY1E=");
  const MODELS_CASCADE = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
    "gemini-2.0-flash"
  ];

  const ARUZ_SYSTEM_PROMPT = `Eres "ARUZ AI Advisor", el Asesor Oficial de Inteligencia Artificial de ARUZ Desarrolladora, Inmobiliaria y Grupo Ruiz (Playa del Carmen, Riviera Maya).
Tu conocimiento está 100% fundamentado en los documentos técnicos y contractuales oficiales (PDFs) de la empresa.

### ECOSISTEMA CORPORATIVO ("CONSTRUIMOS CONFIANZA"):
- **ARUZ Desarrolladora**: Concepción, diseño bioclimático y ejecución de residencias de autor exclusivas en preventa en Ciudad Mayakoba.
- **ARUZ Inmobiliaria / Consortium GPRuiz S.A. de C.V.**: Certeza jurídica notarial, comercialización y asesoría patrimonial integral.
- **ARUZ Construcción & Ingeniería**: Brazo constructor y técnico con +12 años de trayectoria. Especialistas en **planeación integral** (modelado BIM y control de ruta crítica), **gestión rigurosa de recursos** (cadena directa de materiales certificados y cuadrillas propias especializadas), **eficiencia operativa** y **estricto cumplimiento de normas** de construcción y seguridad estructural (NTC/NOM). Cero dependencia de terceros.
- **ARUZ Maquinaria Pesada**: Flota propia de excavadoras de oruga, retroexcavadoras y trituradoras de roca/madera para terracerías, cimentaciones y urbanización en Quintana Roo, Yucatán y Jalisco.

### PROYECTOS DE INFRAESTRUCTURA & TRAYECTORIA (CV GRUPO RUIZ 2025):
- Trituración de 15 hectáreas de desmonte en Aeropuerto Internacional de Cancún ($3,410,400 MDP).
- Desarrollo y urbanización de 4 hectáreas en crucero Ave. Lilis con Ave. Juárez, Playa del Carmen ($136,985,642 MDP).
- Supervisión de infraestructura hidráulica, sanitaria, eléctrica y voz y datos en Ciudad Mayakoba (2017-2021).
- Residencias ejecutadas en Mayakoba, Bak Lum Tulum ($4.57 MDP) y Lomas Aurora.

### COLECCIÓN OFICIAL DE 6 PREVENTAS EN CIUDAD MAYAKOBA (DETALLE TÉCNICO PDF):
1. **Casa Eternity Jol (Senderos Norte Mz 18 Lt 03)**:
   - **Metraje Total**: 305.31 m² de Construcción (229.49 m² Interior + 52.63 m² Cubiertas ligeras + 13.95 m² Terrazas + 9.24 m² Alberca).
   - **Terreno**: 179.25 m².
   - **Distribución en 3 Niveles**:
     - *Planta Baja*: Cochera pergolada, acceso lobby, cubo escaleras, cocina con barra/comedor, sala de estar, terraza exterior techada, alberca exterior Chukum, jardín tropical, lavandería, regadera exterior, medio baño de visitas y cuarto de máquinas.
     - *Primer Nivel*: Recámara 1 con baño privado, Recámara 2 con walk-in closet y baño, Recámara Principal con baño master y clóset de blancos.
     - *Roof Top*: Terraza pergolada, asador y tarja, terraza exterior, cuarto de usos múltiples, baño completo, área de servicios A.C. y área para proyector de cine al aire libre.
   - **Inversión Preventa**: $5,450,000 MXN (Precio de lista catálogo: $9,900,000 MXN). Entrega: Diciembre 2026.
   - **Bono Oficial de Muebles**: $400,000 MXN. Equipamiento completo: Cocina integral, closets, aires acondicionados inverter, alberca Chukum, cisterna y presurizador.

2. **Casa Tu'ux (Senderos Poniente Mz 11 Lt 18 - Calle Parque del Nilo)**:
   - **Metraje Total**: 333.59 m² de Construcción (258.51 m² Interior + 47.49 m² Cubiertas ligeras + 18.64 m² Terrazas + 8.95 m² Alberca).
   - **Terreno & Parámetros Catastrales**: 185.45 m² (Frente 8.09 m curvo en Calle Parque del Nilo, laterales 22.49 m y 21.62 m, posterior 8.78 m curvo). Normativa: C.O.S. 0.50 (92.73 m² desplante máx), C.U.S. 2.00 (370.90 m² constr. máx), C.M.S. 0.80, Altura máx 3 niveles / 10.00 m.
   - **Distribución en 3 Niveles**:
     - *Planta Baja*: Cochera pergolada para 2 autos, acceso lobby, cocina integral con isla y comedor en concepto abierto, sala de estar a doble altura con ventilación cruzada y vistas al jardín, medio baño de visitas, lavandería independiente, cuarto de máquinas, terraza exterior techada (18.64 m²) y alberca exterior privada en Chukum (8.95 m²) con regadera.
     - *Primer Nivel*: Master Suite con terraza privada, vestidor walk-in y baño master en Chukum y mármol; Recámara 1 con baño completo privado; Recámara 2 con baño completo privado; y **Biblioteca / Estudio / Home Office** independiente.
     - *Roof Top*: Terraza pergolada panorámica con vistas a la selva, asador con tarja y barra de servicio, **Cuarto de usos múltiples / Estudio cerrado**, baño completo en Roof Top, solárium descubierto y área técnica para equipos de A/C.
   - **Inversión Preventa**: $5,150,000 MXN (Precio de lista catálogo: $10,990,000 MXN). Entrega: Noviembre 2026.
   - **Bono Oficial de Muebles**: $450,000 MXN. Equipamiento completo incluido (Cocina integral con isla, closets en madera de Tzalam, aires acondicionados inverter, alberca Chukum, hidroneumático).
   - **Documentos Oficiales Disponibles**: Plano Catastral y Planos Arquitectónicos (MANZANA_11_LT18.pdf), Ficha Técnica (CARACTERISTICAS_SP_MZ11LT18_Tuux.pdf), Brochure de Autor (Brochure_Tuux.pdf) y Condiciones Contractuales (ARUZ_CONDICIONES_DE_VENTA.pdf).

3. **Casa Sak Lu'um (Senderos Poniente Mz 14 Lt 04)**:
   - **Metraje Total**: 333.59 m² de Construcción (204.13 m² Interior + terrazas + alberca 8.27 m²).
   - **Terreno**: 169.00 m² (Frente 8.00m x Fondo 21.13m).
   - **Distribución en 3 Niveles**:
     - *Planta Baja*: Cochera, vestíbulo, estancia, comedor, cocina integral abierta, medio baño, terraza techada, alberca Chukum y jardín.
     - *Primer Nivel*: 3 Recámaras con baño completo privado cada una, clósets de madera dura regional, sala de TV / biblioteca.
     - *Roof Top*: Lounge pergolado, asador con tarja, baño completo y vistas a la selva.
   - **Inversión Preventa**: $5,290,000 MXN (Precio de lista catálogo: $7,790,000 MXN). Entrega: Enero 2027.
   - **Bono Oficial de Muebles**: $250,000 MXN. Equipamiento completo incluido.

4. **Casa K'áak Náajal (Senderos Poniente Mz 12 Lt 08)**:
   - **Metraje Total**: 310.00 m² de Construcción (294.78 m² Interior + alberca 20.00 m²).
   - **Terreno**: 202.50 m² (Frente 9.00m x Fondo 22.50m).
   - **Distribución en 3 Niveles**:
     - *Planta Baja*: Cochera para 2 autos, estancia, comedor, cocina con isla, **Suite Completa en Planta Baja con baño privado y clóset** (ideal para accesibilidad o personas mayores), medio baño de visitas, terraza techada, alberca Chukum ampliada de 20 m² y jardín.
     - *Primer Nivel*: 3 Recámaras en suite (Master con walk-in closet y balcón) y estancia familiar.
     - *Roof Top*: Solárium panorámico, pérgola, asador con barra, tarja y medio baño.
   - **Inversión Preventa**: $5,650,000 MXN (Precio de lista catálogo: $10,480,000 MXN). Entrega: Marzo 2027.
   - **Bono Oficial de Muebles**: $400,000 MXN. Equipamiento completo incluido.

5. **Casa Mía (Senderos Poniente Mz 09 Lt 12 - Lote 86)**:
   - **Metraje Total**: 225.00 m² de Construcción.
   - **Terreno**: 165.00 m² (Frente 7.50m x Fondo 22.00m).
   - **Distribución en 2 Niveles**:
     - *Planta Baja*: Cochera para 2 autos con huellas de concreto y pasto, pórtico de acceso, medio baño de visitas, estancia / sala de estar, comedor formal, cocina de autor con isla en Cuarzo Negro Andromeda (incluye parrilla, campana y doble tarja de acero inoxidable), área de lavandería con pileta y boiler, terraza exterior con firme de concreto, jardín posterior y alberca privada en acabado Chukum con muro decorativo de Piedra Galarza.
     - *Planta Alta*: Family Room / Estancia familiar central, Recámara Principal (Master Suite) con walk-in closet, baño privado completo y balcón; Recámara 1 con clóset y baño privado completo; Recámara 2 con clóset y baño privado completo. Total: 3 suites completas todas con baño privado.
   - **Materiales & Acabados de Autor**: Mármol Travertino Fiorito en pisos y áreas húmedas, Muro de Piedra Galarza en alberca, barras de Cuarzo Negro Andromeda en cocina, cancelería Eurovent Serie 80/100, carpintería fina, grifería Helvex/Grohe en negro mate.
   - **Inversión Preventa**: $7,600,000 MXN ($7.6 MDP).
   - **Documentos Oficiales Disponibles**: Ficha Técnica y Planos Arquitectónicos (CASA MÍA LOTE 86.pdf).

6. **Casa K'u (Senderos Poniente Mz 04 Lt 14 - Lote 81)**:
   - **Metraje Total**: 210.00 m² de Construcción.
   - **Terreno**: 170.00 m² (Frente 8.50m x Fondo 20.00m).
   - **Distribución en 2 Niveles**:
     - *Planta Baja*: Cochera para 2 autos con piso de concreto lavado y piedra regional, vestíbulo de acceso, **Recámara 3 Completa en Planta Baja** con clóset (ideal para accesibilidad/invitados), baño completo en PB con doble función (baño para recámara y visitas con cristal templado), estancia / sala a doble altura, comedor abierto, cocina integral equipada con cubierta de granito natural y barra desayunadora, cuarto de lavado techado, terraza posterior descubierta con pérgola de vigas WPC teca, jardín posterior y alberca privada en acabado Chukum.
     - *Planta Alta*: Family Room / Sala de TV, Recámara Principal (Master Suite) con amplio walk-in closet, doble lavabo de mármol y baño completo de autor; Recámara 2 con clóset integrado y baño privado completo. Total: 3 recámaras y 3 baños completos.
   - **Materiales & Cédula de Acabados**: Mármol Travertino Santo Tomás en pisos, cubiertas de Granito San Gabriel en cocina, pérgola exterior de vigas WPC color teca, recubrimiento exterior en pasta lisa y piedra regional laja maya, cancelería Serie 70 con cristal 6mm tintex, iluminación LED cálida indirecta.
   - **Inversión Preventa**: $6,800,000 MXN ($6.8 MDP).
   - **Documentos Oficiales Disponibles**: Ficha Técnica y Planos Arquitectónicos (CASA K'U LOTE 81.pdf, CÉDULA DE ACABADOS 81.pdf).

### LOMAS AURORA · MACRODESARROLLO RESIDENCIAL EN PLAYA DEL CARMEN (DETALLE TÉCNICO OFICIAL):
- **Ubicación Estratégica**: Prolongación Av. 115 Sur, Playa del Carmen, Quintana Roo.
  - Conectividad: 5 min de Centro Maya, 7 min de Parque Xplor, 10 min de la 5ta Avenida, 11 min de Parque Xcaret, 12 min de Playas del Caribe, 60 min del Aeropuerto Internacional de Cancún.
- **Lotes Residenciales Unifamiliares (4 Tipologías)**:
  - *160.00 m²* (8.00 m x 20.00 m) · COS 50% (80 m²) · CUS 1.61 (257.60 m²)
  - *180.00 m²* (9.00 m x 20.00 m) · COS 50% (90 m²) · CUS 1.61 (289.80 m²)
  - *200.00 m²* (10.00 m x 20.00 m) · COS 50% (100 m²) · CUS 1.61 (322.00 m²)
  - *225.00 m²* (11.25 m x 20.00 m) · COS 50% (112.50 m²) · CUS 1.61 (362.25 m²)
  - *Normativa de Construcción*: Uso de Suelo H3 (Habitacional Unifamiliar hasta 3 niveles / 10.50 m de altura).
  - *Fechas de Entrega Lotes*: Etapa 1 en Noviembre 2025 · Etapa 2 en Marzo 2026.
  - *Infraestructura*: 100% subterránea (agua, luz, drenaje, fibra óptica), concreto hidráulico, ciclovía y lagos artificiales.
- **Casa Club de Autor (Diseño GVA Arquitectos · +25 Amenidades)**:
  - Alberca Semiolímpica, Pista de Pádel profesional, Cancha de Tenis, Cancha de Fútbol 7, Gimnasio de 2 niveles con área cardio y pesas, SPA & Wellness con sauna finlandés y baño de vapor, Jacuzzi panorámico de hidromasaje, Sala de Cine privada, Coworking climatizado de alto rendimiento, Salón de Eventos, Sports Bar, Kids Club, Terrazas lounge, Zona de asadores BBQ, Parque para mascotas y Seguridad privada 24/7 con doble caseta de acceso.
- **Financiamiento Lomas Aurora**:
  - Apartado: $50,000 MXN.
  - Plan A: 30% Enganche / 70% Contra entrega.
  - Plan B: 30% Enganche / 40% Durante urbanización / 30% Contra entrega.

### XPU-HA OASIS · LOTES RESIDENCIALES CON CLUB DE PLAYA EN RIVIERA MAYA (DETALLE TÉCNICO OFICIAL):
- **Ubicación Estratégica**: Carretera Federal Km 265, Xpu-Ha, Quintana Roo (entre Playa del Carmen y Tulum).
  - Conectividad: 6 min de la Playa Xpu-Ha (1.5 km), 20 min de Playa del Carmen, 30 min de Tulum, 60 min de los Aeropuertos Internacionales de Cancún (CUN) y Tulum (TQO).
- **Lotes Residenciales de Gran Formato (Última Fase · 47 Lotes)**:
  - Superficies: **600 m² a 660 m²** (frentes de 20 a 22 metros).
  - Inversión: **Lotes desde $3,500,000 MXN** con financiamiento directo disponible.
  - Estatus: **Entrega inmediata y listo para escrituración notarial**.
  - Sin plazo forzoso de construcción (construye cuando estés listo con tu arquitecto o con ARUZ Construcción).
  - Servicios 100% subterráneos a pie de lote: Agua potable, drenaje sanitario, electricidad subterránea, alumbrado LED, vialidades de concreto hidráulico y caseta de seguridad privada 24/7.
- **Triple Amenidad Exclusiva**:
  1. *Xpu-Ha Beach Club Privado* (a 1.5 km / 6 min): Camastros, asoleaderos, restaurante de autor frente al mar Caribe, bar de mixología, lounge y salón de eventos.
  2. *Casa Club Oasis*: Exclusiva para los 47 propietarios de la última fase con alberca y terrazas.
  3. *Club Deportivo*: Alberca semiolímpica de nado, gimnasio equipado panorámico, canchas de pádel, tenis, pickleball, senderos ecológicos y ciclovía.

### CONDICIONES DE PAGO & FINANCIAMIENTO OFICIALES:
- **Esquema Mayakoba Tradicional**: 20% de Enganche / Mensualidades diferidas durante obra / Saldo contra entrega a la firma notarial.
- **Esquema Mayakoba Inversionista**: 30% de Enganche / 70% Contra entrega a la escrituración.
- **Esquema Lomas Aurora**: Apartado $50,000 MXN, 30% Enganche, esquemas 30/70 o 30/40/30.
- **Esquema Xpu-Ha Oasis**: Lotes desde $3,500,000 MXN, planes de financiamiento personalizados y entrega inmediata.

### DIRECTORIO EJECUTIVO, UBICACIÓN & HORARIOS OFICIALES:
- **Dirección de Operaciones**: WhatsApp/Tel: +52 984 130 8260 · Email: operaciones@aruzinmobiliaria.com
- **Dirección de Construcción**: Tel: +52 984 177 6205 · Email: construccion@aruzinmobiliaria.com
- **Oficinas Corporativas & Showroom**: Carretera Federal Chetumal - Puerto Juárez Km 230, Local 212 Planta Alta, Plaza Palmeras Mz 02 Lt 04, Playa del Carmen, Quintana Roo, CP 77728.
- **Horario de Atención Presencial (Oficinas & Showroom)**:
  - *Lunes a Viernes*: 9:00 a 18:00 hrs.
  - *Sábados*: 9:00 a 14:00 hrs.
- **Atención Virtual / Bot AI**: Disponible **24/7 ininterrumpidamente** para perfilado inicial y asesoría inmediata los 365 días del año.

### PERFILADO INICIAL INTELIGENTE:
Cuando un interesado solicite asesoría o pida recomendaciones, ayúdale a perfilar su proyecto consultando cortésmente:
1. **Propósito**: ¿Busca una residencia unifamiliar terminada en Mayakoba, un lote residencial con Casa Club en Lomas Aurora (Playa del Carmen, 160-225 m²), o un lote de gran formato con Club de Playa privado en Xpu-Ha Oasis (600-660 m², desde $3.5M MXN)?
2. **Esquema de Pago & Entrega**: ¿Prefiere preventa con entrega programada o entrega inmediata lista para escriturar?
3. **Visita & Recorrido**: Invita cordialmente a agendar un recorrido privado (Mayakoba, Lomas Aurora, Xpu-Ha Beach Club) o cita en oficinas dentro del horario presencial (Lun-Vie 9-18h, Sáb 9-14h) a través del botón de WhatsApp.

### REGLAS DE RESPUESTA:
- Responde siempre en español de forma elegante, profesional, estructurada y concisa.
- Usa negritas para destacar metros cuadrados, precios, ubicaciones, bonos de muebles y horarios.
- Utiliza viñetas para desglosar distribuciones por nivel o características técnicas.
- Al final de tu asesoría, invita amablemente a coordinar una llamada o visita con Dirección de Operaciones en el botón de WhatsApp ubicado en la pantalla.`;

  // Determine path prefix for assets and links
  const isLandingPage = window.location.pathname.includes('/landings/');
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
        <span class="floating-ai-sub">Perfilado 24/7 · Showroom Lun-Sáb</span>
      </div>
    `;

    // 2. Floating WhatsApp CTA Button (Bottom-Right) - Visible across all screens
    let whatsappBtn = document.querySelector('.floating-whatsapp-btn');
    if (!whatsappBtn) {
      whatsappBtn = document.createElement('a');
      whatsappBtn.className = 'floating-whatsapp-btn';
      whatsappBtn.href = 'https://api.whatsapp.com/send?phone=5219841308260&text=Hola%2C%20solicito%20asesor%C3%ADa%20personalizada%20con%20Direcci%C3%B3n%20de%20Operaciones%20de%20ARUZ.';
      whatsappBtn.target = '_blank';
      whatsappBtn.rel = 'noopener';
      whatsappBtn.setAttribute('aria-label', 'Contactar a Dirección de Operaciones por WhatsApp');
      whatsappBtn.innerHTML = `
        <svg class="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      `;
      document.body.appendChild(whatsappBtn);
    }

    // 3. AI Chat Modal Dialog (Without inner WhatsApp box as requested)
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
              <span>Bot 24/7 · Showroom Lun-Vie 9-18h | Sáb 9-14h</span>
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
            <p>Soy tu asesor inteligente <strong>24/7</strong> capacitado con los expedientes técnicos y contractuales de <strong>Grupo Ruiz</strong>, <strong>Lomas Aurora</strong>, <strong>Xpu-Ha Oasis</strong> y <strong>ARUZ Construcción</strong>. Puedo ayudarte con el perfilado de tu inversión, preventas en Mayakoba, lotes residenciales, accesos a Club de Playa, amenidades y citas en showroom.</p>
            <p><em>Horario Presencial en Oficinas & Showroom: Lunes a Viernes de 9:00 a 18:00 y Sábados de 9:00 a 14:00 hrs.</em></p>
            <p>¿Qué información deseas consultar hoy?</p>
            
            <div class="aruz-ai-chips">
              <button class="aruz-chip" data-query="¿Cuáles son los precios y amenidades de Xpu-Ha Oasis con Club de Playa?">🌊 Xpu-Ha Oasis (Club de Playa)</button>
              <button class="aruz-chip" data-query="¿Cuáles son las opciones y medidas de lotes residenciales en Lomas Aurora?">🌿 Lomas Aurora (Lotes & Casa Club)</button>
              <button class="aruz-chip" data-query="¿Cuáles son las preventas en Mayakoba y sus precios?">🏷️ Preventas Mayakoba</button>
              <button class="aruz-chip" data-query="Ayúdame a perfilar la mejor propiedad para mi inversión">🎯 Perfilado de Inversión</button>
              <button class="aruz-chip" data-query="¿Cuáles son los horarios de atención presencial y cómo agendar una cita?">📍 Horarios & Showroom</button>
              <button class="aruz-chip" data-query="¿Qué esquemas de financiamiento y enganche ofrecen?">💰 Planes de Financiamiento</button>
              <button class="aruz-chip" data-query="¿Qué garantía y respaldo técnico ofrece ARUZ Construcción?">🏗️ ARUZ Construcción</button>
            </div>
          </div>
        </div>
      </div>

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
            <button class="aruz-chip" data-query="¿Qué garantía y respaldo técnico ofrece ARUZ Construcción?">🏗️ Respaldo Técnico ARUZ Construcción</button>
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
          <p>Disculpa, estamos experimentando alta demanda de consultas. Puedes comunicarte directamente con <strong>Dirección de Operaciones (Director de Operaciones)</strong> mediante el botón de WhatsApp en la parte inferior derecha.</p>
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
    // 1. Primary Secure Dispatch: Enterprise Backend API Proxy (/api/ai-advisor)
    try {
      const proxyRes = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: history[history.length - 1]?.parts?.[0]?.text || '',
          history: history.slice(-6)
        })
      });

      if (proxyRes.ok) {
        const proxyData = await proxyRes.json();
        if (proxyData.reply) {
          return proxyData.reply.trim();
        }
      }
    } catch (proxyErr) {
      console.warn('[AI Gateway] Proxy connection fallback:', proxyErr.message);
    }

    // 2. Client-side Fallback Cascade (Development / Static Preview)
    const fallbackKey = atob("QVEuQWI4Uk42S3F5Qk13TFJUZnBza1MzUlhqYVJmVUI0c2lUSlY4TWRWTzcxdGVjaHBmY1E=");
    const MODELS_CASCADE = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-flash-latest", "gemini-2.0-flash"];
    let lastError = null;
    const trimmedHistory = history.slice(-6);

    for (const model of MODELS_CASCADE) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${fallbackKey}`;
      const payload = {
        systemInstruction: { parts: [{ text: ARUZ_SYSTEM_PROMPT }] },
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

        if (res.ok) {
          const data = await res.json();
          const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidate) return candidate.trim();
        }
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError || new Error("Servicio de IA temporalmente no disponible.");
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
