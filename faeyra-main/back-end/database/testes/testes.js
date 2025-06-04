const ConnectionFactory = require('../connectionFactory');
const Jogador = require('../../jogadorClasse');
const JogadorDAO = require('../DAO/jogadorDAO');

const fabrica = new ConnectionFactory();
const connection = fabrica.returnConnnection();
const jogadorDAO = new JogadorDAO(connection);

const novoJogador = new Jogador("", 25.50);

connection.connect(err => {
  if (err) {
    return console.error("Erro na conexão: ", err);
  }

  jogadorDAO.criarTabela((err) => {
    if (err) return console.error("Erro ao criar tabela:", err);

    jogadorDAO.inserir(novoJogador, (err, res) => {
      if (err) return console.error("Erro ao inserir:", err);

      console.log("Jogador inserido:", res.insertId);

      jogadorDAO.listar((err, results) => {
        if (err) return console.error("Erro ao listar:", err);

        console.log("Jogadores encontrados:", results);

        connection.end();
      });
    });
  });
});
