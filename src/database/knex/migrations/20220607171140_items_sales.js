
exports.up = knex => knex.schema.createTable("items_sales", table => {
  table.increments("id");
  table.integer("sale_id").references("id").inTable("sales").onDelete("CASCADE");
  table.integer("product_id").references("id").inTable("products");
  table.text("description");
  table.int("quantity");
});

exports.down = knex => knex.schema.dropTable("items_sales");