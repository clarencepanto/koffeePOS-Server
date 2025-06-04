import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";

const router = express.Router();

// // fetch all product order data
router.get("/", async (req, res) => {
  try {
    // Helper function to calculate updated product availability

    const products = await knex("products");

    const results = [];

    for (const product of products) {
      const recipe = await knex("recipes").where({ product_id: product.id });
      if (!recipe.length) {
        results.push({ id: product.id, name: product.name, available: 0 });
        continue;
      }

      const availableUnits = [];

      for (const item of recipe) {
        const ingredient = await knex("ingredients")
          .where({ id: item.ingredient_id })
          .first();
        if (!ingredient) {
          availableUnits.push(0);
          continue;
        }

        const units = Math.floor(ingredient.stock / item.quantity_needed);
        availableUnits.push(units);
      }

      const available = Math.min(...availableUnits);
      results.push({ id: product.id, name: product.name, available });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve recipe data`,
    });
    console.error("Error fetching recipesData", error);
  }
});

export default router;
