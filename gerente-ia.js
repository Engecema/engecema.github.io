const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function assessoriaIA() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    console.log(`🤖 IA INNOVATE ANALISANDO PERFIL: ${conta.nome}`);
    
    let recomendacao = "";
    if (conta.reserva_emergencia < 2000) {
        recomendacao = "IA: Sua reserva está abaixo da meta. Sugiro mover R$ 200 do saldo para a Reserva.";
    } else {
        recomendacao = "IA: Saúde financeira excelente! Que tal diversificar para Renda Variável?";
    }

    // Grava o conselho da IA no banco de dados
    conta.conselho_ia = recomendacao;
    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    
    console.log(`✅ ${recomendacao}`);
  } catch (err) {
    console.error("❌ Erro na IA:", err.message);
  }
}
assessoriaIA();
