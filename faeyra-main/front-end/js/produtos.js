let produtosDisponiveis = [];
let pedidoAtualPreco = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/listaProduto')
        .then(res => {
            if (!res.ok) {
                throw new Error('Produto não encontrado.')
            }
            return res.json()
        })
        .then(data => {

            produtosDisponiveis = data;

            data.forEach((produto, index) => {
                const posicao = document.getElementById(`produto${index + 1}`);
                if (posicao) {
                    let img = posicao.querySelector('img');

                    img.src = `/faeyra-main/front-end/imagens/produtos/${produto.id_produto}.png`;
                }

                posicao.setAttribute('data-id', produto.id_produto); //adiciona o id ao produto
            })

            porProdutoNoBalcao();
        })
        .catch(err => console.error("Erro ao carregar produtos:", err));
})


function porProdutoNoBalcao() {
    const produtos = document.querySelectorAll('.produto');
    const carrinho = document.getElementById('carrinho');

    produtos.forEach(produto => {
        produto.addEventListener('click', () => {
            const novoProduto = document.createElement('div');
            novoProduto.className = 'produto';
            novoProduto.innerHTML = produto.innerHTML;
            const id = produto.getAttribute('data-id');
            novoProduto.setAttribute('data-id', id);
            carrinho.appendChild(novoProduto);
            atualizarTotal();
        });
    });
}

function atualizarTotal() {
    const itensCarrinho = document.querySelectorAll('#carrinho .produto');
    let total = 0;

    itensCarrinho.forEach(item => {
        const id = item.getAttribute('data-id');
        const produto = produtosDisponiveis.find(p => p.id_produto == id);
        if (produto) {
            total += parseFloat(produto.preco);
        }
    });

    return total;


}

function pedirProdutoAleatorio() {
    fetch('http://localhost:3000/produtoAleatorio')
        .then(res => {
            if (!res.ok) throw new Error("Nenhum produto encontrado.");
            return res.json();
        })
        .then(data => {
            console.log(data)
            let produto = data;
            let quantidade = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
            if (produto) {
                document.getElementById('pergunta').textContent = `Eu quero ${quantidade} ${produto.nome_produto}, por favor`;
                pedidoAtualPreco = produto.preco * quantidade;
                mostrarDiv('caixaRegistradora');
                mostrarDiv('carrinho')
                console.log('1 '+satisfacaoAtual)
            }
        })
        .catch(err => console.error("Erro ao pedir produto aleatório:", err));
}

function verificarPedido() {
    const totalCarrinho = atualizarTotal();
    const valorDigitado = parseFloat(document.getElementById('valorTotal').value);
    const valorCarrinhoCorreto = Math.round(totalCarrinho * 100) === Math.round(pedidoAtualPreco * 100);
    const valorDigitadoCorreto = Math.round(valorDigitado * 100) === Math.round(pedidoAtualPreco * 100)
    console.log(pedidoAtualPreco);
    console.log(totalCarrinho);
    console.log(valorDigitado);

    
    ;

    if (valorCarrinhoCorreto && valorDigitadoCorreto) {
        satisfacaoAtual +=20;

        let dinheiroAtual = parseFloat(localStorage.getItem('dinheiro'));
        dinheiroAtual += pedidoAtualPreco;
        localStorage.setItem('dinheiro', dinheiroAtual);
        const dinheiroTela = document.getElementById('dinheiro');
        if (dinheiroTela) {
            dinheiroTela.textContent = `${dinheiroAtual} citrinos`;
        }

    } else {
        satisfacaoAtual = 0;
    }

    console.log('1 '+satisfacaoAtual)
    atualizarExpressaoCliente(satisfacaoAtual);
    document.getElementById('carrinho').innerHTML = '';
    document.getElementById('valorTotal').value = '';
    ocultarDiv('carrinho');
    ocultarDiv('caixaRegistradora');
    if (!satisfacaoAtual == 0) buscarPergunta();
}



