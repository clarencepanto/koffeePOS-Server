import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// fetch all restock record data that was purchased
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

// creates a new restock record and adds it to the database
router.post("/", async (req, res) => {
  const { ingredients_id, ingredient_name, ingredient_quantity } = req.body;
  try {
    const [restockRecordID] = await knex("restockrecord").insert(req.body);

    const newRestockItem = await knex("restockrecord").where({
      id: restockRecordID,
    });
    res.status(200).json(newRestockItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to record restock" });
    console.error("Failed to record restock", error);
  }
});

export default router;
