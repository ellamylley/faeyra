const mysql = require('mysql2');
const Jogador = require('../jogadorClasse');
const ConnectionFactory = require('./connectionFactory')

const sql_create_table = `CREATE TABLE db.jogador (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(10),
    dinheiro DECIMAL(5,2),
    PRIMARY KEY (id)
);`;

const sql_drop_table = `DROP TABLE jogador;`;
const sql_insert = `INSERT INTO jogador(nome, dinheiro) VALUES (?, ?);`;
const sql_lista_todos = `SELECT * FROM jogador;`;


function open_connection() {
    console.log("Conectando...");
    let fabrica = new ConnectionFactory();
    const connection = fabrica;
    connection.connect(function (err) {
        if (err) {
            console.error('Erro ao conectar: ' + err.stack);
            return;
        }
        console.log('Conexão ID: ' + connection.threadId);
    });
    return connection;
}

function create_table_jogador(con, sql) {
    console.log("Criando tabela jogador...");
    con.query(sql, function (err) {
        if (err) return console.error('Erro ao criar tabela: ' + err);
        console.log("Tabela criada com sucesso.");
    });
}

function drop_table_jogador(con, sql) {
    console.log("Apagando tabela jogador...");
    con.query(sql, function (err) {
        if (err) return console.error('Erro ao apagar tabela: ' + err);
        console.log("Tabela apagada com sucesso.");
    });
}

function inserir_jogador(con, jogador, callback) {
    console.log("Inserindo jogador...");
    con.query(sql_insert, [jogador.nome, jogador.dinheiro], function (err, results) {
        if (err) return console.error('Erro ao inserir: ' + err);
        callback(results);
    });
}

function lista_jogador(con, sql, callback) {
    console.log("Consultando jogadores...");
    con.query(sql, function (err, results, fields) {
        if (err) return console.error('Erro: ' + err);
        callback(results, fields);
    });
}

function close(con) {
    console.log("Fechando conexão...");
    con.end(function (err) {
        if (err) return console.error('Erro ao fechar conexão: ' + err);
    });
}

module.exports = {
    sql_create_table, sql_drop_table,
    sql_insert, sql_lista_todos,
    open_connection, create_table_jogador,
    drop_table_jogador, inserir_jogador,
    lista_jogador, close
};


