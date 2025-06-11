class EspecieDAO {
  constructor(connection) {
    this.connection = connection;
  }

  criarTabela(callback) {
    const sql = `
      CREATE TABLE IF NOT EXISTS especie (
        id_especie BIGINT NOT NULL AUTO_INCREMENT,
        nome_especie VARCHAR(10),
        satisfacao_minima INT(3),
        PRIMARY KEY (id_especie)
      );`;
    this.connection.query(sql, callback);
  }

  inserir(especie, callback) {
    const sql = 'INSERT INTO especie(nome_especie, satisfacao_minima) VALUES (?, ?);';
    this.connection.query(sql, [
      especie.nome_especie,
      especie.satisfacao_minima
    ], callback);
  }

  listar(callback) {
    const sql = 'SELECT * FROM especie;';
    this.connection.query(sql, callback);
  }

  apagarTabela(callback) {
    const sql = 'DROP TABLE IF EXISTS especie;';
    this.connection.query(sql, callback);
  }

  atualizarEspecie(id, especie, callback) {
  const sql = `UPDATE especie SET nome_especie = ?, satisfacao_minima = ? WHERE id = ?`;
  const valores = [especie.nome_especie, especie.satisfacao_minima, id];
  this.connection.query(sql, valores, (err, results) => {
    if (err) return callback(err);
    callback(null);
  });
}

deletarEspecie(id, callback) {
  const sql = `DELETE FROM especie WHERE id = ?`;
  this.connection.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null);
  });
}

}

module.exports = EspecieDAO;
