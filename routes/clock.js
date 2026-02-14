import express from "express";
import { pool } from "../db.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// CLOCK IN
router.post("/in", auth, async (req, res) => {
  const { projectId } = req.body;

  const allowed = await pool.query(
    `SELECT 1 FROM project_assignments
     WHERE user_id=$1 AND project_id=$2`,
    [req.user.id, projectId]
  );

  if (!allowed.rows.length) {
    return res.status(403).json({ error: "Not assigned to project" });
  }

  await pool.query(
    `INSERT INTO time_logs (user_id, project_id, clock_in)
     VALUES ($1, $2, NOW())`,
    [req.user.id, projectId]
  );

  res.json({ success: true });
});



// CLOCK OUT
router.post("/out", auth, async (req, res) => {
  await pool.query(
    `UPDATE time_logs
     SET clock_out = NOW()
     WHERE user_id = $1 AND clock_out IS NULL`,
    [req.user.id]
  );

  res.json({ success: true });
});

// redeploy

// TIMESHEET WITH DURATION
router.get("/logs", auth, async (req, res) => {
  const result = await pool.query(
    `SELECT *,
     EXTRACT(EPOCH FROM (clock_out - clock_in))/3600 AS hours
     FROM time_logs
     WHERE user_id = $1`,
    [req.user.id]
  );

  res.json(result.rows);
});

export default router;
