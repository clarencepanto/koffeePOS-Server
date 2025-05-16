import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

const JWT_SECRET = "supersecretkey";

// middleware to protect user routes
export function authenticateToken(req, res, next) {
  const authHeather = req.headers["authorization"];
  const token = authHeather && authHeather.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token Not Found" });
  }

  try {
    // verifies token if its valid
    const user = jwt.verify(token, JWT_SECRET);
    // can have access to req.user in the route
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

// middleware to protect routes
export function authorizeRole(requiredRole) {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: "Acess denied" });
    }
    next();
  };
}

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // find valid user
    const user = await knex("users").where({ username }).first();
    if (!user) {
      return res.status(401).json({ error: "Invalid Username" });
    }

    // checks to see if password is ok
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "20m" }
    );

    // return token
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login Failed" });
  }
});

export default router;
