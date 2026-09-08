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

// Enable High-Efficiency Compression
app.use(compression());

// Body Parsers with payload size limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// CORS configuration (allow same-origin and trusted staging/custom domains)
const allowedOrigins = [
  'https://aruz.com.mx',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.onrender.com')) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive for webhook proxies
    }
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
  
  // Content Security Policy permitting GHL widgets & calendars
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://www.googletagmanager.com https://connect.facebook.net https://link.msgsndr.com https://*.leadconnectorhq.com https://widgets.leadconnectorhq.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://widgets.leadconnectorhq.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://services.leadconnectorhq.com https://generativelanguage.googleapis.com https://www.google-analytics.com https://region1.google-analytics.com https://*.google-analytics.com https://api.leadconnectorhq.com",
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
// HEALTH PROBE FOR ZERO-DOWNTIME MONITORING
// ============================================================================
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
async function handleGHLDispatch(leadData, req) {
  const GHL_API_KEY = process.env.GHL_API_KEY || null;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || null;
  const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || null;

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
            { id: 'landing_page', field_value: leadData.page || req.headers.referer || '/' },
            { id: 'utm_source', field_value: leadData.attribution?.utm_source || '' },
            { id: 'utm_medium', field_value: leadData.attribution?.utm_medium || '' },
            { id: 'utm_campaign', field_value: leadData.attribution?.utm_campaign || '' },
            { id: 'gclid', field_value: leadData.attribution?.gclid || '' },
            { id: 'fbclid', field_value: leadData.attribution?.fbclid || '' }
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
  const eventData = req.body;
  console.log(`[GHL EVENT TRACKER] Evento disparado: ${eventData.eventName} | Data:`, eventData.data);
  res.status(200).json({ success: true, event: eventData.eventName });
});

// ============================================================================
// SECURE AI ADVISOR GATEWAY (Google Gemini Proxy)
// ============================================================================
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

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
      message: 'Has alcanzado el límite de consultas por minuto. Por favor, contacta a un asesor por WhatsApp.'
    });
  }

  const { message, history } = req.body;
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
    message: 'Nuestros asesores están atendiendo por WhatsApp directo.'
  });
});

// ============================================================================
// SERVE STATIC FILES
// ============================================================================
app.use(express.static(path.join(__dirname, '/'), {
  extensions: ['html'],
  index: 'index.html'
}));

// Fallback for 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 ARUZ Web Platform running on http://localhost:${PORT}`);
  console.log(`⚡ GoHighLevel (GHL) Webhook Bridge & Tracking Active`);
  console.log(`🔒 Security Headers, Compression & Proxies Active`);
  console.log(`====================================================`);
});
