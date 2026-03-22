/**
 * ENGECEMA PRIVATE - ENGINE DALLAS (US-SOUTH)
 * FOCO: INTERCEPTAÇÃO DO BOTÃO AZUL SEM ALTERAR HTMLS IMUTÁVEIS
 */

const EngecemaPrivate = {
    init() {
        // Monitora cliques em todo o documento para capturar o botão azul "OK"
        document.addEventListener('click', (e) => {
            const el = e.target;
            // Localiza o botão OK pelo texto ou pela classe 'btn-ok' que vimos no seu index bruto
            if (el.innerText === "OK" || el.classList.contains('btn-ok')) {
                e.preventDefault(); // Trava o redirecionamento automático para admin.html
                this.gerarAbaSenha();
            }
        });
    },

    // ETAPA 1: ABA DE SENHA
    gerarAbaSenha() {
        const aba = document.createElement('div');
        aba.id = 'aba-seguranca-p1';
        aba.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:999999; border-left:2px solid #c5a059; padding:60px 40px; color:#fff; display:flex; flex-direction:column; font-family:Arial; box-shadow:-20px 0 70px #000;";
        aba.innerHTML = `
            <h2 style="color:#c5a059; text-transform:uppercase; font-size:16px; margin:0;">Senha de Acesso</h2>
            <p style="color:#666; font-size:12px; margin-top:10px;">Informe sua senha de 4 dígitos para validação.</p>
            <input type="password" id="pass1" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:32px; text-align:center; letter-spacing:10px; margin:30px 0; outline:none;">
            <button id="btn-p1" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; cursor:pointer; text-transform:uppercase;">Avançar</button>
        `;
        document.body.appendChild(aba);

        document.getElementById('btn-p1').onclick = () => {
            const p1 = document.getElementById('pass1').value;
            if (p1.length === 4) {
                aba.remove();
                this.gerarAbaConfirmar(p1);
            }
        };
    },

    // ETAPA 2: ABA DE CONFIRMAR SENHA
    gerarAbaConfirmar(senhaOriginal) {
        const aba = document.createElement('div');
        aba.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:999999; border-left:2px solid #c5a059; padding:60px 40px; color:#fff; display:flex; flex-direction:column; font-family:Arial; box-shadow:-20px 0 70px #000;";
        aba.innerHTML = `
            <h2 style="color:#c5a059; text-transform:uppercase; font-size:16px; margin:0;">Confirmar Senha</h2>
            <p style="color:#666; font-size:12px; margin-top:10px;">Repita a senha para confirmar a segurança.</p>
            <input type="password" id="pass2" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:32px; text-align:center; letter-spacing:10px; margin:30px 0; outline:none;">
            <button id="btn-p2" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; cursor:pointer; text-transform:uppercase;">Confirmar e Entrar</button>
        `;
        document.body.appendChild(aba);

        document.getElementById('btn-p2').onclick = () => {
            const p2 = document.getElementById('pass2').value;
            if (p2 === senhaOriginal) {
                // SUCESSO: Agora sim libera para o admin.html original (imutável)
                window.location.href = "admin.html";
            } else {
                alert("Senhas não conferem. Reiniciando.");
                location.reload();
            }
        };
    }
};

// Inicia o motor Dallas
document.addEventListener('DOMContentLoaded', () => EngecemaPrivate.init());
