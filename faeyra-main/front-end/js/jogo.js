let vidas = 3; //Vidas iniciais

//função que atualiza as estrelas
function atualizarVidas() {
  const container = document.getElementById("vidas");
  if (!container) return;

  container.innerHTML = '';

  for (let i = 0; i < vidas; i++) {
    const estrela = document.createElement("img");
    estrela.src = "/faeyra-main/front-end/imagens/estrela.png";
    estrela.classList.add("estrela");
    container.appendChild(estrela);
  }
}


function clienteFoiEmbora() {
  ocultarDiv('respostas');
  respostaFinal();
  vidas--;
  atualizarVidas();

  if (vidas <= 0) {
    mostrarDiv("telaFimdeJogo");
  } else {
    finalizarAtendimento();
  }

}


function respostaFinal() {
  mostrarDiv('pergunta')
  if (satisfacaoAtual < 40) {
    document.getElementById('pergunta').textContent = `Nunca mais volto aqui`;
  } else {
    document.getElementById('pergunta').textContent = `Obrigado`;
  }
}
