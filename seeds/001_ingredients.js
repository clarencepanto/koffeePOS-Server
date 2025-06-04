/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("ingredients").del();
  await knex("ingredients").insert([
    { id: 1, name: "Milk", stock: 10000, unit: "ML" },
    { id: 2, name: "Sugar", stock: 500, unit: "GM" },
    { id: 3, name: "Coffee Beans", stock: 600, unit: "GM" },
    { id: 4, name: "Matcha Powder", stock: 150, unit: "GM" },
    { id: 5, name: "Oat Milk", stock: 250, unit: "ML" },
    { id: 6, name: "Coconut Milk", stock: 100, unit: "ML" },
    { id: 7, name: "Cocoa Powder", stock: 500, unit: "GM" },
    { id: 8, name: "Chai Powder", stock: 100, unit: "GM" },
    { id: 9, name: "Whipped Cream", stock: 100, unit: "ML" },
    { id: 10, name: "Chocolate Chips", stock: 100, unit: "GM" },
  ]);
}
