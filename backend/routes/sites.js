/*const express = require("express");
const Place = require("../models/place");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const data = req.body;
  console.log("Received data:", data);

  try {
    for (const siteId in data) {
      const place = new Place({
        siteId: siteId,
        places: data[siteId],
      });

      const savedPlace = await place.save();
      console.log(`Data for siteId ${siteId} saved.`, savedPlace);
    }
    res.status(201).send({ message: "All data saved" });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).send({ error: "Error saving data" });
  }
});

router.get("/:siteId", async (req, res, next) => {
  const siteId = req.params.siteId;

  if (!siteId) {
    res.status(400).send({ message: "Missing siteId header" });
    return;
  }

  try {
    const place = await Place.findOne({ siteId: siteId });

    if (!place) {
      res
        .status(404)
        .send({ message: "No data found for the provided siteId" });
    } else {
      res.status(200).send(place.places);
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send({ error: "Error fetching data" });
  }
});

module.exports = router;
*/
