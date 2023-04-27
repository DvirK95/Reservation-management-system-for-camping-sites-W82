const axios = require("axios");
const Place = require("../models/placeSchema");
const Relation = require("../models/sitePlaceRelationSchema");

// get the small img in checkfront
function smallImg(imgObj) {
  try {
    return imgObj["1"].url_small;
  } catch (TypeError) {
    return null;
  }
}

const fetchExternalData = async (startDate, endDate, siteId) => {
  try {
    const response = await axios.get(`${process.env.API_DIR}/item`, {
      params: {
        start_date: startDate,
        end_date: endDate,
        category_id: siteId,
      },
      headers: {
        Accept: "application/json",
        Authorization: `${process.env.API_TOKEN}`,
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

exports.getPlacesBySiteId = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const siteId = req.params.siteId;

    const relations = await Relation.find({ siteId }).populate("placeId");
    const places = relations.map((relation) => relation.placeId);

    // Fetch additional data from the external API
    const externalData = await fetchExternalData(startDate, endDate, siteId);

    // Add the values from the external API data to the database data
    const updatedPlaces = places.map((placeObjDb) => {
      const placeId = placeObjDb._id.toString();

      if (externalData.items && externalData.items[placeId]) {
        return {
          ...placeObjDb.toObject(),
          title: externalData.items[placeId].name,
          summary: externalData.items[placeId].summary,
          status: externalData.items[placeId].rate.status,
          available: externalData.items[placeId].rate.available,
          slip: externalData.items[placeId].rate.slip,
          price: externalData.items[placeId].rate.summary.price,
          localStartDate: externalData.items[placeId].local_start_date,
          localEndDate: externalData.items[placeId].local_end_date,
          nights: externalData.items[placeId].days,
          label: externalData.items[placeId].meta.productLabel,

          // return null if there is not img found
          smallImg: smallImg(externalData.items[placeObjDb.id].image),
          imgMedium: externalData.items[placeObjDb.id].image["1"].url_medium,
        };
      } else {
        return placeObjDb;
      }
    });

    res.status(200).send(updatedPlaces);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch places" });
  }
};
