const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const JogadorDAO = require('./database/DAO/jogadorDAO.')
const ClienteDAO = require('./database/DAO/clienteDAO')
const EspecieDAO = require('./database/DAO/especieDAO')
const PerguntaDAO = require('./database/DAO/perguntaDAO')
const RespostaDAO = require('./database/DAO/respostaDAO')
const ProdutoDAO = require('./database/DAO/produtoDAO')
const EstoqueDAO = require('./database/DAO/estoqueDAO')

const Jogador = require('./classes/jogadorClasse')
const Cliente = require('./classes/clienteClasse')
const Especie = require('./classes/especieClasse')
const Pergunta = require('./classes/perguntaClasse')
const Resposta = require('./classes/respostaClasse')
const Produto = require('./classes/produtoClasse')
const Estoque = require('./classes/estoqueClasse')

const SECRET = 'secret'

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())

//conexão ao banco
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
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco.')
})

//autenticar usuário
function verificarToken(req, res, next) {
    const token = req.cookies.token
    if(!token) return res.status(401).json({ error: 'Token não existe'})

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Token inválido'})
        req.id_jogador = decoded.id
        next()
    })
}

//cadastro
app.post('/cadastro', (req, res) => {
    const {nome, senha, dinheiro, chances} = req.body
    const jogador = new Jogador(nome, dinheiro, chances)
    jogador.senha = senha

    jogadorDAO.inserir(jogador, (err, results) => {
        if (err) throw err
        res.status(201).json({ message: 'Jogador criado!', id: results.insertId})
    })
})

//login
app.post('/login', (req, res) => {
    const {nome, senha} = req.body

    jogadorDAO.buscarJogador(nome, (err, jogador) => {
        if (err) throw err
        if(!jogador || jogador.senha !== senha) {
            return res.status(401).json({error: 'Usuário ou senha incorreta'})
        }

        const token = jwt.sign({id: jogador.id, nome: jogador.nome}, SECRET, {expiresIn: '24h'})
        res.cookie('token', token, {httpOnly: true})
        res.json({message: 'Login realizado'})
    })
})

//rotas

//lista de jogadores cadastrados
app.get('/jogadores', (req, res) => {
    jogadorDAO.listar((err, results) => {
        if (err)
            return res.status(500).json({error: err.message})
        res.json(results)
    })
})

//adicionar clientes
app.post('/clientes', (req, res) => {
    const {id_especie, id_jogador, nome_cliente} = req.body;
    const cliente = new Cliente(id_especie, id_jogador, nome_cliente)

    clienteDAO.inserir(cliente, (err) => {
        if (err) throw err
    })
})

//adicionar especies
app.post('/especie', (req, res) => {
    const {nome_especie, satisfacao_minima} = req.body;
    const especie = new Especie(nome_especie, satisfacao_minima)

    especieDAO.inserir(cliente, (err) => {
        if (err) throw err
    })
})

//adicionar produtos
app.post('/produtos', (req, res) => {
    const {nome_produto, preco} = req.body
    const produto = new Produto(nome_produto, preco)

    produtoDAO.inserir(produto, (err) => {
        if (err) throw err
    })
})

//sorteio de perguntas
app.get('perguntas', (req, res) => {
    perguntaDAO.buscarAleatorio((err, pergunta) => {
        if (err) return res.status(500).json({error: err.message})
            res.json(pergunta)
    })
})

//compra de produtos para estoque do jogador
app.post('/comprar', verificarToken, (req, res) => {
    const {id_produto, quantidade, preco_cliente} = req.body
    const estoque = new Estoque(id_produto, req.jogador.id, quantidade, preco_cliente)

    estoqueDAO.inserir(estoque, (err) => {
        if (err) throw err
    })
})
//inicio servidor
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}.`)
})