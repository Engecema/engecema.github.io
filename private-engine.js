/**
 * MOTOR DALLAS v6.5.0 - VISUAL DETALHADO (GEONI C. MATOS)
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south"
};

let saldoAtual = parseFloat(localStorage.getItem('sessao_saldo') || 1250000.00);

document.addEventListener("DOMContentLoaded", function() {
    atualizarDisplaySaldo();
    verificarIntegridadeSessao();
});

function atualizarDisplaySaldo() {
    const el = document.getElementById('display-saldo');
    if (el) el.innerText = saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    const conteudo = document.getElementById('conteudo-dinamico');

    if (!home || !servico || !conteudo) return;

    home.style.display = 'none';
    servico.style.display = 'block';
    window.scrollTo(0, 0);

    // --- 1. MÓDULO DE TRANSAÇÕES (PIX, PAGAMENTOS, ETC) ---
    if (['Pix', 'Transferência', 'Pagamentos', 'Saque', 'Recarga'].includes(titulo)) {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <p>Saldo: <strong>${saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
            <input type="text" id="op-chave" placeholder="Chave ou Dados" style="width:100%; padding:15px; margin:10px 0; border:1px solid #ddd; border-radius:4px;">
            <input type="number" id="op-valor" placeholder="Valor R$" style="width:100%; padding:15px; border:1px solid #ddd; border-radius:4px;">
            <button onclick="processarOperacao('${titulo}')" style="background:#cc092f; color:#fff; width:100%; border:none; padding:15px; font-weight:bold; cursor:pointer; border-radius:4px;">CONFIRMAR</button>
        `;
    } 
    // --- 2. MÓDULO DE CARTÕES (VISUAL ESTILIZADO) ---
    else if (titulo === 'Cartões') {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">Meus Cartões</h2>
            <div style="background: linear-gradient(135deg, #cc092f, #800000); color:#fff; padding:25px; border-radius:12px; text-align:left; position:relative; overflow:hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                <div style="position:absolute; right:-20px; top:-20px; width:100px; height:100px; background:rgba(255,255,255,0.1); border-radius:50%;"></div>
                <p style="font-size:10px; letter-spacing:2px; margin-bottom:20px;">PLATINUM BUSINESS</p>
                <p style="font-size:20px; font-family:monospace; margin:20px 0;">**** **** **** 4050</p>
                <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <span>GEONI C MATOS</span>
                    <span style="font-size:12px;">EXP: 03/30</span>
                </div>
            </div>
            <div style="margin-top:20px; text-align:left;">
                <p style="font-size:12px; font-weight:bold;">Limite Disponível: <span style="color:green;">R$ 85.000,00</span></p>
                <button onclick="alert('Cartão Bloqueado com Sucesso')" style="width:100%; padding:10px; background:none; border:1px solid #cc092f; color:#cc092f; border-radius:4px; cursor:pointer;">BLOQUEAR CARTÃO</button>
            </div>
        `;
    }
    // --- 3. MÓDULO DE CONSULTAS E EXTRATOS ---
    else if (['Saldo e Extrato', 'Extrato Mensal', 'Comprovantes'].includes(titulo)) {
        conteudo.innerHTML = `
            <h2 style="color:#004481;">${titulo}</h2>
            <div style="background:#fff; border:1px solid #eee; padding:20px; border-radius:8px; text-align:left;">
                <p style="font-size:12px; font-weight:bold;">HISTÓRICO RECENTE</p>
                <hr>
                <div style="display:flex; justify-content:space-between; padding:10px 0;"><span>Saldo Consolidado</span><strong>${saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></div>
                <div style="display:flex; justify-content:space-between; padding:10px 0; color:green;"><span>DEPÓSITO DALLAS</span><strong>+ R$ 1.250.000,00</strong></div>
            </div>
        `;
    }
    // --- 4. TIA E SEGURANÇA ---
    else if (titulo === 'Tia' || titulo === 'Segurança') {
        conteudo.innerHTML = `
            <div style="text-align:center;">
                <i style="font-size:50px;">🤖</i>
                <h2 style="color:#cc092f;">Assistente TIA</h2>
                <p>Olá Geoni! Em que posso ajudar?</p>
                <input type="text" placeholder="Fale com a TIA..." style="width:100%; padding:15px; border:1px solid #ddd; border-radius:4px;">
                <button onclick="alert('TIA: Analisando sua solicitação...')" style="background:#004481; color:#fff; border:none; padding:12px; width:100%; border-radius:4px; margin-top:10px;">ENVIAR</button>
            </div>
        `;
    }
    // --- 5. PADRÃO (OUTROS ITENS) ---
    else {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <div style="background:#f9f9f9; padding:40px; border-radius:8px; border:1px dashed #ccc; text-align:center;">
                <i style="font-size:40px; color:#cc092f; display:block; margin-bottom:10px;">📁</i>
                <p>Módulo <strong>${titulo}</strong> sincronizado.</p>
                <p style="font-size:12px; color:#666;">Nenhuma pendência para o CPF ***.813.383-**</p>
                <button onclick="voltarHome()" style="margin-top:20px; background:none; border:1px solid #cc092f; color:#cc092f; padding:8px 15px; border-radius:4px; cursor:pointer;">FECHAR MÓDULO</button>
            </div>
        `;
    }
}

function voltarHome() { document.getElementById('tela-home').style.display = 'block'; document.getElementById('tela-servico').style.display = 'none'; atualizarDisplaySaldo(); }
function processarOperacao(tipo) {
    const valor = parseFloat(document.getElementById('op-valor').value);
    if (!valor || valor <= 0 || valor > saldoAtual) return alert("Erro no valor.");
    saldoAtual -= valor;
    localStorage.setItem('sessao_saldo', saldoAtual.toFixed(2));
    alert(`${tipo} realizado!`);
    voltarHome();
}
function executarSair() { localStorage.clear(); window.location.href = 'index.html'; }
function verificarIntegridadeSessao() { if (window.location.pathname.includes('conta-corrente.html') && !localStorage.getItem('engecema_auth_token')) window.location.href = 'index.html'; }
function validarAcesso(event) { if (event) event.preventDefault(); localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO'); window.location.href = 'conta-corrente.html'; }
