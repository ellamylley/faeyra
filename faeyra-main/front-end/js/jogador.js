document.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('nomeJogador');
    const dinheiro = localStorage.getItem('dinheiro');
    

    if (nome) {
        document.getElementById('boasVindas').textContent = `Bem-vindo(a), ${nome}!`; //P/ div de boas vindas
    }

    if (dinheiro) {

        document.getElementById('dinheiro').textContent = `${dinheiro} citrinos`; //P/ exibir o dinheiro na tela
    }
});
