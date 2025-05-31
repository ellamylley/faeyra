//Função que move personagem
function moverPersonagem(entrarOuSair) {
  const container = document.getElementById("personagem");
  const botaoIniciar = document.getElementById("start");
  const botaoFinalizar = document.getElementById("end");
  let acao = entrarOuSair;
  let posicao;
  let destino;

  if (acao === "entrar") {
    posicao = -150;
    destino = 400;
    botaoIniciar.style.display = "none";
    botaoFinalizar.style.display = "flex";
  }

  if (acao === "sair") {
    posicao = 400;
    destino = 2000;
    botaoFinalizar.style.display = "none";
    botaoIniciar.style.display = "flex";
  }

  let frame = 0;

  const intervalo = setInterval(() => {
    posicao += 3; 
    frame++;

    let deslocamentoVertical = Math.sin(frame * 0.2) * 5; // movimento vertical
    container.style.left = posicao + "px";
    container.style.top = `calc(20vh + ${deslocamentoVertical}px)`; // base + variação

    if (posicao >= destino) {
      clearInterval(intervalo);
    }
  }, 15);
}


