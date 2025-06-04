const ConnectionFactory = require('../connectionFactory');
const Cliente = require('../../clienteClasse');
const ClienteDAO = require('../DAO/clienteDAO');

const fabrica = new ConnectionFactory();
const connection = fabrica.returnConnnection();
const clienteDAO = new ClienteDAO(connection);

const novocliente = new Cliente(1, 1, 'alia');

connection.connect(err => {
  if (err) {
    return console.error("Erro na conexão: ", err);
  }

  clienteDAO.criarTabela((err) => {
    if (err) return console.error("Erro ao criar tabela:", err);

    clienteDAO.inserir(novocliente, (err, res) => {
      if (err) return console.error("Erro ao inserir:", err);

      console.log("cliente inserido:", res.insertId);

      clienteDAO.listar((err, results) => {
        if (err) return console.error("Erro ao listar:", err);

        console.log("clientees encontrados:", results);

        connection.end();
      });
    });
  });
});
