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

