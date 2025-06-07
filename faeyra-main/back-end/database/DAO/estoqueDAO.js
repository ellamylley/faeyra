class EstoqueDAO {
    constructor(connection) {
        this.connection = connection;
    }

   criarTabela(callback) {
    const sql = `
        CREATE TABLE IF NOT EXISTS estoque (
            id_estoque BIGINT AUTO_INCREMENT PRIMARY KEY,
            id_produto BIGINT NOT NULL,
            id_jogador BIGINT NOT NULL,
            quantidade INT,
            preco_cliente DECIMAL(10, 2),
            FOREIGN KEY (id_jogador) REFERENCES jogador(id),
            FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
        );
    `;
    this.connection.query(sql, callback);
}


    inserir(estoque, callback) {
        const sql = `
            INSERT INTO estoque (id_produto, id_jogador, quantidade, preco_cliente)
            VALUES (?, ?, ?, ?);
        `;
        this.connection.query(sql, [
            estoque.id_produto,
            estoque.id_jogador,
            estoque.quantidade,
            estoque.preco_cliente,
        ], callback);
    }

    listar(callback) {
        const sql = `SELECT * FROM estoque`;
        this.connection.query(sql, callback);
    }

    apagarTabela(callback) {
        const sql = `DROP TABLE IF EXISTS estoque;`;
        this.connection.query(sql, callback);
    }
}

module.exports = EstoqueDAO;
