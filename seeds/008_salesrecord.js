/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("salesrecord").del();
  await knex("salesrecord").insert([
    {
      id: 1,
      product_name: "Flat White",
      product_id: 2,
    },
  ]);
}
