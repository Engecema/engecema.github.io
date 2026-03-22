/**
 * ENGECEMA PRIVATE - SERVICE WORKER DALLAS ENGINE
 * STATUS: INJETOR DE SEGURANÇA | VOLUMETRIA: 75 LINHAS
 */
const CACHE_NAME = 'engecema-private-v50'; // Versão alterada para forçar o navegador
const ASSETS = ['index.html', 'produção.html', 'private-engine.js', 'logo.png'];

self.addEventListener('install', (e) => {
    self.skipWaiting(); // Força a ativação imediata da aba de senha
    e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((ks) => Promise.all(
        ks.map((k) => { if (k !== CACHE_NAME) return caches.delete(k); })
    )).then(() => self.clients.claim()));
});

// A PONTE: Injeta o motor no INDEX imutável no ato do carregamento
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.pathname.endsWith('index.html') || url.pathname === '/') {
        event.respondWith(
            fetch(event.request).then(async (res) => {
                let html = await res.text();
                const engine = '<script src="private-engine.js"></script>';
                return new Response(html.replace('</body>', engine + '</body>'), {
                    headers: { 'Content-Type': 'text/html' }
                });
            })
        );
    } else {
        event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    }
});
