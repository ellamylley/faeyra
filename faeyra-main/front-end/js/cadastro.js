document.getElementById('formularioCadastro').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nome = document.getElementById('cadastro-nome').value
  const senha = document.getElementById('cadastro-senha').value

  const dados = {
    nome: nome,
    senha: senha,
    dinheiro: 0.00,
    chances: 3
  }

  try {
    const resposta = await fetch('http://localhost:3000/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })

    const json = await resposta.json()

    if (resposta.ok) {
      localStorage.setItem('nomeJogador', nome)
      localStorage.setItem('dinheiro', dados.dinheiro)
    
      alert('Cadastro realizado com sucesso!')
      window.location.href = '/faeyra-main/front-end/tutorial/paginatutorial.html'
    }
    else {
      alert('Erro no cadastro: ' + json.error)
    }
  } catch (erro) {
    console.error('Erro na requisição:', erro)
    alert('Erro ao conectar com o servidor.')
  }
})

