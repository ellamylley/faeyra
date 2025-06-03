const {
    sql_create_table, sql_drop_table,
    sql_insert, sql_lista_todos,
    open_connection, create_table_jogador,
    drop_table_jogador, inserir_jogador,
    lista_jogador, close
} = require('./jogadorBanco');

const Jogador = require('../jogadorClasse');

const jogador1 = new Jogador('Lucas', 100.50);
const jogador2 = new Jogador('Ana', 75.20);

const con = open_connection();


lista_jogador(con, sql_lista_todos, (jogadores) => {
    console.log('Lista de jogadores:');
    console.table(jogadores);

    close(con);
});

