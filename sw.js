/**
 * SERVIDOR DE LIMPEZA E ROTA - ENGECEMA PRIVATE
 * STATUS: RESET DE CACHE ATIVO | VERSÃO: 300.0.1
 * OBJETIVO: DESTRANCAR O FORMULÁRIO DE CADASTRO
 */

const CACHE_NAME = 'engecema-v300-reset';

// 1. INSTALAÇÃO: Força o Service Worker a assumir o controle na hora
self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log("Terminal Dallas: Iniciando Limpeza de Cache...");
});

// 2. ATIVAÇÃO: Deleta ABSOLUTAMENTE todos os caches antigos do navegador
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    console.log("Removendo Cache Antigo:", cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            console.log("Limpeza Concluída. Reivindicando Clientes...");
            return self.clients.claim();
        })
    );
});

// 3. BUSCA (FETCH): Garante que o navegador busque os arquivos REAIS do GitHub
// Isso impede que a mensagem de "Operação Confirmada" apareça antes do formulário
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});

/* FIM DO CÓDIGO DE LIMPEZA DALLAS */
