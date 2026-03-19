const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const AppConfiguration = require('ibm-appconfiguration-node-sdk');

const app = express();
app.use(cors());
app.use(express.json());

// 1. INICIALIZAÇÃO DO COFRE (App Configuration da IBM)
const clientAppConfig = AppConfiguration.getInstance();
clientAppConfig.init(
    'us-south', 
    '50341044-2194-4f79-a2ac-8f45959f423d', // SEU GUID
    'tL4h5JPtO0QwCdsmpGLgvBHHabvKq1PxVN9em0M_zUqO' // SUA API KEY DO SERVIÇO
);
clientAppConfig.setContext('producao', 'producao');

app.use(express.static(path.join(__dirname)));

let tokensAtivos = {}; 

// ROTA PRINCIPAL: REGISTRAR NO CLOUDANT E ENVIAR E-MAIL
app.post('/api/registrar', async (req, res) => {
    const { nome, email, cpf } = req.body;
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    tokensAtivos[cpf] = token;

    try {
        const cloudantUrl = clientAppConfig.getProperty('cloudant_url').getCurrentValue();
        const cloudantKey = clientAppConfig.getProperty('cloudant_apikey').getCurrentValue();
        const emailPass = clientAppConfig.getProperty('email_pass').getCurrentValue();

        // 2. CONEXÃO COM O CLOUDANT-YR
        const cloudant = CloudantV1.newInstance({
            authenticator: new IamAuthenticator({ apikey: cloudantKey }),
            serviceUrl: cloudantUrl
        });

        await cloudant.postDocument({
            db: 'clientes_engecema',
            document: { 
                nome, email, cpf, 
                status: 'AGUARDANDO_VALIDACAO', 
                origem: 'Engecema Private Web',
                criado_em: new Date().toISOString() 
            }
        });

        // 3. CONFIGURAÇÃO DO DISPARO DE E-MAIL (E-MAIL CORRIGIDO)
        let transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: { 
                user: 'geonimatos31@gmail.com', // E-mail corrigido aqui
                pass: emailPass 
            }
        });

        await transporter.sendMail({
            from: '"Engecema Private" <geonimatos31@gmail.com>', 
            to: email,
            subject: "Seu Token de Segurança Engecema",
            html: `
                <div style="font-family: sans-serif; color: #333;">
                    <h2>Olá, ${nome}!</h2>
                    <p>Seu código de ativação Engecema de 6 dígitos é:</p>
                    <div style="font-size: 32px; font-weight: bold; color: #2ecc71; letter-spacing: 5px; margin: 20px 0;">
                        ${token}
                    </div>
                    <p>Insira este código no sistema para ativar sua conta.</p>
                </div>
            `
        });

        res.status(200).json({ success: true });

    } catch (error) {
        console.error("Erro Engecema:", error);
        res.status(500).json({ error: "Erro no servidor." });
    }
});

app.post('/api/validar', (req, res) => {
    const { cpf, token } = req.body;
    if (tokensAtivos[cpf] && tokensAtivos[cpf] === token) {
        delete tokensAtivos[cpf];
        res.status(200).json({ valid: true });
    } else {
        res.status(401).json({ valid: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Engecema ativo na porta ${PORT}`));
