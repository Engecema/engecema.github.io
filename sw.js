/**
 * MOTOR DE INJEÇÃO ENGECEMA PRIVATE - DALLAS ENGINE
 * STATUS: PORTEIRO DE ENTRADA ATIVO | VOLUMETRIA: 75 LINHAS
 */
const CACHE_NAME = 'engecema-v100'; // Versão alterada para forçar o navegador
const ASSETS = ['index.html', 'produção.html', 'private-engine.js', 'logo.png'];

self.addEventListener('install', (e) => {
    self.skipWaiting(); // Força a atualização para a nova versão com aba de senha
    e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((ks) => Promise.all(
        ks.map((k) => { if (k !== CACHE_NAME) return caches.delete(k); })
    )).then(() => self.clients.claim()));
});

// A MÁGICA: Injeta o código da aba no INDEX imutável no ato do carregamento
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.pathname.endsWith('index.html') || url.pathname === '/' || url.pathname.endsWith('admin.html')) {
        event.respondWith(
            fetch(event.request).then(async (res) => {
                let html = await res.text();
                
                // CÓDIGO DAS DUAS ABAS QUE SERÁ INJETADO NO HTML IMUTÁVEL
                const injecaoSeguranca = `
                <script>
                (function() {
                    const style = document.createElement('style');
                    style.innerHTML = '#aba-seg { position:fixed!important; top:0!important; right:0!important; width:400px!important; height:100vh!important; background:#111!important; z-index:9999999!important; border-left:2px solid #c5a059!important; padding:60px 40px!important; box-shadow:-25px 0 70px #000!important; color:#fff!important; font-family:Arial!important; display:flex!important; flex-direction:column!important; } .in-p { width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:32px; text-align:center; letter-spacing:12px; margin:30px 0; outline:none; } .bt-p { width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; text-transform:uppercase; cursor:pointer; }';
                    document.head.appendChild(style);
                    
                    const aba = document.createElement('div');
                    aba.id = 'aba-seg';
                    let s1 = "";
                    
                    const render = (tit, sub, btn) => {
                        aba.innerHTML = '<img src="logo.png" style="height:30px;margin-bottom:25px;"><h2 style="color:#c5a059;font-size:16px;">'+tit+'</h2><p style="color:#666;font-size:12px;">'+sub+'</p><input type="password" id="p-p" class="in-p" maxlength="4" placeholder="••••"><button class="bt-p" id="b-p">'+btn+'</button>';
                        document.body.appendChild(aba);
                        document.getElementById('b-p').onclick = () => {
                            const val = document.getElementById('p-p').value;
                            if(val.length === 4) {
                                if(s1 === "") { s1 = val; render("CONFIRMAR SENHA", "Repita para validar.", "CONFIRMAR"); }
                                else if(val === s1) { aba.style.display="none"; }
                                else { alert("Erro!"); location.reload(); }
                            }
                        };
                    };
                    render("SENHA DE ACESSO", "Informe sua senha de 4 dígitos.", "AVANÇAR");
                })();
                </script>`;
                
                return new Response(html.replace('</body>', injecaoSeguranca + '</body>'), {
                    headers: { 'Content-Type': 'text/html' }
                });
            })
        );
    } else {
        event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    }
});
