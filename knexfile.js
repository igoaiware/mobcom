module.exports = {
  client: "postgresql",
  connection: {
    host: "67.205.188.241",
    port: 5432,
    database: "mobcom",
    user: "mobcom",
    password: "iso9100"
  },
  searchPath: ["knex", "public"],
  pool: {
    min: 2,
    max: 100
  },
  // acquireConnectionTimeout: 20000,
  // asyncStackTraces: true,
  //	debug: true,
  migrations: {
    tableName: "migrations"
  },
  asyncStackTraces: false
};
