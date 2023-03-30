/*
import { useParams } from "react-router-dom";
function Sites() {
  // TODO: connect here api from backend. now just working with dummy

  let sites = {
    2: {
      category_id: 2,
      name: "גן לאומי אכזיב",
      description: "בלה",
    },
  };

  const params = useParams();
  return (
    <section>
      <h1>Site: {params.siteId}</h1>
    </section>
  );
}

export default Sites;
*/

import React, { useState } from "react";
import stadium from "./maps/2.png";

function Stadium() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (event) => {
    const { id, x, y } = event.target.dataset;
    const seat = { id, x, y };
    setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seat]);
  };

  return (
    <div className="stadium">
      <img
        src={stadium}
        alt="Stadium map"
        useMap="#seatsMap"
        onClick={handleSeatClick}
      />
      <map name="seatsMap">
        <area
          id="seat1"
          data-x="100"
          data-y="150"
          shape="circle"
          coords="100,150,10"
        />
        <area
          id="seat2"
          data-x="200"
          data-y="200"
          shape="circle"
          coords="200,200,10"
        />
        <area
          id="seat3"
          data-x="300"
          data-y="250"
          shape="circle"
          coords="300,250,10"
        />
      </map>
      <div className="selected-seats">
        <h2>Selected seats:</h2>
        <ul>
          {selectedSeats.map((seat) => (
            <li key={seat.id}>
              Seat {seat.id} - x: {seat.x}, y: {seat.y}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Stadium;
