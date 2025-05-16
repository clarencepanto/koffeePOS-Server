/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("salesrecord", (table) => {
    table.increments("id").primary();
    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE")
      .defaultTo(0);
    table
      .integer("sales_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("sales")
      .onDelete("CASCADE")
      .defaultTo(0);
    table.string("product_name").notNullable();
    table.decimal("total_price", 10, 2).notNullable().defaultTo(0);
    table.integer("product_quantity").notNullable().defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("salesrecord");
}
