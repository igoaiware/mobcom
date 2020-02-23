const ValidationError = require("../class/ValidationError");
const BaseClass = require("../class/baseClass");
const Repository = require("../class/redis");
// const ID = require('uuid/v1');

module.exports = app => {
  class Localidade extends BaseClass.Controller {
    // eslint-disable-next-line no-useless-constructor
    constructor(req, res) {
      super(req, res);
    }

    async getUF(next) {
      try {
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

        //     const conect = await app.db.isConnected(this._codeDatabase);

        const db = await app.db.getConnection(this._codeDatabase);

        console.log(app.db.listConnections());

        // INSTANCIAR CLASSE DE MODELOS
        const LocalidadeDAO = new app.services.models.citiesDAO.Localidade(
          db,
          this._schema
        );

        const uf = await LocalidadeDAO.getUF();

        // SALVAR CACHE DE DADOS
        // await Repository.set("G_UF", JSON.parse(JSON.stringify(uf)));

        this._res.status(200).json({ success: true, data: uf });
      } catch (error) {
        next(error);
      }
    }

    // TODO : não implementado no padrão novo
    async getCidade(next) {
      try {
        const { sigla } = this._req.body;
        const cacheString = `G_CIDADE_${sigla}`;
        const dados = await Repository.get(cacheString);

        // SE ENCONTRAR DADOS NO CACHE RETORNA E SAI DO METODO
        if (dados) {
          // await Repository.del(cacheString);
          this._res
            .status(200)
            .json({ success: true, data: JSON.parse(dados) });
          return;
        }

        if (!this._isConected)
          throw new ValidationError(
            "Não foi possivel conectar ao banco de dados!"
          );

        const LocalidadeDAO = new app.services.models.localidadeDAO.Localidade(
          this._knex
        );

        const cidades = await LocalidadeDAO.getCidade(this._req.body.uf);

        console.log(cidades);

        // SALVAR CACHE DE DADOS
        await Repository.set(cacheString, JSON.parse(JSON.stringify(cidades)));

        this._res.status(200).json({ success: true, data: cidades });
      } catch (error) {
        next(error);
      }
    }
  }
  return { Localidade };
};
