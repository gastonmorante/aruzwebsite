module.exports = (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'ARUZ Web Ecosystem (Vercel Edge & Serverless Ready)',
    uptime: process.uptime()
  });
};
