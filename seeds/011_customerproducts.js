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
      product_ingredients: JSON.stringify([]),
      product_qty: 1,
      product_price: 8,
    },
    {
      id: 2,
      customer_id: 2,
      product_name: "Macchiato Orange",
      product_ingredients: JSON.stringify([]),
      product_qty: 1,
      product_price: 8,
    },
    {
      id: 3,
      customer_id: 3,
      product_name: "Macchiato Red",
      product_ingredients: JSON.stringify([]),
      product_qty: 1,
      product_price: 8,
    },
  ]);
}
