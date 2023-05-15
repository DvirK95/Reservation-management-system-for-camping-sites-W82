const axios = require('axios');

async function extractValues(str) {
  const matches = str.match(
    /(\d+)\.(\d{8})X(\d+)(?:-adults\.(\d+))?(?:-children\.(\d+))?(?:-toddler\.(\d+))?/
  );

  if (matches === null) {
    // If the string doesn't match the expected pattern, return null or throw an error
    return null;
  }
  const [fullMatch, id, startDateStr, durationStr, adults, children, toddler] =
    matches;
  const startDate = new Date(
    startDateStr.substring(0, 4),
    parseInt(startDateStr.substring(4, 6)) - 1,
    startDateStr.substring(6, 8)
  );
  const endDate = new Date(
    startDate.getTime() + parseInt(durationStr) * 86400000
  ); // 86400000 = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

  return {
    id: id,
    startDate: startDate.toLocaleDateString('en-US', options),
    endDate: endDate.toLocaleDateString('en-US', options),
    adults: adults ? parseInt(adults) : 0,
    children: children ? parseInt(children) : 0,
    toddler: toddler ? parseInt(toddler) : 0,
  };
}

async function getBookingItemKey(sessionId, itemId) {
  try {
    const response = await axios.get(
      `${process.env.API_DIR}/booking/session?session_id=${sessionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.API_TOKEN,
        },
      }
    );
    const items = response.data.booking.session.item;
    for (itemKey in items) {
      if (String(items[itemKey].item_id) === String(itemId)) {
        return itemKey;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function getExtraDataItem(slip) {
  const slipValues = await extractValues(slip);
  try {
    const response = await axios.get(
      `${process.env.API_DIR}/item/${slipValues.id}`,
      {
        params: {
          start_date: slipValues.startDate,
          end_date: slipValues.endDate,
          'param[adult]': slipValues.adults,
          'param[child]': slipValues.children,
          'param[toddler]': slipValues.toddler,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.API_TOKEN,
        },
      }
    );
    const item = response.data.item;
    delete slipValues.id;

    return {
      startDate: slipValues.startDate,
      endDate: slipValues.endDate,
      image: item?.image ?? null,
      summary: item?.summary ?? null,
      ...slipValues,
    };
  } catch (error) {
    console.log(error);
  }
}

const createBookingSession = async (req, res) => {
  try {
    const { remove, ...restData } = req.body;
    let data = { ...restData };
    if (remove) {
      key = await getBookingItemKey(restData.session_id, remove);
      data = {
        ...data,
        alter: {
          [key]: 'remove',
        },
      };
    }
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
    const items = response.data.booking.session.item;

    const result = {
      items: [],
      package: [],
    };

    for (const key in items) {
      const itemObj = {
        key: key,
        ...(await getExtraDataItem(items[key].slip)),
        ...items[key],
      };

      if (key.includes('.')) {
        result.package.push(itemObj);
      } else {
        result.items.push(itemObj);
      }
    }
    delete response.data.booking.session.item;
    response.data.booking.session = Object.assign(
      {},
      response.data.booking.session,
      result
    );
    res.json(response.data.booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking session', error });
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
  clearBookingSession,
};
