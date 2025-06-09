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
    {
      id: 2,
      customer_name: "Dhruv Mehrotta",
      visits: 500,
      customer_allergy: "milk",
      customer_phone: 6021112212,
    },
    {
      id: 3,
      customer_name: "Manuel Gatchalian",
      visits: 300,
      customer_allergy: "none",
      customer_phone: 6031112215,
    },
  ]);
}
