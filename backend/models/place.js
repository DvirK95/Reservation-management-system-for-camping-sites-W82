const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema(
  {
    siteId: { type: String, unique: true },
    places: [
      {
        id: { type: String, required: true },
        number: { type: String, required: true },
        left: Number,
        top: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", PlaceSchema, "places");
