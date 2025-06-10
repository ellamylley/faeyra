let vidas = 3;
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
  finalizarAtendimento();
  ocultarDiv("pergunta");
  ocultarDiv("respostas");


  vidas--;
  atualizarVidas();

  if (vidas <= 0) {
    mostrarDiv("telaGameOver");
  } else {

    setTimeout(() => {
      buscarCliente();
      mostrarDiv("personagem");
    }, 1000);
  }
}
