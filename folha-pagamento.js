const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function processarFolha() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    // Simulação de Folha Salarial Corporativa
    const salariosBrutos = 12000.00;
    const encargosSociais = salariosBrutos * 0.28; // FGTS, INSS, etc.
    const custoTotalFolha = salariosBrutos + encargosSociais;

    console.log(`👥 PROCESSANDO FOLHA - ${conta.empresa.nome}`);
    console.log(`📄 Salários: R$ ${salariosBrutos.toFixed(2)}`);
    console.log(`📉 Encargos (28%): R$ ${encargosSociais.toFixed(2)}`);
    console.log(`💰 Custo Total Empresa: R$ ${custoTotalFolha.toFixed(2)}`);

    // Registra o provisionamento na nuvem (sem subtrair do saldo para o "Congelamento")
    conta.provisao_folha = custoTotalFolha;
    conta.status_folha = "Provisionada e Auditada";

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log("✅ Folha provisionada com sucesso na IBM Cloud!");
  } catch (err) {
    console.error("❌ Erro no processamento da folha:", err.message);
  }
}
processarFolha();
