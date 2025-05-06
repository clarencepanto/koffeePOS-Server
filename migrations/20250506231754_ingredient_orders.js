/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("ingredient_orders", (table) => {
    table.increments("id").primary();
    table
      .integer("suppliers_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("suppliers")
      .onDelete("CASCADE");
    table
      .integer("ingredients_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("ingredients")
      .onDelete("CASCADE");
    table.float("quantity").notNullable();
    table.string("unit").notNullable();
    table.timestamp("ordered_at").defaultTo(knex.fn.now());
    table.timestamp("received_at");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  knex.schema.dropTable("ingredient_orders");
}
