const app = require("express")();
const consign = require("consign");
const winston = require("winston");
const uuid = require("uuidv4");
const dateFormat = require("dateformat");
const { Connection } = require("./services/config/connection");
// const rsa = require("./services/class/rsa");

app.log = winston.createLogger({
  level: "debug", // so imprime os logs a nivel de debgue
  transports: [
    new winston.transports.Console({
      format: winston.format.json({ space: 1 })
    }),
    new winston.transports.File({
      filename: "logs/erros.log",
      level: "warn",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json({
          space: 1
        })
      )
    })
  ]
});

app.db = new Connection("");

// rsa.RsaEncript.generateKey();
// const enc = rsa.RsaEncript.encrypt("GEDUC", "./.public.pem");
// console.log("enc", enc);

consign({ extensions: [".js", ".json", ".node"] })
  .include("./services/middlewares/passport.js")
  .then("./services/middlewares/middlewares.js")
  .then("./services/utils/")
  .then("./services/config/connection.js")
  .then("./services/class/baseClass.js")
  .then("./services/model")
  .then("./services/controller")
  .then("./services/routes")
  .then("./services/config/endPoints.js")
  .then("./services/config")
  .into(app);

app.get("/", (req, res) => {
  const DateTime = dateFormat(new Date(), "dd/mm/yyyy H:M:ss");

  const status = {
    Server: "API GEDUC Vesão 1.0.0",
    Description: "GEDUC - Gestão Educacional",
    DateTime_Server: DateTime
  };

  res.send(JSON.stringify(status));
});

app.use((req, res) => {
  res.status(404).json({ msg: "Rota solicitada não existe." });
});

app.use(async (err, req, res, next) => {
  const { name, message, stack } = err;
  if (name === "VAlidationError") {
    res.status(500).json({ success: false, error: message });
    next();
  } else {
    const erroId = uuid();

    // const error = {
    //   erroId,
    //   name,
    //   message,
    //   stack,
    // };

    app.log.error({
      erroId,
      name,
      message,
      stack
    });
    res.status(500).json({
      success: false,
      id: erroId,
      error: "Falha Interna, envie o id do erro para equipe de suporte. "
    });

    next();
  }
});

module.exports = app;
