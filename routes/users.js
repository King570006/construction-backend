import express from "express";
import { pool } from "../db.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, async (_, res) => {
  const users = await pool.query("SELECT id,name,role FROM users");
  res.json(users.rows);
});

export default router;