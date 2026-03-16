const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function upgradeStatus() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    const patrimonioTotal = conta.saldo + 1250 + 1840; // Saldo + BTC + Apple
    
    // Lógica de Upgrade e Milhas
    if (patrimonioTotal >= 4500) {
      conta.categoria = "BLACK";
      conta.milhas = Math.floor(patrimonioTotal * 5.2); // Acúmulo acelerado Black
      conta.destinos_sugeridos = ["Paris", "Miami", "Maldivas"];
    }

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log(`👑 STATUS ATUALIZADO: MEMBRO ${conta.categoria}`);
    console.log(`✈️ MILHAS ACUMULADAS: ${conta.milhas} pts`);
  } catch (err) {
    console.error("❌ Erro no upgrade:", err.message);
  }
}
upgradeStatus();
