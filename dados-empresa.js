const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function registrarEmpresa() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    // Dados da sua Empresa
    conta.empresa = {
      nome: "BM Innovate Digital Bank", // Altere aqui se preferir outro nome
      cnpj: "00.000.000/0001-00",
      tipo: "Corporate Black"
    };

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log(`🏢 EMPRESA REGISTRADA: ${conta.empresa.nome}`);
  } catch (err) {
    console.error("❌ Erro ao registrar empresa:", err.message);
  }
}
registrarEmpresa();
