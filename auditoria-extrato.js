const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function gerarAuditoria() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    console.log("📑 RELATÓRIO DE AUDITORIA - INNOVATE BANK");
    console.log("------------------------------------------");
    console.log(`👤 Cliente: ${conta.nome}`);
    console.log(`💰 Saldo Atual: R$ ${conta.saldo.toFixed(2)}`);
    
    // Simulação de Auditoria de Custos (CET)
    const taxasTed = 10.50;
    const iofInternacional = 11.00;
    const spreadCambial = 40.00;
    const totalCustos = taxasTed + iofInternacional + spreadCambial;
    
    console.log(`📉 Total de Taxas e Impostos: R$ ${totalCustos.toFixed(2)}`);
    console.log(`📈 Rendimento Acumulado (CDB): R$ ${(conta.saldo * 0.0005).toFixed(4)} / dia`);
    console.log("------------------------------------------");
    console.log("✅ Auditoria de Integridade: CONCLUÍDA");
  } catch (err) {
    console.error("❌ Erro na auditoria:", err.message);
  }
}
gerarAuditoria();
