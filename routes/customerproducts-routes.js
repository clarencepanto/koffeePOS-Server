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
  const { product_name, product_ingredients, product_qty, product_price } =
    req.body;

  try {
    const [newProduct] = await knex("customerproducts").insert({
      customer_id: customer_id,
      product_name,
      product_qty,
      product_price,
      product_ingredients: JSON.stringify(product_ingredients || []),
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Product creation failed:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
});

// GET route to fetch products for one customer
router.get("/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    const products = await knex("customerproducts")
      .where("customer_id", customerId)
      .orderBy("created_at", "desc");

    res.json(products);
  } catch (error) {
    console.error("Fetch failed:", error);
    res.status(500).json({ message: "Error fetching products" });
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
  const { product_name, product_qty, product_price, product_ingredients } =
    req.body;

  try {
    await knex("customerproducts")
      .where({ id })
      .update({
        product_name,
        product_qty,
        product_price,
        product_ingredients: JSON.stringify(product_ingredients || []),
      });

    const updated = await knex("customerproducts").where({ id }).first();

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ message: "Unable to update product" });
  }
});

// product deletion
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await knex("customerproducts").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Delete failed:", error);
    res.status(500).json({ message: "Unable to delete product." });
  }
});

export default router;
