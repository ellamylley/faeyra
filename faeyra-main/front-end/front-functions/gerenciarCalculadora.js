
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

