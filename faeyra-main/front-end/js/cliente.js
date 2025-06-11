let satisfacaoAtual = null;

//função que busca cliente
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
    })
    .catch(err => {
      console.error("Erro ao buscar cliente:", err.message);
    });
}

//função que define a expressão de acordo com a satisfação e manda o cliente embora se a satisfação zerar
function definirExpressao(satisfacao) {
  if (satisfacao >= 80) return "feliz";
  if (satisfacao >= 40) return "neutro";
  if(satisfacaoAtual <= 0) clienteFoiEmbora();

  return "raiva";

}

//funçao que atualiza a imagem do cliente de acordo coma expressão
function atualizarExpressaoCliente(satisfacao) {
  const expressao = definirExpressao(satisfacao);
  const personagem = document.getElementById("personagem").querySelector("img");
  const idCliente = personagem.dataset.idCliente;
  personagem.src = `/faeyra-main/front-end/imagens/clientes/${idCliente}_${expressao}.png`;
}
