const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

// List of German states used when fetching individual results
const STATES = [
  "baden-wuerttemberg",
  "bayern",
  "berlin",
  "brandenburg",
  "bremen",
  "hamburg",
  "hessen",
  "mecklenburg-vorpommern",
  "niedersachsen",
  "nordrhein-westfalen",
  "rheinland-pfalz",
  "saarland",
  "sachsen",
  "sachsen-anhalt",
  "schleswig-holstein",
  "thueringen",
];

const GERMANY_URL =
  process.env.GERMANY_URL ||
  "https://example.com/election/germany.json";
const STATE_URL_TEMPLATE =
  process.env.STATE_URL_TEMPLATE ||
  "https://example.com/election/{state}.json";

app.use(cors());
app.use(express.json());

// Utility function to fetch JSON data from a URL
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  return res.json();
}

// Download election results for Germany and all states and save them
async function updateResults() {
  // ensure state directory exists
  const stateDir = path.join(__dirname, "data", "states");
  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
  }

  // Fetch overall German results
  const germanyData = await fetchJson(GERMANY_URL);
  fs.writeFileSync(
    path.join(__dirname, "data", "results.json"),
    JSON.stringify(germanyData, null, 2)
  );

  // Fetch per-state results
  for (const state of STATES) {
    const url = STATE_URL_TEMPLATE.replace("{state}", state);
    const data = await fetchJson(url);
    fs.writeFileSync(
      path.join(stateDir, `${state}.json`),
      JSON.stringify(data, null, 2)
    );
  }
}

// Return election results. Use `?state=` query parameter for state-specific data
app.get("/api/results", (req, res) => {
  const state = req.query.state;
  const filePath = state
    ? path.join(__dirname, "data", "states", `${state}.json`)
    : path.join(__dirname, "data", "results.json");

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Results not found" });
  }

  const data = fs.readFileSync(filePath);
  res.json(JSON.parse(data));
});

app.get("/api/state-results", (req, res) => {
  const data = fs.readFileSync("./data/state_results.json");
  res.json(JSON.parse(data));
});

function start(port = 3001) {
  return app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
  });
}

if (require.main === module) {
  start();
}

module.exports = { app, start };
