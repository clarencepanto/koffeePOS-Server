/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("sales").del();
  await knex("sales").insert([{ id: 1, product_id: 1, quantity: 1 }]);
}
