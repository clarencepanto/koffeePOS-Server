import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// fetch all product order data
router.get("/", async (req, res) => {
  try {
    const recipesData = await knex("recipes").select("*");
    res.json(recipesData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve recipe data`,
    });
    console.error("Error fetching recipesData", error);
  }
});

export default router;
