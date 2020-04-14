const rsa = require("../class/rsa");

class ValidateServerkey {
  static validar(req, res, next) {
    // console.log(chave);
    // next();
    try {
      const chave = JSON.parse(
        rsa.RsaEncript.decrypt(req.headers.authorization, ".private.pem")
      );

      if (chave.applicationName === "geduc" && chave.autorizado === "semed") {
        next();
      } else {
        res.status(401).json("NÃO AUTORIZADO");
      }
    } catch (error) {
      res.status(401).json("NÃO AUTORIZADO");
    }
  }
}

module.exports = { ValidateServerkey };
