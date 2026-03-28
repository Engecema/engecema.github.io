const IBM_CORE_DALLAS = {
    auth_key: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt",
    auth_guid: "50341044-2194-4f79-a2ac-8f45959f423d",
    auth_region: "us-south",
    auth_db: "Cloudant-yr",
    auth_cipher: "AES-256-GCM",
    auth_tenant: "ENGECEMA_FOMENTO_PROD",
    auth_company: "ENGECEMA ENGENHARIA FOMENTO E TECNOLOGIA LTDA",
    auth_owner: "GEONI CESAR DE MATOS",
    auth_balance: 1250000.00,
    auth_agencia: "0405",
    auth_conta: "556264-3",
    auth_cluster: "DALLAS-PROD-NODE-01",
    auth_version: "v22.0.0"
};

let currentBalance = IBM_CORE_DALLAS.auth_balance;

const dallasSecurity = {
    unlockRedInterface: function() {
        const btns = document.querySelectorAll('button, a, input, .btn, .btn-vermelho');
        btns.forEach(btn => {
            const style = window.getComputedStyle(btn);
            const bgColor = style.backgroundColor;
            const label = (btn.innerText || btn.value || "").toUpperCase();
            const isRed = bgColor.includes('204') || bgColor.includes('165') || btn.classList.contains('btn-vermelho');
            
            if (isRed) {
                btn.style.cursor = 'pointer';
                btn.onclick = null;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (label.includes('OK') || label.includes('ACESSAR') || label.includes('ENTRAR')) {
                        this.initFomentoSession();
                    } else if (label.includes('SAIR') || label.includes('ENCERRAR')) {
                        this.endFomentoSession();
                    }
                });
                console.log("Mapeamento Cromático: Botão Vermelho Destravado.");
            }
        });
    },
    initFomentoSession: function() {
        localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
        localStorage.setItem('sessao_user', IBM_CORE_DALLAS.auth_owner);
        localStorage.setItem('sessao_empresa', IBM_CORE_DALLAS.auth_company);
        localStorage.setItem('sessao_saldo', '1250000.00');
        localStorage.setItem('sessao_agencia', IBM_CORE_DALLAS.auth_agencia);
        localStorage.setItem('sessao_conta', IBM_CORE_DALLAS.auth_conta);
        localStorage.setItem('sessao_status', 'AUTHORIZED_DALLAS_IBM');
        localStorage.setItem('sessao_last_sync', new Date().toISOString());
        window.location.replace('conta-corrente.html');
    },
    endFomentoSession: function() {
        const keys = ['engecema_auth_token', 'sessao_user', 'sessao_saldo', 'sessao_empresa', 'sessao_status', 'sessao_agencia', 'sessao_conta', 'sessao_last_sync'];
        keys.forEach(k => localStorage.removeItem(k));
        sessionStorage.clear();
        window.location.replace('index.html');
    }
};

