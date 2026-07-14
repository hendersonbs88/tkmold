// WordPress REST proxy for the TK blog.
// Forwards /api/wp?path=posts&<params> to the TK WordPress REST API, keeping
// the upstream host/credentials server side. Mirrors the moldminds.com setup.
//
// Env:
//   WP_BASE         full REST base, e.g. https://xxxx.hostingersite.com/wp-json/wp/v2
//   WP_HOST_HEADER  (optional) Host header to force when WP_BASE points at a bare IP
//   WP_INSECURE     (optional) "1" to skip TLS verification (IP + SNI host pattern)

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const base = process.env.WP_BASE;
  if (!base) return res.status(503).json({ error: 'blog_not_configured' });

  const q = req.query || {};
  const sub = String(q.path || 'posts').replace(/^\/+|\.\./g, '');
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(q)) {
    if (k === 'path') continue;
    (Array.isArray(v) ? v : [v]).forEach((val) => params.append(k, val));
  }
  const target = base.replace(/\/+$/, '') + '/' + sub + (params.toString() ? '?' + params.toString() : '');

  try {
    let body, status, ctype;
    if (process.env.WP_HOST_HEADER || process.env.WP_INSECURE === '1') {
      // IP + forced Host + relaxed TLS (Hostinger shared host pattern)
      const https = await import('node:https');
      const { URL } = await import('node:url');
      const u = new URL(target);
      const agent = new https.Agent({ rejectUnauthorized: false, servername: process.env.WP_HOST_HEADER || u.hostname });
      const r = await new Promise((resolve, reject) => {
        const rq = https.request({
          hostname: u.hostname, port: 443, path: u.pathname + u.search, method: 'GET', agent,
          headers: { Host: process.env.WP_HOST_HEADER || u.hostname, 'User-Agent': 'tkmold-blog' }
        }, (resp) => {
          const chunks = [];
          resp.on('data', (c) => chunks.push(c));
          resp.on('end', () => resolve({ status: resp.statusCode, ctype: resp.headers['content-type'], buf: Buffer.concat(chunks) }));
        });
        rq.on('error', reject); rq.end();
      });
      status = r.status; ctype = r.ctype; body = r.buf.toString('utf8');
    } else {
      const r = await fetch(target, { headers: { 'User-Agent': 'tkmold-blog' } });
      status = r.status; ctype = r.headers.get('content-type'); body = await r.text();
    }
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.setHeader('Content-Type', ctype && ctype.includes('json') ? 'application/json' : 'application/json');
    return res.status(status).send(body);
  } catch (e) {
    return res.status(502).json({ error: 'upstream_failed', detail: String((e && e.message) || e) });
  }
};
