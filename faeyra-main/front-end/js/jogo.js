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
  mostrarDiv('pergunta');
  respostaFinal();
  vidas--;
  atualizarVidas();

  if (vidas <= 0) {
    mostrarDiv("fimDeJogo");
  } else {
    setTimeout(finalizarAtendimento, 2000
    )
  }

}


function respostaFinal() {
  mostrarDiv('pergunta');
  if (satisfacaoAtual < 40) {
    console.log("NUNCa mais volto aqui")
    document.getElementById('pergunta').textContent = `Quer me dar um golpe? Eu vou embora`;
  } else {
    console.log("obrigada")
    document.getElementById('pergunta').textContent = `Obrigado`;
  }
}