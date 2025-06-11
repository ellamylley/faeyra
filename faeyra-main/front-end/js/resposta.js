function buscarRespostas(idPergunta) {
  fetch(`http://localhost:3000/respostas/${idPergunta}`)
    .then(response => response.json())
    .then(data => {
      for (let i = 1; i <= 3; i++) {
        const divResposta = document.getElementById(`resposta${i}`);
        if (divResposta) {
          const resposta = data[i - 1];
          if (resposta) {
            divResposta.innerHTML = `
              <span class="textoResposta">${resposta.texto}</span>
            `;
            mostrarDiv('respostas')

            divResposta.onclick = () => {

              atualizarExpressaoCliente(satisfacaoAtual);
              finalizarAtendimento();
            };

          } else {
            divResposta.textContent = '';
          }
        }
      }
    })
    .catch(error => {
      console.error('Erro ao buscar respostas:', error);
      for (let i = 1; i <= 3; i++) {
        const divResposta = document.getElementById(`resposta${i}`);
        if (divResposta) divResposta.textContent = 'Erro ao carregar resposta.';
      }
    });
}
