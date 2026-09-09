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
          { role: 'user', parts: [{ text: message.trim() }] }
        ],
        systemInstruction: {
          parts: [{
            text: `Eres el Asistente Virtual Inteligente de ARUZ Real Estate & Desarrolladora en la Riviera Maya (Playa del Carmen, Tulum, Akumal, Xpu-Ha).
Tus respuestas deben ser concisas, profesionales, amables y persuasivas, destacando la exclusividad, certeza jurídica y el valor de inversión de Grupo Ruiz México y ARUZ.
Invita a los usuarios a agendar una llamada con un asesor o escribir directamente por WhatsApp al +52 984 130 8260.`
          }]
        },
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7
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
