const ConnectionFactory = require('../connectionFactory');

const JogadorDAO = require('../DAO/jogadorDAO');
const EspecieDAO = require('../DAO/especieDAO');
const ProdutoDAO = require('../DAO/produtoDAO');
const ClienteDAO = require('../DAO/clienteDAO');
const PerguntaDAO = require('../DAO/perguntaDAO')

const Jogador = require('../../classes/jogadorClasse');
const Especie = require('../../classes/especieClasse');
const Produto = require('../../classes/produtoClasse');
const Cliente = require('../../classes/clienteClasse');
const Pergunta = require('../../classes/perguntaClasse')


const fabrica = new ConnectionFactory();
const connection = fabrica.returnConnnection();

const jogadorDAO = new JogadorDAO(connection);
const especieDAO = new EspecieDAO(connection);
const produtoDAO = new ProdutoDAO(connection);
const clienteDAO = new ClienteDAO(connection);
const perguntaDAO = new PerguntaDAO(connection);

const jogadorTeste = new Jogador('Lauren', 100.00, 3);
const especieTeste = new Especie('Bruxa', 90);
const produtoTeste = new Produto('Poção', 10.00);
const clienteTeste = new Cliente('1', '1', 'Aurora');
const perguntaTeste = new Pergunta('Qual o seu nome?')

function testarDAOs() {
  connection.connect((err) => {
    if (err) return console.error('Erro ao conectar ao banco:', err);
    console.log('Conectado ao banco.');

    jogadorDAO.criarTabela(() => {
      especieDAO.criarTabela(() => {
        produtoDAO.criarTabela(() => {
          clienteDAO.criarTabela(() => {
            perguntaDAO.criarTabela(() => {

              // Inserir jogador
              jogadorDAO.inserir(jogadorTeste, (err, resJogador) => {
                if (err) return console.error('Erro ao inserir jogador:', err);

                const id_jogador = resJogador.insertId;

                // Inserir especie
                especieDAO.inserir(especieTeste, (err, resEspecie) => {
                  if (err) return console.error('Erro ao inserir especie:', err);


                  // Inserir produto
                  produtoDAO.inserir(produtoTeste, (err) => {
                    if (err) return console.error('Erro ao inserir produto:', err);


                    clienteDAO.inserir(clienteTeste, (err) => {
                      if (err) return console.error('Erro ao inserir cliente:', err);

                      perguntaDAO.inserir(perguntaTeste, (err) => {
                        if (err) return console.error('Erro ao inserir pergunta:', err);

                        // Listar todos
                        console.log('\n Produtos:');
                        produtoDAO.listar((err, produtos) => {
                          console.table(produtos);

                          console.log('\n Espécies:');
                          especieDAO.listar((err, especies) => {
                            console.table(especies);

                            console.log('\nJogadores:');
                            jogadorDAO.listar((err, jogadores) => {
                              console.table(jogadores);

                              console.log('\nClientes');
                              clienteDAO.listar((err, clientes) => {
                                console.table(clientes);

                                console.log('\nPerguntas');
                                perguntaDAO.listar((err, perguntas) => {
                                  console.table(perguntas)

                                  connection.end(() => {
                                    console.log('\n"Teste finalizado.');
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

testarDAOs();