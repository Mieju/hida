const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());

app.get("/api/results", (req, res) => {
  const data = fs.readFileSync("./data/results.json");
  res.json(JSON.parse(data));
});

app.get("/api/state-results", (req, res) => {
  const data = fs.readFileSync("./data/state_results.json");
  res.json(JSON.parse(data));
});

app.listen(3001, () => {
  console.log("Backend server running on http://localhost:3001");
});
