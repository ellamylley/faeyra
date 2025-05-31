
//Função de clique para abrir a calculadora
document.getElementById("abrirCalculadora").addEventListener("click", function () {
  const container = document.getElementById("calculadora");
  if (container.style.display === "none" || container.style.display === "") {
  container.style.display = "flex";
}
});


//Função de clique para fechar a calculadora
document.getElementById("fecharCalculadora").addEventListener("click", function () {
  document.getElementById("calculadora").style.display = "none";
});

function moverPersonagem() {
  const container = document.getElementById("personagem");
  let posicao = 150; 
  const destino = 2000; 

  const intervalo = setInterval(() => {
    posicao += 5; // velocidade (px por "passo")
    container.style.left = posicao + "px";

    if (posicao >= destino) {
      clearInterval(intervalo); // para quando chegar
    }
  }, 1); // a cada 20 milissegundos
}

