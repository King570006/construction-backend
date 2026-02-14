import requireOwner from "../middleware/requireOwner.js";

router.post("/", auth, requireOwner, async (req, res) => {
  const { name, address, latitude, longitude, radius } = req.body;

  await pool.query(
    `INSERT INTO projects (name, address, latitude, longitude, radius_meters)
     VALUES ($1,$2,$3,$4,$5)`,
    [name, address, latitude, longitude, radius]
  );

  res.sendStatus(201);
});
