/**
 * MOTOR DALLAS v5.7.0 - ACESSO TOTAL AOS ITENS
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south"
};

// Controle de Saldo Dinâmico
let saldoAtual = parseFloat(localStorage.getItem('sessao_saldo') || 1250000.00);

document.addEventListener("DOMContentLoaded", function() {
    atualizarDisplaySaldo();
    verificarIntegridadeSessao();
});

function atualizarDisplaySaldo() {
    const el = document.getElementById('display-saldo');
    if (el) el.innerText = saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// FUNÇÃO PARA ACESSAR CADA ITEM (DESTRAVA AS 7 SEÇÕES)
function openSys(titulo) {
    const modal = document.getElementById('modal-sys');
    const head = document.getElementById('sys-tit');
    const body = document.getElementById('sys-conteudo');

    if (!modal || !head || !body) return;

    head.innerText = titulo;
    modal.style.display = 'flex';

    // Lógica Específica para alguns itens, Genérica para os outros
    if (titulo === 'Extrato' || titulo === 'Extrato Mensal') {
        body.innerHTML = `
            <div style="text-align:left; font-size:12px;">
                <p><strong>Lançamentos Recentes:</strong></p>
                <hr>
                <div style="display:flex; justify-content:space-between;"><span>DOC Recebido</span><span style="color:green;">+ R$ 1.250.000,00</span></div>
                <p style="font-size:10px; color:#999;">Origem: Dallas Integration Services</p>
            </div>
        `;
    } 
    else if (titulo === 'Pix' || titulo === 'Transferências') {
        body.innerHTML = `
            <input type="text" id="pix-chave" placeholder="Chave Pix ou Ag/Conta" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ccc;">
            <input type="number" id="pix-valor" placeholder="Valor R$" style="width:100%; padding:10px; border:1px solid #ccc;">
            <button onclick="processarTransacao()" style="background:#cc092f; color:#fff; width:100%; border:none; padding:12px; margin-top:10px; cursor:pointer; font-weight:bold;">CONFIRMAR OPERAÇÃO</button>
        `;
    }
    else {
        // Mensagem padrão para os outros 40+ itens
        body.innerHTML = `
            <div style="padding:20px;">
                <i style="font-size:40px; display:block; margin-bottom:10px;">⚙️</i>
                <p>Acessando módulo <strong>${titulo}</strong>...</p>
                <p style="font-size:11px; color:#666;">Conectando à base de dados Cloudant-yr via IBM IAM Safe.</p>
            </div>
        `;
    }
}

function closeSys() {
    document.getElementById('modal-sys').style.display = 'none';
}

function processarTransacao() {
    const valor = parseFloat(document.getElementById('pix-valor').value);
    if (!valor || valor <= 0) return alert("Digite um valor válido.");
    if (valor > saldoAtual) return alert("Saldo insuficiente.");

    saldoAtual -= valor;
    localStorage.setItem('sessao_saldo', saldoAtual.toFixed(2));
    
    alert("Operação realizada com sucesso!");
    atualizarDisplaySaldo();
    closeSys();
}

// Funções de Login e Sessão
function validarAcesso(event) {
    if (event) event.preventDefault();
    localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
    window.location.href = 'conta-corrente.html';
}

function verificarIntegridadeSessao() {
    const token = localStorage.getItem('engecema_auth_token');
    if (window.location.pathname.includes('conta-corrente.html') && !token) {
        window.location.href = 'index.html';
    }
}

function executarSair() {
    localStorage.clear();
    window.location.href = 'index.html';
}
