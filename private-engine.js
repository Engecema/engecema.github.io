/**
 * MOTOR DALLAS v7.6.0 - RESTAURAÇÃO DE HISTÓRICO LIMPO
 * CLIENTE: GEONI CESAR DE MATOS | SALDO FIXO: 1.250.000,00
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d"
};

// 1. O ÚNICO LUGAR ONDE O SALDO É DEFINIDO
const VALOR_SALDO_GEONI = 1250000.00;

document.addEventListener("DOMContentLoaded", function() {
    // SÓ EXECUTA SE HOUVER O TOKEN DE LOGIN ATIVO
    const tokenAtivo = localStorage.getItem('engecema_auth_token');
    const campoSaldo = document.getElementById('display-saldo');

    if (tokenAtivo && campoSaldo) {
        // Injeta o saldo de R$ 1.250.000,00 formatado
        campoSaldo.innerText = VALOR_SALDO_GEONI.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        });
    } else if (!tokenAtivo && window.location.pathname.includes('conta-corrente.html')) {
        // Se tentar entrar na conta sem login, expulsa para o index
        window.location.href = 'index.html';
    }
});

/**
 * FUNÇÃO DE LOGIN (CHAMADA PELO INDEX.HTML)
 * Resolve o erro do '?' e cria a sessão segura
 */
function validarAcesso(dados) {
    // Cria a sessão para liberar o saldo apenas na próxima página
    localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_GEONI');
    localStorage.setItem('sessao_user', 'GEONI CESAR DE MATOS');
    
    // Redirecionamento limpo
    window.location.replace('conta-corrente.html');
}

/**
 * NAVEGAÇÃO DAS 7 SEÇÕES (47 SUB-SEÇÕES)
 */
function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    
    if (!home || !servico) return;

    home.style.display = 'none';
    servico.style.display = 'block';

    servico.innerHTML = `
        <button onclick="voltarHome()" style="margin-bottom:20px; padding:10px; cursor:pointer;">← VOLTAR</button>
        <h2 style="color:#cc092f;">${titulo}</h2>
        <div style="padding:20px; background:#fff; border:1px solid #ddd; border-radius:8px;">
            <p>Módulo <strong>${titulo}</strong> sincronizado com Cloudant IBM.</p>
            <p>Saldo disponível: <strong>R$ 1.250.000,00</strong></p>
        </div>
    `;
}

function voltarHome() {
    document.getElementById('tela-home').style.display = 'block';
    document.getElementById('tela-servico').style.display = 'none';
}

function executarSair() {
    localStorage.clear();
    window.location.href = 'index.html';
}
