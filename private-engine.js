/**
 * ENGECEMA PRIVATE - AJUSTE DE INTERFACE DALLAS
 * ADICIONA CAMPOS DE SENHA NO INDEX IMUTÁVEL
 */

(function() {
    window.addEventListener('load', function() {
        const loginBar = document.querySelector('.login-bar');
        const btnOk = document.querySelector('.btn-ok');

        if (loginBar && btnOk) {
            // 1. Cria o campo de Senha
            const inputSenha = document.createElement('input');
            inputSenha.type = 'password';
            inputSenha.placeholder = 'Senha';
            inputSenha.required = true;
            inputSenha.maxLength = 4;
            inputSenha.style.width = '100px';
            inputSenha.style.padding = '8px';
            inputSenha.style.borderRadius = '4px';
            inputSenha.style.border = '1px solid #ccc';

            // 2. Cria o campo de Confirmar Senha
            const inputConfirma = document.createElement('input');
            inputConfirma.type = 'password';
            inputConfirma.placeholder = 'Confirmar';
            inputConfirma.required = true;
            inputConfirma.maxLength = 4;
            inputConfirma.style.width = '100px';
            inputConfirma.style.padding = '8px';
            inputConfirma.style.borderRadius = '4px';
            inputConfirma.style.border = '1px solid #ccc';

            // 3. Insere os campos ANTES do botão OK
            loginBar.insertBefore(inputSenha, btnOk);
            loginBar.insertBefore(inputConfirma, btnOk);

            // 4. Validação antes de enviar para o admin.html
            loginBar.onsubmit = function(e) {
                if (inputSenha.value !== inputConfirma.value) {
                    e.preventDefault();
                    alert("Senhas não conferem!");
                    return false;
                }
                // Se estiver ok, o navegador segue o onsubmit original do index (window.location.href='admin.html')
            };
        }
    });
})();
