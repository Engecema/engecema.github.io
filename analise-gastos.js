const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function processarNotificacao() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    console.log("🔔 GERANDO ALERTA PUSH...");
    
    // Dados simulados para o Gráfico e Notificação
    conta.ultimo_gasto = { categoria: "Lazer", valor: 150.00 };
    conta.alerta_push = `Você gastou R$ 150,00 em ${conta.ultimo_gasto.categoria}. Novo saldo: R$ ${conta.saldo.toFixed(2)}`;

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log(`✅ Notificação enviada: ${conta.alerta_push}`);
  } catch (err) {
    console.error("❌ Erro na notificação:", err.message);
  }
}
processarNotificacao();
