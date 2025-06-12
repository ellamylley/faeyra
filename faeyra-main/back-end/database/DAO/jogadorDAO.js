class JogadorDAO {
  constructor(connection) {
    this.connection = connection;
  }

  criarTabela(callback) {
    const sql = `
      CREATE TABLE IF NOT EXISTS jogador (
        id BIGINT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(10),
        senha VARCHAR(128),
        dinheiro DECIMAL(5,2),
        chances INT(1),
        PRIMARY KEY (id)
      );`;
    this.connection.query(sql, callback);
  }

  inserir(jogador, callback) {
    const sql = 'INSERT INTO jogador(nome, senha, dinheiro, chances) VALUES (?, ?, ?, ?);';
    this.connection.query(sql, [jogador.nome, jogador.senha, jogador.dinheiro, jogador.chances], (err, results) => {
      if (err) return callback(err)
      callback(null, results.insertId)
    });
  }

  listar(callback) {
    const sql = 'SELECT * FROM jogador;';
    this.connection.query(sql, callback);
  }

  apagarTabela(callback) {
    const sql = 'DROP TABLE IF EXISTS jogador;';
    this.connection.query(sql, callback);
  }

  buscarJogador(nome, callback) {
    const sql = 'SELECT * FROM jogador WHERE nome = ?'
    this.connection.query(sql, [nome], (err, results) => {
        if (err) return callback(err)
        callback(null, results[0])
    })
}  

buscarJogadorId(id, callback) {
  const sql = 'SELECT * FROM jogador WHERE id = ?'
  this.connection.query(sql, [id], (err, results) => {
      if (err) return callback(err)
      callback(null, results[0])
  })
}

  atualizarJogador(id, jogador, callback) {
    const sql = 'UPDATE jogador SET nome = ?, senha = ? WHERE id = ?'
    const valores = [jogador.nome, jogador.senha, id]
    this.connection.query(sql, valores, (err, results) => {
      if (err) return callback(err)
        callback(null, results[0])
    })
  }

  deletarJogador(id, callback) {
    const sql = 'DELETE FROM jogador WHERE id = ?';
    this.connection.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
  

}

module.exports = JogadorDAO;
