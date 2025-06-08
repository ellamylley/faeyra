document.addEventListener("DOMContentLoaded", function () {
  // Abrir a calculadora
  const abrir = document.getElementById("abrirCalculadora");
  if (abrir) {
    abrir.addEventListener("click", function () {
      const container = document.getElementById("calculadora");
      if (container.style.display === "none" || container.style.display === "") {
        container.style.display = "flex";
      }
    });
  }

  // Fechar a calculadora
  const fechar = document.getElementById("fecharCalculadora");
  if (fechar) {
    fechar.addEventListener("click", function () {
      document.getElementById("calculadora").style.display = "none";
    });
  }
});
