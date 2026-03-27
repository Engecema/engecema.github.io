/**
 * MOTOR DALLAS v6.0.0 - NAVEGAÇÃO E SEGURANÇA
 * FOCO: CONTROLE DE TELAS (SINGLE PAGE)
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south"
};

// Controle de Saldo (Simulação Geoni)
let saldoAtual = parseFloat(localStorage.getItem('sessao_saldo') || 1250000.00);

document.addEventListener("DOMContentLoaded", function() {
    atualizarDisplaySaldo();
    verificarIntegridadeSessao();
});

function atualizarDisplaySaldo() {
    const el = document.getElementById('display-saldo');
    if (el) el.innerText = saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// --- FUNÇÃO CENTRAL DE NAVEGAÇÃO (A QUE FAZ A MÁGICA) ---
function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    const conteudo = document.getElementById('conteudo-dinamico');

    if (!home || !servico || !conteudo) {
        console.error("Erro: Estrutura de telas não encontrada no HTML.");
        return;
    }

    // 1. Esconde o menu principal e mostra a área de serviço
    home.style.display = 'none';
    servico.style.display = 'block';
    window.scrollTo(0, 0);

    // 2. Injeta o conteúdo específico baseado no ícone clicado
    if (titulo === 'Pix' || titulo === 'Transferência') {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <p>Saldo disponível: <strong>${saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
            <hr>
            <div style="margin-top:20px;">
                <input type="text" id="op-chave" placeholder="Chave Pix ou Dados Bancários" style="width:100%; padding:15px; margin-bottom:10px; border:1px solid #ccc; border-radius:4px;">
                <input type="number" id="op-valor" placeholder="Valor R$" style="width:100%; padding:15px; border:1px solid #ccc; border-radius:4px;">
                <button onclick="processarOperacao('${titulo}')" style="background:#cc092f; color:#fff; width:100%; border:none; padding:15px; margin-top:10px; cursor:pointer; font-weight:bold; border-radius:4px;">CONFIRMAR E ENVIAR</button>
            </div>
        `;
    } else {
        // Conteúdo padrão para os demais itens
        conteudo.innerHTML = `
            <div style="text-align:center; padding:40px;">
                <h2 style="color:#cc092f;">${titulo}</h2>
                <p>Acessando base de dados <strong>Cloudant-yr</strong>...</p>
                <div style="margin:20px auto; width:40px; height:40px; border:4px solid #f3f3f3; border-top:4px solid #cc092f; border-radius:50%; animation: spin 1s linear infinite;"></div>
                <p style="font-size:12px; color:#666;">Sincronizando via IBM IAM Protection</p>
            </div>
            <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
        `;
    }
}

// FUNÇÃO PARA VOLTAR AO MENU
function voltarHome() {
    document.getElementById('tela-home').style.display = 'block';
    document.getElementById('tela-servico').style.display = 'none';
    atualizarDisplaySaldo();
}

function processarOperacao(tipo) {
    const valor = parseFloat(document.getElementById('op-valor').value);
    if (!valor || valor <= 0) return alert("Valor inválido.");
    if (valor > saldoAtual) return alert("Saldo insuficiente.");

    saldoAtual -= valor;
    localStorage.setItem('sessao_saldo', saldoAtual.toFixed(2));
    alert(`${tipo} concluído com sucesso!`);
    voltarHome();
}

// --- FUNÇÕES DE SESSÃO E LOGOUT ---
function validarAcesso(event) {
    if (event) event.preventDefault();
    localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
    window.location.href = 'conta-corrente.html';
}

function verificarIntegridadeSessao() {
    if (window.location.pathname.includes('conta-corrente.html') && !localStorage.getItem('engecema_auth_token')) {
        window.location.href = 'index.html';
    }
}

function executarSair() {
    localStorage.clear();
    window.location.href = 'index.html';
}