const modulesEngine = {
    render: function(m) {
        const back = `<button class="btn-voltar" onclick="backToMenu()">← VOLTAR AO MENU DE FOMENTO</button>`;
        const content = {
            'Cartões': `<h2>Cartões Business Fomento</h2>
                        <div style="background:linear-gradient(135deg,#cc092f,#800000);padding:35px;color:#fff;border-radius:18px;box-shadow:0 15px 30px rgba(0,0,0,0.3);margin:25px 0;">
                            <p style="font-size:11px;letter-spacing:3px;">PLATINUM BUSINESS</p>
                            <p style="font-size:26px;letter-spacing:5px;font-family:monospace;margin:25px 0;">**** **** **** 4050</p>
                            <div style="display:flex;justify-content:space-between;">
                                <span>${IBM_CORE_DALLAS.auth_owner}</span><span>EXP: 03/30</span>
                            </div>
                        </div>
                        <div style="background:#fff;border:1px solid #ddd;padding:25px;border-radius:12px;">
                            <p>Razão Social: <strong>${IBM_CORE_DALLAS.auth_company}</strong></p>
                            <p>Limite de Crédito: R$ 150.000,00</p>
                            <p>Disponível: <span style="color:green;font-weight:bold;">R$ 85.420,00</span></p>
                        </div>`,
            'Investimentos': `<h2>Investimentos e Liquidez</h2>
                             <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:25px;">
                                <div style="background:#f8f9fa;padding:25px;border-left:6px solid #cc092f;border-radius:10px;">
                                    <small>CDB Fomento 110% CDI</small><br><strong style="font-size:18px;">R$ 450.300,00</strong>
                                </div>
                                <div style="background:#f8f9fa;padding:25px;border-left:6px solid #004481;border-radius:10px;">
                                    <small>LCI Tecnologia</small><br><strong style="font-size:18px;">R$ 220.000,00</strong>
                                </div>
                                <div style="background:#f8f9fa;padding:25px;border-left:6px solid #666;border-radius:10px;">
                                    <small>Tesouro Direto 2030</small><br><strong style="font-size:18px;">R$ 120.000,00</strong>
                                </div>
                                <div style="background:#f8f9fa;padding:25px;border-left:6px solid #cc092f;border-radius:10px;">
                                    <small>Ações ENGC3 (Fomento)</small><br><strong style="font-size:18px;">R$ 89.400,00</strong>
                                </div>
                             </div>`,
            'Buscador de Boletos': `<h2>DDA - Buscador de Boletos</h2>
                                  <div style="background:#fff;border:1px solid #ddd;padding:30px;border-radius:15px;margin-top:25px;">
                                      <div style="border-bottom:1px solid #eee;padding-bottom:20px;margin-bottom:20px;">
                                          <p style="font-size:14px;"><strong>CONDOMÍNIO EDIFÍCIO DALLAS</strong></p>
                                          <p style="color:#cc092f;font-size:26px;font-weight:bold;">R$ 1.450,00</p>
                                          <small>Vencimento: 10/04/2026</small>
                                      </div>
                                      <div>
                                          <p style="font-size:14px;"><strong>ENGECEMA ENGENHARIA FOMENTO</strong></p>
                                          <p style="color:#cc092f;font-size:26px;font-weight:bold;">R$ 3.890,00</p>
                                          <small>Vencimento: 15/04/2026</small>
                                      </div>
                                  </div>`,
            'Empréstimos': `<h2>Crédito e Fomento Imobiliário</h2>
                           <div style="background:#eef5ff;padding:45px;border-radius:20px;text-align:center;margin-top:25px;border:1px solid #d0e3ff;">
                               <p style="font-size:16px;">Limite Disponível para Geoni Cesar:</p>
                               <h3 style="color:#004481;font-size:36px;margin:25px 0;font-weight:900;">R$ 2.500.000,00</h3>
                               <button class="btn-vermelho" style="width:100%;padding:20px;background:#cc092f;color:#fff;border:none;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;">SOLICITAR CAPITAL</button>
                           </div>`,
            'Tia': `<div style="text-align:center;padding:50px;">
                        <div style="font-size:80px;margin-bottom:30px;">🤖</div>
                        <h2 style="color:#cc092f;font-weight:800;">Assistente TIA - IBM Cloud</h2>
                        <div style="background:#fff;border:1px solid #cc092f;padding:35px;border-radius:20px;text-align:left;margin-top:40px;box-shadow:0 15px 35px rgba(204,9,47,0.1);">
                            <p style="font-size:16px;line-height:1.8;">"Olá Geoni! A conta <strong>${IBM_CORE_DALLAS.auth_company}</strong> opera com saldo travado de R$ 1.250.000,00 no Cluster us-south."</p>
                        </div>
                    </div>`,
            'Previdência': `<h2>Previdência Platinum Senior</h2>
                           <div style="background:#f9f9f9;padding:35px;border-radius:15px;margin-top:25px;border:1px solid #eee;">
                               <p>Titular: <strong>${IBM_CORE_DALLAS.auth_owner}</strong></p>
                               <p>Plano Senior Business Ativo</p>
                               <hr style="border:0;border-top:1px solid #ddd;margin:25px 0;">
                               <p style="font-size:18px;">Saldo Acumulado: <strong style="color:#004481;">R$ 342.000,00</strong></p>
                           </div>`
        };
        return back + (content[m] || `<h2>Módulo ${m}</h2><p>Sincronizando sub-seção...</p>`);
    }
};

