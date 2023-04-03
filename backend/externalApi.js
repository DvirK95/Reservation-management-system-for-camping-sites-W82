const express = require("express");

const router = express.Router();

router.get("/api", (req, res, next) => {
  res.json({ message: "sad" });
  /*const placeId = req.params.pid;
    const place = DUMMY_PLACES.find((p) => {
      return p.id === placeId;
    });
    console.log("asd");
    res.json({ place: place });*/
});

module.exports = router;
