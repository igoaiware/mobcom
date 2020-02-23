/* eslint-disable no-unused-vars */
module.exports = app => {
  class Auth {
    constructor(connection) {
      this._db = connection;
    }

    async Login(user) {
      const subquery = this._db
        .raw(`(select ANOACESSONETPROF from configuracao_geral 
                                        where ano = (select max(ano) 
                                            from configuracao_geral)) as AnoNetProfessor`);

      const subquery2 = this._db.raw(
        "(select max(ano) from configuracao_geral) as AnoLetivo"
      );

      return (
        (await this._db("professores")
          .select(
            "idprofessores",
            "nome",
            "cpf",
            "senha",
            "password",
            subquery,
            subquery2,
            "senhapadrao"
          )
          .where({ cpf: user.login })
          .first()) || {}
      );
    }
  }
  return { Auth };
};
