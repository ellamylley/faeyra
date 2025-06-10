function buscarPergunta() {
  fetch('http://localhost:3000/perguntas')
    .then(response => response.json())
    .then(data => {
      const div = document.getElementById('pergunta');
      if (!div) return;

      const textoPergunta = data.texto || data[0]?.texto;
      const idPergunta = data.id_pergunta || data[0]?.id_pergunta;

      div.textContent = textoPergunta || 'Pergunta não encontrada.';

      if (idPergunta) {
        buscarRespostas(idPergunta);

      }
    })
    .catch(error => {
      console.error('Erro ao buscar pergunta:', error);
      const div = document.getElementById('pergunta');
      if (div) div.textContent = 'Erro ao carregar pergunta.';
    });
}

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
           
            divResposta.onclick = () => {
              satisfacaoAtual = (satisfacaoAtual || 0) + resposta.peso_satisfacao;
              atualizarExpressaoCliente(satisfacaoAtual);

              ocultarDiv('pergunta');
              ocultarDiv('respostas');

              // console.log('Satisfação atualizada:', satisfacaoAtual);
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
