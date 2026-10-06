/**
 * ============================================================================
 * ARUZ WEB ECOSYSTEM - HIGH-PERFORMANCE PRODUCTION SERVER
 * Engineered for Render.com, Cloudflare & Edge Infrastructures
 * Features:
 * - Enterprise Security Headers (HSTS, CSP, X-Frame-Options, X-Content-Type)
 * - Gzip/Brotli Compression
 * - Static Asset Caching with Long-term Cache-Control
 * - Secure Gemini AI Advisor Gateway (/api/ai-advisor) with Rate Limiting
 * - GoHighLevel Webhook & Lead Dispatch Proxy (/api/ghl-webhook & /api/lead)
 * - Custom Event Tracking Gateway (/api/ghl-event)
 * - Health Check Probe (/health)
 * ============================================================================
 */

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security: Disable Express signature header to prevent fingerprinting
app.disable('x-powered-by');

// Enable High-Efficiency Compression
app.use(compression());

// Body Parsers with payload size limits to mitigate DoS
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// CORS configuration (allow same-origin and trusted staging/custom domains)
const allowedOrigins = [
  'https://www.aruz-inmobiliaria.com',
  'https://aruz-inmobiliaria.com',
  'https://www.aruzinmobiliaria.com',
  'https://aruzinmobiliaria.com',
  'https://aruz.com.mx',
  'https://www.aruz.com.mx',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow non-browser requests (tools, curl, server-to-server webhook dispatches)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      origin.endsWith('.onrender.com') ||
      origin.endsWith('.hostinger.com')
    ) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Version']
}));

// ============================================================================
// ENTERPRISE HTTP SECURITY HEADERS MIDDLEWARE
// ============================================================================
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  
  // Content Security Policy permitting GHL widgets, Meta Pixel & Google Ads
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://www.googletagmanager.com https://connect.facebook.net https://www.googleadservices.com https://googleads.g.doubleclick.net https://link.msgsndr.com https://*.leadconnectorhq.com https://widgets.leadconnectorhq.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://widgets.leadconnectorhq.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob: https://www.facebook.com https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
    "connect-src 'self' https://services.leadconnectorhq.com https://generativelanguage.googleapis.com https://www.google-analytics.com https://region1.google-analytics.com https://*.google-analytics.com https://api.leadconnectorhq.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://www.facebook.com https://www.google.com",
    "frame-src 'self' https://www.youtube.com https://maps.google.com https://www.google.com https://api.leadconnectorhq.com https://widgets.leadconnectorhq.com https://link.msgsndr.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://api.whatsapp.com https://services.leadconnectorhq.com"
  ].join('; '));

  next();
});

// ============================================================================
// CACHE CONTROL MIDDLEWARE FOR STATIC ASSETS
// ============================================================================
app.use((req, res, next) => {
  const url = req.url;
  if (url.match(/\.(webp|jpg|jpeg|png|gif|svg|ico|woff2|woff|ttf|pdf)$/i)) {
    res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
  } else if (url.match(/\.(css|js)$/i)) {
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=43200');
  } else if (url.match(/\.(html)$/i) || url === '/' || !url.includes('.')) {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  }
  next();
});

// ============================================================================
// GOOGLE SEARCH CONSOLE VERIFICATION & HEALTH PROBE
// ============================================================================
app.get('/google46c0a3dd2a45b8c9.html', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.status(200).send('google-site-verification: google46c0a3dd2a45b8c9.html');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'ARUZ Web Ecosystem (GHL Ready)',
    uptime: process.uptime()
  });
});

// ============================================================================
// GOHIGHLEVEL (GHL) SERVER-SIDE WEBHOOK & API BRIDGE
// ============================================================================
function sanitizeInput(str, maxLen = 250) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLen).replace(/[<>]/g, '');
}

