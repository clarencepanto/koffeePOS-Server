import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

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
      if (ingredient.stock < totalIngredientsNeeded) {
        return res
          .status(400)
          .json({ error: `Not enough ${ingredient.name} in stock` });
      }

      // deducts ingredients after purchase
      await knex("ingredients")
        .where({ id: item.ingredient_id })
        .update({ stock: ingredient.stock - totalIngredientsNeeded });
    }

    // get the total price of the products
    const product = await knex("products").where({ id: product_id }).first();
    const totalPrice = product.price * quantity;

    // gets history of sales for summary table
    await knex("salesrecord").insert({
      product_id,
      sales_id: id,
      product_name: product.name,
      product_quantity: quantity,
      total_price: totalPrice,
      created_at: new Date(),
    });

    res.status(200).json({
      message: "Product successfully purchased and ingredients updated",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process sale" });
    console.error("Sale error", error);
  }
});

// tracks the record of purchased products
router.get("/salesrecord", async (req, res) => {
  try {
    const salesData = await knex("sales").select("*");
    res.json(salesData);

    res.status(200).json({ message: "Sale generated successfully" });
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve sales data`,
    });
    console.error("Error fetching salesData", error);
  }
});

export default router;
