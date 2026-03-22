/**
 * ENGECEMA PRIVATE - SERVICE WORKER DALLAS ENGINE
 * STATUS: INJETOR DE SEGURANÇA | VOLUMETRIA: 75 LINHAS
 * FOCO: ADAPTAÇÃO AO INDEX.HTML IMUTÁVEL
 */

const CACHE_NAME = 'engecema-private-v99'; // Versão alterada para forçar o navegador
const ASSETS = ['index.html', 'produção.html', 'private-engine.js', 'logo.png'];

// 1. INSTALAÇÃO: Força o navegador a aceitar a nova versão do motor imediatamente
self.addEventListener('install', (event) => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// 2. ATIVAÇÃO: Deleta caches antigos para evitar conflitos de aba de senha
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 3. INTERCEPTAÇÃO (FETCH): O ENCAIXE NO INDEX IMUTÁVEL
// Este bloco injeta o motor de senha no HTML fixo "no ar"
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if (url.pathname.endsWith('index.html') || url.pathname === '/' || url.pathname.endsWith('admin.html')) {
        event.respondWith(
            fetch(event.request).then(async (response) => {
                let html = await response.text();
                
                // Injeção do motor que gera a Aba de Senha e Confirmação
                const engineTag = '<script src="private-engine.js"></script>';
                const novoHtml = html.replace('</body>', engineTag + '</body>');
                
                return new Response(novoHtml, {
                    headers: { 'Content-Type': 'text/html' }
                });
            }).catch(() => caches.match(event.request))
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});

/* FIM DA ESTRUTURA DE 75 LINHAS - ENGECEMA DALLAS */
