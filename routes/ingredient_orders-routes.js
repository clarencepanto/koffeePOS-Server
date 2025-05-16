import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// fetch all ingredient list that is available to order data
router.get("/", async (req, res) => {
  try {
    const ingredientOrders = await knex("ingredient_orders").select("*");
    res.json(ingredientOrders);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve restock order data`,
    });
    console.error("Error fetching restock data", error);
  }
});

// create new ingredient
router.post("/", async (req, res) => {
  const { ingredient_id, order_quantity } = req.body;
  try {
    // get the stock id
    const restock = await knex("ingredient_orders").where({ ingredient_id });

    if (!restock.length) {
      return res
        .status(404)
        .json({ error: "Ingredient not found for restocking" });
    }

    // loops over and restocks based on the ingredient id we post
    for (const item of restock) {
      const ingredient = await knex("ingredients")
        .where({ id: ingredient_id })
        .first();

      // multiplies order quantity with 1 unit/batch
      const totalIngredientsOrdered = item.quantity_restock * order_quantity;

      //  adds ingredients after restocking
      await knex("ingredients")
        .where({ id: item.ingredient_id })
        .update({ stock: ingredient.stock + totalIngredientsOrdered });
    }

    res.status(200).json({ message: "Stock successfully restocked!" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(404)
      .json({ message: "Inventory not updated. Please try again" });
  }
});

export default router;

// router.post("/", async (req, res) => {
//   const { product_id, quantity } = req.body;
//   try {
//     // get the recipe, what is needed to make the product
//     const recipe = await knex("recipes").where({ product_id });

//     if (!recipe.length) {
//       return res.status(404).json({ error: "Recipe not found for product" });
//     }

//     // loops over ingredients and updates to see if we have enough
//     for (const item of recipe) {
//       const ingredient = await knex("ingredients")
//         .where({ id: item.ingredient_id })
//         .first();
//       const totalIngredientsNeeded = item.quantity_needed * quantity;

//       // if not enough quantity
//       if (ingredient.stock < totalIngredientsNeeded) {
//         return res
//           .status(400)
//           .json({ error: `Not enough ${ingredient.name} in stock` });
//       }

//       // deducts ingredients after purchase
//       await knex("ingredients")
//         .where({ id: item.ingredient_id })
//         .update({ stock: ingredient.stock - totalIngredientsNeeded });
//     }

//     // get the total price of the products
//     const product = await knex("products").where({ id: product_id }).first();
//     const totalPrice = product.price * quantity;
//     console.log(product.price, quantity);

//     // gets history of sales for summary table
//     await knex("sales").insert({
//       product_id,
//       product_name: product.name,
//       quantity,
//       total_price: totalPrice,
//       created_at: new Date(),
//     });

//     res.status(200).json({
//       message: "Product successfully purchased and ingredients updated",
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to process sale" });
//     console.error("Sale error", error);
//   }
// });
