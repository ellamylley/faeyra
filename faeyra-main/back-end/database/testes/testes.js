const ConnectionFactory = require('../connectionFactory');

const JogadorDAO = require('../DAO/jogadorDAO');
const EspecieDAO = require('../DAO/especieDAO');
const ProdutoDAO = require('../DAO/produtoDAO');
const ClienteDAO = require('../DAO/clienteDAO');
const PerguntaDAO = require('../DAO/perguntaDAO');
const RespostaDAO = require('../DAO/respostaDAO');
const EstoqueDAO = require('../DAO/estoqueDAO');

const Jogador = require('../../classes/jogadorClasse');
const Especie = require('../../classes/especieClasse');
const Produto = require('../../classes/produtoClasse');
const Cliente = require('../../classes/clienteClasse');
const Pergunta = require('../../classes/perguntaClasse');
const Resposta = require('../../classes/respostaClasse');
const Estoque = require('../../classes/estoqueClasse');


const fabrica = new ConnectionFactory();
const connection = fabrica.returnConnnection();

const jogadorDAO = new JogadorDAO(connection);
const especieDAO = new EspecieDAO(connection);
const produtoDAO = new ProdutoDAO(connection);
const clienteDAO = new ClienteDAO(connection);
const perguntaDAO = new PerguntaDAO(connection);
const respostaDAO = new RespostaDAO(connection);
const estoqueDAO = new EstoqueDAO(connection);

const jogadorTeste = new Jogador('Manu', 100.00, 3);
const especieTeste = new Especie('GNOMO', 90);
const produtoTeste = new Produto('OLHO', 10.00);
const clienteTeste = new Cliente(1, 1, 'Aurora');
const perguntaTeste = new Pergunta('Qual o seu nome?');
const respostaTeste = new Resposta(1, 'AURORA');
const estoqueTeste = new Estoque(1, 1, 10, 5.50);

function conectar() {
  connection.connect((err) => {
    if (err) return console.error('Erro ao conectar:', err);
    console.log('Conectado ao banco.');
    criarTabelas();
  });
}

function criarTabelas() {
  jogadorDAO.criarTabela((err) => {
    if (err) return console.error('Erro ao criar jogador:', err);
    especieDAO.criarTabela((err) => {
      if (err) return console.error('Erro ao criar especie:', err);
      produtoDAO.criarTabela((err) => {
        if (err) return console.error('Erro ao criar produto:', err);
        estoqueDAO.criarTabela((err) => {
          if (err) return console.error('Erro ao criar estoque:', err);
          clienteDAO.criarTabela((err) => {
            if (err) return console.error('Erro ao criar cliente:', err);
            perguntaDAO.criarTabela((err) => {
              if (err) return console.error('Erro ao criar pergunta:', err);
              respostaDAO.criarTabela((err) => {
                if (err) return console.error('Erro ao criar resposta:', err);
                inserirDados();
              });
            });
          });
        });
      });
    });
  });
}


function inserirDados() {
  jogadorDAO.inserir(jogadorTeste, (err) => {
    if (err) return console.error('Erro jogador:', err);

    especieDAO.inserir(especieTeste, (err) => {
      if (err) return console.error('Erro espécie:', err);

      produtoDAO.inserir(produtoTeste, (err) => {
        if (err) return console.error('Erro produto:', err);

        estoqueDAO.inserir(estoqueTeste, (err) => {
          if (err) return console.error('Erro produto:', err);

          clienteDAO.inserir(clienteTeste, (err) => {
            if (err) return console.error('Erro cliente:', err);

            perguntaDAO.inserir(perguntaTeste, (err) => {
              if (err) return console.error('Erro pergunta:', err);

              respostaDAO.inserir(respostaTeste, (err) => {
                if (err) return console.error('Erro resposta:', err);

                buscarEListar();
              });
            });
          });
        });
      });
    });
  });
}

function buscarEListar() {
  perguntaDAO.buscarAleatorio((err, pergunta) => {
    if (err) return console.error("Erro buscar pergunta:", err);
    console.log("Pergunta aleatória:", pergunta);

    produtoDAO.buscarAleatorio((err, produto) => {
      if (err) return console.error("Erro buscar produto:", err);
      console.log("Produto aleatório:", produto);

      produtoDAO.listar((err, produtos) => {
        console.log('\nProdutos:');
        console.table(produtos);

        especieDAO.listar((err, especies) => {
          console.log('\nEspécies:');
          console.table(especies);

          jogadorDAO.listar((err, jogadores) => {
            console.log('\nJogadores:');
            console.table(jogadores);

            clienteDAO.listar((err, clientes) => {
              console.log('\nClientes:');
              console.table(clientes);

              perguntaDAO.listar((err, perguntas) => {
                console.log('\nPerguntas:');
                console.table(perguntas);

                respostaDAO.listar((err, respostas) => {
                  console.log('\nRespostas:');
                  console.table(respostas);

                  estoqueDAO.listar((err, estoque) => {
                    console.log('\nEstoque:');
                    console.table(estoque);

                    connection.end(() => {
                      console.log('\nTeste finalizado.');
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

// Iniciar testes
conectar();
