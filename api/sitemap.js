// Dynamic XML sitemap: static pages + every published blog post from WordPress.
module.exports = async (req, res) => {
  const base = 'https://tkmold.us';
  const urls = [
    { loc: base + '/', pri: '1.0' },
    { loc: base + '/blog', pri: '0.8' }
  ];
  try {
    if (process.env.WP_BASE) {
      const r = await fetch(process.env.WP_BASE + '/posts?per_page=100&_fields=slug,modified&status=publish');
      const posts = await r.json();
      if (Array.isArray(posts)) {
        for (const p of posts) {
          urls.push({ loc: base + '/blog/' + p.slug, pri: '0.7', lastmod: (p.modified || '').split('T')[0] });
        }
      }
    }
  } catch (e) { /* fall back to static urls */ }
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(u => '<url><loc>' + u.loc + '</loc>' + (u.lastmod ? '<lastmod>' + u.lastmod + '</lastmod>' : '') + '<priority>' + u.pri + '</priority></url>').join('\n') +
    '\n</urlset>';
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(xml);
};
