/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("products").del();
  await knex("products").insert([
    {
      id: 1,
      name: "Espresso",
      price: 2.5,
      quantity: 5,
      image_url:
        "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Flat White",
      price: 2,
      quantity: 5,
      image_url:
        "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Americano",
      price: 3,
      quantity: 5,
      image_url:
        "https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Matcha Latte",
      price: 3.5,
      image_url:
        "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Hot Chocolate",
      price: 3.5,
      quantity: 5,
      image_url:
        "https://images.unsplash.com/photo-1637572815755-c4b80092dce1?q=80&w=3203&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      name: "Chai Latte",
      price: 3,
      quantity: 5,
      image_url:
        "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);
}
