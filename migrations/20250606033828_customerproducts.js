/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("customerproducts", (table) => {
    table.increments("id").primary();
    table
      .integer("customer_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("loyalcustomer")
      .onDelete("CASCADE");
    table.string("product_name").notNullable();
    table.integer("product_qty").notNullable().defaultTo(0);
    table.json("product_ingredients");
    table.integer("product_price").notNullable().defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("loyalcustomer");
}
