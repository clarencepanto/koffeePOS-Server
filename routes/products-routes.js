import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// fetch all product order data
router.get("/", async (req, res) => {
  try {
    const productsData = await knex("products").select("*");
    res.json(productsData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve product data`,
    });
    console.error("Error fetching productsData", error);
  }
});

// update the quantity
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const quantityUpdate = req.body;

  try {
    const updated = await knex("products").where({ id }).update(quantityUpdate);

    if (updated === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await knex("products").where({ id }).first();
    res.json(product);
  } catch (error) {
    console.error("PATCH error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

export default router;
