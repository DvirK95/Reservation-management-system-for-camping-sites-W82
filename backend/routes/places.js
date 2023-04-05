const express = require("express");
const router = express.Router();

// geting data from external api
const fetchExternalData = async (startDate, endDate, siteId) => {
  try {
    const response = await fetch(
      `${process.env.API_DIR}/item?start_date=${startDate}&end_date=${endDate}&category_id=${siteId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: process.env.API_TOKEN,
        },
        method: "get",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from the external API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchDatabaseData = async (siteId) => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/sites/${siteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from /sites mongoDB");
    }

    const data = await response.json();
    return data;
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

    // Combine CheckFront values into the database array of objects
    for (let placeObjDb of dbData) {
      // add the values
      placeObjDb["name"] = externalData.items[placeObjDb.id].name;
      placeObjDb["stock"] = externalData.items[placeObjDb.id].name;
    }
    // Send combined data array to the frontend
    res.json(dbData);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
