class Model {
  constructor(code, app) {
    this._code = code;
    this._app = app;
    this._connection = null;
  }

  async connection() {
    this._connection = await this._app.db.getConnection(this._code);
  }
}

module.exports = { Model };
