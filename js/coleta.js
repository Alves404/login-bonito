// Aguarda o envio do formulário com a classe 'login-form'
document.querySelector('.login-form').addEventListener('submit', function(event) {
    // Previne que a página seja recarregada ao clicar em "Entrar"
    event.preventDefault();

    // --- ETAPA 1: COLETAR OS DADOS DO SEU FORMULÁRIO ---
    const dadosDeLogin = {
        usuario: document.getElementById('username').value,
        senha: document.getElementById('password').value,
        lembrarMe: document.getElementById('remember-me').checked, // .checked retorna true ou false
        timestamp: new Date().toISOString() // Adiciona data e hora do login
    };

    // --- ETAPA 2: CONVERTER PARA STRING JSON ---
    // O 'null, 2' formata o arquivo para ser fácil de ler
    const dadosEmJson = JSON.stringify(dadosDeLogin, null, 2);

    console.log("Dados coletados (JSON):");
    console.log(dadosEmJson);

    // --- ETAPA 3: CRIAR E BAIXAR O ARQUIVO .JSON ---
    criarArquivoParaDownload(dadosEmJson, 'dados_login.json', 'application/json');

});


/**
 * Função reutilizável para criar um arquivo para download no navegador.
 * @param {string} conteudo O conteúdo do arquivo (neste caso, a string JSON).
 * @param {string} nomeDoArquivo O nome que o arquivo terá ao ser baixado (ex: 'dados.json').
 * @param {string} tipoDoConteudo O tipo MIME do arquivo (ex: 'application/json').
 */
function criarArquivoParaDownload(conteudo, nomeDoArquivo, tipoDoConteudo) {
    const blob = new Blob([conteudo], { type: tipoDoConteudo });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nomeDoArquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// --- AVISO IMPORTANTE DE SEGURANÇA ---
console.warn(
    "AVISO DE SEGURANÇA: Este script está salvando a senha em texto plano em um arquivo JSON. " +
    "Isso é EXTREMAMENTE INSEGURO para uma aplicação real. " +
    "Em um ambiente de produção, as senhas NUNCA devem ser vistas ou armazenadas desta forma. " +
    "Elas devem ser enviadas para um servidor seguro (backend) e armazenadas usando hash e salt."
);