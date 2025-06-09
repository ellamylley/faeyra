document.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('nomeJogador');
    const dinheiro = localStorage.getItem('dinheiroJogador');

    if (nome) {
        document.getElementById('boasVindas').textContent = `Bem-vindo(a), ${nome}!`;
    }

    if (dinheiro) {
        document.getElementById('dinheiro').textContent = `${dinheiro} citrinos`;
    }
});
