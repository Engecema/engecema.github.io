const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function pagarFatura() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    const valorFatura = 150.00; // Valor que simulamos de gasto no crédito anteriormente
    
    console.log(`💰 Saldo antes: R$ ${conta.saldo.toFixed(2)}`);
    console.log(`💳 Limite antes: R$ ${conta.limite_credito.toFixed(2)}`);

    // Lógica: Tira do saldo e devolve ao limite
    conta.saldo -= valorFatura;
    conta.limite_credito += valorFatura;

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log(`✅ Fatura de R$ ${valorFatura} paga com sucesso!`);
    console.log(`🚀 Saldo Atual: R$ ${conta.saldo.toFixed(2)} | Limite Restaurado: R$ ${conta.limite_credito.toFixed(2)}`);
  } catch (err) {
    console.error("❌ Erro ao pagar fatura:", err.message);
  }
}
pagarFatura();
