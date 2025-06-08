/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("customerproducts").del();
  await knex("customerproducts").insert([
    {
      id: 1,
      customer_id: 1,
      product_name: "Macchiato Green",
      product_price: 8,
    },
  ]);
}
