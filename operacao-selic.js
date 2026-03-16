const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function registrarGarantia() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    const valorTitulo = 1000.00;
    console.log(`📉 SELIC: Comprando R$ ${valorTitulo} em Títulos Públicos para garantia.`);
    
    // O dinheiro sai do saldo e vira "Patrimônio em Títulos"
    conta.saldo -= valorTitulo;
    conta.patrimonio_titulos = (conta.patrimonio_titulos || 0) + valorTitulo;

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log(`✅ Operação Compromissada realizada! Patrimônio atualizado.`);
  } catch (err) {
    console.error("❌ Erro na Selic:", err.message);
  }
}
registrarGarantia();
