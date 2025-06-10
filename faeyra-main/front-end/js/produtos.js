document.addEventListener('DOMContentLoaded', () => {
    fetch('/produtos')
    .then(res => {
        if (!res.ok) {
            throw new Error('Produto não encontrado.')
        }
        return res.json()
    })
    .then(data => {
        data.forEach((produto, index) => {
            const posicao = document.getElementById(`produto${index + 1}`)
            if (posicao) {
                posicao.textContent = produto.nome
                    posicao.addEventListener('click', () => {
                        venderProduto(produto.id_produto)
                    })
                }
            })
        })
     .catch(err => console.error("Erro ao carregar produtos:", err));
})

async function venderProduto(id_produto) {
    try {
        const resposta = await fetch('/venda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_produto_entregue: id_produto})
        })

        const result = await resposta.json()
        alert(result.message)
    } catch (err) {
        console.error('Erro: venda do produto', err)
    }
}