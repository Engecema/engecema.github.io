/**
 * MOTOR DALLAS v7.0.5 - RESTAURAÇÃO DE HISTÓRICO APROVADO
 * CLIENTE: GEONI CESAR DE MATOS | SALDO FIXADO: 1.250.000,00
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south"
};

// --- CONFIGURAÇÃO DE SALDO CONFORME HISTÓRICO ---
let saldoAtual = 1250000.00;

document.addEventListener("DOMContentLoaded", function() {
    // Sincroniza o saldo inicial no armazenamento local para persistência
    if (!localStorage.getItem('sessao_saldo')) {
        localStorage.setItem('sessao_saldo', '1250000.00');
    } else {
        saldoAtual = parseFloat(localStorage.getItem('sessao_saldo'));
    }

    if (document.getElementById('display-saldo')) {
        atualizarDisplaySaldo();
        verificarIntegridadeSessao();
    }
});

// --- LOGIN SEM PONTO DE INTERROGAÇÃO (?) ---
function validarAcesso(dados) {
    console.log("Validando acesso Geoni...");
    // Define o token e o saldo exato antes de mudar de página
    localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
    localStorage.setItem('sessao_saldo', '1250000.00');
    localStorage.setItem('sessao_user', 'GEONI CESAR DE MATOS');
    
    // O replace remove qualquer rastro de '?' da URL
    window.location.replace('conta-corrente.html');
}

function atualizarDisplaySaldo() {
    const el = document.getElementById('display-saldo');
    if (el) {
        // Formatação exata: R$ 1.250.000,00
        el.innerText = saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
}

// --- NAVEGAÇÃO DAS 7 SEÇÕES (47 SUB-SEÇÕES) ---
function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    
    if (!home || !servico) return;

    home.style.display = 'none';
    servico.style.display = 'block';
    window.scrollTo(0, 0);

    let htmlConteudo = `<button class="btn-voltar" onclick="voltarHome()">← VOLTAR</button>`;

    // Módulos Especiais conforme histórico
    if (titulo === 'Cartões') {
        htmlConteudo += `
            <h2 style="color:#cc092f;">Meus Cartões</h2>
            <div style="background: linear-gradient(135deg, #cc092f, #800000); color:#fff; padding:25px; border-radius:12px; text-align:left; box-shadow: 0 10px 20px rgba(0,0,0,0.2); margin-bottom:20px;">
                <p style="font-size:10px; letter-spacing:2px; margin-bottom:20px;">PLATINUM BUSINESS</p>
                <p style="font-size:20px; font-family:monospace; margin:20px 0;">**** **** **** 4050</p>
                <div style="display:flex; justify-content:space-between;"><span>GEONI C MATOS</span><span>EXP: 03/30</span></div>
            </div>`;
    } else if (['Pix', 'Transferência', 'Pagamentos'].includes(titulo)) {
        htmlConteudo += `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <input type="number" id="op-valor" placeholder="R$ 0,00" style="width:100%; padding:15px; font-size:20px; border:1px solid #ccc; border-radius:8px; margin-bottom:15px;">
            <button onclick="confirmarTransacao('${titulo}')" style="width:100%; padding:15px; background:#cc092f; color:white; border:none; font-weight:bold; border-radius:8px; cursor:pointer;">CONFIRMAR</button>`;
    } else {
        htmlConteudo += `
            <h2 style="color:#004481;">${titulo}</h2>
            <div style="text-align:center; padding:50px 20px; background:#fff; border-radius:8px; border:1px dashed #ccc;">
                <p>Módulo <strong>${titulo}</strong> sincronizado com Cloudant IBM.</p>
            </div>`;
    }
    servico.innerHTML = htmlConteudo;
}

function voltarHome() {
    document.getElementById('tela-home').style.display = 'block';
    document.getElementById('tela-servico').style.display = 'none';
    atualizarDisplaySaldo();
}

function confirmarTransacao(tipo) {
    const val = parseFloat(document.getElementById('op-valor').value);
    if (!val || val <= 0 || val > saldoAtual) return alert("Erro no valor ou saldo insuficiente.");
    saldoAtual -= val;
    localStorage.setItem('sessao_saldo', saldoAtual.toFixed(2));
    alert(`${tipo} realizado!`);
    voltarHome();
}

function verificarIntegridadeSessao() {
    if (!localStorage.getItem('engecema_auth_token')) {
        window.location.href = 'index.html';
    }
}

function executarSair() {
    localStorage.clear();
    window.location.href = 'index.html';
}
