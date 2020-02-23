// const { Connection } = require("../config/connection.js");
// const ValidationError = require("../class/ValidationError");

class Controller {
  constructor(req, res) {
    this._req = req;
    this._body = req.body;
    this._res = res;
    this._codeDatabase = req.headers.code || "000000000000";
    this._schema = req.headers.schema;
    // this._connection = new Connection(this._codeDatabase);
    // this._isConected = false;
    // this._knex = null;
  }

  // async connect() {
  //   try {
  //     this._knex = await this._connection.connect();
  //     this._isConected = await this._connection.isConnected();

  //     return this._isConected;
  //   } catch (error) {
  //     throw new ValidationError(error.message);
  //   }
  // }

  async dispose() {
    if (this._connection) await this._connection.dispose();
  }
}

module.exports = { Controller };
