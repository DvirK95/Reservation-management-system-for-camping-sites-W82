<<<<<<< HEAD
const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
=======
const express = require('express');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv').config();
>>>>>>> preparebackend2

const app = express();

<<<<<<< HEAD
=======
app.use(express.json());

>>>>>>> preparebackend2
// change it on production
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

<<<<<<< HEAD
const placesRoutes = require("./routes/places");
app.use("/api/places", placesRoutes);

const siteSRoutes = require("./routes/sites");
app.use("/api/sites", siteSRoutes);
=======
// toRemove in production
app.use('/post', require('./routes/postData'));

app.use('/places', require('./routes/places-routes'));
app.use('/sites', require('./routes/site-routes'));
app.use('/booking', require('./routes/booking-routes'));
>>>>>>> preparebackend2

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

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});
