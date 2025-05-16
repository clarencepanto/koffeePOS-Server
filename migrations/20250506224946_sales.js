/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("sales", (table) => {
    table.increments("id").primary().defaultTo(0);
    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");
    table.string("product_name").defaultTo(null);
    table.integer("quantity").unsigned().notNullable().defaultTo(1);
    table.decimal("total_price", 10, 2).notNullable().defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("sales");
}
