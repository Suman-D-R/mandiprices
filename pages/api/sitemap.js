import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const sitemap = readFileSync(
    join(process.cwd(), 'public', 'sitemap.xml'),
    'utf8'
  );
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}
