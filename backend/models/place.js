const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema(
  {
    siteId: { type: String, unique: true },
    places: [
      {
        id: { type: String, required: true },
        number: { type: String, required: true },
        top: Number,
        left: Number,
        shape: { type: String, default: "circle" },
        size: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", PlaceSchema, "places");
