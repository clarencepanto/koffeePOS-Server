import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";

const router = express.Router();

// get customer products data
router.get("/", async (req, res) => {
  try {
    const customerproducts = await knex("customerproducts").select("*");
    res.json(customerproducts);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve product data`,
    });
    console.error("Error fetching customerproducts", error);
  }
});

// query
// {
//   "product_name": "Iced Coffee",
//   "product_price": 10
// }

// add customer products data
router.post("/:customer_id", async (req, res) => {
  const { customer_id } = req.params;
  const { product_name, product_price } = req.body;

  try {
    const [id] = await knex("customerproducts").insert({
      customer_id,
      product_name,
      product_price,
      product_qty,
      product_ingredients,
    });

    const newIngredient = await knex("customerproducts")
      .select(
        "id",
        "product_name",
        "product_price",
        "customer_id",
        "product_qty",
        "product_ingredients"
      )
      .where({ id })
      .first();

    res.status(201).json(newIngredient);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Unable to add Data!" });
  }
});

// get individual
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await knex("customerproducts").where({ id }).first();

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    console.error("Error fetching customerproducts:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// patch function
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { product_name, product_ingredients, product_qty, product_price } =
    req.body;

  try {
    await knex("customerproducts")
      .where({ id })
      .update({
        product_name,
        product_ingredients: JSON.stringify(product_ingredients),
        product_qty,
        product_price,
      });

    const updatedCustomerProducts = await knex("customerproducts")
      .where({ id })
      .first();

    res.status(200).json(updatedCustomerProducts);
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ message: "Unable to update customer products" });
  }
});

export default router;
