// Sites.js
import { useState, useEffect } from "react";
import map from "./maps/2.png";
import "./Sites.css";
import FindSitesByDate from "./FindSitesByDate.js";
import Place from "./Place";

function Sites() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const Camp_name = "פארק נחל אכזיב";
  const [activePlace, setActivePlace] = useState([]);
  const [placesData, setPlacesData] = useState([]);
  const [startDate, setStartDate] = useState(today.toISOString().substr(0, 10));
  const [endDate, setEndDate] = useState(tomorrow.toISOString().substr(0, 10));

  const handleDateSubmission = (arrival, departure) => {
    setStartDate(arrival);
    setEndDate(departure);
  };

  useEffect(() => {
    if (!startDate || !endDate) return;
    const fetchPlaces = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/places?startDate=${startDate}&endDate=${endDate}&siteId=2`
        );

        const data = await response.json();
        setPlacesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlaces();
  }, [startDate, endDate]);

  const handlePlaceClick = (placeObj) => {
    setActivePlace((prevActivePlace) => {
      if (prevActivePlace.includes(placeObj.id)) {
        // Remove the placeObj.id from the activePlace array
        return prevActivePlace.filter((placeId) => placeId !== placeObj.id);
      } else {
        // Add the placeObj.id to the activePlace array
        return [...prevActivePlace, placeObj.id];
      }
    });
  };

  return (
    <div className="sites" dir="rtl">
      <h1 className="title">{Camp_name}</h1>
      <FindSitesByDate
        onDateSubmit={handleDateSubmission}
        initialArrivalDate={startDate}
        initialDepartureDate={endDate}
      />
      <div className="innerWrap">
        <img src={map} alt="Campground Map" className="campground-map" />
        <div className="places">
          {placesData.map((placeObj) => (
            <Place
              key={placeObj["id"]}
              placeObj={placeObj}
              onClick={handlePlaceClick}
              active={activePlace.includes(placeObj["id"])}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sites;
