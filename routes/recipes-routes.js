import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";

const router = express.Router();

// fetch all recipes data
router.get("/", async (req, res) => {
  try {
    const recipeData = await knex("recipes").select("*");
    res.json(recipeData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve product data`,
    });
    console.error("Error fetching recipeData", error);
  }
});

export default router;
