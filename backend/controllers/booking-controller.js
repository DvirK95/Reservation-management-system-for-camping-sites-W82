const axios = require('axios');

const apiClient = axios.create({
  baseURL: process.env.API_DIR,
  headers: {
    Authorization: process.env.API_TOKEN,
  },
});

const createBookingSession = async (req, res) => {
  try {
    const data = req.body;

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.API_DIR}/booking/session`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_TOKEN,
      },
      data: data,
    };

    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking session', error });
  }
};

const getBookingSession = async (req, res) => {
  try {
    const apiUrl = `/booking/session?session_id=${req.query.session_id}`;
    const apiResponse = await apiClient.get(apiUrl);

    res.json(apiResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving booking session');
  }
};

const clearBookingSession = async (req, res) => {
  try {
    const data = req.body;

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.API_DIR}/booking/session/clear`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_TOKEN,
      },
      data: data,
    };

    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error clear booking session', error });
  }
};

module.exports = {
  createBookingSession,
  getBookingSession,
  clearBookingSession,
};
