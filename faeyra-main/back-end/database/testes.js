const {
    sql_create_table, sql_drop_table,
    sql_insert, sql_lista_todos,
    open_connection, create_table_jogador,
    drop_table_jogador, inserir_jogador,
    lista_jogador, close
} = require('./jogadorBanco');

const Jogador = require('../jogadorClasse');
// const ConnectionFactory = require('./connectionFactory')

const jogador1 = new Jogador('Lucas', 100.50);
const jogador2 = new Jogador('Ana', 75.20);

const conexao = open_connection();
console.log(conexao)

create_table_jogador(conexao, sql_create_table);
inserir_jogador(conexao, jogador1, c => console.log('tabela criada com sucesso!'))
inserir_jogador(conexao, jogador2, c => console.log('jogador inserido com sucesso!'))

lista_jogador(conexao, sql_lista_todos, (jogadores) => {
    console.log('Lista de jogadores:');
    console.table(jogadores);

    close(conexao);
});

