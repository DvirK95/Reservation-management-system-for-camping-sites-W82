const express = require("express");
//const mongoose = require("mongoose");
const { default: mongoose } = require("mongoose");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../react-app/build")));

// change it on production
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

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

/*
const apiToken = process.env.API_TOKEN;
const apiURL = process.env.API_DIR;

app.get("/data/api/*", async (req, res, next) => {
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
  // try this
  next();
});
*/
const placesRoutes = require("./routes/places");
app.use("/api/places", placesRoutes);

const siteSRoutes = require("./routes/sites");
app.use("/api/sites", siteSRoutes);

mongoose
  .connect(process.env.MONGO_DB_PASSWORD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});
