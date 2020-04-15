const Repository = require("../class/redis");

class Model {
  constructor(code, app) {
    this._code = code;
    this._app = app;
    this._connection = null;
  }

  async connection() {
    this._connection = await this._app.db.getConnection(this._code);
  }

  static async getCache(key) {
    const data = await Repository.get(key);
    return data;
  }

  static async setCache(key, value) {
    await Repository.set(key, JSON.parse(JSON.stringify(value)));
  }
}

module.exports = { Model };
