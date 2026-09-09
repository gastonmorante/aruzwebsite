module.exports = (req, res) => {
  const eventData = req.body;
  res.status(200).json({ success: true, event: eventData?.eventName || 'custom_event' });
};