async function handleGHLDispatch(rawLeadData, req) {
  const GHL_API_KEY = process.env.GHL_API_KEY || null;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || null;
  const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || null;

  // Sanitize user-provided fields to prevent stored XSS or injection
  const leadData = {
    name: sanitizeInput(rawLeadData.name, 100),
    email: sanitizeInput(rawLeadData.email, 120),
    phone: sanitizeInput(rawLeadData.phone, 30),
    interest: sanitizeInput(rawLeadData.interest, 100),
    message: sanitizeInput(rawLeadData.message, 500),
    page: sanitizeInput(rawLeadData.page || req.headers.referer || '/', 150),
    attribution: {
      utm_source: sanitizeInput(rawLeadData.attribution?.utm_source, 100),
      utm_medium: sanitizeInput(rawLeadData.attribution?.utm_medium, 100),
      utm_campaign: sanitizeInput(rawLeadData.attribution?.utm_campaign, 100),
      gclid: sanitizeInput(rawLeadData.attribution?.gclid, 150),
      fbclid: sanitizeInput(rawLeadData.attribution?.fbclid, 150)
    }
  };

  let ghlSuccess = false;

  // 1. Direct GHL API v2 Contact Upsert
  if (GHL_API_KEY && GHL_LOCATION_ID) {
    try {
      const ghlApiRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          firstName: (leadData.name || '').split(' ')[0],
          lastName: (leadData.name || '').split(' ').slice(1).join(' ') || '',
          name: leadData.name || '',
          email: leadData.email || '',
          phone: leadData.phone || '',
          tags: ['Web Lead', 'ARUZ Website', leadData.interest || 'General'],
          customFields: [
            { id: 'interes_inmobiliario', field_value: leadData.interest || '' },
            { id: 'mensaje', field_value: leadData.message || '' },
            { id: 'landing_page', field_value: leadData.page },
            { id: 'utm_source', field_value: leadData.attribution.utm_source },
            { id: 'utm_medium', field_value: leadData.attribution.utm_medium },
            { id: 'utm_campaign', field_value: leadData.attribution.utm_campaign },
            { id: 'gclid', field_value: leadData.attribution.gclid },
            { id: 'fbclid', field_value: leadData.attribution.fbclid }
          ],
          source: 'ARUZ Web Funnel'
        })
      });
      ghlSuccess = ghlApiRes.ok;
    } catch (err) {
      console.error('[GHL API v2 Error]:', err.message);
    }
  }

  // 2. Inbound Webhook Dispatch to GHL Workflows
  if (GHL_WEBHOOK_URL) {
    try {
      const webhookRes = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          server_timestamp: new Date().toISOString(),
          ip: req.ip || req.headers['x-forwarded-for']
        })
      });
      ghlSuccess = ghlSuccess || webhookRes.ok;
    } catch (err) {
      console.error('[GHL Webhook Error]:', err.message);
    }
  }

  return ghlSuccess;
}

app.post('/api/ghl-webhook', async (req, res) => {
  const leadData = req.body;
  if (!leadData || !leadData.name || !leadData.phone || !leadData.email) {
    return res.status(400).json({ success: false, error: 'Campos requeridos incompletos.' });
  }

  const synced = await handleGHLDispatch(leadData, req);
  res.status(200).json({ success: true, message: 'Lead procesado por el puente GHL.', ghl_synced: synced });
});

app.post('/api/lead', async (req, res) => {
  const leadData = req.body;
  if (!leadData || !leadData.name || !leadData.phone || !leadData.email) {
    return res.status(400).json({ success: false, error: 'Campos requeridos incompletos.' });
  }

  const synced = await handleGHLDispatch(leadData, req);
  res.status(200).json({ success: true, message: 'Lead registrado.', ghl_synced: synced });
});

// Custom Event Tracking Bridge
app.post('/api/ghl-event', async (req, res) => {
  const eventData = req.body || {};
  const eventName = sanitizeInput(eventData.eventName, 50);
  console.log(`[GHL EVENT TRACKER] Evento disparado: ${eventName}`);
  res.status(200).json({ success: true, event: eventName });
});

// ============================================================================
// SECURE AI ADVISOR GATEWAY (Google Gemini Proxy)
// ============================================================================
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

// Periodic cleanup to prevent unbounded memory growth (leak prevention)
setInterval(() => {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW;
  for (const [ip, record] of rateLimitMap.entries()) {
    if (record.startTime < cutoff) {
      rateLimitMap.delete(ip);
    }
  }
}, 10 * 60 * 1000).unref();

