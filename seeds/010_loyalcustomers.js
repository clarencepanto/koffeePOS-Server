/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("loyalcustomer").del();
  await knex("loyalcustomer").insert([
    {
      id: 1,
      customer_name: "Diego Pinlac",
      visits: 200,
      customer_allergy: "oats",
      customer_phone: 6041112211,
    },
  ]);
}
