class Controller {
  constructor(req, res) {
    this._req = req;
    this._body = req.body;
    this._res = res;
    this._codeDatabase = req.headers.code || "000000000000";
    this._schema = req.headers.schema;
  }

  async dispose() {
    if (this._connection) await this._connection.dispose();
  }
}

module.exports = { Controller };
