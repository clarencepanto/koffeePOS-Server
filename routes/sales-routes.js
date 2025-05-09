import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// fetch all ingredient order data
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

export default router;
