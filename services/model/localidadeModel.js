const { Model } = require("../class/baseModel");
const Repository = require("../class/redis");

module.exports = app => {
  class LocalidadeModel extends Model {
    constructor(code) {
      super(code, app);
    }

    async getUF() {
      // consultar informação no cache, caso exista retornada dados do cache
      // const dados = await Repository.get("G_UF");

      // // SE ENCONTRAR DADOS NO CACHE RETORNA E SAI DO METODO
      // if (dados) {
      //   // await Repository.del('G_UF');
      //   this._res
      //     .status(200)
      //     .json({ success: true, data: JSON.parse(dados) });
      //   return;
      // }

      // // INSTANCIAR CONEXÃO COM BANCO
      // await this.connect();
      // if (!this._isConected)
      //   throw new ValidationError(
      //     "Não foi possivel conectar ao banco de dados!"
      //   );




      await this.connection();
      const data = await this._connection(`estados`)
        .select("*")
        .orderBy("nome");

      return data;
    }
  }
  return { LocalidadeModel };
};
