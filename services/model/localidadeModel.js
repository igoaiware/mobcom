const { Model } = require("../class/baseModel");
const Repository = require("../class/redis");

module.exports = app => {
  class LocalidadeModel extends Model {
    constructor(code, reload) {
      super(code, app);
      this._reload = reload || false;
    }

    async getUF() {
      // consultar informação no cache, caso exista retornada dados do cache
      const dados =
        this._reload === false ? await Repository.get("G_UF") : false;

      // // SE ENCONTRAR DADOS NO CACHE RETORNA E SAI DO METODO
      if (dados && !this.reload) {
        // await Repository.del("G_UF");
        console.log("DADOS DO CACHE!");
        return JSON.parse(dados);
      }

      // INSTANCIAR CONEXÃO COM BANCO
      await this.connection();

      const data = await this._connection(`estados`)
        .select("*")
        .orderBy("nome");

      // SALVAR CACHE DE DADOS
      await Repository.set("G_UF", JSON.parse(JSON.stringify(data)));
      console.log("DADOS DO BANCO!");
      return data;
    }
  }
  return { LocalidadeModel };
};
