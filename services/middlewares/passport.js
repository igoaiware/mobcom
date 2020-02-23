const passport = require("passport");
const passportJwt = require("passport-jwt");
const { authSecret } = require("../../.env");

const { Strategy, ExtractJwt } = passportJwt;

/* eslint-disable no-unused-vars */
module.exports = app => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  const strategy = new Strategy(params, (payload, done) => {
    // TODO: Criar parametros para validação do payload
    if (payload.id === 3) {
      done(null, { ...payload });
    } else {
      done(null, false);
    }
  });

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate("jwt", { session: false })
  };
};
