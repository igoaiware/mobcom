const bcrypt = require("bcrypt-nodejs");
const jwt = require("jwt-simple");
const { authSecret } = require("../../.env");
const ValidationError = require("../class/ValidationError");
const BaseClass = require("../class/baseClass");

module.exports = app => {
  class Auth extends BaseClass.Controller {
    // eslint-disable-next-line no-useless-constructor
    constructor(req, res) {
      super(req, res);
    }

    static _encrypPassword(password) {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(password, salt);
    }

    async LoginProfessor(next) {
      try {
        // if (!this._isConected)
        //   throw new ValidationError(
        //     "Não foi possivel conectar ao banco de dados!"
        //   );

        const db = await app.db.connect(this._codeDatabase);

        const AuthDAO = new app.services.models.authDAO.Auth(db);

        const user = await AuthDAO.Login(this._req.body);

        console.log(app.db.listConnection());

        let isMatch = false;

        if (user.idprofessores) {
          isMatch = bcrypt.compareSync(this._req.body.password, user.password);
        }

        if (!isMatch) {
          this._res
            .status(400)
            .json({ success: false, msg: "Usuário ou senha incorretos!" });
          return;
        }

        const now = Math.floor(Date.now() / 1000);

        const payload = {
          id: user.idprofessores,
          name: user.nome,
          cpf: user.cpf,
          iat: now,
          exp: now + 60 * 60 * 24 * 60,
          anoletivo: user.AnoLetivo,
          anonetprofessor: user.AnoNetProfessor,
          senhapadrao: user.senhapadrao
        };

        this._res.status(200).json({
          success: true,
          data: payload,
          token: jwt.encode(payload, authSecret, "HS256")
        });
      } catch (error) {
        next(error);
      }
    }

    // TODO : não implementado no padrão novo
    async LoginAluno(next) {
      try {
        if (!this._isConected)
          throw new ValidationError(
            "Não foi possivel conectar ao banco de dados!"
          );

        const AuthDAO = new app.services.models.AuthDAO.Auth(this._knex);

        const user = await AuthDAO.LoginAluno(this._req.body);

        const isMatch = bcrypt.compareSync(
          this._req.body.password,
          user.password
        );

        if (!user.idprofessores || !isMatch) {
          this._res
            .status(200)
            .json({ success: false, msg: "Usuário ou senha incorretos!" });
          return;
        }
        const now = Math.floor(Date.now() / 1000);

        const payload = {
          id: user.idprofessores,
          name: user.nome,
          cpf: user.cpf,
          iat: now,
          exp: now + 60 * 60 * 24 * 60,
          anoletivo: user.AnoLetivo,
          anonetprofessor: user.AnoNetProfessor,
          senhapadrao: user.senhapadrao
        };

        this._res.status(200).json({
          success: true,
          data: payload,
          token: jwt.encode(payload, authSecret, "HS256")
        });
      } catch (error) {
        next(error);
      }
    }
  }

  return { Auth };
};
