const express = require("express");
const { default: mongoose } = require("mongoose");
//const path = require("path");
//const placesRoutes = require("./routes/places");
//const siteSRoutes = require("./routes/sites");
const dotenv = require("dotenv").config();
const app = express();
app.use(express.json());
/*
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../react-app/build")));
*/
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
/*
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
*/

//app.use("/api/places", placesRoutes);
//app.use("/api/sites", siteSRoutes);
// toRemove in production
const postData = require("./routes/postData");
app.use("/api", postData);

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
