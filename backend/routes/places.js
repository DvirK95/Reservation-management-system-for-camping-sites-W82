const express = require("express");
const router = express.Router();
const axios = require("axios");

// geting data from external api
const fetchExternalData = async (startDate, endDate, siteId) => {
  try {
    const response = await axios.get(`${proccess.env.API_DIR}/item`, {
      params: {
        start_date: startDate,
        end_date: endDate,
        category_id: siteId,
      },
      headers: {
        Accept: "application/json",
        //Authorization: process.env.API_TOKEN,
        Authorization: `${proccess.env.API_TOKEN}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch data from the external API");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchDatabaseData = async (siteId) => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/sites/${siteId}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch data from /sites mongoDB");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// check if there is an image in checkfront
function smallImg(imgObj) {
  try {
    return imgObj["1"].url_small;
  } catch (TypeError) {
    return null;
  }
}

router.get("/", async (req, res, next) => {
  try {
    const { startDate, endDate, siteId } = req.query;

    // Fetch data from the external API
    const externalData = await fetchExternalData(startDate, endDate, siteId);
    console.log("fetched externaldata");
    // Fetch all additional data from your database
    const dbData = await fetchDatabaseData(siteId);
    console.log("fetched mongo database data");

    // Combine CheckFront values into the database array of objects
    for (let placeObjDb of dbData) {
      // add the values
      placeObjDb["name"] = externalData.items[placeObjDb.id].name;
      placeObjDb["status"] = externalData.items[placeObjDb.id].rate.status;

      placeObjDb["available"] =
        externalData.items[placeObjDb.id].rate.available;

      placeObjDb["price"] =
        externalData.items[placeObjDb.id].rate.summary.price;

      placeObjDb["localStartDate"] =
        externalData.items[placeObjDb.id].local_start_date;

      placeObjDb["localEndDate"] =
        externalData.items[placeObjDb.id].local_end_date;

      placeObjDb["nights"] = externalData.items[placeObjDb.id].days;

      placeObjDb["label"] = externalData.items[placeObjDb.id].meta.productLabel;

      // return null if there is not img found
      placeObjDb["smallImg"] = smallImg(
        externalData.items[placeObjDb.id].image
      );
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
