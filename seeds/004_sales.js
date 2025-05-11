/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("sales").del();
  await knex("sales").insert([
    { product_id: 1, quantity: 1, unit_price: 2.5, total_price: 2.5 },
    { product_id: 2, quantity: 2, unit_price: 2, total_price: 4 },
    { product_id: 3, quantity: 2, unit_price: 3, total_price: 6 },
    { product_id: 5, quantity: 3, unit_price: 3.5, total_price: 10.5 },
    { product_id: 4, quantity: 2, unit_price: 2.5, total_price: 5 },
  ]);
}
