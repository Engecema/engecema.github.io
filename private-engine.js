/**
 * Engecema Private - Engine de Integração (IBM App Configuration)
 * Região: Dallas (us-south) | Credencial: serviço-private
 */

const EngecemaPrivate = {
    settings: {
        // INSIRA OS DADOS DA SUA CREDENCIAL 'serviço-private' ABAIXO
        apiKey: "G4mi3uBOjSMFifAA1Bhj6O7rEbZ5FBNyeJG7YH9fxg_n", 
        guid: "50341044-2194-4f79-a2ac-8f45959f423d", 
        region: "us-south", // Confirmado para Dallas
        collectionId: "engecema-private-collection" // Certifique-se que este nome existe no seu App Config
    },

    async init() {
        console.log("Engecema Engine: Conectando ao App Configuration em Dallas...");
        await this.fetchData();
    },

    async fetchData() {
        // URL formatada para a região Dallas (us-south)
        const url = `https://${this.settings.region}://{this.settings.guid}/collections/${this.settings.collectionId}/values`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': this.settings.apiKey,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Erro de autenticação ou GUID inválido em Dallas');
            
            const data = await response.json();
            this.render(data);
        } catch (error) {
            console.warn("Modo Fallback ativado (Verifique a Collection no App Config):", error);
            this.renderFallback();
        }
    },

    render(data) {
        const props = data.properties || {};

        // Atualiza CDB (Propriedade: taxa_cdb)
        const cdbEl = document.getElementById('taxa-cdb');
        if (cdbEl) cdbEl.innerHTML = `<strong>${props.taxa_cdb?.value || '102%'} do CDI</strong>`;

        // Atualiza Fundos (Propriedade: cota_private)
        const fundoEl = document.getElementById('taxa-fundos');
        if (fundoEl) {
            const cota = props.cota_private?.value || '2.450,32';
            fundoEl.innerHTML = `Cota: R$ ${cota}`;
        }

        // Atualiza LCI/LCA (Propriedade: taxa_lci)
        const lciEl = document.getElementById('taxa-lci');
        if (lciEl) lciEl.innerHTML = `<strong>${props.taxa_lci?.value || '94%'} do CDI</strong>`;
    },

    renderFallback() {
        document.getElementById('taxa-cdb').innerText = "102% do CDI";
        document.getElementById('taxa-fundos').innerText = "Cota: R$ 2.450,32";
        document.getElementById('taxa-lci').innerText = "94% do CDI";
    }
};

// Execução automática
document.addEventListener('DOMContentLoaded', () => EngecemaPrivate.init());
