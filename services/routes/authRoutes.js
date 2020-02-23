const express = require("express");
const ValidationError = require("../class/ValidationError");
const asyncMiddleware = require("../utils/asyncMiddleware");

module.exports = app => {
  const router = express.Router();

  router.post(
    "/loginprofesor",
    asyncMiddleware(async (req, res, next) => {
      try {
        if (!req.headers.code)
          throw new ValidationError("headers[code] not found");

        let controller = new app.services.controller.authController.Auth(
          req,
          res,
          next
        );

        // await controller.connect();

        await controller.LoginProfessor(next);

        await controller.dispose();

        controller = null;
      } catch (e) {
        next(e);
      }
    })
  );

  router.get("/signup", async (req, res, next) => {
    try {
      // console.log("SIGNUP");
      res.send("01");
    } catch (e) {
      next(e);
    }
  });

  return router;
};
