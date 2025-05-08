/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("ingredient_orders").del();
  await knex("ingredient_orders").insert([
    { suppliers_id: 1, ingredients_id: 1, quantity: 500, unit: "ML" },
    { suppliers_id: 2, ingredients_id: 2, quantity: 300, unit: "GM" },
    { suppliers_id: 1, ingredients_id: 1, quantity: 200, unit: "GM" },
  ]);
}
