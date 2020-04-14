const ValidationError = require("../class/ValidationError");
const { Controller } = require("../class/baseController");
const Repository = require("../class/redis");

module.exports = app => {
  class Localidade extends Controller {
    // eslint-disable-next-line no-useless-constructor
    constructor(req, res) {
      super(req, res);
      this._reload = req.body.reloadData || false;
    }

    async getUF(next) {
      try {
        // INSTANCIAR CLASSE DE MODELOS
        const UfModel = new app.services.model.localidadeModel.LocalidadeModel(
          this._codeDatabase,
          this._reload
        );

        const uf = await UfModel.getUF();

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
