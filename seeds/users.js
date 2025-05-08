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
      password_hash: await bcrypt.hash("iambarista", saltRounds),
      role: "barista",
    },
    {
      username: "manager",
      password_hash: await bcrypt.hash("iammanager", saltRounds),
      role: "manager",
    },
  ]);
}
