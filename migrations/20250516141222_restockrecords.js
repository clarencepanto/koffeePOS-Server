/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("restockrecord", (table) => {
    table.increments("id").primary();
    table
      .integer("ingredients_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("ingredients")
      .onDelete("CASCADE")
      .defaultTo(0);
    table.string("ingredient_name").notNullable();
    table.integer("ingredient_quantity").notNullable().defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("restockrecords");
}
