
exports.up = knex => knex.schema.createTable("sales", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("users");
  table.integer("client_id").references("id").inTable("clients");
  table.float("total_payment");
  table.text("form_payment");

  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("sales");