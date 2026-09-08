/**
 * Next.js / Serverless API Route for GoHighLevel Webhook Bridge
 * Endpoint: /api/ghl-webhook
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const leadData = req.body;
  if (!leadData || !leadData.name || !leadData.phone || !leadData.email) {
    return res.status(400).json({ success: false, error: 'Missing required lead fields (name, phone, email).' });
  }

  const GHL_API_KEY = process.env.GHL_API_KEY;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
  const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;

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
          firstName: leadData.name.split(' ')[0],
          lastName: leadData.name.split(' ').slice(1).join(' ') || '',
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          tags: ['Web Lead', 'ARUZ Website', leadData.interest || 'General'],
          customFields: [
            { id: 'interes_inmobiliario', field_value: leadData.interest || '' },
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

  // 2. Inbound Webhook Dispatch
  if (GHL_WEBHOOK_URL) {
    try {
      const webhookRes = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      ghlSuccess = ghlSuccess || webhookRes.ok;
    } catch (err) {
      console.error('[GHL Webhook Error]:', err.message);
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Lead processed successfully.',
    ghl_synced: ghlSuccess
  });
}
