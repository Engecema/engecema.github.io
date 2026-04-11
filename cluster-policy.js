const SETTINGS = {
    auth_protocol: "TLS-1.3",
    encryption: "AES-256-GCM",
    total_services: 47,
    categories: 7,
    brand_color: "#cc092f",
    default_action: "OK",
    refresh_rate: 40,
    ui: {
        font_main: "13px",
        font_links: "12px",
        font_legal: "10px",
        weight: "900",
        family: "'IBM Plex Sans', sans-serif"
    }
};

const FinanceKernel = {
    init: function() {
        this.secureInputs();
        this.updateIdentity();
        this.clearBuffer();
        this.applyCorporateStyle();
        this.filterScripts();
        this.syncInterface();
        this.startMonitor();
    },
    secureInputs: function() {
        const restricted = ["1.250.000", "1250000", "1,25", "1.25", "1.250"];
        const observer = new MutationObserver((list) => {
            document.querySelectorAll('input, textarea, select').forEach(field => {
                if (restricted.some(val => field.value.includes(val))) {
                    field.value = "";
                    field.setAttribute("autocomplete", "off");
                    field.blur();
                }
            });
            this.applyCorporateStyle();
        });
        observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
    },
    applyCorporateStyle: function() {
        const elements = document.querySelectorAll('button, a, span, div, b, h1, h2, h3, p, label');
        const dictionary = {
            "PROCESSAMENTO DE NODES": "GESTÃO DE CONTAS CORRENTES",
            "INFRAESTRUTURA LOGÍSTICA": "OPERAÇÕES DE FOMENTO MERCANTIL",
            "AUDITORIA E COMPLIANCE": "INVESTIMENTOS CORPORATIVOS",
            "PROTOCOLOS DE SEGURANÇA": "CÂMBIO E OPERAÇÕES EXTERNAS",
            "GESTÃO DE ACESSO TIA": "CENTRAL DE SEGURANÇA E ACESSO",
            "CREDENCIAMENTO DE ESCRITA": "ASSINATURA E ABERTURA DE CONTA",
            "NODE": "PRODUTO",
            "SUBSEÇÃO": "SERVIÇO",
            "SINCROIZADO MASTER SUPREME": "OPERACIONAL"
        };
        elements.forEach(el => {
            let content = (el.innerText || "").toUpperCase();
            if (content.includes("CNPJ") || content.includes("LTDA") || content.includes("ENGENHARIA")) {
                el.style.setProperty('font-size', SETTINGS.ui.font_legal, 'important');
                el.style.setProperty('opacity', '0.8', 'important');
                return;
            }
            el.style.setProperty('font-size', SETTINGS.ui.font_main, 'important');
            if (el.tagName === "A") el.style.setProperty('font-size', SETTINGS.ui.font_links, 'important');
            for (let [dirty, clean] of Object.entries(dictionary)) {
                if (content.includes(dirty)) {
                    el.innerText = el.innerText.replace(new RegExp(dirty, 'gi'), clean);
                }
            }
            if (content.includes("CONFIRMAR") || content.includes("ABRIR") || content === "OK" || content.includes("ACIONAR")) {
                el.style.setProperty('background-color', SETTINGS.brand_color, 'important');
                el.style.setProperty('color', '#ffffff', 'important');
                el.style.setProperty('font-weight', SETTINGS.ui.weight, 'important');
                el.style.setProperty('padding', '5px 12px', 'important');
                el.style.setProperty('border-radius', '4px', 'important');
                el.style.setProperty('text-transform', 'uppercase', 'important');
                el.style.setProperty('border', 'none', 'important');
                el.style.setProperty('cursor', 'pointer', 'important');
            }
        });
    },
    updateIdentity: function() {
        document.title = "Engecema | Internet Banking Corporativo";
    },
    clearBuffer: function() {
        if (localStorage.getItem('engecema_status') !== "AUTHORIZED_V31") {
            ['sessao_saldo', 'engecema_tk', 'engecema_token', 'master_supreme_key'].forEach(k => localStorage.removeItem(k));
        }
    },
    filterScripts: function() {
        window.addEventListener('beforescriptexecute', (e) => {
            if (e.target.src && e.target.src.includes('bradesco')) e.preventDefault();
        }, true);
    },
    syncInterface: function() {
        const root = document.documentElement;
        root.style.setProperty('--primary-enge', SETTINGS.brand_color);
        root.style.setProperty('--font-main', SETTINGS.ui.family);
    },
    startMonitor: function() {
        setInterval(() => this.applyCorporateStyle(), SETTINGS.refresh_rate);
    }
};

