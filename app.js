import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import profileRoutes from "./routes/profileRoutes.js";
import { getUserData, getUserRepos } from "./services/githubservice.js";
import { db } from "./config/db.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GitHub Profile Analyzer API is running");
});

app.use("/api", profileRoutes);
/*app.get("/api/analyze/:username", (req, res) => {
  res.json({ message: "GET route working", user: req.params.username });
});*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});