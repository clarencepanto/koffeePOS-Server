/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("suppliers").del();
  await knex("suppliers").insert([
    {
      id: 1,
      name: "GoldCup",
      contact: 22,
      address: "123 boulvenue road, storm cresent",
    },
    {
      id: 2,
      name: "SandyGrains",
      contact: 23,
      address: "12143 aluhvera road, wind cresent",
    },
  ]);
}
