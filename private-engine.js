/* PRIVATE-ENGINE.JS - DESBLOQUEIO DEFINITIVO -> PRODUTOS.HTML */
(function() {
    const injetarCampos = () => {
        const loginBar = document.querySelector('.login-bar');
        const btnOk = document.querySelector('.btn-ok');

        if (loginBar && btnOk && !document.getElementById('senha-private')) {
            // 1. Limpa o comando antigo do formulário que travava a navegação
            loginBar.removeAttribute('onsubmit');
            loginBar.setAttribute('onsubmit', 'return false;');

            // 2. Criar Campo SENHA
            const s1 = document.createElement('input');
            s1.id = 'senha-private'; s1.type = 'password'; s1.placeholder = 'Senha';
            s1.required = true; s1.maxLength = 4;
            s1.style = "padding:8px; border:1px solid #ccc; border-radius:4px; width:80px; font-size:14px; margin-right:5px;";

            // 3. Criar Campo CONFIRMAR
            const s2 = document.createElement('input');
            s2.id = 'confirma-private'; s2.type = 'password'; s2.placeholder = 'Confirmar';
            s2.required = true; s2.maxLength = 4;
            s2.style = "padding:8px; border:1px solid #ccc; border-radius:4px; width:80px; font-size:14px; margin-right:5px;";

            // 4. Inserir antes do botão OK
            loginBar.insertBefore(s1, btnOk);
            loginBar.insertBefore(s2, btnOk);

            // 5. NOVO COMANDO DO BOTÃO OK
            btnOk.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();

                if (s1.value.length === 4 && s1.value === s2.value) {
                    // SUCESSO: DIRECIONA PARA O PAINEL DE PRODUTOS
                    window.location.href = 'produtos.html';
                } else {
                    alert("As senhas não conferem!");
                    s1.value = ""; s2.value = "";
                }
            };
        }
    };

    // Executa a cada 500ms para garantir que vença o carregamento do index
    setInterval(injetarSegurancaEngecema, 500);
    
    // Fallback imediato
    window.addEventListener('load', injetarCampos);
})();
