import { useState, useEffect } from "react";
import "./Sites.css";
import FindSitesByDate from "./FindSitesByDate.js";
import MapWithPlaces from "./MapWithPlaces";
import { Spinner } from "react-bootstrap";

function Sites() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const Camp_name = "פארק נחל אכזיב";
  const [activePlace, setActivePlace] = useState([]);
  const [placesData, setPlacesData] = useState([]);
  const [startDate, setStartDate] = useState(today.toISOString().substr(0, 10));
  const [endDate, setEndDate] = useState(tomorrow.toISOString().substr(0, 10));
  const [isLoading, setIsLoading] = useState(true);

  const handleDateSubmission = (arrival, departure) => {
    setStartDate(arrival);
    setEndDate(departure);
  };

  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchPlaces = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/places?startDate=${startDate}&endDate=${endDate}&siteId=2`
        );

        const data = await response.json();
        setPlacesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
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
      <div className={`innerWrap ${isLoading ? "loading" : ""}`}>
        {isLoading && (
          <div className="spinner-container">
            <Spinner animation="border" />
          </div>
        )}
        <MapWithPlaces
          placesData={placesData}
          handlePlaceClick={handlePlaceClick}
          activePlace={activePlace}
        />
      </div>
    </div>
  );
}

export default Sites;
