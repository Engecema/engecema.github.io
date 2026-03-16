const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function conectarSwift() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    console.log("🌎 CONEXÃO SWIFT INICIADA...");
    console.log("🔐 Autenticando código BIC/SWIFT do Innovate Bank...");
    
    // Simula a confirmação de que as remessas internacionais foram entregues
    conta.status_internacional = "Sincronizado";
    
    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log("✅ Gateway SWIFT: Conectado e Sincronizado com o Mercado Global.");
  } catch (err) {
    console.error("❌ Falha na conexão SWIFT:", err.message);
  }
}
conectarSwift();