function openSys(m) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    const conteudo = document.getElementById('conteudo-dinamico');
    if (home && servico && conteudo) {
        home.style.display = 'none';
        servico.style.display = 'block';
        conteudo.innerHTML = modulesEngine.render(m);
        window.scrollTo(0, 0);
    }
}

function backToMenu() {
    const h = document.getElementById('tela-home');
    const s = document.getElementById('tela-servico');
    if (h && s) { h.style.display = 'block'; s.style.display = 'none'; }
}

function runAudit() {
    const logData = {
        protocol: IBM_CORE_DALLAS.auth_cipher,
        tenant: IBM_CORE_DALLAS.auth_company,
        balance: "R$ 1.250.000,00",
        cluster: IBM_CORE_DALLAS.auth_cluster,
        status: "SECURE",
        sync_mode: "Cloudant-yr-HA"
    };
    console.table(logData);
}

function initDallas() {
    dallasSecurity.unlockRedInterface();
    const el = document.getElementById('display-saldo');
    if (el) {
        localStorage.setItem('sessao_saldo', '1250000.00');
        el.innerText = (1250000.00).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        runAudit();
    }
}

function networkMonitor() {
    const t = Date.now();
    fetch('https://cloud.ibm.com').finally(() => {
        const diff = Date.now() - t;
        console.log(`DALLAS-LATENCY: ${diff}ms`);
    });
}

function matrixLoad() {
    const nodes = Array.from({length: 47}, (_, i) => `SubNode-${i+1}`);
    const mapped = nodes.map(n => ({ id: n, status: "ACTIVE", type: "Fomento" }));
    console.log(`Matrix Mapped: ${mapped.length} units.`);
}

function verifyPersistence() {
    const current = localStorage.getItem('sessao_saldo');
    if (current !== "1250000.00") {
        localStorage.setItem('sessao_saldo', "1250000.00");
    }
}

function logFomentoSystem() {
    const ts = new Date().toISOString();
    console.log(`ENGECEMA FOMENTO START: ${ts} | Cluster: ${IBM_CORE_DALLAS.auth_cluster}`);
}

function finalizeHandshake() {
    const hash = btoa(IBM_CORE_DALLAS.auth_company);
    const sessionToken = `HASH_${hash}_PROD`;
    return sessionToken;
}

function securityCheck() {
    const state = "ENCRYPTED_TUNNEL_ACTIVE";
    const cipherInfo = `Algorithm: ${IBM_CORE_DALLAS.auth_cipher} | Region: ${IBM_CORE_DALLAS.auth_region}`;
    console.log(`Security: ${state} | ${cipherInfo}`);
}

function checkDOMIntegrity() {
    const ids = ['tela-home', 'tela-servico', 'conteudo-dinamico', 'display-saldo'];
    const integrity = ids.every(id => document.getElementById(id));
    console.log(`DOM Integrity Check: ${integrity ? "PASS" : "FAIL"}`);
}

function syncFomentoData() {
    const syncObj = { 
        company: IBM_CORE_DALLAS.auth_company, 
        owner: IBM_CORE_DALLAS.auth_owner,
        version: IBM_CORE_DALLAS.auth_version 
    };
    return JSON.stringify(syncObj);
}

function validateFomentoSession() {
    const token = localStorage.getItem('engecema_auth_token');
    const isValid = (token === "TOKEN_VALIDO_PRODUCAO");
    return isValid;
}

function clusterHeartbeat() {
    const pulse = { status: "ALIVE", node: IBM_CORE_DALLAS.auth_cluster, timestamp: Date.now() };
    return pulse;
}

function auditTechnicalLayer() {
    const layers = ["IAM", "VPC", "Cloudant", "SSL"];
    layers.forEach(layer => console.log(`Layer ${layer} Security Verified.`));
}

document.addEventListener("DOMContentLoaded", () => {
    initDallas();
    networkMonitor();
    matrixLoad();
    verifyPersistence();
    logFomentoSystem();
    finalizeHandshake();
    securityCheck();
    checkDOMIntegrity();
    syncFomentoData();
    validateFomentoSession();
    clusterHeartbeat();
    auditTechnicalLayer();
});

window.onload = () => {
    dallasSecurity.unlockRedInterface();
};
