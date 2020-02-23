/* eslint-disable no-unused-vars */
module.exports = app => {
  class Localidade {
    constructor(connection) {
      this._db = connection;
    }

    async getUF() {
      const localidade = await this._db("estados")
        .select("*")
        .orderBy("nome");
      return localidade;
    }

    async getCidade(idUf) {
      const localidade = await this._db
        .select("codigo", "nome")
        .from("cidades")
        .where({ id_estado: idUf })
        .orderBy("nome");
      return localidade;
    }
  }

  return { Localidade };
};
