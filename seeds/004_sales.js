/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("sales").del();
  await knex("sales").insert([
    { product_id: 1, quantity: 1 },
    { product_id: 2, quantity: 2 },
    { product_id: 3, quantity: 2 },
    { product_id: 5, quantity: 3 },
    { product_id: 4, quantity: 2 },
  ]);
}
