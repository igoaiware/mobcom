/* eslint-disable no-unused-vars */
module.exports = app => {
  class Localidade {
    constructor(connection, schema) {
      this._db = connection;
      this._schema = schema;
    }

    async getUF() {
      const data = await this._db(`${this._schema}.estados`)
        .select("*")
        .orderBy("nome");

      return data;
    }
  }

  return { Localidade };
};
