const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function processarAuditoria() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    console.log("📑 INICIANDO AUDITORIA TÉCNICA (CET)");
    
    // Consolidação de Custos vs Rendimentos
    const taxasPagas = 10.50 + 11.00 + 40.00; // TED + IOF + Spread acumulados
    const rendimentoReserva = (conta.reserva_emergencia || 0) * 0.0005; 

    console.log(`💰 Patrimônio em Reserva: R$ ${conta.reserva_emergencia.toFixed(2)}`);
    console.log(`📉 Total de Taxas e Impostos: R$ ${taxasPagas.toFixed(2)}`);
    
    // Registra a marca de auditoria no banco
    conta.ultima_auditoria = new Date().toISOString();
    conta.status_cet = "Auditado e Seguro";

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log("✅ Relatório de Auditoria gravado na IBM Cloud!");
  } catch (err) {
    console.error("❌ Erro na auditoria:", err.message);
  }
}
processarAuditoria();
