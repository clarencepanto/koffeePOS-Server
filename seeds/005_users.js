// for password security
import bcrypt from "bcrypt";
const saltRounds = 10;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      username: "barista",
      password: await bcrypt.hash("iambarista", saltRounds),
      role: "barista",
    },
    {
      username: "manager",
      password: await bcrypt.hash("iammanager", saltRounds),
      role: "manager",
    },
  ]);
}
