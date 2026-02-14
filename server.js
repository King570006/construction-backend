import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import clockRoutes from "./routes/clock.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/clock", clockRoutes);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);

