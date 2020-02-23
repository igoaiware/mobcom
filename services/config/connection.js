const knex = require("knex");
const path = require("path");
const fs = require("fs");
const ValidationError = require("../class/ValidationError");

class Connection {
  constructor() {
    this._database = "";
    this._knex = null;
    this._countConnection = [];
  }

  listConnection() {
    return this._countConnection.map(obj => obj.code);
  }

  addConnection(value) {
    this._countConnection.push(value);
  }

  get getConnection() {
    return this._knex;
  }

  async connect(code) {
    try {
      this._database = code;

      const dbConfig = await this.getDatabase(this._database);

      // eslint-disable-next-line global-require
      const objConnection = {
        code: this._database,
        knex: null
      };

      if (this._countConnection.length > 0) {
        let thereIsConnection = false;

        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < this._countConnection.length; index++) {
          const element = this._countConnection[index];

          if (element.code === this._database) {
            this._knex = element.knex;
            thereIsConnection = true;
            break;
          }
        }

        if (!thereIsConnection) {
          this._knex = await knex(dbConfig);
          objConnection.knex = this._knex;
          this.addConnection(objConnection);
        }
      } else {
        this._knex = await knex(dbConfig);
        objConnection.knex = this._knex;
        this.addConnection(objConnection);
      }

      return this._knex;
    } catch (error) {
      // if (this._knex) this._knex.destroy();
      throw new ValidationError(`${this._database} database not found!`);
    }
  }

  async isConnected() {
    try {
      await this._knex.raw("SELECT 1");

      return true;
    } catch (e) {
      return false;
    }
  }

  async getDatabase() {
    let database;
    try {
      const jsonConection = await fs.readFileSync(
        path.join(__dirname, "/.connections.json")
      );
      const conections = JSON.parse(jsonConection);
      database = conections[this._database];
      if (!database) {
        throw new ValidationError(`No databases found, ${this._database}`);
      }
    } catch (err) {
      throw new ValidationError("error when trying to connect the databeses!");
    }
    const conection = {
      client: "postgresql",
      connection: database,
      searchPath: ["knex", "public"],
      debug: false,
      acquireConnectionTimeout: 60000,
      // asyncStackTraces: true,
      pool: {
        min: 2,
        max: 30
      },
      migrations: {
        tableName: "knex_migrations"
      }
    };

    return conection;
  }

  async dispose() {
    if (this._knex) await this._knex.destroy();
  }
}

module.exports = { Connection };
