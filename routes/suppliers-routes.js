import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// fetch all suppliers  data
router.get("/", async (req, res) => {
  try {
    const suppliersData = await knex("suppliers").select("*");
    res.json(suppliersData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve suppliers data`,
    });
    console.error("Error fetching suppliersData", error);
  }
});

export default router;
