import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// middleware
const checkpoint = (req, res, next) => {
  const { product_id, quantity, unit_price, total_price } = req.body;
  if (!product_id || !quantity || !unit_price || !total_price) {
    return res
      .status(400)
      .json({ message: "Please fill all required information" });
  }
  next();
};

// fetch all ingredient order data
router.get("/", async (req, res) => {
  try {
    const salesData = await knex("sales").select("*");
    res.json(salesData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve sales data`,
    });
    console.error("Error fetching salesData", error);
  }
});

// create new ingredient
router.post("/", checkpoint, async (req, res) => {
  try {
    const [id] = await knex("sales").insert(req.body);

    const newIngredient = await knex("sales")
      .select(["product_id", "quantity", "unit_price", "total_price"])
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