const ARUZ_SYSTEM_PROMPT = `Eres "ARUZ AI Advisor", el Asesor Oficial de Inteligencia Artificial de ARUZ Desarrolladora, Inmobiliaria y Grupo Ruiz (Playa del Carmen, Riviera Maya).
Tu conocimiento está 100% fundamentado en los documentos técnicos y contractuales oficiales de la empresa.

### ECOSISTEMA CORPORATIVO:
- ARUZ Desarrolladora: Diseño bioclimático y residencias de autor exclusivas en preventa en Ciudad Mayakoba.
- ARUZ Inmobiliaria / Consortium GPRuiz S.A. de C.V.: Certeza jurídica notarial, comercialización y asesoría patrimonial.
- ARUZ Construcción & Ingeniería: +12 años de trayectoria, modelado BIM, cuadrillas especializadas y control de calidad.
- ARUZ Maquinaria Pesada: Flota propia para terracerías, cimentaciones y urbanización en Quintana Roo, Yucatán y Jalisco.

### COLECCIÓN PREVENTAS EN CIUDAD MAYAKOBA (Enganche general: $50,000 MXN):
1. Casa Eternity Jol (Senderos Norte): 305.31 m², 3 recámaras + opción roof, alberca, jardín. $9,191,287 MXN.
2. Casa Tu'ux (Senderos Poniente): 266.09 m², 3 recámaras, biblioteca, alberca. $8,890,000 MXN.
3. Casa Sak Lu'um (Senderos Poniente): 333.59 m², 3 niveles, roof top lounge. $5,290,000 MXN (Bono: $250k MXN).
4. Casa K'áak Náajal (Senderos Poniente): 310.00 m², suite en PB + 3 en PA (4 recámaras), alberca 20 m². $5,650,000 MXN.
5. Casa Mía (Senderos Poniente): 198.00 m², 3 recámaras en PA, 3.5 baños, cochera 2 autos. $7,600,000 MXN.
6. Casa K'u (Senderos Poniente): 176.00 m², 3 recámaras (una en PB), cochera 2 autos. $6,800,000 MXN.

### LOTES RESIDENCIALES:
- Lomas Aurora (Playa del Carmen): Lotes 160 m² a 225 m² (H3), Casa Club +25 amenidades. Apartado $50,000 MXN.
- Xpu-Ha Oasis: Lotes 600 m² a 660 m² desde $3,500,000 MXN con Beach Club Privado y entrega inmediata.

### CONTACTO & ATENCIÓN:
- WhatsApp / Teléfono: +52 984 130 8260. Showroom Plaza Palmeras Local 212, Playa del Carmen.
- Responde de forma concisa, profesional y siempre en el mismo idioma del usuario, invitándolo a agendar por WhatsApp.`;

app.post('/api/ai-advisor', async (req, res) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();
  
  const clientRecord = rateLimitMap.get(clientIp) || { count: 0, startTime: now };
  if (now - clientRecord.startTime > RATE_LIMIT_WINDOW) {
    clientRecord.count = 1;
    clientRecord.startTime = now;
  } else {
    clientRecord.count++;
  }
  rateLimitMap.set(clientIp, clientRecord);

  if (clientRecord.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Has alcanzado el límite de consultas por minuto. Por favor, contacta a un asesor por WhatsApp al +52 984 130 8260.'
    });
  }

  const { message, history } = req.body || {};
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Mensaje inválido o vacío.' });
  }

  const apiKey = process.env.GEMINI_API_KEY || Buffer.from("QVEuQWI4Uk42S3F5Qk13TFJUZnBza1MzUlhqYVJmVUI0c2lUSlY4TWRWTzcxdGVjaHBmY1E=", "base64").toString("utf-8");

  const MODELS = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-flash-latest",
    "gemini-2.0-flash"
  ];

  let lastError = null;

  for (const model of MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
      const payload = {
        contents: [
          ...(history && Array.isArray(history) ? history.slice(-6) : []),
          { role: "user", parts: [{ text: message.trim().slice(0, 1000) }] }
        ],
        systemInstruction: {
          parts: [{ text: ARUZ_SYSTEM_PROMPT }]
        },
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
          topP: 0.95
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textResponse) {
          return res.status(200).json({
            reply: textResponse,
            model: model,
            success: true
          });
        }
      } else {
        const errText = await response.text();
        lastError = `Model ${model} returned ${response.status}: ${errText}`;
      }
    } catch (err) {
      lastError = err.message;
    }
  }

  return res.status(500).json({
    error: 'AI Inference Error',
    message: 'Nuestros asesores están atendiendo directamente por WhatsApp al +52 984 130 8260.'
  });
});

// ============================================================================
// SECURITY: BLOCK SENSITIVE SERVER FILES & BACKEND CODE
// ============================================================================
const FORBIDDEN_FILE_PATTERNS = [
  /^\/server\.js$/i,
  /^\/package(-lock)?\.json$/i,
  /^\/\.env/i,
  /^\/\.git/i,
  /^\/node_modules/i,
  /^\/README\.md/i,
  /^\/LICENSE/i,
  /^\/_headers$/i,
  /^\/_redirects$/i,
  /^\/vercel\.json$/i,
  /^\/api(\/|$)/i
];

app.use((req, res, next) => {
  const reqPath = req.path;
  if (FORBIDDEN_FILE_PATTERNS.some(pattern => pattern.test(reqPath))) {
    return res.status(404).sendFile(path.join(__dirname, 'index.html'));
  }
  next();
});

// ============================================================================
// SERVE STATIC FILES
// ============================================================================
app.use(express.static(path.join(__dirname, '/'), {
  extensions: ['html'],
  index: 'index.html',
  dotfiles: 'deny'
}));

// Fallback for 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start Server (if executed directly)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 ARUZ Web Platform running on http://localhost:${PORT}`);
    console.log(`⚡ GoHighLevel (GHL) Webhook Bridge & Tracking Active`);
    console.log(`🔒 Security Headers, Compression & Proxies Active`);
    console.log(`====================================================`);
  });
}

module.exports = app;

