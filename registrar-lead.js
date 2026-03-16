const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function registrarInteresseRural() {
  // Limpando as chaves de conexão
  const apiKey = process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim();
  const url = process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim();

  const authenticator = new IamAuthenticator({ apikey: apiKey });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(url);

  // Dados da simulação de Financiamento Rural
  const intencaoCompra = {
    cliente: "Geonimatos",
    produto: "Financiamento Rural - Fazenda",
    valor_solicitado: 500000.00,
    status: "Analise de Credito",
    data_solicitacao: new Date().toISOString()
  };

  try {
    const response = await service.postDocument({
      db: 'leads', // Nome do banco que você deve criar na IBM Cloud
      document: intencaoCompra
    });
    console.log("✅ Sucesso: Intenção de Financiamento Rural registrada!");
    console.log("Protocolo:", response.result.id);
  } catch (err) {
    console.error("❌ Erro ao registrar no banco 'leads':", err.message);
    process.exit(1);
  }
}

registrarInteresseRural();
