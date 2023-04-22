const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const postData = require("./routes/postData");
const placeRoutes = require("./routes/places-routes");
const siteRoutes = require("./routes/site-routes");

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

// toRemove in production
app.use("/post", postData);

app.use("/places", placeRoutes);
app.use("/sites", siteRoutes);

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
