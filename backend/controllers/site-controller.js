const Site = require("../models/siteSchema");

exports.getAllSites = async (req, res) => {
  try {
    const sites = await Site.find({});
    res.status(200).send(sites);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch sites" });
  }
};
