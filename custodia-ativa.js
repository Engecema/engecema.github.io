const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function processarCustodia() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    // Simulação de Carteira de Ativos
    conta.custodia = {
      crypto: { ticker: "BTC", quantidade: 0.0042, valor_brl: 1250.00 },
      acoes: { ticker: "AAPL", quantidade: 2, valor_brl: 1840.00 }
    };
    
    // Dados para o Informe de Rendimentos
    conta.informe_rendimentos = {
      ano_base: 2024,
      rendimento_isento: 145.20,
      patrimonio_total: (conta.saldo + 1250 + 1840).toFixed(2)
    };

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log(`✅ Custódia Atualizada: BTC e AAPL registrados.`);
  } catch (err) {
    console.error("❌ Erro na custódia:", err.message);
  }
}
processarCustodia();
