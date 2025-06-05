function criarBanco(callback) {
    const sql = `
      CREATE DATABASE IF NOT EXISTS db`;
    this.connection.query(sql, callback);
  }

  module.exports = criarBanco;


