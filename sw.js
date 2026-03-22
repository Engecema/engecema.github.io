/* SW.JS - SEQUESTRO DE ROTA PARA FORÇAR ABA DE SENHA */
const CACHE_NAME = 'engecema-private-v500';

self.addEventListener('install', (e) => {
    self.skipWaiting(); 
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Se o clique no OK pedir 'admin.html', entregamos o 'produção.html' 
    // onde a sua aba de senha já funciona manualmente.
    if (url.pathname.endsWith('admin.html')) {
        event.respondWith(
            fetch('produção.html').then(response => {
                return response;
            })
        );
    } else {
        event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    }
});
