/**
 * MOTOR DALLAS v7.0.0 - VERSÃO FINAL APROVADA
 * CLIENTE: GEONI CESAR DE MATOS | SALDO: 1.250.000,00
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south"
};

// --- CONFIGURAÇÃO DO SALDO APROVADO ONTEM ---
let saldoAtual = parseFloat(localStorage.getItem('sessao_saldo') || 1250000.00);

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('display-saldo')) {
        atualizarDisplaySaldo();
        verificarIntegridadeSessao();
    }
});

// --- FUNÇÃO DE LOGIN (RESOLVE O PROBLEMA DO '?') ---
function validarAcesso(dados) {
    if (dados.ag && dados.ct) {
        // Define os dados da sessão aprovada
        localStorage.setItem('engecema_auth_token', 'TOKEN_PRODUCAO_DALLAS');
        localStorage.setItem('sessao_saldo', '1250000.00');
        localStorage.setItem('sessao_user', 'GEONI CESAR DE MATOS');
        
        // Redirecionamento limpo para evitar o ponto de interrogação
        window.location.replace('conta-corrente.html');
    }
}

function atualizarDisplaySaldo() {
    const el = document.getElementById('display-saldo');
    if (el) {
        el.innerText = saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
}

// --- MOTOR DE NAVEGAÇÃO (7 SEÇÕES E 47 SUB-SEÇÕES) ---
function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    const conteudo = document.getElementById('conteudo-dinamico') || servico;

    if (!home || !servico) return;

    home.style.display = 'none';
    servico.style.display = 'block';
    window.scrollTo(0, 0);

    let htmlConteudo = `<button onclick="voltarHome()" style="background:#666; color:#fff; border:none; padding:10px 20px; border-radius:4px; cursor:pointer; margin-bottom:20px; font-weight:bold;">← VOLTAR</button>`;

    if (titulo === 'Cartões') {
        htmlConteudo += renderizarCartao();
    } else if (titulo === 'Buscador de Boletos') {
        htmlConteudo += renderizarDDA();
    } else if (['Pix', 'Transferência', 'Pagamentos', 'Saque'].includes(titulo)) {
        htmlConteudo += renderizarTransacao(titulo);
    } else {
        htmlConteudo += `
            <h2 style="color:#004481;">${titulo}</h2>
            <div style="text-align:center; padding:50px 20px; background:#fff; border-radius:8px; border:1px dashed #ccc;">
                <span style="font-size:50px;">☁️</span>
                <p>Módulo <strong>${titulo}</strong> sincronizado com Cloudant IBM.</p>
                <small style="color:#999;">Acesso autorizado para Geoni C. Matos.</small>
            </div>`;
    }
    servico.innerHTML = htmlConteudo;
}

function renderizarCartao() {
    return `
        <h2 style="color:#cc092f;">Meus Cartões</h2>
        <div style="background: linear-gradient(135deg, #cc092f, #800000); color:#fff; padding:25px; border-radius:12px; text-align:left; box-shadow: 0 10px 20px rgba(0,0,0,0.2); margin-bottom:20px;">
            <p style="font-size:10px; letter-spacing:2px; margin-bottom:20px;">PLATINUM BUSINESS</p>
            <p style="font-size:20px; font-family:monospace; margin:20px 0;">**** **** **** 4050</p>
            <div style="display:flex; justify-content:space-between;"><span>GEONI C MATOS</span><span>EXP: 03/30</span></div>
        </div>
        <div style="background:#fff; padding:15px; border-radius:8px; border:1px solid #eee;">
            <p><strong>Limite Disponível:</strong> <span style="color:green;">R$ 85.420,00</span></p>
            <button onclick="alert('Bloqueio ativo')" style="width:100%; padding:10px; border:1px solid #cc092f; color:#cc092f; background:none; font-weight:bold; cursor:pointer;">BLOQUEAR CARTÃO</button>
        </div>`;
}

function renderizarDDA() {
    return `
        <h2 style="color:#004481;">DDA - Buscador de Boletos</h2>
        <div style="background:#fff; border-radius:8px; padding:15px; border:1px solid #ddd;">
            <div style="border-bottom:1px solid #eee; padding:10px 0; display:flex; justify-content:space-between;">
                <div><strong>CONDOMINIO DALLAS</strong><br><small>Venc. 10/04</small></div>
                <div style="color:#cc092f; font-weight:bold;">R$ 1.450,00</div>
            </div>
        </div>`;
}

function renderizarTransacao(tipo) {
    return `
        <h2 style="color:#cc092f;">${tipo}</h2>
        <input type="number" id="op-valor" placeholder="Valor R$" style="width:100%; padding:15px; font-size:20px; border:1px solid #ccc; border-radius:8px; margin-bottom:15px; box-sizing:border-box;">
        <button onclick="confirmarTransacao('${tipo}')" style="width:100%; padding:15px; background:#cc092f; color:white; border:none; font-weight:bold; border-radius:8px; cursor:pointer;">CONFIRMAR OPERAÇÃO</button>`;
}

function voltarHome() {
    document.getElementById('tela-home').style.display = 'block';
    document.getElementById('tela-servico').style.display = 'none';
    atualizarDisplaySaldo();
}

function confirmarTransacao(tipo) {
    const val = parseFloat(document.getElementById('op-valor').value);
    if (!val || val <= 0 || val > saldoAtual) return alert("Valor inválido ou saldo insuficiente.");
    saldoAtual -= val;
    localStorage.setItem('sessao_saldo', saldoAtual.toFixed(2));
    alert(`${tipo} realizado com sucesso!`);
    voltarHome();
}

function executarSair() {
    localStorage.clear();
    window.location.href = 'index.html';
}

function verificarIntegridadeSessao() {
    if (!localStorage.getItem('engecema_auth_token')) {
        window.location.href = 'index.html';
    }
}
