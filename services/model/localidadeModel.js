const { Model } = require("../class/baseModel");

module.exports = app => {
  class LocalidadeModel extends Model {
    constructor(code, reload) {
      super(code, app);
      this._reload = reload || false;
    }

    async getUF() {
      // consultar informação no cache, caso exista retornada cacheData do cache
      const cacheData =
        this._reload === false ? await Model.getCache("G_UF") : false;

      // // SE ENCONTRAR cacheData NO CACHE RETORNA E SAI DO METODO
      if (cacheData && !this.reload) {
        // await Repository.del("G_UF");
        console.log("DADOS DO CACHE!");
        return JSON.parse(cacheData);
      }

      // INSTANCIAR CONEXÃO COM BANCO
      await this.connection();

      const data = await this._connection(`estados`)
        .select("*")
        .orderBy("nome");

      // SALVAR CACHE DE cacheData
      await Model.setCache("G_UF", data);
      console.log("DADOS DO BANCO!");
      return data;
    }
  }
  return { LocalidadeModel };
};
