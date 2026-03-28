/**
 * MOTOR DALLAS v7.5.0 - LIMPEZA TOTAL (SEM SUJEIRA)
 * FOCO: GEONI C. MATOS | SALDO FIXO: 1.250.000,00
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d"
};

// 1. O SALDO É DEFINIDO APENAS AQUI
const VALOR_SALDO = 1250000.00;

document.addEventListener("DOMContentLoaded", function() {
    // SÓ ATUA SE ENCONTRAR O ID 'display-saldo' (Que deve estar apenas na conta-corrente)
    const campoSaldo = document.getElementById('display-saldo');
    
    if (campoSaldo) {
        // Injeta o valor formatado diretamente
        campoSaldo.innerText = VALOR_SALDO.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        // Proteção de sessão: Se não houver token, volta pro login
        if (!localStorage.getItem('engecema_auth_token')) {
            window.location.href = 'index.html';
        }
    }
});

// 2. LOGIN LIMPO (RESOLVE O PONTO DE INTERROGAÇÃO)
function validarAcesso(dados) {
    // Grava a permissão
    localStorage.setItem('engecema_auth_token', 'ACESSO_GEONI_OK');
    
    // Redireciona de forma absoluta para a conta
    window.location.replace('conta-corrente.html');
}

// 3. NAVEGAÇÃO DAS 7 SEÇÕES
function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    
    if (!home || !servico) return;

    home.style.display = 'none';
    servico.style.display = 'block';

    // Conteúdo simplificado para as sub-seções
    servico.innerHTML = `
        <button onclick="voltarHome()" style="margin-bottom:20px; padding:10px; cursor:pointer;">← VOLTAR</button>
        <h2 style="color:#cc092f;">${titulo}</h2>
        <div style="padding:20px; background:#fff; border:1px solid #ddd; border-radius:8px;">
            <p>Sincronizando módulo <strong>${titulo}</strong> com IBM Cloud...</p>
            <p>Saldo: <strong>R$ 1.250.000,00</strong></p>
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
