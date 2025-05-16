import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const restockRecord = await knex("restockrecord").select("*");
    res.json(restockRecord);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve restock record data`,
    });
    console.error("Error fetching restock record", error);
  }
});

export default router;
