import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

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

export default router;
