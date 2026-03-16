const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function verificarLiquidez() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;
    const limiteSeguranca = 1000.00; // Se baixar de 1000, o BACEN atua

    console.log(`🔍 Monitoramento BACEN: Saldo atual R$ ${conta.saldo.toFixed(2)}`);

    if (conta.saldo < limiteSeguranca) {
        console.log("⚠️ ALERTA DE LIQUIDEZ: Acionando Redesconto do Banco Central...");
        const socorro = 2000.00;
        const taxaPunicao = 0.08; // 8% de taxa por ser emergencial
        
        conta.saldo += (socorro - (socorro * taxaPunicao));
        console.log(`✅ Socorro depositado! Novo saldo após taxas BACEN.`);
    } else {
        console.log("✅ Liquidez estável. Nenhuma intervenção do BACEN necessária.");
    }

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
  } catch (err) {
    console.error("❌ Erro no monitoramento BACEN:", err.message);
  }
}
verificarLiquidez();
