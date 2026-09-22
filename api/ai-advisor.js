module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, history } = req.body;
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Mensaje inválido o vacío.' });
  }

  const apiKey = process.env.GEMINI_API_KEY || Buffer.from("QVEuQWI4Uk42S3F5Qk13TFJUZnBza1MzUlhqYVJmVUI0c2lUSlY4TWRWTzcxdGVjaHBmY1E=", "base64").toString("utf-8");

  const MODELS = [
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
   - 305.31 m² constr. (179.30 m² terreno). Versión con roof: 3 recámaras con baño; principal con vestidor. Roof con cuarto de usos múltiples (opción de habitación adicional) y baño completo. Cocina/comedor, sala, alberca, terraza, jardín, lavandería y cochera pergolada. Terminación: 6 meses. Precio de venta: $9,191,287.00 MXN.
2. **Casa Tu'ux (Senderos Poniente Mz 11 Lt 18)**:
   - Terreno: 185.50 m². 3 recámaras con baño, principal con vestidor; biblioteca, cocina/comedor, sala, alberca, terraza, lavandería y cochera pergolada. Con roof opcional: añade terraza y cuarto de usos múltiples con baño completo. Versión comercial ofrecida: SIN ROOF · 266.09 m² · 4 MINISPLITS INVERTER. Precio de venta: $8,890,000.00 MXN. Terminación: 7 meses. Pagos: hasta 8 meses.
3. **Casa Sak Lu'um (Senderos Poniente Mz 14 Lt 04)**:
   - 333.59 m² constr. (169.00 m² terreno). 3 niveles, 3 recámaras con baño, roof top lounge. $5,290,000 MXN. Bono: $250,000 MXN. Entrega: Ene 2027.
4. **Casa K'áak Náajal (Senderos Poniente Mz 12 Lt 08)**:
   - 310.00 m² constr. (202.50 m² terreno). Suite completa en PB + 3 recámaras en PA (Total 4), alberca ampliada 20 m², roof top panorámico. $5,650,000 MXN. Bono: $400,000 MXN. Entrega: Mar 2027.
5. **Casa Mía (Condominio Senderos Poniente · Manzana 12 · Lote 08)**:
   - 198.00 m² constr. (202.50 m² terreno). 3 recámaras, todas en planta alta; principal con vestidor (walk-in closet). 3 baños completos y medio baño (3.5 baños). Cocina amplia, alacena, amplio cuarto de lavado, gran sala de TV y cochera para 2 vehículos. Ubicación sobre Parque del Nilo, UPE 332. Destaca por la amplitud de las áreas de convivencia y servicio, con las recámaras concentradas en planta alta. Acceso a Casa Club Senderos (sujeto al reglamento del condominio). Precio de venta: $7,600,000.00 MXN.
6. **Casa K'u (Condominio Senderos Poniente · Manzana 14 · Lote 04)**:
   - 176.00 m² constr. (169.00 m² terreno). 2 niveles, 3 recámaras (una en PB y principal con vestidor / walk-in closet), 3 baños completos, cocina equipada, sala de TV, terraza, área de lavado y cochera para 2 vehículos. Frente a un área de conservación de selva nativa. En este lote no incluye pasillo lateral; puede incorporarse en otras ubicaciones o lotes que lo permitan. Acceso a Casa Club Senderos (sujeto al reglamento del condominio). Precio de venta: $6,800,000.00 MXN. Entrega: 14 meses a partir de la firma del contrato. Reserva con $50,000 MXN.

### LOMAS AURORA (PLAYA DEL CARMEN):
- Lotes unifamiliares de 160 m², 180 m², 200 m² y 225 m² (Uso de Suelo H3).
- Casa Club diseñada por GVA Arquitectos con +25 amenidades: alberca semiolímpica, pádel, tenis, gimnasio 2 niveles, SPA & sauna, cine, coworking, seguridad 24/7.
- Apartado: $50,000 MXN. Planes 30/70 o 30/40/30.

### XPU-HA OASIS (RIVIERA MAYA):
- Lotes residenciales de 600 m² a 660 m² desde $3,500,000 MXN.
- Entrega inmediata, listos para escriturar.
- Acceso a Beach Club Privado (a 1.5 km), Casa Club Oasis y Club Deportivo.

### DIRECTORIO, SHOWROOM & HORARIOS:
- Dirección de Operaciones WhatsApp/Tel: +52 984 130 8260. Showroom en Plaza Palmeras Local 212, Playa del Carmen.
- Horario Presencial: Lun-Vie 9:00 - 18:00 hrs, Sáb 9:00 - 14:00 hrs. Bot IA 24/7.

### REGLAS DE RESPUESTA:
- Responde siempre en el MISMO IDIOMA del usuario (Español, English, Français, Italiano).
- Profesional, elegante, estructurado y conciso.
- Invita a agendar una cita o llamada vía WhatsApp al +52 984 130 8260.`;

  let lastError = null;

  for (const model of MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
      const payload = {
        contents: [
          ...(history && Array.isArray(history) ? history.slice(-6) : []),
          { role: 'user', parts: [{ text: message.trim() }] }
        ],
        systemInstruction: {
          parts: [{ text: ARUZ_SYSTEM_PROMPT }]
        },
        generationConfig: {
          maxOutputTokens: 800,
          temperature: 0.25,
          topP: 0.95
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Model ${model} returned ${response.status}`);
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (reply) {
        return res.status(200).json({ reply });
      }
    } catch (err) {
      lastError = err.message;
    }
  }

  return res.status(500).json({
    error: 'AI Inference Error',
    message: 'Nuestros asesores están atendiendo por WhatsApp directo al +52 984 130 8260.'
  });
};
