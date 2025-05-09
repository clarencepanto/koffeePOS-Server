import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// fetch all ingredient order data
router.get("/", async (req, res) => {
  try {
    const ingredientOrders = await knex("ingredient_orders").select("*");
    res.json(ingredientOrders);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve ingredient order data`,
    });
    console.error("Error fetching ingredientOrders", error);
  }
});

export default router;
