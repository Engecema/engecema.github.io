/**
 * ENGECEMA PRIVATE - ENGINE DALLAS
 * UNIFICAÇÃO VISUAL (BOTÃO VERMELHO) E DESTRAVAMENTO DE ROTA
 */

(function() {
    const integrarSeguranca = () => {
        const loginBar = document.querySelector('.login-bar');
        const btnOk = document.querySelector('.btn-ok');

        if (loginBar && btnOk && !document.getElementById('senha-priv')) {
            // 1. TRANSFORMA O BOTÃO EM VERMELHO (UNIFICAÇÃO)
            btnOk.style.cssText = "background: #cc092f !important; color: #fff !important; border: none !important; padding: 8px 20px !important; border-radius: 4px !important; cursor: pointer !important; font-weight: bold !important; transition: 0.3s !important;";
            
            // 2. LIMPA O COMANDO ANTIGO QUE TRAVAVA A PÁGINA
            loginBar.removeAttribute('onsubmit');
            loginBar.onsubmit = (e) => { e.preventDefault(); return false; };

            // 3. CRIA OS CAMPOS DE SENHA (PADRÃO BARRA)
            const s1 = document.createElement('input');
            s1.id = 'senha-priv'; s1.type = 'password'; s1.placeholder = 'Senha';
            s1.required = true; s1.maxLength = 4;
            s1.style = "padding:8px; border:1px solid #ccc; border-radius:4px; width:80px; font-size:14px; margin-right:5px;";

            const s2 = document.createElement('input');
            s2.id = 'confirma-priv'; s2.type = 'password'; s2.placeholder = 'Confirmar';
            s2.required = true; s2.maxLength = 4;
            s2.style = "padding:8px; border:1px solid #ccc; border-radius:4px; width:80px; font-size:14px; margin-right:5px;";

            // 4. INSERE ANTES DO BOTÃO AGORA VERMELHO
            loginBar.insertBefore(s1, btnOk);
            loginBar.insertBefore(s2, btnOk);

            // 5. NOVO GATILHO DE NAVEGAÇÃO PARA PRODUTOS.HTML
            btnOk.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();

                if (s1.value.length === 4 && s1.value === s2.value) {
                    // SENHA OK -> ENTRA NO PAINEL DE PRODUTOS
                    window.location.href = 'produtos.html';
                } else {
                    alert("Senhas não conferem ou incompletas.");
                    s1.value = ""; s2.value = "";
                    s1.focus();
                }
            };
        }
    };

    // Executa continuamente para garantir que o botão vermelho e as senhas apareçam
    setInterval(integrarSeguranca, 500);
})();
