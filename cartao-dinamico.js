const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function gerarCartaoVirtual() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    // Gera número aleatório simulando o cartão dinâmico
    const novoCartao = "**** **** **** " + Math.floor(1000 + Math.random() * 9000);
    const cvvDinamico = Math.floor(100 + Math.random() * 900);

    conta.cartao_virtual = { numero: novoCartao, cvv: cvvDinamico, expira: "60s" };

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log(`✅ Cartão Dinâmico Gerado: ${novoCartao} | CVV: ${cvvDinamico}`);
  } catch (err) {
    console.error("❌ Erro ao gerar cartão:", err.message);
  }
}
gerarCartaoVirtual();
