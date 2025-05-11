import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// fetch all sales order data
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

router.post("/", async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    // get the recipe, what is needed to make the product
    const recipe = await knex("recipes").where({ product_id });

    if (!recipe.length) {
      return res.status(404).json({ error: "Recipe not found for product" });
    }

    // loops over ingredients and updates to see if we have enough
    for (const item of recipe) {
      const ingredient = await knex("ingredients")
        .where({ id: item.ingredient_id })
        .first();
      const totalIngredientsNeeded = item.quantity_needed * quantity;

      // if not enough quantity
      if (ingredient.stock < totalNeeded) {
        return res
          .status(400)
          .json({ error: `Not enough ${ingredient.name} in stock` });
      }

      // deducts ingredients after purchase
      await knex(
        "ingredients"
          .where({ id: ingredient.id })
          .update({ stock: ingredient.stock - totalIngredientsNeeded })
      );
    }

    // get the total price of the products
    const product = await knex("products").where({ id }).first();
    const totalPrice = product.id * quantity;
  } catch (error) {
    res.status(500).json({ error: "Failed to process sale" });
  }
});

export default router;
