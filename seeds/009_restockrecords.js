/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("restockrecord").del();
  await knex("restockrecord").insert([
    {
      id: 1,
      ingredients_id: 1,
      ingredient_name: "Espresso",
      ingredient_quantity: 2,
    },
  ]);
}
