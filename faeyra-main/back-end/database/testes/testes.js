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

const jogadorTeste = new Jogador('Manu', 'manusenha', 100.00, 3);
const especieTeste = new Especie('GNOMO', 90);
const produtoTeste = new Produto('OLHO', 10.00);
const clienteTeste = new Cliente(1, 'Aurora', 70);
const perguntaTeste = new Pergunta('Qual o seu nome?');
const respostaTeste = new Resposta(1, 'AURORA');
const estoqueTeste = new Estoque(1, 1, 10, 5.50);
const jogadorTesteUpdate = new Jogador('NovaManu', 'novamanusenha', 100.00, 3)

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
  jogadorDAO.inserir(jogadorTeste, (err, idJogadorTeste) => {
    if (err) return console.error('Erro jogador:', err);
    jogadorTeste.id = idJogadorTeste

    especieDAO.inserir(especieTeste, (err, idEspecie) => {
      if (err) return console.error('Erro espécie:', err);
      especieTeste.id = idEspecie

      produtoDAO.inserir(produtoTeste, (err, idProduto) => {
        if (err) return console.error('Erro produto:', err);
        produtoTeste.id = idProduto

        estoqueTeste.id_jogador = idJogadorTeste
        estoqueTeste.id_produto = idProduto
        estoqueDAO.inserir(estoqueTeste, (err, idEstoque) => {
          if (err) return console.error('Erro produto:', err);
          estoqueTeste.id = idEstoque

          clienteTeste.id_especie = idEspecie
          clienteDAO.inserir(clienteTeste, (err, idCliente) => {
            if (err) return console.error('Erro cliente:', err);
            clienteTeste.id = idCliente

            perguntaDAO.inserir(perguntaTeste, (err, idPergunta) => {
              if (err) return console.error('Erro pergunta:', err);
              perguntaTeste.id = idPergunta

              respostaTeste.id = idPergunta
              respostaDAO.inserir(respostaTeste, (err, idResposta) => {
                if (err) return console.error('Erro resposta:', err);
                respostaTeste.id = idResposta

                alterarDados();
                deletarDados(jogadorTeste.id);
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

function alterarDados() {
  const id = jogadorTeste.id
  jogadorDAO.atualizarJogador(jogadorTeste.id, jogadorTesteUpdate, (err) => {
    if (err) return console.error('Erro ao alterar jogador', err)
  })

  especieDAO.atualizarEspecie(especieTeste.id, new Especie('GOBLIN', 85), (err) => {
    if (err) return console.error('Erro ao alterar espécie', err);
  });

  produtoDAO.atualizarProduto(produtoTeste.id, new Produto('OLHO MODIFICADO', 20.00), (err) => {
    if (err) return console.error('Erro ao alterar produto', err);
  });

  clienteDAO.atualizarCliente(clienteTeste.id, new Cliente(especieTeste.id, 'Aurora MODIFICADA', 80), (err) => {
    if (err) return console.error('Erro ao alterar cliente', err);
  });

  perguntaDAO.atualizarPergunta(perguntaTeste.id, new Pergunta('Qual seu monstro favorito?'), (err) => {
    if (err) return console.error('Erro ao alterar pergunta', err);
  });

  respostaDAO.atualizarResposta(respostaTeste.id, new Resposta(perguntaTeste.id, 'DRAGÃO', 10), (err) => {
    if (err) return console.error('Erro ao alterar resposta', err);
  });

  estoqueDAO.atualizarEstoque(estoqueTeste.id, new Estoque(jogadorTeste.id, produtoTeste.id, 30, 12.75), (err) => {
    if (err) return console.error('Erro ao alterar estoque', err);
  });
}

function deletarDados(id) {
  jogadorDAO.deletarJogador(id, (err) => {
    if (err) return console.error('Erro ao deletar jogador', err);
  })

  especieDAO.deletarEspecie(especieTeste.id, (err) => {
    if (err) return console.error('Erro ao deletar espécie', err);
  });

  produtoDAO.deletarProduto(produtoTeste.id, (err) => {
    if (err) return console.error('Erro ao deletar produto', err);
  });

  clienteDAO.deletarCliente(clienteTeste.id, (err) => {
    if (err) return console.error('Erro ao deletar cliente', err);
  });

  perguntaDAO.deletarPergunta(perguntaTeste.id, (err) => {
    if (err) return console.error('Erro ao deletar pergunta', err);
  });

  respostaDAO.deletarResposta(respostaTeste.id, (err) => {
    if (err) return console.error('Erro ao deletar resposta', err);
  });

  estoqueDAO.deletarEstoque(estoqueTeste.id, (err) => {
    if (err) return console.error('Erro ao deletar estoque', err);
  });
}

// Iniciar testes
conectar();
