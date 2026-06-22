const http = require('http');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const appRoot = path.join(root, '.next', 'server', 'app');
const staticRoot = path.join(root, '.next', 'static');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function send(res, file) {
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    res.writeHead(200, {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
    });
    res.end(data);
  });
}

function pageFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]).replace(/\/+$/, '') || '/';
  if (clean === '/') return path.join(appRoot, 'index.html');

  const direct = path.join(appRoot, `${clean.slice(1)}.html`);
  if (fs.existsSync(direct)) return direct;

  if (clean.startsWith('/destination/')) {
    return path.join(appRoot, 'destination', `${clean.split('/').pop()}.html`);
  }

  return path.join(appRoot, '_not-found.html');
}

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);

    if (urlPath === '/_next/image') {
      const imageUrl = new URL(req.url, 'http://localhost:3000').searchParams.get('url');
      if (imageUrl) {
        res.writeHead(302, { Location: imageUrl });
        res.end();
        return;
      }
    }

    if (urlPath.startsWith('/_next/static/')) {
      send(res, path.join(staticRoot, urlPath.replace('/_next/static/', '')));
      return;
    }

    send(res, pageFile(req.url));
  })
  .listen(3000, () => {
    console.log('Cached HiddenExplorerGuide site running at http://localhost:3000');
  });
