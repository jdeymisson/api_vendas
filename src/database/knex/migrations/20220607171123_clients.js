
exports.up = knex => knex.schema.createTable("clients", table => {
  table.increments("id");
  table.text("cpf").notNullable;
  table.text("name").notNullable;
  table.text("email").notNullable;
  table.text("password").notNullable;
  table.text("avatar");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("clients");