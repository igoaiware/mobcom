const express = require("express");
const ValidationError = require("../class/ValidationError");
const asyncMiddleware = require("../utils/asyncMiddleware");

module.exports = app => {
  const router = express.Router();

  router.get(
    "/uf",
    asyncMiddleware(async (req, res, next) => {
      try {
        if (!req.headers.code)
          throw new ValidationError("headers[code] not found");

        let controller = new app.services.controller.citiesController.Localidade(
          req,
          res,
          next
        );

        // INSTANCIAR DE CONEXÃO PARA CLASSES QUE NÃO USAM CACHE
        // await controller.connect();

        await controller.getUF(next);

        await controller.dispose();

        controller = null;
      } catch (e) {
        next(e);
      }
    })
  );

  router.post(
    "/cidade",
    asyncMiddleware(async (req, res, next) => {
      try {
        if (!req.headers.code)
          throw new ValidationError("headers[code] not found");

        let controller = new app.services.controller.localidadeController.Localidade(
          req,
          res,
          next
        );

        await controller.connect();

        await controller.getCidade(next);

        await controller.dispose();

        controller = null;
      } catch (e) {
        next(e);
      }
    })
  );

  return router;
};
