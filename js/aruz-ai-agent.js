/**
 * ============================================================================
 * ARUZ AI ADVISOR - OFFICIAL INTELLIGENT REAL ESTATE & ENGINEERING AGENT
 * Powered by Google Gemini API
 * Knowledge Base: Strictly grounded in official project specifications:
 * - 6 Ciudad Mayakoba Pre-sales (Eternity Jol, Tu'ux, Sak Lu'um, K'áak Náajal, Casa Mía, Casa K'u)
 * - Lomas Aurora Macrodevelopment (Residential Lots 160-225 m² + GVA Clubhouse)
 * - Xpu-Ha Oasis (Grand Format Lots 600-660 m² + Private Beach Club)
 * - ARUZ Construcción & Ingeniería (BIM 4D, CPM, Zero Intermediaries)
 * - ARUZ Maquinaria Pesada (CAT Fleet, Powerscreen Crushers)
 * - Showroom Hours & Executive Contacts
 * ============================================================================
 */

(function () {
  // Reconstructed API token for client AI inference fallback
  const GEMINI_API_KEY = atob("QVEuQWI4Uk42S3F5Qk13TFJUZnBza1MzUlhqYVJmVUI0c2lUSlY4TWRWTzcxdGVjaHBmY1E=");
  const MODELS_CASCADE = [
    "gemini-3.5-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-flash-latest"
  ];

  const ARUZ_SYSTEM_PROMPT = `Eres "ARUZ AI Advisor", el Asesor Oficial de Inteligencia Artificial de ARUZ Desarrolladora, Inmobiliaria y Grupo Ruiz (Playa del Carmen, Riviera Maya).
Tu conocimiento está 100% fundamentado en los documentos técnicos y contractuales oficiales de la empresa.

### ECOSISTEMA CORPORATIVO ("CONSTRUIMOS CONFIANZA"):
- **ARUZ Desarrolladora**: Concepción, diseño bioclimático y ejecución de residencias de autor exclusivas en preventa en Ciudad Mayakoba.
- **ARUZ Inmobiliaria / Consortium GPRuiz S.A. de C.V.**: Certeza jurídica notarial, comercialización y asesoría patrimonial integral.
- **ARUZ Construcción & Ingeniería**: Brazo constructor y técnico con +12 años de trayectoria. Especialistas en **planeación integral** (modelado BIM y control de ruta crítica), **gestión rigurosa de recursos** (cadena directa de materiales certificados y cuadrillas propias especializadas), **eficiencia operativa** y **estricto cumplimiento de normas** de construcción y seguridad estructural (NTC/NOM). Cero dependencia de terceros.
- **ARUZ Maquinaria Pesada**: Flota propia de excavadoras de oruga, retroexcavadoras y trituradoras de roca/madera para terracerías, cimentaciones y urbanización en Quintana Roo, Yucatán y Jalisco.

### PROYECTOS DE INFRAESTRUCTURA & TRAYECTORIA (CV GRUPO RUIZ):
- Trituración de 15 hectáreas de desmonte en Aeropuerto Internacional de Cancún ($3,410,400 MDP).
- Desarrollo y urbanización de 4 hectáreas en crucero Ave. Lilis con Ave. Juárez, Playa del Carmen ($136,985,642 MDP).
- Supervisión de infraestructura hidráulica, sanitaria, eléctrica y voz y datos en Ciudad Mayakoba (2017-2021).
- Residencias ejecutadas en Mayakoba, Bak Lum Tulum ($4.57 MDP) y Lomas Aurora.

### COLECCIÓN OFICIAL DE 6 PREVENTAS EN CIUDAD MAYAKOBA:
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

6. **Casa K'u (Senderos Poniente Mz 04 Lt 14 - Lote 81)**:
   - **Metraje Total**: 210.00 m² de Construcción.
   - **Terreno**: 170.00 m² (Frente 8.50m x Fondo 20.00m).
   - **Distribución en 2 Niveles**:
     - *Planta Baja*: Cochera para 2 autos con piso de concreto lavado y piedra regional, vestíbulo de acceso, **Recámara 3 Completa en Planta Baja** con clóset (ideal para accesibilidad/invitados), baño completo en PB con doble función (baño para recámara y visitas con cristal templado), estancia / sala a doble altura, comedor abierto, cocina integral equipada con cubierta de granito natural y barra desayunadora, cuarto de lavado techado, terraza posterior descubierta con pérgola de vigas WPC teca, jardín posterior y alberca privada en acabado Chukum.
     - *Planta Alta*: Family Room / Sala de TV, Recámara Principal (Master Suite) con amplio walk-in closet, doble lavabo de mármol y baño completo de autor; Recámara 2 con clóset integrado y baño privado completo. Total: 3 recámaras y 3 baños completos.
   - **Materiales & Cédula de Acabados**: Mármol Travertino Santo Tomás en pisos, cubiertas de Granito San Gabriel en cocina, pérgola exterior de vigas WPC color teca, recubrimiento exterior en pasta lisa y piedra regional laja maya, cancelería Serie 70 con cristal 6mm tintex, iluminación LED cálida indirecta.
   - **Inversión Preventa**: $6,800,000 MXN ($6.8 MDP).

### LOMAS AURORA · MACRODESARROLLO RESIDENCIAL EN PLAYA DEL CARMEN:
- **Ubicación Estratégica**: Prolongación Av. 115 Sur, Playa del Carmen, Quintana Roo.
  - Conectividad: 5 min de Centro Maya, 7 min de Parque Xplor, 10 min de la 5ta Avenida, 11 min de Parque Xcaret, 12 min de Playas del Caribe, 60 min del Aeropuerto de Cancún.
- **Lotes Residenciales Unifamiliares (4 Tipologías)**:
  - *160.00 m²* (8.00 m x 20.00 m) · COS 50% (80 m²) · CUS 1.61 (257.60 m²)
  - *180.00 m²* (9.00 m x 20.00 m) · COS 50% (90 m²) · CUS 1.61 (289.80 m²)
  - *200.00 m²* (10.00 m x 20.00 m) · COS 50% (100 m²) · CUS 1.61 (322.00 m²)
  - *225.00 m²* (11.25 m x 20.00 m) · COS 50% (112.50 m²) · CUS 1.61 (362.25 m²)
  - *Normativa de Construcción*: Uso de Suelo H3 (Habitacional Unifamiliar hasta 3 niveles / 10.50 m de altura).
  - *Fechas de Entrega Lotes*: Etapa 1 en Noviembre 2025 · Etapa 2 en Marzo 2026.
  - *Infraestructura*: 100% subterránea (agua, luz, drenaje, fibra óptica), concreto hidráulico, ciclovía y lagos artificiales.
- **Casa Club de Autor (Diseño GVA Arquitectos · +25 Amenidades)**:
  - Alberca Semiolímpica, Pista de Pádel profesional, Cancha de Tenis, Cancha de Fútbol 7, Gimnasio de 2 niveles con área cardio y pesas, SPA & Wellness con sauna finlandés y baño de vapor, Jacuzzi panorámico de hidromasaje, Sala de Cine privada, Coworking climatizado, Salón de Eventos, Sports Bar, Kids Club, Terrazas lounge, Zona BBQ, Parque para mascotas y Seguridad privada 24/7.
- **Financiamiento Lomas Aurora**: Apartado: $50,000 MXN · Planes 30/70 o 30/40/30.

### XPU-HA OASIS · LOTES RESIDENCIALES CON CLUB DE PLAYA EN RIVIERA MAYA:
- **Ubicación**: Carretera Federal Km 265, Xpu-Ha, Quintana Roo (entre Playa del Carmen y Tulum).
  - Conectividad: 6 min de la Playa Xpu-Ha (1.5 km), 20 min de Playa del Carmen, 30 min de Tulum, 60 min de los Aeropuertos de Cancún (CUN) y Tulum (TQO).
- **Lotes Residenciales de Gran Formato (Última Fase · 47 Lotes)**:
  - Superficies: **600 m² a 660 m²** (frentes de 20 a 22 metros).
  - Inversión: **Lotes desde $3,500,000 MXN** con financiamiento directo disponible.
  - Estatus: **Entrega inmediata y listo para escrituración notarial**.
  - Sin plazo forzoso de construcción (construye con tu arquitecto o con ARUZ Construcción).
  - Servicios 100% subterráneos: Agua potable, drenaje sanitario, electricidad subterránea, alumbrado LED, vialidades de concreto hidráulico y caseta 24/7.
- **Triple Amenidad Exclusiva**:
  1. *Xpu-Ha Beach Club Privado* (a 1.5 km / 6 min): Camastros, asoleaderos, restaurante de autor frente al mar, bar de mixología, lounge y salón de eventos.
  2. *Casa Club Oasis*: Exclusiva para los 47 propietarios de la última fase con alberca y terrazas.
  3. *Club Deportivo*: Alberca semiolímpica, gimnasio panorámico, pádel, tenis, pickleball, senderos y ciclovía.

### CONDICIONES DE PAGO & FINANCIAMIENTO OFICIALES:
- **Esquema Mayakoba Tradicional**: 20% de Enganche / Mensualidades diferidas durante obra / Saldo contra entrega a la firma notarial.
- **Esquema Mayakoba Inversionista**: 30% de Enganche / 70% Contra entrega a la escrituración.
- **Esquema Lomas Aurora**: Apartado $50,000 MXN, 30% Enganche, esquemas 30/70 o 30/40/30.
- **Esquema Xpu-Ha Oasis**: Lotes desde $3,500,000 MXN, financiamiento directo y entrega inmediata.

### DIRECTORIO EJECUTIVO, UBICACIÓN & HORARIOS:
- **Dirección de Operaciones**: WhatsApp/Tel: +52 984 130 8260 · Email: operaciones@aruzinmobiliaria.com
- **Dirección de Construcción**: Tel: +52 984 177 6205 · Email: construccion@aruzinmobiliaria.com
- **Oficinas Corporativas & Showroom**: Carretera Federal Chetumal - Puerto Juárez Km 230, Local 212 Planta Alta, Plaza Palmeras Mz 02 Lt 04, Playa del Carmen, Quintana Roo, CP 77728.
- **Horario de Atención Presencial (Showroom & Oficinas)**:
  - *Lunes a Viernes*: 9:00 a 18:00 hrs.
  - *Sábados*: 9:00 a 14:00 hrs.
- **Atención Virtual / Bot AI**: Disponible **24/7 ininterrumpidamente** para perfilado inmediato los 365 días del año.

### REGLAS DE IDIOMA Y RESPUESTA:
- **Detección de Idioma**: Responde siempre en el MISMO IDIOMA en el que el usuario te escriba (Español, English, Français, Italiano).
- Responde de forma elegante, profesional, estructurada y concisa.
- Usa negritas para destacar metros cuadrados, precios, ubicaciones, bonos y horarios.
- Al final de tu asesoría, invita amablemente a agendar una cita o recorrido con Dirección de Operaciones en el botón de WhatsApp.`;

  // Detect current language from HTML document or URL
  function detectPageLanguage() {
    const htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    if (pathname.startsWith('/en') || htmlLang.startsWith('en')) return 'en';
    if (pathname.startsWith('/fr') || htmlLang.startsWith('fr')) return 'fr';
    if (pathname.startsWith('/it') || htmlLang.startsWith('it')) return 'it';
    return 'es';
  }

  const currentLang = detectPageLanguage();

  const I18N_STRINGS = {
    es: {
      btnTitle: "Asesor IA",
      btnSub: "Perfilado 24/7 · Showroom Lun-Sáb",
      btnAria: "Abrir Asesor de Inteligencia Artificial ARUZ",
      wsAria: "Contactar a Dirección de Operaciones por WhatsApp",
      status: "Bot 24/7 · Showroom Lun-Vie 9-18h | Sáb 9-14h",
      welcomeTitle: "Bienvenido a ARUZ Desarrolladora & Inmobiliaria.",
      welcomeBody: "Soy tu asesor inteligente <strong>24/7</strong> capacitado con los expedientes técnicos y contractuales de <strong>Grupo Ruiz</strong>, <strong>Lomas Aurora</strong>, <strong>Xpu-Ha Oasis</strong> y <strong>ARUZ Construcción</strong>. Puedo ayudarte con el perfilado de tu inversión, preventas en Mayakoba, lotes residenciales, accesos a Club de Playa, amenidades y citas en showroom.",
      welcomeHours: "Horario Presencial en Oficinas & Showroom: Lunes a Viernes de 9:00 a 18:00 y Sábados de 9:00 a 14:00 hrs.",
      welcomeAsk: "¿Qué información deseas consultar hoy?",
      placeholder: "Pregunta sobre preventas, planos, obra, financiamiento...",
      sendAria: "Enviar mensaje",
      chips: [
        { label: "🌊 Xpu-Ha Oasis (Club de Playa)", query: "¿Cuáles son los precios y amenidades de Xpu-Ha Oasis con Club de Playa?" },
        { label: "🌿 Lomas Aurora (Lotes & Casa Club)", query: "¿Cuáles son las opciones y medidas de lotes residenciales en Lomas Aurora?" },
        { label: "🏷️ Preventas Mayakoba", query: "¿Cuáles son las 6 casas en preventa en Ciudad Mayakoba y sus precios?" },
        { label: "🎯 Perfilado de Inversión", query: "Ayúdame a perfilar la mejor propiedad para mi inversión" },
        { label: "📍 Horarios & Showroom", query: "¿Cuáles son los horarios de atención presencial y cómo agendar una cita?" },
        { label: "💰 Planes de Financiamiento", query: "¿Qué esquemas de financiamiento y enganche ofrecen?" },
        { label: "🏗️ ARUZ Construcción", query: "¿Qué garantía y respaldo técnico ofrece ARUZ Construcción?" }
      ],
      resetMsg: "Conversación reiniciada. ¿Qué información deseas consultar sobre nuestras propiedades o servicios?",
      errorDemand: "Disculpa, estamos experimentando alta demanda. Puedes comunicarte directamente con <strong>Dirección de Operaciones</strong> mediante el botón de WhatsApp."
    },
    en: {
      btnTitle: "AI Advisor",
      btnSub: "24/7 Profiling · Showroom Mon-Sat",
      btnAria: "Open ARUZ AI Real Estate Advisor",
      wsAria: "Contact Operations Management on WhatsApp",
      status: "24/7 Bot · Showroom Mon-Fri 9-18h | Sat 9-14h",
      welcomeTitle: "Welcome to ARUZ Real Estate & Development.",
      welcomeBody: "I am your <strong>24/7</strong> intelligent advisor trained with official blueprints, pricing, and masterplans for <strong>Grupo Ruiz</strong>, <strong>Lomas Aurora</strong>, <strong>Xpu-Ha Oasis</strong>, and <strong>ARUZ Construction</strong>. I can assist you with pre-sales in Ciudad Mayakoba, residential lots, private Beach Club access, and showroom visits.",
      welcomeHours: "In-Person Showroom Hours: Monday to Friday 9:00 - 18:00 & Saturday 9:00 - 14:00 hrs.",
      welcomeAsk: "What information would you like to explore today?",
      placeholder: "Ask about pre-sales, blueprints, financing, beach club...",
      sendAria: "Send message",
      chips: [
        { label: "🌊 Xpu-Ha Oasis (Beach Club)", query: "What are the prices and amenities for Xpu-Ha Oasis lots with Beach Club?" },
        { label: "🌿 Lomas Aurora (Lots & Clubhouse)", query: "What are the residential lot sizes and clubhouse amenities at Lomas Aurora?" },
        { label: "🏷️ Mayakoba Pre-sales", query: "What are the 6 luxury homes in Ciudad Mayakoba and their prices?" },
        { label: "🎯 Investment Profiling", query: "Help me find the best real estate investment option for my profile" },
        { label: "📍 Showroom & Hours", query: "What are the office hours and how can I schedule a private tour?" },
        { label: "💰 Financing Plans", query: "What down payment and direct financing options are available?" },
        { label: "🏗️ ARUZ Construction", query: "What engineering warranties and custom build services does ARUZ provide?" }
      ],
      resetMsg: "Conversation reset. What information would you like to explore regarding our properties or construction services?",
      errorDemand: "Apologies, we are experiencing high inquiry volume. You can reach <strong>Operations Management</strong> directly via WhatsApp."
    },
    fr: {
      btnTitle: "Conseiller IA",
      btnSub: "Profilage 24/7 · Showroom Lun-Sam",
      btnAria: "Ouvrir le Conseiller Immobilier IA ARUZ",
      wsAria: "Contacter la Direction des Opérations par WhatsApp",
      status: "Bot 24/7 · Showroom Lun-Ven 9-18h | Sam 9-14h",
      welcomeTitle: "Bienvenue chez ARUZ Promoteur & Immobilier.",
      welcomeBody: "Je suis votre conseiller intelligent <strong>24/7</strong> formé avec les dossiers techniques officiels de <strong>Grupo Ruiz</strong>, <strong>Lomas Aurora</strong>, <strong>Xpu-Ha Oasis</strong> et <strong>ARUZ Construction</strong>. Je peux vous accompagner pour vos investissements en prévente à Mayakoba, terrains résidentiels, accès au Beach Club et visites privées.",
      welcomeHours: "Horaires Présentiels en Showroom : Lundi à Vendredi 9h-18h & Samedi 9h-14h.",
      welcomeAsk: "Quelle information souhaitez-vous consulter aujourd'hui ?",
      placeholder: "Posez vos questions sur les préventes, plans, financement...",
      sendAria: "Envoyer le message",
      chips: [
        { label: "🌊 Xpu-Ha Oasis (Beach Club)", query: "Quels sont les prix et commodités des terrains Xpu-Ha Oasis avec Beach Club ?" },
        { label: "🌿 Lomas Aurora (Terrains & Club)", query: "Quelles sont les superficies des terrains et commodités à Lomas Aurora ?" },
        { label: "🏷️ Préventes Mayakoba", query: "Quelles sont les 6 résidences en prévente à Ciudad Mayakoba et leurs prix ?" },
        { label: "🎯 Profilage d'Investissement", query: "Aidez-moi à trouver la meilleure option d'investissement pour mon profil" },
        { label: "📍 Horaires & Showroom", query: "Quels sont les horaires d'ouverture et comment planifier une visite ?" },
        { label: "💰 Plans de Financement", query: "Quels sont les plans de paiement et financements directs disponibles ?" },
        { label: "🏗️ ARUZ Construction", query: "Quelles garanties d'ingénierie et de construction offre ARUZ ?" }
      ],
      resetMsg: "Conversation réinitialisée. Quelles informations souhaitez-vous explorer ?",
      errorDemand: "Veuillez nous excuser pour ce ralentissement. Vous pouvez joindre directement la <strong>Direction des Opérations</strong> par WhatsApp."
    },
    it: {
      btnTitle: "Advisor IA",
      btnSub: "Profilazione 24/7 · Showroom Lun-Sab",
      btnAria: "Apri il Consulente Immobiliare IA ARUZ",
      wsAria: "Contatta la Direzione Operazioni via WhatsApp",
      status: "Bot 24/7 · Showroom Lun-Ven 9-18h | Sab 9-14h",
      welcomeTitle: "Benvenuti in ARUZ Sviluppatore & Immobiliare.",
      welcomeBody: "Sono il vostro consulente intelligente <strong>24/7</strong> con accesso completo ai documenti tecnici di <strong>Grupo Ruiz</strong>, <strong>Lomas Aurora</strong>, <strong>Xpu-Ha Oasis</strong> e <strong>ARUZ Costruzioni</strong>. Posso assistervi con prevendite a Mayakoba, lotti residenziali, accesso al Beach Club privato e appuntamenti in showroom.",
      welcomeHours: "Orari Showroom in Sede: Lunedì a Venerdì 9:00 - 18:00 e Sabato 9:00 - 14:00.",
      welcomeAsk: "Quali informazioni desiderate approfondire oggi?",
      placeholder: "Chiedi informazioni su prevendite, planimetrie, pagamenti...",
      sendAria: "Invia messaggio",
      chips: [
        { label: "🌊 Xpu-Ha Oasis (Beach Club)", query: "Quali sono i prezzi e i servizi dei lotti Xpu-Ha Oasis con Beach Club?" },
        { label: "🌿 Lomas Aurora (Lotti & Club)", query: "Quali sono le dimensioni dei lotti residenziali e i servizi a Lomas Aurora?" },
        { label: "🏷️ Prevendite Mayakoba", query: "Quali sono le 6 ville in prevendita a Ciudad Mayakoba e i relativi prezzi?" },
        { label: "🎯 Profilazione Investimento", query: "Aiutami a individuare la migliore opportunità immobiliare per il mio profilo" },
        { label: "📍 Showroom & Orari", query: "Quali sono gli orari dello showroom e come prenotare un tour privato?" },
        { label: "💰 Piani di Finanziamento", query: "Quali sono i piani di pagamento e i finanziamenti disponibili?" },
        { label: "🏗️ ARUZ Costruzioni", query: "Quali garanzie ingegneristiche e servizi di costruzione offre ARUZ?" }
      ],
      resetMsg: "Conversazione reimpostata. Quali informazioni desiderate approfondire?",
      errorDemand: "Ci scusiamo per l'attesa dovuta all'elevata richiesta. Potete contattare direttamente la <strong>Direzione Operazioni</strong> via WhatsApp."
    }
  };

  const loc = I18N_STRINGS[currentLang] || I18N_STRINGS.es;

  // Determine path prefix for assets and links
  const isLandingPage = window.location.pathname.includes('/landings/');
  const isSubdir = window.location.pathname.startsWith('/en/') || window.location.pathname.startsWith('/fr/') || window.location.pathname.startsWith('/it/');
  let assetPath = 'assets/';
  if (isSubdir && isLandingPage) {
    assetPath = '../../assets/';
  } else if (isSubdir || isLandingPage) {
    assetPath = '../assets/';
  }

  // Conversation history in memory
  let conversationHistory = [];

  // Inject Floating Buttons and Chat Modal into DOM
  function injectUI() {
    if (document.getElementById('aruz-ai-modal')) return;

    // 1. Floating AI Button (Positioned Bottom-Right)
    const floatingBtn = document.createElement('button');
    floatingBtn.id = 'floating-ai-trigger';
    floatingBtn.className = 'floating-ai-btn';
    floatingBtn.setAttribute('aria-label', loc.btnAria);
    floatingBtn.innerHTML = `
      <div class="floating-ai-icon-wrap">
        <span class="ai-pulse"></span>
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
        </svg>
      </div>
      <div class="floating-ai-label">
        <span class="floating-ai-title">${loc.btnTitle}</span>
        <span class="floating-ai-sub">${loc.btnSub}</span>
      </div>
    `;

    // 2. Floating WhatsApp CTA Button (Positioned Bottom-Left)
    let whatsappBtn = document.querySelector('.floating-whatsapp-btn');
    if (!whatsappBtn) {
      whatsappBtn = document.createElement('a');
      whatsappBtn.className = 'floating-whatsapp-btn';
      whatsappBtn.href = 'https://api.whatsapp.com/send?phone=5219841308260&text=Hola%2C%20solicito%20asesor%C3%ADa%20personalizada%20con%20Direcci%C3%B3n%20de%20Operaciones%20de%20ARUZ.';
      whatsappBtn.target = '_blank';
      whatsappBtn.rel = 'noopener';
      whatsappBtn.setAttribute('aria-label', loc.wsAria);
      whatsappBtn.innerHTML = `
        <svg class="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      `;
      document.body.appendChild(whatsappBtn);
    }

    // 3. AI Chat Modal Dialog (Positioned Bottom-Right)
    const chipsHtml = loc.chips.map(c => `<button class="aruz-chip" data-query="${c.query}">${c.label}</button>`).join('');

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
              <span>${loc.status}</span>
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
            <p><strong>${loc.welcomeTitle}</strong></p>
            <p>${loc.welcomeBody}</p>
            <p><em>${loc.welcomeHours}</em></p>
            <p>${loc.welcomeAsk}</p>
            
            <div class="aruz-ai-chips">
              ${chipsHtml}
            </div>
          </div>
        </div>
      </div>

      <div class="aruz-ai-footer">
        <input type="text" id="aruz-ai-input" class="aruz-ai-input" placeholder="${loc.placeholder}" autocomplete="off">
        <button id="aruz-ai-send" class="aruz-ai-send" aria-label="${loc.sendAria}">
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
    const chipsHtml = loc.chips.map(c => `<button class="aruz-chip" data-query="${c.query}">${c.label}</button>`).join('');
    container.innerHTML = `
      <div class="aruz-msg assistant">
        <div class="aruz-msg-content">
          <p><strong>${loc.resetMsg}</strong></p>
          <div class="aruz-ai-chips">
            ${chipsHtml}
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
          <p>${loc.errorDemand}</p>
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
      console.warn('[AI Gateway] Proxy fallback:', proxyErr.message);
    }

    // 2. Client-side Fallback Cascade
    let lastError = null;
    const trimmedHistory = history.slice(-6);

    for (const model of MODELS_CASCADE) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
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
        } else {
          const errData = await res.json().catch(() => ({}));
          console.warn(`[AI Model ${model}]:`, errData?.error?.message || res.statusText);
        }
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError || new Error("Servicio de IA temporalmente no disponible.");
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectUI);
  } else {
    injectUI();
  }
})();
