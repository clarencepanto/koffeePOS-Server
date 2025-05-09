import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

// fetch all ingredient order data
router.get("/", async (req, res) => {
  try {
    const usersData = await knex("users").select("*");
    res.json(usersData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve user data`,
    });
    console.error("Error fetching users", error);
  }
});

export default router;
