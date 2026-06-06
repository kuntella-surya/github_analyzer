import { db } from "../config/db.js";
export const getAllProfiles = (req, res) => {
  const sql = "SELECT * FROM github_profiles";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      count: results.length,
      data: results,
    });
  });
};

export const getProfileByUsername = (req, res) => {
  const { username } = req.params;

  const sql = "SELECT * FROM github_profiles WHERE username = ?";

  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(results[0]);
  });
};