const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.development" });
}

const app = express();
app.use(express.json());

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
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});
