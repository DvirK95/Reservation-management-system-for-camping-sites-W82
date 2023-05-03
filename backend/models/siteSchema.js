const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  xAxis: {
    type: Number,
    required: true,
  },
  yAxis: {
    type: Number,
    required: true,
  },
  map: {
    type: String,
    required: true,
    unique: true,
  },
});

const Site = mongoose.model("Site", siteSchema);
module.exports = Site;
