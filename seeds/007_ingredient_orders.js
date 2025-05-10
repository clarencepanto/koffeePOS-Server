/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("ingredient_orders").del();
  await knex("ingredient_orders").insert([
    {
      id: 1,
      supplier_id: 1,
      ingredient_id: 1,
      quantity_restock: 500,
      unit: "ML",
    },
    {
      id: 2,
      supplier_id: 2,
      ingredient_id: 2,
      quantity_restock: 300,
      unit: "GM",
    },
    {
      id: 3,
      supplier_id: 1,
      ingredient_id: 3,
      quantity_restock: 200,
      unit: "GM",
    },
  ]);
}
