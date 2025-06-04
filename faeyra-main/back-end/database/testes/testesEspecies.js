const ConnectionFactory = require('../connectionFactory');
const Especie = require('../../especieClasse');
const EspecieDAO = require('../DAO/especieDAO');

const fabrica = new ConnectionFactory();
const connection = fabrica.returnConnnection();
const especieDAO = new EspecieDAO(connection);

const novoespecie = new Especie("GNOMO", 100,);
console.log(novoespecie)

connection.connect(err => {
  if (err) {
    return console.error("Erro na conexão: ", err);
  }

  especieDAO.criarTabela((err) => {
    if (err) return console.error("Erro ao criar tabela:", err);

    especieDAO.inserir(novoespecie, (err, res) => {
      if (err) return console.error("Erro ao inserir:", err);

      console.log("especie inserido:", res.insertId);

      especieDAO.listar((err, results) => {
        if (err) return console.error("Erro ao listar:", err);

        console.log("especies encontrados:", results);

        connection.end();
      });
    });
  });
});
