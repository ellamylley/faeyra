class ProdutoDAO {
  constructor(connection) {
    this.connection = connection;
  }

  criarTabela(callback) {
    const sql = `
      CREATE TABLE IF NOT EXISTS produto (
        id_produto BIGINT NOT NULL AUTO_INCREMENT,
        nome_produto VARCHAR(100),
        preco DECIMAL (4,2),
        PRIMARY KEY (id_produto)
      );`;
    this.connection.query(sql, callback);
  }

  inserir(produto, callback) {
    const sql = 'INSERT INTO produto(nome_produto, preco) VALUES (?, ?);';
    this.connection.query(sql, [
      produto.nome_produto,
      produto.preco
    ], callback);
  }

  listar(callback) {
    const sql = 'SELECT * FROM produto;';
    this.connection.query(sql, callback);
  }

  apagarTabela(callback) {
    const sql = 'DROP TABLE IF EXISTS produto;';
    this.connection.query(sql, callback);
  }


  buscarAleatorio(callback) {
    const sql = `SELECT * FROM produto ORDER BY RAND() LIMIT 1`;

    this.connection.query(sql, (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]); 
    });
  }
}

module.exports = ProdutoDAO;
