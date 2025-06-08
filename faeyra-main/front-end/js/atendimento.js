function iniciarAtendimento() {
  buscarCliente();
  moverPersonagem('entrar', () => {
    buscarPergunta();
    mostrarDiv('pergunta');
  });
}

function finalizarAtendimento() {
  ocultarDiv('end')
  ocultarDiv('pergunta');
  moverPersonagem('sair', () => {
    
  });
}