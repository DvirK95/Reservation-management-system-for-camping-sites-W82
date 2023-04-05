const express = require("express");

const router = express.Router();

// geting data from external api
const apiToken = process.env.API_TOKEN;
const apiURL = process.env.API_DIR;

const fetchExternalData = async (startDate, endDate, siteId) => {
  try {
    const response = await fetch(
      `${apiURL}/item?start_date=${startDate}&end_date=${endDate}&category_id=${siteId}`,
      {
        headers: { Accept: "application/json", Authorization: apiToken },
        method: "get",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from the external API");
    }

    const data = await response.json();
    return data; // Return the entire data object, not just the items property
  } catch (error) {
    console.error(error);
    return null;
  }
};

// toDo - replace to the MongoDb
const DUMMY_PLACES = require("./dummyData.json");
// Fetch all additional data from your database
const fetchDatabaseData = (siteId) => {
  try {
    return DUMMY_PLACES[siteId];
  } catch (error) {
    console.error(error);
    return null;
  }
};

router.get("/", async (req, res, next) => {
  try {
    const { startDate, endDate, siteId } = req.query;

    // Fetch data from the external API
    const externalData = await fetchExternalData(startDate, endDate, siteId);
    // Fetch all additional data from your database
    const dbData = await fetchDatabaseData(siteId);

    // Combine externalData and dbData into an array of objects using a single loop
    const combinedData = [];

    /*
    for (const key in externalData.items) {
      // Access the items property here
      const item = externalData.items[key];
      const dbItem = dbData.find((dbItem) => dbItem.id === key);

      combinedData.push({
        ...item,
        left: dbItem ? dbItem.left : null,
        top: dbItem ? dbItem.top : null,
      });
    }
    */
    for (let placeObjDb of dbData) {
      externalData.items[placeObjDb.id]["top"] = placeObjDb.top;
      externalData.items[placeObjDb.id]["left"] = placeObjDb.left;
    }
    // Send combined data array to the frontend
    res.json(externalData);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

/*
router.get("/", (req, res, next) => {
  const siteId = req.params.sid;

  res.json(DUMMY_PLACES[siteId]);
});
*/
/*
router.get("/", async (req, res, next) => {
  try {
    const { startDate, endDate, siteId } = req.query;
    const response = await fetch(
      `${apiURL}/item?start_date=${startDate}&end_date=${endDate}&category_id=${siteId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: apiToken,
        },
        method: "get",
      }
    );
    const externalData = await response.json();
    const DUMMY_PLACES = require("./dummyData.json");
    const placesArrDb = DUMMY_PLACES[siteId];
    
    for (let placeObjDb of placesArrDb) {
      externalData.items[placeObjDb.id]["top"] = placeObjDb.top;
      externalData.items[placeObjDb.id]["left"] = placeObjDb.left;
    }

    res.json(externalData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  // try this
  next();
});
*/
module.exports = router;
