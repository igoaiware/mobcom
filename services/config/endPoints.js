const express = require("express");

module.exports = app => {
  const protectdRouter = express.Router();

  // protectdRouter.use("/auth", app.services.routes.authRoutes);
  protectdRouter.use("/cities", app.services.routes.localidadeRoutes);
  // protectdRouter.use('/place', app.services.config.passport.authenticate(), app.controller.placeController);

  app.use("/v1", protectdRouter);
};
