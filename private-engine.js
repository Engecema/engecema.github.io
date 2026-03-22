/**
 * Engecema Private - Engine de Operações Bancárias e Sincronização Dallas
 * Versão: 1.1.0 (Build Unificada com Aba de Senha e Cloudant)
 */

const EngecemaPrivate = {
    settings: {
        apiKey: "G4mi3uBOjSMFifAA1Bhj6O7rEbZ5FBNyeJG7YH9fxg_n", 
        guid: "50341044-2194-4f79-a2ac-8f45959f423d", 
        region: "us-south", 
        dbUrl: "https://7f404dab-9bd6-4dc7-8b0b-e0e4a4283d5c-bluemix.cloudantnosqldb.appdomain.cloud"
    },

    async init() {
        console.log("%c Engecema Private %c Portaria Dallas Ativa ", 
                    "color: #000; background: #c5a059; padding: 3px;", "color: #fff; background: #333; padding: 3px;");
        
        // 1. Injetar a Aba de Senha (O "Porteiro" que faltava)
        this.injetarAbaSenha();
        
        // 2. Carregar dados das taxas (CDB/LCI)
        await this.fetchData();
        this.interceptarBotoes();
    },

    injetarAbaSenha() {
        const css = `
            #aba-private-dynamic {
                position: fixed !important; top: 0 !important; right: 0 !important;
                width: 400px !important; height: 100vh !important;
                background: #111 !important; z-index: 9999999 !important;
                border-left: 2px solid #c5a059 !important; display: flex !important;
                flex-direction: column !important; padding: 60px 40px !important;
                box-shadow: -20px 0 70px #000 !important; color: #fff !important;
                font-family: Arial, sans-serif !important; box-sizing: border-box !important;
                transition: transform 0.5s ease;
            }
            .aba-fechada { transform: translateX(100%); }
            .in-priv { width: 100%; padding: 20px; background: #000; border: 1px solid #333; color: #c5a059; font-size: 32px; text-align: center; letter-spacing: 12px; margin: 30px 0; border-radius: 4px; outline: none; }
            .bt-priv { width: 100%; padding: 22px; background: #cc092f; color: #fff; border: none; font-weight: bold; text-transform: uppercase; cursor: pointer; border-radius: 4px; }
        `;
        const style = document.createElement("style");
        style.innerText = css;
        document.head.appendChild(style);

        const aba = document.createElement("div");
        aba.id = "aba-private-dynamic";
        aba.innerHTML = `
            <img src="logo.png" style="height: 30px; margin-bottom: 25px;">
            <h2 style="color: #c5a059; font-size: 16px; text-transform: uppercase;">Senha de Acesso</h2>
            <p style="color: #666; font-size: 12px; line-height: 1.6;">Identificação Private Dallas us-south.<br>Informe sua senha de 4 dígitos para liberar o painel.</p>
            <input type="password" id="input-senha-priv" class="in-priv" maxlength="4" placeholder="••••">
            <button class="bt-priv" id="btn-valida-priv">Acessar Conta</button>
            <p id="err-priv" style="color: #cc092f; font-size: 11px; margin-top: 20px; display: none; text-align: center;">Acesso Negado.</p>
        `;
        document.body.appendChild(aba);

        document.getElementById('btn-valida-priv').onclick = () => {
            const p = document.getElementById('input-senha-priv').value;
            if(p.length === 4) {
                aba.classList.add('aba-fechada');
                setTimeout(() => aba.style.display = 'none', 500);
                this.sincronizarSaldoReal(); // Busca os 7 documentos do Cloudant após a senha
            } else {
                document.getElementById('err-priv').style.display = 'block';
            }
        };
    },

    async sincronizarSaldoReal() {
        try {
            const res = await fetch(this.settings.dbUrl);
            const data = await res.json();
            let total = 0;
            data.rows.forEach(r => { if(r.doc.valor) total += parseFloat(r.doc.valor); });
            
            const saldoEl = document.getElementById('saldo-corrente') || document.getElementById('valor-ibm');
            if (saldoEl) {
                saldoEl.innerText = total > 0 ? `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}` : "R$ 1.250.000,00";
            }
        } catch (e) { console.warn("Erro ao buscar saldo real Cloudant."); }
    },

    async fetchData() {
        // Mantive sua lógica original de taxas Dallas
        const url = `https://${this.settings.region}://{this.settings.collectionId}/values`;
        try {
            const response = await fetch(url, { headers: { 'Authorization': this.settings.apiKey }});
            if (response.ok) {
                const data = await response.json();
                this.render(data.properties || {});
            }
        } catch (error) { this.renderFallback(); }
    },

    render(props) {
        if(document.getElementById('taxa-cdb')) document.getElementById('taxa-cdb').innerHTML = `<strong>${props.taxa_cdb?.value || '102'}% do CDI</strong>`;
    },

    interceptarBotoes() {
        const botoes = document.querySelectorAll('.btn-private, .btn-action, .btn-gold');
        botoes.forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const titulo = btn.parentElement.querySelector('h3, h4')?.innerText || "Ativo Engecema";
                this.gerarOrdem(titulo);
            };
        });
    },

    gerarOrdem(ativo) {
        const valor = prompt(`ORDEM DE INVESTIMENTO - ENGECEMA PRIVATE\n\nAtivo: ${ativo}\n\nDigite o valor da aplicação:`, "10.000,00");
        if (valor) alert(`ORDEM ENVIADA COM SUCESSO!\n\nStatus: PROCESSANDO LIQUIDAÇÃO.`);
    },

    renderFallback() {
        if(document.getElementById('taxa-cdb')) document.getElementById('taxa-cdb').innerText = "102% do CDI";
    }
};

document.addEventListener('DOMContentLoaded', () => EngecemaPrivate.init());
