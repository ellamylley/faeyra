let satisfacaoAtual = null;

function buscarCliente() {
  fetch('http://localhost:3000/clientes')
    .then(res => {
      if (!res.ok) throw new Error("Nenhum cliente encontrado.");
      return res.json();
    })
    .then(data => {
      satisfacaoAtual = data.satisfacao_minima;

      let expressao = definirExpressao(satisfacaoAtual);

      const personagem = document.getElementById("personagem").querySelector("img");
      personagem.src = `/faeyra-main/front-end/imagens/clientes/${data.id_cliente}_${expressao}.png`;
      personagem.dataset.idCliente = data.id_cliente;
      document.getElementById("personagem").style.display = "flex";

      buscarPergunta();
    })
    .catch(err => {
      console.error("Erro ao buscar cliente:", err.message);
    });
}

function definirExpressao(satisfacao) {
  if (satisfacao >= 80) return "feliz";
  if (satisfacao >= 40) return "neutro";
  satisfacaoAtual <= 0 ? clienteFoiEmbora() : buscarPergunta();

  return "raiva";

}


function atualizarExpressaoCliente(satisfacao) {
  const expressao = definirExpressao(satisfacao);
  const personagem = document.getElementById("personagem").querySelector("img");
  const idCliente = personagem.dataset.idCliente;
  personagem.src = `/faeyra-main/front-end/imagens/clientes/${idCliente}_${expressao}.png`;
}
