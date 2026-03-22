/* SW.JS - MOTOR DE INJEÇÃO ENGECEMA PRIVATE */
const CACHE_NAME = 'engecema-v250';
const ASSETS = ['index.html', 'cadastro.html', 'produção.html', 'private-engine.js', 'logo.png'];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((ks) => Promise.all(
        ks.map((k) => { if (k !== CACHE_NAME) return caches.delete(k); })
    )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    // Injeta o private-engine.js em todos os arquivos HTML imutáveis
    if (url.pathname.endsWith('.html') || url.pathname === '/') {
        event.respondWith(
            fetch(event.request).then(async (res) => {
                let html = await res.text();
                const scriptTag = '<script src="private-engine.js"></script>';
                return new Response(html.replace('</body>', scriptTag + '</body>'), {
                    headers: { 'Content-Type': 'text/html' }
                });
            })
        );
    } else {
        event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    }
});
