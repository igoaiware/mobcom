exports.up = knex => {
  return knex.schema.createTable("cliente", table => {
    table.increments("idCliente").primary();
    table.string("nome").notNull();
    table
      .string("cpfCnpj")
      .notNull()
      .unique();
    table
      .string("email")
      .notNull()
      .unique();
    table.string("telefone").notNull();
    table.string("senha").notNull();
    table
      .boolean("emailVerificado")
      .notNull()
      .defaultTo(false);
    table
      .boolean("telefoneVerificado")
      .notNull()
      .defaultTo(false);
    table
      .boolean("status")
      .notNull()
      .defaultTo(true);
  });
};

exports.down = async knex => {
  const rm = await knex.schema.dropTableIfExists("cliente");
  return rm;
};
