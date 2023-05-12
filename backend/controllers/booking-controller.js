const axios = require('axios');

// toDo: check if session_id is valid
const createBooking = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;
    const sessionId = req.params.sessionId;
    console.log('sessionId', sessionId);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.API_DIR}/booking/create`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_TOKEN,
      },
      data: {
        form: {
          customer_name: firstName,
          customer_last: lastName,
          customer_email: email,
          customer_phone: phoneNumber,
        },
        session_id: sessionId,
      },
    };
    const response = await axios.request(config);
    if (response.data.request.status === 'OK') {
      res.json(response.data);
      console.log('res', response.data);
    } else {
      throw new Error(`Error title: ${response.data.request.error.title}`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

module.exports = {
  createBooking,
};
