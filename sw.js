/* 
 * MOTOR DE REDIRECIONAMENTO ENGECEMA PRIVATE
 * OBJETIVO: DESVIAR O FLUXO DO ADMIN.HTML PARA O PRODUTOS.HTML (ONDE ESTÁ A SENHA)
 */

const CACHE_NAME = 'engecema-v6';

self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // INTERCEPTAÇÃO: Se o botão OK do index chamar 'admin.html',
    // o Service Worker "engana" o navegador e entrega o 'produtos.html'.
    if (url.pathname.endsWith('admin.html')) {
        event.respondWith(
            fetch('produtos.html') // Entrega o arquivo que você validou manualmente
        );
    } else {
        // Segue o fluxo normal para os demais arquivos
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
    }
});
