document.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('nomeJogador');
    const dinheiro = localStorage.getItem('dinheiroJogador');

    if (nome) {
        document.getElementById('boasVindas').textContent = `Bem-vindo(a), ${nome}!`; //P/ div de boas vindas
    }

    if (dinheiro) {
         console.log("dinheiro carregado com sucesso!");
        document.getElementById('dinheiro').textContent = `${dinheiro} citrinos`; //P/ exibir o dinheiro na tela
    } else {
        console.log("ocorreu um erro ao carregar o dinheiro");
        dinheiroAtual = 0;
        document.getElementById('dinheiro').textContent = `${dinheiroAtual} citrinos`;

    }
});
