function iniciarAtendimento() {
  atualizarVidas();
  buscarCliente();

  moverPersonagem('entrar', () => {
    mostrarDiv('pergunta');
    pedirProdutoAleatorio();
    console.log(satisfacaoAtual)

  });
}

function finalizarAtendimento() {
  ocultarDiv('pergunta');
  ocultarDiv('respostas');
  moverPersonagem('sair', () => {

  });
}