/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("loyalcustomer", (table) => {
    table.increments("id").primary();
    table.string("customer_name").notNullable();
    table.integer("visits").notNullable().defaultTo(0);
    table.string("customer_allergy").notNullable();
    table.string("customer_phone").notNullable();
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
