const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

// Convenience function for sending JSON responses
function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
}

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

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);

  if (req.method === "OPTIONS") {
    // Handle CORS preflight
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && parsed.pathname === "/api/results") {
    const state = parsed.query.state;
    const filePath = state
      ? path.join(__dirname, "data", "states", `${state}.json`)
      : path.join(__dirname, "data", "results.json");

    if (!fs.existsSync(filePath)) {
      sendJson(res, 404, { error: "Results not found" });
      return;
    }

    const data = fs.readFileSync(filePath);
    sendJson(res, 200, JSON.parse(data));
    return;
  }

  if (req.method === "GET" && parsed.pathname === "/api/state-results") {
    const data = fs.readFileSync(path.join(__dirname, "data", "state_results.json"));
    sendJson(res, 200, JSON.parse(data));
    return;
  }

  if (req.method === "POST" && parsed.pathname === "/api/update-results") {
    try {
      await updateResults();
      sendJson(res, 200, { success: true });
    } catch (err) {
      console.error(err);
      sendJson(res, 500, { error: "Failed to update results" });
    }
    return;
  }

  // Not found
  sendJson(res, 404, { error: "Not found" });
});

server.listen(3001, () => {
  console.log("Backend server running on http://localhost:3001");

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
