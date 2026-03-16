const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function realizarReserva() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    const valorGuardar = 500.00;
    
    // Só guarda se houver saldo disponível
    if (conta.saldo >= valorGuardar) {
        conta.saldo -= valorGuardar;
        conta.reserva_emergencia = (conta.reserva_emergencia || 0) + valorGuardar;
        
        await service.putDocument({ db: 'users', docId: conta._id, document: conta });
        console.log(`✅ R$ ${valorGuardar} movidos para a Reserva de Emergência!`);
    } else {
        console.log("⚠️ Saldo insuficiente para mover para a reserva.");
    }
  } catch (err) {
    console.error("❌ Erro na operação de reserva:", err.message);
    process.exit(1);
  }
}

// ESTA LINHA ABAIXO É A MAIS IMPORTANTE:
realizarReserva();
