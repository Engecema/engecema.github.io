/**
 * MOTOR DALLAS v7.7.0 - RECONSTRUÇÃO LIMPA
 * BASE: INDEX.HTML / CONTA-CORRENTE.HTML (GEONI C. MATOS)
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d"
};

// 1. SALDO ÚNICO E FIXO CONFORME APROVADO
const SALDO_GEONI = 1250000.00;

document.addEventListener("DOMContentLoaded", function() {
    // SÓ ATUA SE O USUÁRIO ESTIVER LOGADO (POSSUIR TOKEN)
    const logado = localStorage.getItem('engecema_auth_token');
    const campoSaldo = document.getElementById('display-saldo');

    // Se encontrar o ID do saldo e estiver logado, injeta o valor
    if (campoSaldo && logado) {
        campoSaldo.innerText = SALDO_GEONI.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        });
    }

    // Se estiver na conta-corrente sem token, volta para o index
    if (window.location.pathname.includes('conta-corrente.html') && !logado) {
        window.location.href = 'index.html';
    }
});

/**
 * FUNÇÃO DE LOGIN (CHAMADA PELO SEU INDEX.HTML)
 * Resolve o erro do '?' e limpa a entrada
 */
function validarAcesso(dados) {
    // Cria a sessão para liberar o saldo apenas na página interna
    localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
    localStorage.setItem('sessao_user', 'GEONI CESAR DE MATOS');
    
    // Redireciona de forma limpa para a conta corrente
    window.location.replace('conta-corrente.html');
}

/**
 * NAVEGAÇÃO DAS 7 SEÇÕES (openSys)
 * Mapeado para os IDs: tela-home, tela-servico
 */
function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    
    if (!home || !servico) return;

    home.style.display = 'none';
    servico.style.display = 'block';
    window.scrollTo(0, 0);

    // Conteúdo dinâmico para as 47 sub-seções
    servico.innerHTML = `
        <button onclick="voltarHome()" style="margin-bottom:20px; padding:10px; cursor:pointer; font-weight:bold;">← VOLTAR</button>
        <h2 style="color:#cc092f;">${titulo}</h2>
        <div style="padding:25px; background:#fff; border:1px solid #ddd; border-radius:8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <p>Módulo <strong>${titulo}</strong> em comunicação com IBM Cloudant.</p>
            <p style="color:#004481; font-weight:bold;">Saldo Disponível: R$ 1.250.000,00</p>
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