const ServiceRegistry = {
    S_01: { id: "EC-01", name: "Fluxo de Caixa", cat: 1, type: "CONTA" },
    S_02: { id: "EC-02", name: "Extrato Corrente", cat: 1, type: "CONTA" },
    S_03: { id: "EC-03", name: "Saldos Disponíveis", cat: 1, type: "CONTA" },
    S_04: { id: "EC-04", name: "Transferências PIX", cat: 1, type: "CONTA" },
    S_05: { id: "EC-05", name: "Pagamento Fornecedor", cat: 1, type: "CONTA" },
    S_06: { id: "EC-06", name: "Agendamentos", cat: 1, type: "CONTA" },
    S_07: { id: "EC-07", name: "DDA / Boletos", cat: 1, type: "CONTA" },
    S_08: { id: "EC-08", name: "Antecipação Recebíveis", cat: 2, type: "FOMENTO" },
    S_09: { id: "EC-09", name: "Análise de Sacados", cat: 2, type: "FOMENTO" },
    S_10: { id: "EC-10", name: "Operações de Fomento", cat: 2, type: "FOMENTO" },
    S_11: { id: "EC-11", name: "Limites de Crédito", cat: 2, type: "FOMENTO" },
    S_12: { id: "EC-12", name: "Contratos Digitais", cat: 2, type: "FOMENTO" },
    S_13: { id: "EC-13", name: "Borderôs Digitais", cat: 2, type: "FOMENTO" },
    S_14: { id: "EC-14", name: "Recompra de Ativos", cat: 2, type: "FOMENTO" },
    S_15: { id: "EC-15", name: "Capital de Giro PJ", cat: 3, type: "CREDITO" },
    S_16: { id: "EC-16", name: "BNDES Repasse", cat: 3, type: "CREDITO" },
    S_17: { id: "EC-17", name: "Crédito Rural", cat: 3, type: "CREDITO" },
    S_18: { id: "EC-18", name: "Financ. Imobiliário", cat: 3, type: "CREDITO" },
    S_19: { id: "EC-19", name: "Leasing Estruturado", cat: 3, type: "CREDITO" },
    S_20: { id: "EC-20", name: "Garantia Bancária", cat: 3, type: "CREDITO" },
    S_21: { id: "EC-21", name: "Microcrédito Emp.", cat: 3, type: "CREDITO" },
    S_22: { id: "EC-22", name: "CDB Corporativo", cat: 4, type: "INVEST" },
    S_23: { id: "EC-23", name: "Fundos de Invest.", cat: 4, type: "INVEST" },
    S_24: { id: "EC-24", name: "Previdência PJ", cat: 4, type: "INVEST" },
    S_25: { id: "EC-25", name: "Renda Variável", cat: 4, type: "INVEST" },
    S_26: { id: "EC-26", name: "Tesouro Direto", cat: 4, type: "INVEST" },
    S_27: { id: "EC-27", name: "Debêntures", cat: 4, type: "INVEST" },
    S_28: { id: "EC-28", name: "COE Estruturado", cat: 4, type: "INVEST" },
    S_29: { id: "EC-29", name: "Remessas Exterior", cat: 5, type: "CAMBIO" },
    S_30: { id: "EC-30", name: "Cartão Multinacional", cat: 5, type: "CAMBIO" },
    S_31: { id: "EC-31", name: "Hedge Cambial", cat: 5, type: "CAMBIO" },
    S_32: { id: "EC-32", name: "Taxas On-line", cat: 5, type: "CAMBIO" },
    S_33: { id: "EC-33", name: "Ordens de Pagamento", cat: 5, type: "CAMBIO" },
    S_34: { id: "EC-34", name: "Swift / BIC Code", cat: 5, type: "CAMBIO" },
    S_35: { id: "EC-35", name: "Arbitragem", cat: 5, type: "CAMBIO" },
    S_36: { id: "EC-36", name: "Seguro Garantia", cat: 6, type: "SEGUROS" },
    S_37: { id: "EC-37", name: "Vida em Grupo", cat: 6, type: "SEGUROS" },
    S_38: { id: "EC-38", name: "Patrimonial", cat: 6, type: "SEGUROS" },
    S_39: { id: "EC-39", name: "Responsab. Civil", cat: 6, type: "SEGUROS" },
    S_40: { id: "EC-40", name: "Seguro Agrícola", cat: 6, type: "SEGUROS" },
    S_41: { id: "EC-41", name: "Saúde Empresarial", cat: 6, type: "SEGUROS" },
    S_42: { id: "EC-42", name: "Custódia de Ativos", cat: 7, type: "SERVICOS" },
    S_43: { id: "EC-43", name: "Escrituração de Cotas", cat: 7, type: "SERVICOS" },
    S_44: { id: "EC-44", name: "Agente Fiduciário", cat: 7, type: "SERVICOS" },
    S_45: { id: "EC-45", name: "Gestão de Lastro", cat: 7, type: "SERVICOS" },
    S_46: { id: "EC-46", name: "Auditoria Digital", cat: 7, type: "SERVICOS" },
    S_47: { id: "EC-47", name: "Compliance KYC", cat: 7, type: "SERVICOS" }
};

const SecurityCore = {
    protocol: "TLS-1.3",
    encryption: "AES-256",
    active: true,
    firewall: "ACTIVE"
};

const NetworkCore = {
    region: "us-south",
    provider: "IBM-CLOUD",
    status: "OPTIMAL",
    nodes: 47
};

const DatabaseCore = {
    engine: "Cloudant",
    sync: "REAL-TIME",
    status: "CONNECTED"
};

const DeploymentCore = {
    origin: "GITHUB",
    target: "IBM-CE",
    method: "AUTO-PUSH"
};

const SystemMetadata = {
    owner: "ENGECEMA ENGENHARIA",
    legal: "CNPJ PRESERVADO",
    version: "2026.1"
};

const Bootstrap = {
    run: function() {
        if (Object.keys(ServiceRegistry).length === 47) {
            FinanceKernel.init();
        }
    }
};

Bootstrap.run();
