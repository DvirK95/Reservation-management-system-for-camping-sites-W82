const express = require("express");

const router = express.Router();

// toDo - replace to the real
const DUMMY_PLACES = require("./dummyData.json");

router.get("/:sid/", (req, res, next) => {
  const siteId = req.params.sid;
  /*const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });*/
  res.json(DUMMY_PLACES[siteId]);
});

module.exports = router;
