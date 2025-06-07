const express = require('express')
const mysql = require('mysql2')

const JogadorDAO = require('./database/DAO/jogadorDAO.')
const ClienteDAO = require('./database/DAO/clienteDAO')
const EspecieDAO = require('./database/DAO/especieDAO')
const PerguntaDAO = require('./database/DAO/perguntaDAO')
const Jogador = require('./classes/jogadorClasse')
const Cliente = require('./classes/clienteClasse')
const Especie = require('./classes/especieClasse')

const app = express()
app.use(express.json())

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

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco', err)
        process.exit(1)
    }
    console.log('Conectado ao banco.')
})

//rotas

//criar jogador
app.post('/jogadores', (req, res) => {
    const { nome, senha, dinheiro, chances } = req.body
    const Jogador = new Jogador(nome, senha, dinheiro, chances)

    jogadorDAO.inserir(jogador, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
            res.status(201).json({ message: 'Jogador criado.', id: results.insertID})
    })
})

//lista de jogadores cadastrados
app.get('/jogadores', (req, res) => {
    jogadorDAO.listar((err, results) => {
        if (err)
            return res.status(500).json({error: err.message})
        res.json(results)
    })
})

//escolha de perguntas
app.get('pergunta', (req, res) => {
    perguntaDAO.buscarAleatorio((err, pergunta) => {
        if (err) return res.status(500).json({error: err.message})
            res.json(pergunta)
    })
})

//inicio servidor
const PORT = 5500
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}.`)
})