/**
 * MOTOR DALLAS v5.6 - DESTRAVADO
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south"
};

// --- CONTROLE DE SALDO DINÂMICO ---
let saldoAtual = parseFloat(localStorage.getItem('sessao_saldo')?.replace(/\./g, '').replace(',', '.') || 1250000.00);

document.addEventListener("DOMContentLoaded", function() {
    atualizarDisplaySaldo();
    verificarIntegridadeSessao();
});

function atualizarDisplaySaldo() {
    const el = document.getElementById('display-saldo');
    if (el) el.innerText = saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// --- FUNÇÃO PARA ABRIR QUALQUER ÍCONE (DESTRAVADO) ---
function openSys(titulo) {
    const modal = document.getElementById('modal-sys');
    const head = document.getElementById('sys-tit');
    const body = document.getElementById('sys-conteudo');

    head.innerText = titulo;
    modal.style.display = 'flex';

    if (titulo === 'Pix') {
        body.innerHTML = `
            <p style="font-size:12px; color:#666;">Envie dinheiro instantaneamente</p>
            <input type="text" id="pix-chave" placeholder="Chave CPF, E-mail ou Telefone">
            <input type="number" id="pix-valor" placeholder="Valor R$">
            <button class="btn-modal-acao" onclick="processarPix()">CONFIRMAR ENVIO</button>
        `;
    } else {
        body.innerHTML = `<p>A interface de <strong>${titulo}</strong> está sendo sincronizada com o servidor Dallas.</p>`;
    }
}

function closeSys() {
    document.getElementById('modal-sys').style.display = 'none';
}

// --- SIMULAÇÃO DE TRANSAÇÃO PIX ---
function processarPix() {
    const valor = parseFloat(document.getElementById('pix-valor').value);
    if (!valor || valor <= 0) return alert("Insira um valor válido.");
    if (valor > saldoAtual) return alert("Saldo insuficiente para esta transação.");

    saldoAtual -= valor;
    localStorage.setItem('sessao_saldo', saldoAtual.toFixed(2));
    
    alert("Pix enviado com sucesso!");
    atualizarDisplaySaldo();
    closeSys();
}

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
