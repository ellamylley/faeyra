const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

// DAOs
const JogadorDAO = require('./database/DAO/jogadorDAO')
const ClienteDAO = require('./database/DAO/clienteDAO')
const EspecieDAO = require('./database/DAO/especieDAO')
const PerguntaDAO = require('./database/DAO/perguntaDAO')
const RespostaDAO = require('./database/DAO/respostaDAO')
const ProdutoDAO = require('./database/DAO/produtoDAO')
const EstoqueDAO = require('./database/DAO/estoqueDAO')

// Classes
const Jogador = require('./classes/jogadorClasse')
const Cliente = require('./classes/clienteClasse')
const Especie = require('./classes/especieClasse')
const Pergunta = require('./classes/perguntaClasse')
const Resposta = require('./classes/respostaClasse')
const Produto = require('./classes/produtoClasse')
const Estoque = require('./classes/estoqueClasse')

const SECRET = 'secret'

const app = express()

// Middlewares
app.use(cors({
    origin: 'http://127.0.0.1:5500', // ou http://localhost:5500
    credentials: true
}))
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/static', express.static(path.join(__dirname, '..', 'front-end')));

// Conexão MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db'
})

const jogadorDAO = new JogadorDAO(connection)
const clienteDAO = new ClienteDAO(connection)
const especieDAO = new EspecieDAO(connection)
const perguntaDAO = new PerguntaDAO(connection)
const respostaDAO = new RespostaDAO(connection)
const produtoDAO = new ProdutoDAO(connection)
const estoqueDAO = new EstoqueDAO(connection)

connection.connect(err => {
    if (err) throw err
    console.log('Conectado ao banco.')
})

// Middleware de autenticação
function verificarToken(req, res, next) {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ error: 'Token não existe' })

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Token inválido' })
        req.id_jogador = decoded.id
        next()
    })
}

// Cadastro de jogador
app.post('/cadastro', (req, res) => {
    const { nome, senha, dinheiro, chances } = req.body
    const jogador = new Jogador(nome, senha, dinheiro, chances)
    jogador.senha = senha

    jogadorDAO.inserir(jogador, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(201).json({ message: 'Jogador criado!', id: results.insertId })
    })
})

// Login
app.post('/login', (req, res) => {
    const { nome, senha } = req.body

    jogadorDAO.buscarJogador(nome, (err, jogador) => {

        if (err) return res.status(500).json({ error: err.message })
        if (!jogador || jogador.senha !== senha) {
            return res.status(401).json({ error: 'Usuário ou senha incorreta' })
        }

        const token = jwt.sign({ id: jogador.id, nome: jogador.nome }, SECRET, { expiresIn: '24h' })
        res.cookie('token', token, { httpOnly: true })
        res.json({ message: 'Login realizado' })
    })
})

// Listar jogadores
app.get('/jogadores', (req, res) => {
    jogadorDAO.listar((err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results)
    })
})

// Listar respostas por id_pergunta
app.get('/respostas/:id_pergunta', (req, res) => {
    const id = req.params.id_pergunta;

    respostaDAO.listarPorPergunta(id, (erro, resultados) => {
        if (erro) {
            res.status(500).json({ error: 'Erro ao buscar respostas.' });
        } else {
            res.json(resultados);
        }
    });
});


// Adicionar cliente
app.post('/clientes', (req, res) => {
    const { id_especie, nome_cliente } = req.body
    const cliente = new Cliente(id_especie, nome_cliente)

    clienteDAO.inserir(cliente, (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(201).json({ message: 'Cliente inserido com sucesso' })
    })
})

// Adicionar espécie
app.post('/especie', (req, res) => {
    const { nome_especie, satisfacao_minima } = req.body
    const especie = new Especie(nome_especie, satisfacao_minima)

    especieDAO.inserir(especie, (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(201).json({ message: 'Espécie inserida com sucesso' })
    })
})

// Adicionar produto
app.post('/produtos', (req, res) => {
    const { nome_produto, preco } = req.body
    const produto = new Produto(nome_produto, preco)

    produtoDAO.inserir(produto, (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(201).json({ message: 'Produto inserido com sucesso' })
    })
})

// Listar produtos
app.get('/produtos', (req, res) => {
    produtoDAO.listar((err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results)
    })
})

// Listar produtos (em estoque)
app.get('/estoque', (req, res) => {
    estoqueDAO.listar((err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results)
    })
})

// Buscar cliente aleatório
app.get('/clientes', (req, res) => {
    clienteDAO.buscarAleatorio((err, cliente) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!cliente) return res.status(404).json({ error: 'Nenhum cliente encontrado' });
        res.json(cliente);
    });
});

// Escolha do produto pelo cliente
let pedidoAtual = null;
app.get('/randomProduto', (req, res) => {
    produtoDAO.buscarAleatorio((err, produto) => {
        if (err) return res.status(500).json({ error: err.message })
        if (!produto) return res.status(404).json({ error: 'Produto não encontrado' })
            pedidoAtual = produto
        res.json(produto)
    })
})

// Venda de produto para cliente
app.post('/venda', (req, res) => {
    const { id_produto_entregue } = req.body
    if (!pedidoAtual) {
        return res.status(400).json({sucesso: false, message: 'Pedido não relacionado.'})
    }
    if (!id_produto_entregue) {
        return res.status(400).json({sucesso: false, message: 'ID do produto não encontrado'})
    }

    if(id_produto_entregue === pedidoAtual.id) {
        pedidoAtual = null
        return res.json({ sucesso: true, message: 'Produto correto.' })
    }
    return res.json({ sucesso: false, message: 'Produto incorreto.'})
})

// Buscar pergunta aleatória
app.get('/perguntas', (req, res) => {
    perguntaDAO.buscarAleatorio((err, pergunta) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(pergunta)
    })
})

// Comprar produto (adicionar ao estoque; função descartada)
app.post('/comprar', verificarToken, (req, res) => {
    const { id_produto, quantidade, preco_cliente } = req.body
    const estoque = new Estoque(id_produto, req.id_jogador, quantidade, preco_cliente)

    estoqueDAO.inserir(estoque, (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(201).json({ message: 'Compra realizada com sucesso' })
    })
})

// Atualizar jogador
app.put('/jogadores/:id', (req, res) => {
    const id = req.params.id;
    const { nome, senha, dinheiro, chances } = req.body;
    const jogador = new Jogador(nome, senha, dinheiro, chances)
    
    jogadorDAO.atualizarJogador(id, jogador, (err, results) => {
        if (err) throw new err;
        res.json({ message: 'Jogador atualizado' })
    })
})

// Deletar jogador
app.delete('/jogadores/:id', (req, res) => {
    const id = req.params.id
    jogadorDAO.deletar(id, (err, results) => {
        if (err) throw new err;
        res.json({message: 'Jogador deletado'})
    })
})

// Iniciar servidor
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}.`)
})
