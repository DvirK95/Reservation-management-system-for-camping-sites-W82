const axios = require("axios");
const Site = require("../models/siteSchema");

exports.getAllSites = async (req, res) => {
  try {
    const sites = await Site.find({});

    // Fetch additional data from the external API
    const response = await axios.get(`${process.env.API_DIR}/category`, {
      headers: {
        Accept: "application/json",
        Authorization: `${process.env.API_TOKEN}`,
      },
    });

    const externalData = response.data.category;

    // Add the values from the external API data to the database data
    const updatedSites = sites.map((site) => {
      const siteId = site._id.toString();

      if (externalData[siteId]) {
        return { ...site.toObject(), ...externalData[siteId] };
      } else {
        return site;
      }
    });

    res.status(200).send(updatedSites);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch sites" });
  }
};
