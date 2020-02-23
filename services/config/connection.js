/* eslint-disable class-methods-use-this */
const knex = require("knex");
const path = require("path");
const fs = require("fs");
const ValidationError = require("../class/ValidationError");

class Connection {
  constructor() {
    // this._database = "";
    this._knex = null;
    this._poolConnection = [];
  }

  listConnections() {
    // retorna uma lista Array com nome de todas as conexões intanciadas
    return this._poolConnection.map(obj => obj.code);
  }

  addConnection(value) {
    // Add connection to the pool
    this._poolConnection.push(value);
  }

  async getConnection(code) {
    // return a connection instace

    let indexConnection = 0;

    if (this._poolConnection.length > 0) {
      let thereIsConnection = false;

      for (let index = 0; index < this._poolConnection.length; index += 1) {
        const element = this._poolConnection[index];

        if (element.code === code) {
          // _knex = element.knex;
          indexConnection = index;
          thereIsConnection = true;
          break;
        }
      }
      if (!thereIsConnection) {
        await this._connect(code);
      }
    } else {
      await this._connect(code);
    }

    return this._poolConnection[indexConnection].knex;
  }

  async _connect(codeDatabase) {
    // Internal method for instance of a connection object
    try {
      const dbConfig = await this._getDatabase(codeDatabase);
      let _knex = null;

      const objConnection = {
        code: codeDatabase,
        knex: null
      };

      _knex = await knex(dbConfig);

      objConnection.knex = _knex;
      this.addConnection(objConnection);

      return _knex;
    } catch (error) {
      throw new ValidationError(`${codeDatabase} database not found!`);
    }
  }

  async isConnected(code) {
    // checks if there is a conncetion in the pool
    try {
      let thereIsConnection = false;

      for (let index = 0; index < this._poolConnection.length; index += 1) {
        const element = this._poolConnection[index];

        if (element.code === code) {
          thereIsConnection = true;
          break;
        }
      }

      return thereIsConnection;
    } catch (e) {
      return false;
    }
  }

  async _getDatabase(codeDatabase) {
    // Internal method for loading connection configuration
    let database;
    try {
      const jsonConection = await fs.readFileSync(
        path.join(__dirname, "/.connections.json")
      );
      const conections = JSON.parse(jsonConection);
      database = conections[codeDatabase];
      if (!database) {
        throw new ValidationError(`No databases found, ${codeDatabase}`);
      }
    } catch (err) {
      throw new ValidationError("error when trying to connect the databeses!");
    }
    const conection = {
      client: "postgresql",
      connection: database,
      // searchPath: ["knex", database.schema],
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

  async dispose(code) {
    try {
      const connected = await this.isConnected(code);

      let _knex;
      if (connected) {
        const connection = [];

        for (let index = 0; index < this._poolConnection.length; index += 1) {
          const element = this._poolConnection[index];

          if (element.code !== code) {
            connection.push(element);
            break;
          } else {
            _knex = element.knex;
          }
        }
        this._poolConnection = connection;
      }
      if (_knex) await _knex.destroy();

      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = { Connection };
