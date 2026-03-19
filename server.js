const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(express.json());

// O servidor pega as chaves das "Variáveis de Ambiente" da IBM Cloud
const CONFIG = {
    IBM_KEY: process.env.IBM_API_KEY,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    PORT: process.env.PORT || 3000
};

let tokensAtivos = {}; // Armazena tokens temporariamente

// ROTA: Gerar Token e Enviar E-mail
app.post('/api/registrar', async (req, res) => {
    const { nome, email, cpf } = req.body;
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    
    tokensAtivos[cpf] = token;

    // Configuração de E-mail (Exemplo Gmail/Outlook)
    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: { user: CONFIG.EMAIL_USER, pass: CONFIG.EMAIL_PASS }
    });

    try {
        await transporter.sendMail({
            from: `"Engecema Private" <${CONFIG.EMAIL_USER}>`,
            to: email,
            subject: "Seu Código de Ativação Engecema",
            text: `Olá ${nome}, seu token de segurança é: ${token}`
        });
        res.status(200).json({ message: "Sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao enviar e-mail" });
    }
});

// ROTA: Validar Token
app.post('/api/validar', (req, res) => {
    const { cpf, token } = req.body;
    if (tokensAtivos[cpf] === token) {
        delete tokensAtivos[cpf]; // Token usado, apaga por segurança
        res.status(200).json({ valid: true });
    } else {
        res.status(401).json({ valid: false });
    }
});

app.listen(CONFIG.PORT, () => console.log(`Servidor Engecema ativo na porta ${CONFIG.PORT}`));
