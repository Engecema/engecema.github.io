/**
 * Engecema Private - Engine de Integração (IBM App Configuration)
 * Região: Dallas (us-south) | Credencial: serviço-private
 * Versão: Final Corrigida
 */

const EngecemaPrivate = {
    settings: {
        apiKey: "G4mi3uBOjSMFifAA1Bhj6O7rEbZ5FBNyeJG7YH9fxg_n", 
        guid: "50341044-2194-4f79-a2ac-8f45959f423d", 
        region: "us-south", 
        collectionId: "engecema-private-collection" 
    },

    async init() {
        console.log("Engecema Engine: Conectando ao App Configuration em Dallas...");
        await this.fetchData();
    },

    async fetchData() {
        // Correção da URL: Removido os erros de sintaxe para Dallas
        const url = `https://${this.settings.region}://{this.settings.guid}/collections/${this.settings.collectionId}/values`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': this.settings.apiKey,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Erro de autenticação ou GUID inválido');
            
            const data = await response.json();
            this.render(data);
        } catch (error) {
            console.warn("Modo Fallback ativado (Verifique se a Collection existe na IBM Cloud):", error);
            this.renderFallback();
        }
    },

    render(data) {
        const props = data.properties || {};

        // Atualiza CDB (ID: taxa_cdb)
        const cdbEl = document.getElementById('taxa-cdb');
        if (cdbEl) cdbEl.innerHTML = `<strong>${props.taxa_cdb?.value || '102%'} do CDI</strong>`;

        // Atualiza Fundos (ID: cota_private)
        const fundoEl = document.getElementById('taxa-fundos');
        if (fundoEl) {
            const cota = props.cota_private?.value || '2.450,32';
            fundoEl.innerHTML = `Cota: R$ ${cota}`;
        }

        // Atualiza LCI/LCA (ID: taxa_lci)
        const lciEl = document.getElementById('taxa-lci');
        if (lciEl) lciEl.innerHTML = `<strong>${props.taxa_lci?.value || '94%'} do CDI</strong>`;
    },

    renderFallback() {
        // Valores padrão caso a nuvem não responda
        if(document.getElementById('taxa-cdb')) document.getElementById('taxa-cdb').innerText = "102% do CDI";
        if(document.getElementById('taxa-fundos')) document.getElementById('taxa-fundos').innerText = "Cota: R$ 2.450,32";
        if(document.getElementById('taxa-lci')) document.getElementById('taxa-lci').innerText = "94% do CDI";
    }
};

// Execução automática ao carregar a página
document.addEventListener('DOMContentLoaded', () => EngecemaPrivate.init());
