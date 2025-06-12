const mysql = require('mysql2');
const criarDatabase = require('./DAO/databaseDAO');
class ConnectionFactory {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'db'
        });
    }
    connect() {

        this.connection.connect(function (err) {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:' + err);
                return;
            }
            console.log('Conexão bem-sucedida');

        });
    }
    end() {
        this.connection.end(function (err) {
            if (err) {
                console.error('Erro ao encerrar conexão com BD:');
                return;
            }
            console.log('Conexão encerrada.');
        });
    }

    returnConnnection(){
        return this.connection;
    }

}

module.exports = ConnectionFactory;
