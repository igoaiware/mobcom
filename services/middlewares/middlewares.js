const bodyparser = require("body-parser");
const cors = require("cors");
const { ValidateServerkey } = require("./validateServerKey");

module.exports = app => {
  app.use(bodyparser.json());
  app.use(cors());

  // app.use((req, res, next) => {
  //   if (!req.headers.code || !req.headers.authorization) {
  //     res.status(400).json("Headers Invalid!");
  //   } else {
  //     next();
  //   }
  // });

  // app.use((req, res, next) => {
  //   ValidateServerkey.validar(req, res, next);
  // });
};
