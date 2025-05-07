/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("recipes").del();
  await knex("recipes").insert([
    // Espresso
    { products_id: 1, ingredients_id: 3, quantity_needed: 10, unit: "ML" },

    // Matcha Latte
    { products_id: 4, ingredients_id: 4, quantity_needed: 3, unit: "GM" },
    { products_id: 4, ingredients_id: 1, quantity_needed: 50, unit: "ML" },
    { products_id: 4, ingredients_id: 2, quantity_needed: 2, unit: "GM" },

    // Flat White
    { products_id: 2, ingredients_id: 1, quantity_needed: 100, unit: "ML" },
    { products_id: 2, ingredients_id: 3, quantity_needed: 80, unit: "GM" },

    // Hot Chocolate
    { products_id: 5, ingredients_id: 7, quantity_needed: 10, unit: "GM" },
    { products_id: 5, ingredients_id: 1, quantity_needed: 50, unit: "ML" },
  ]);
}
