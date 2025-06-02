import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// fetch all product order data
router.get("/", async (req, res) => {
  try {
    const calculateAvailableProducts = async function (product_id) {
      // Get the product recipe
      const recipe = await knex("recipes").where({ product_id });

      if (!recipe.length) return 0;

      // stores the products available to make
      const availableUnits = [];
      console.log(availableUnits);

      // Loop through each ingredient in the recipe
      for (const item of recipe) {
        const ingredient = await knex("ingredients")
          .where({ id: item.ingredient_id })
          .first();

        if (!ingredient) return 0;

        // calculate how many products we can make with the ingredient
        const productsFromTheIngredients = Math.floor(
          ingredient.stock / item.quantity_needed
        );
        availableUnits.push(productsFromTheIngredients);
      }

      // Return the minimum available products we can make
      return Math.min(...availableUnits);
    };

    // calculate all products that can be made
    const products = await knex("products");

    // get all available products
    const results = [];
    for (const product of products) {
      const available = await calculateAvailableProducts(product.id);
      // console.log(`${product.name}: ${available} available stock`);
      results.push({
        id: product.id,
        name: product.name,
        available,
      });
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
