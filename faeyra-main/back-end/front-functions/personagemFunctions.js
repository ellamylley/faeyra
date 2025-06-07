function moverPersonagem(entrarOuSair) {
  const container = document.getElementById("personagem");
  const botaoIniciar = document.getElementById("start");
  const botaoFinalizar = document.getElementById("end");
  let acao = entrarOuSair;
  let posicao;
  let destino;

  if (acao === "entrar") {
    container.style.display = "flex";
    posicao = -150;
    destino = 400;
    botaoIniciar.style.display = "none";
    botaoFinalizar.style.display = "flex";
  }

  if (acao === "sair") {
    posicao = 400;
    destino = 1100;
  }

  let frame = 0;

  const intervalo = setInterval(() => {
    posicao += 3; 
    frame++;

    let deslocamentoVertical = Math.sin(frame * 0.2) * 5;
    container.style.left = posicao + "px";
    container.style.top = `calc(20vh + ${deslocamentoVertical}px)`;

    if (posicao >= destino) {
      clearInterval(intervalo);

      if (acao === "sair") {
        container.style.display = "none"; // Só some depois da animação
        botaoFinalizar.style.display = "none";
        botaoIniciar.style.display = "flex";
      }
    }
  }, 15);
}
