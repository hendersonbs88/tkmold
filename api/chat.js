// Chat widget relay: forwards a visitor message to Brandon's Telegram bot.
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' });

  try {
    const b = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {}));
    if (b._honey) return res.status(200).json({ ok: true });
    if (!process.env.TG_BOT_TOKEN || !process.env.TG_CHAT_ID) {
      return res.status(500).json({ ok: false, error: 'telegram not configured' });
    }
    const parts = ['💬 New chat message from tkmold.us', '', (b.message || '(empty)')];
    if (b.email) parts.push('', 'Reply to: ' + b.email);
    if (b.page) parts.push('', 'Page: ' + b.page);
    const r = await fetch('https://api.telegram.org/bot' + process.env.TG_BOT_TOKEN + '/sendMessage', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: process.env.TG_CHAT_ID, text: parts.join('\n') })
    });
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String((e && e.message) || e) });
  }
};
