/* PRIVATE-ENGINE.JS - DESBLOQUEIO DO BOTÃO OK -> PRODUTOS.HTML */
(function() {
    window.addEventListener('load', function() {
        const loginBar = document.querySelector('.login-bar');
        const btnOk = document.querySelector('.btn-ok');

        if (loginBar && btnOk) {
            // 1. Criar Campo SENHA
            const inputSenha = document.createElement('input');
            inputSenha.type = 'password';
            inputSenha.placeholder = 'Senha';
            inputSenha.required = true;
            inputSenha.maxLength = 4;
            inputSenha.style.cssText = "padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 80px; font-size: 14px; margin-right: 5px;";

            // 2. Criar Campo CONFIRMAR
            const inputConfirma = document.createElement('input');
            inputConfirma.type = 'password';
            inputConfirma.placeholder = 'Confirmar';
            inputConfirma.required = true;
            inputConfirma.maxLength = 4;
            inputConfirma.style.cssText = "padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 80px; font-size: 14px; margin-right: 5px;";

            // 3. Inserir antes do botão OK
            loginBar.insertBefore(inputSenha, btnOk);
            loginBar.insertBefore(inputConfirma, btnOk);

            // 4. DESBLOQUEIO E REDIRECIONAMENTO
            loginBar.onsubmit = function(e) {
                e.preventDefault(); // Para o comportamento antigo que travava
                e.stopPropagation();

                if (inputSenha.value.length === 4 && inputSenha.value === inputConfirma.value) {
                    // SENHAS CORRETAS: DIRECIONA PARA PRODUTOS.HTML
                    window.location.href = 'produtos.html';
                } else {
                    alert("As senhas não conferem ou estão incompletas.");
                    inputSenha.value = "";
                    inputConfirma.value = "";
                    inputSenha.focus();
                }
                return false;
            };
        }
    });
})();
