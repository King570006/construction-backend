import express from "express";
import { pool } from "../db.js";
import auth from "../middleware/authMiddleware.js";
import requireOwner from "../middleware/requireOwner.js";

const router = express.Router();

router.post("/", auth, requireOwner, async (req, res) => {
  const { name, address, latitude, longitude, radius } = req.body;

  await pool.query(
    `INSERT INTO projects (name, address, latitude, longitude, radius_meters)
     VALUES ($1,$2,$3,$4,$5)`,
    [name, address, latitude, longitude, radius]
  );

  res.sendStatus(201);
});

export default router;
