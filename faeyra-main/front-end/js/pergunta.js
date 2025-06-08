function buscarPergunta() {
  fetch('http://localhost:3000/perguntas')
    .then(response => response.json())
    .then(data => {
      const div = document.getElementById('pergunta');
      if (!div) return;

      const textoPergunta = data.texto || data[0]?.texto;

      div.textContent = textoPergunta || 'Pergunta não encontrada.';
    })
    .catch(error => {
      console.error('Erro ao buscar pergunta:', error);
      const div = document.getElementById('pergunta');
      if (div) div.textContent = 'Erro ao carregar pergunta.';
    });
}

