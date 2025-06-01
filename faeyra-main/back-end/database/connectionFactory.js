const mysql = require('mysql2');
class ConnectionFactory {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost', // Endereço do banco de dados
            user: 'user', // Nome de usuário do banco de dados
            password: 'pass', // Senha do banco de dados
            database: 'db' // Nome do banco de dados
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

}

module.exports = ConnectionFactory;