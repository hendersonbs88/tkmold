// RFQ handler: emails the quote request to brandon@tkmold.com via TK Exchange SMTP,
// with a Telegram notification as a backup so a lead is never lost.
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' });

  try {
    const b = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {}));
    if (b._honey) return res.status(200).json({ ok: true }); // silently drop bots

    const fields = [
      ['Name', b.name], ['Company', b.company], ['Email', b.email], ['Phone', b.phone],
      ['Project', b.project], ['Annual volume', b.annual_volume], ['Material', b.material],
      ['Details', b.message]
    ].filter(function (r) { return r[1]; });
    const esc = function (v) { return String(v).replace(/</g, '&lt;'); };
    const text = fields.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n');
    const html = '<h2>New mold quote request from tkmold.us</h2><table cellpadding="6">' +
      fields.map(function (r) { return '<tr><td style="font-weight:bold">' + r[0] + '</td><td>' + esc(r[1]) + '</td></tr>'; }).join('') +
      '</table>';

    let emailed = false, tg = false, emailErr = null;

    // 1) Email via TK Exchange SMTP (legacy TLS, forced low security level)
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        requireTLS: true,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        tls: { minVersion: 'TLSv1', rejectUnauthorized: false, ciphers: 'DEFAULT@SECLEVEL=0' }
      });
      await transporter.sendMail({
        from: '"TK Mold USA RFQ" <' + process.env.SMTP_USER + '>',
        to: process.env.RFQ_TO || process.env.SMTP_USER,
        replyTo: b.email || undefined,
        subject: 'New mold quote request' + (b.company ? ': ' + b.company : ''),
        text: text,
        html: html
      });
      emailed = true;
    } catch (e) { emailErr = String((e && e.message) || e); }

    // 2) Telegram backup
    try {
      if (process.env.TG_BOT_TOKEN && process.env.TG_CHAT_ID) {
        const r = await fetch('https://api.telegram.org/bot' + process.env.TG_BOT_TOKEN + '/sendMessage', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: process.env.TG_CHAT_ID, text: '🟠 New RFQ from tkmold.us\n\n' + text })
        });
        tg = r.ok;
      }
    } catch (e) { /* ignore */ }

    if (emailed || tg) return res.status(200).json({ ok: true, emailed: emailed, tg: tg });
    return res.status(502).json({ ok: false, error: emailErr || 'delivery failed' });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String((e && e.message) || e) });
  }
};
