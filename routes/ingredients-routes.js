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
    const [id] = await knex("ingredients");

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

// manual update for ingredients
router.patch("/restock/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // get restock info
    const restock = await knex("ingredient_orders").where({ id }).first();

    // check if restock file is active
    if (!restock) {
      return res.status(404).json({ error: "Restock record not found" });
    }

    // get ingredient to update
    const ingredient = await knex("ingredients")
      .where({ id: restock.ingredient_id })
      .first();

    // check if ingredient is active
    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" });
    }

    // combine active stocks with ordered stocks
    const updateIngredient = ingredient.stock + restock.quantity_restock;

    // update the new ingredient
    await knex("ingredients")
      .where({ id: restock.ingredient_id })
      .update({ stock: updateIngredient });

    // return updated row
    const newUpdatedIngredients = await knex("ingredients")
      .where({ id })
      .first();
    res.status(200).json(newUpdatedIngredients);
  } catch (error) {
    console.error(`Error updating the ingredient ${error}`);
  }
});

export default router;
