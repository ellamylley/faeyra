function iniciarAtendimento() {
  atualizarVidas();
  buscarCliente();

  moverPersonagem('entrar', () => {
    buscarPergunta();
    mostrarDiv('pergunta');
    mostrarDiv('respostas');
    
  });
}

function finalizarAtendimento() {
  ocultarDiv('end')
  ocultarDiv('pergunta');
  moverPersonagem('sair', () => {

  });
}