import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// middleware
const checkpoint = (req, res, next) => {
  const { supplier_id, ingredient_id, quantity, unit } = req.body;
  if (!supplier_id || !ingredient_id || !quantity || !unit) {
    return res
      .status(400)
      .json({ message: "Please fill all required information" });
  }
  next();
};

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

// create new ingredient
router.post("/", checkpoint, async (req, res) => {
  try {
    const [id] = await knex("ingredient_orders").insert(req.body);

    const newIngredient = await knex("ingredient_orders")
      .select(["supplier_id", "ingredient_id", "quantity", "unit"])
      .where({ id })
      .first();
    res.status(201).json(newIngredient);
  } catch (error) {
    return res
      .status(404)
      .json({ message: "No new sales generated. Please try again" });
  }
});

export default router;
