// for password security
import bcrypt from "bcrypt";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  const hashedPassword1 = await bcrypt.hash("iambarista", 10);
  const hashedPassword2 = await bcrypt.hash("iammanager", 10);

  await knex("users").insert([
    {
      username: "barista",
      password: hashedPassword1,
      role: "barista",
    },
    {
      username: "manager",
      password: hashedPassword2,
      role: "manager",
    },
  ]);
}
