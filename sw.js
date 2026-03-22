/* ENGINE DE INTERCEPTAÇÃO ENGECEMA PRIVATE - DALLAS */
const CACHE_NAME = 'engecema-v3';

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([
      'produtos.html',
      'logo.png',
      'private-engine.js'
    ]))
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // REDIRECIONAMENTO DE SEGURANÇA:
  // Se o navegador pedir 'admin.html', o Service Worker entrega 'produtos.html'
  if (url.pathname.endsWith('admin.html')) {
    event.respondWith(
      caches.match('produtos.html').then((response) => {
        return response || fetch('produtos.html');
      })
    );
  } else {
    // Segue o fluxo normal para os demais arquivos
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});
