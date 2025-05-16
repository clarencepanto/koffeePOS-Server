import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// fetch all sales record made
router.get("/", async (req, res) => {
  try {
    const salesRecord = await knex("salesrecord").select("*");
    res.json(salesRecord);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve sales record data`,
    });
    console.error("Error fetching sales record", error);
  }
});

export default router;
