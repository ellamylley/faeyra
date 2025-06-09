document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formularioLogin')

    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault()
        const nome = document.getElementById('login-nome').value
        const senha = document.getElementById('login-senha').value

        try {
            const resposta = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ nome, senha })
            })

            if (resposta.ok) {
                localStorage.setItem('nomeJogador', nome) 

                alert('Login realizado com sucesso!')
                window.location.href = '/faeyra-main/front-end/tutorial/paginatutorial.html'
            }
            else {
                const erro = await resposta.json()
                alert('Erro ao fazer login: ' + erro.error)
            }
        } catch (erro) {
            console.error('Erro na requisição:', erro)
            alert('Erro na requisição.')
        }
    })
})
