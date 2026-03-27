/**
 * MOTOR DALLAS v6.8.0 - BUSCADOR DE BOLETOS (DDA)
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

    // --- LÓGICA ESPECÍFICA PARA BUSCADOR DE BOLETOS ---
    if (titulo === 'Buscador de Boletos') {
        conteudo.innerHTML = `
            <h2 style="color:#004481;">Buscador de Boletos (DDA)</h2>
            <p style="font-size:12px; color:#666;">Boletos emitidos para o CPF: <strong>707.***.383-87</strong></p>
            <div style="background:#fff; border:1px solid #ddd; padding:15px; border-radius:8px; text-align:left; margin-top:15px;">
                <div style="border-bottom:1px solid #eee; padding:10px 0; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <strong style="display:block; font-size:13px;">CONDOMINIO EDIFICIO DALLAS</strong>
                        <span style="font-size:11px; color:#999;">Vencimento: 10/04/2026</span>
                    </div>
                    <div style="text-align:right;">
                        <span style="display:block; font-weight:bold; color:#cc092f;">R$ 1.450,00</span>
                        <button onclick="openSys('Pagamentos')" style="font-size:10px; background:#004481; color:#fff; border:none; padding:4px 8px; border-radius:3px; cursor:pointer;">PAGAR</button>
                    </div>
                </div>
                <div style="padding:10px 0; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <strong style="display:block; font-size:13px;">ENERGIA ELETRICA SP</strong>
                        <span style="font-size:11px; color:#999;">Vencimento: 15/04/2026</span>
                    </div>
                    <div style="text-align:right;">
                        <span style="display:block; font-weight:bold; color:#cc092f;">R$ 380,45</span>
                        <button onclick="openSys('Pagamentos')" style="font-size:10px; background:#004481; color:#fff; border:none; padding:4px 8px; border-radius:3px; cursor:pointer;">PAGAR</button>
                    </div>
                </div>
            </div>
            <p style="font-size:10px; color:#999; margin-top:15px; text-align:center;">Serviço de busca ativa via IBM Cloudant-yr</p>
        `;
    } 
    // --- MANTÉM AGENDAMENTOS SEPARADO ---
    else if (titulo === 'Agendamentos') {
        conteudo.innerHTML = `
            <h2 style="color:#004481;">${titulo}</h2>
            <div style="background:#fff; border:1px solid #ddd; padding:20px; border-radius:8px; text-align:left;">
                <div style="text-align:center; color:#666;">
                    <i style="font-size:30px; display:block;">📅</i>
                    <p>Nenhum agendamento futuro encontrado.</p>
                </div>
                <button onclick="abrirTelaAgendar()" style="width:100%; padding:15px; background:var(--br-red); color:#fff; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">AGENDAR NOVO PAGAMENTO</button>
            </div>
        `;
    }
    // --- LÓGICA PADRÃO PARA OUTROS ITENS ---
    else if (['Pix', 'Transferência', 'Pagamentos'].includes(titulo)) {
        conteudo.innerHTML = `<h2 style="color:#cc092f;">${titulo}</h2><input type="number" id="op-valor" placeholder="Valor R$" style="width:100%; padding:15px; margin:10px 0;"><button onclick="processarOperacao('${titulo}')" style="background:#cc092f; color:#fff; width:100%; border:none; padding:15px; font-weight:bold;">CONFIRMAR</button>`;
    }
    else {
        conteudo.innerHTML = `<h2 style="color:#cc092f;">${titulo}</h2><div style="text-align:center; padding:40px;"><i style="font-size:40px; color:#999; display:block;">📁</i><p>Módulo ${titulo} sincronizado.</p><button onclick="voltarHome()">VOLTAR</button></div>`;
    }
}

// Funções de suporte permanecem iguais (voltarHome, processarOperacao, abrirTelaAgendar...)
function abrirTelaAgendar() {
    const conteudo = document.getElementById('conteudo-dinamico');
    conteudo.innerHTML = `<h2 style="color:#cc092f;">Novo Agendamento</h2><input type="date" id="data-agenda" style="width:100%; padding:12px; margin:10px 0;"><input type="number" id="op-valor" placeholder="Valor R$" style="width:100%; padding:12px; margin:10px 0;"><button onclick="confirmarAgendamento()" style="width:100%; padding:15px; background:#004481; color:#fff; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">CONFIRMAR</button>`;
}
function confirmarAgendamento() { alert("Agendamento realizado!"); voltarHome(); }
function voltarHome() { document.getElementById('tela-home').style.display = 'block'; document.getElementById('tela-servico').style.display = 'none'; atualizarDisplaySaldo(); }
function processarOperacao(tipo) { alert(`${tipo} realizado!`); voltarHome(); }
function executarSair() { localStorage.clear(); window.location.href = 'index.html'; }
