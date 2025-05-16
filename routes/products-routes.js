import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// fetch all product order data
router.get("/", async (req, res) => {
  try {
    const productsData = await knex("products").select("*");
    res.json(productsData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve product data`,
    });
    console.error("Error fetching productsData", error);
  }
});

export default router;
