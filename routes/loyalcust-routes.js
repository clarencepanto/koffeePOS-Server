import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";

const router = express.Router();

// get loyal cust data
router.get("/", async (req, res) => {
  try {
    const loyalCust = await knex("loyalcustomer").select("*");
    res.json(loyalCust);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve product data`,
    });
    console.error("Error fetching loyalCust", error);
  }
});

// create loyal customer
router.post("/", async (req, res) => {
  const { customer_name, customer_allergy, customer_phone } = req.body;

  try {
    const [id] = await knex("loyalcustomer").insert({
      customer_name,
      customer_allergy,
      customer_phone,
    });

    const newLoyalty = await knex("loyalcustomer")
      .select("id", "customer_name", "customer_allergy", "customer_phone")
      .where({ id })
      .first();

    res.status(201).json(newLoyalty);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Unable to add Data!" });
  }
});

export default router;
