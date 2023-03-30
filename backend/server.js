const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../react-app/build")));

// Serve the index.html file for all other requests
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    next();
  } else {
    res.sendFile(
      path.resolve(__dirname, "../", "react-app", "build", "index.html")
    );
  }
});

const apiToken = process.env.API_TOKEN;
const apiURL = process.env.API_DIR;

app.get("/api/*", async (req, res, next) => {
  try {
    const apiPath = req.path.replace("/api", "");
    const response = await fetch(`${apiURL}/api/3.0${apiPath}`, {
      headers: {
        Accept: "application/json",
        Authorization: apiToken,
      },
      //method: "get",
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5000); // start Node + Express server on port 5000
