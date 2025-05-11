/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("recipes").del();
  await knex("recipes").insert([
    // Espresso
    { product_id: 1, ingredient_id: 3, quantity_needed: 10, unit: "GM" },
    { product_id: 1, ingredient_id: 1, quantity_needed: 150, unit: "ML" },

    // Flat White
    { product_id: 2, ingredient_id: 1, quantity_needed: 100, unit: "ML" },
    { product_id: 2, ingredient_id: 3, quantity_needed: 80, unit: "GM" },

    // Americano
    { product_id: 3, ingredient_id: 3, quantity_needed: 50, unit: "GM" },
    { product_id: 3, ingredient_id: 2, quantity_needed: 10, unit: "GM" },

    // Matcha Latte
    { product_id: 4, ingredient_id: 4, quantity_needed: 3, unit: "GM" },
    { product_id: 4, ingredient_id: 1, quantity_needed: 50, unit: "ML" },
    { product_id: 4, ingredient_id: 2, quantity_needed: 2, unit: "GM" },

    // Hot Chocolate
    { product_id: 5, ingredient_id: 7, quantity_needed: 10, unit: "GM" },
    { product_id: 5, ingredient_id: 1, quantity_needed: 50, unit: "ML" },
    { product_id: 5, ingredient_id: 9, quantity_needed: 5, unit: "ML" },

    // Chai Latte
    { product_id: 6, ingredient_id: 2, quantity_needed: 5, unit: "GM" },
    { product_id: 6, ingredient_id: 8, quantity_needed: 20, unit: "GM" },
    { product_id: 6, ingredient_id: 5, quantity_needed: 80, unit: "GM" },
  ]);
}
