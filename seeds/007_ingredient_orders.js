/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("ingredient_orders").del();
  await knex("ingredient_orders").insert([
    { supplier_id: 1, ingredient_id: 1, quantity: 500, unit: "ML" },
    { supplier_id: 2, ingredient_id: 2, quantity: 300, unit: "GM" },
    { supplier_id: 1, ingredient_id: 1, quantity: 200, unit: "GM" },
  ]);
}
