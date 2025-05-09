import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// middleware
const checkpoint = (req, res, next) => {
  const { name, stock, unit } = req.body;
  if (!name || !stock || !unit) {
    return res
      .status(400)
      .json({ message: "Please fill all required information" });
  }
  next();
};

// fetch all ingredient order data
router.get("/", async (req, res) => {
  try {
    const ingredientData = await knex("ingredients").select("*");
    res.json(ingredientData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve ingredient data`,
    });
    console.error("Error fetching ingredientData", error);
  }
});

// create new ingredient
router.post("/", checkpoint, async (req, res) => {
  try {
    const [id] = await knex("ingredients").insert(req.body);

    const newIngredient = await knex("ingredients")
      .select(["id", "name", "stock", "unit"])
      .where({ id })
      .first();
    res.status(201).json(newIngredient);
  } catch (error) {
    return res
      .status(404)
      .json({ message: "No new ingredient generated. Please try again" });
  }
});

export default router;
