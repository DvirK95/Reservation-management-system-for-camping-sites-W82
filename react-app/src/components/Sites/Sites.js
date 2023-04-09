import { useState, useEffect } from "react";
import "./Sites.css";
import FindSitesByDate from "./FindSitesByDate.js";
import MapWithPlaces from "./MapWithPlaces";
import { Spinner } from "react-bootstrap";
import { calculateTommorowDate, pullTodayDate } from "../utils/dateUtils";
import CheckfrontWidget from "./CheckfrontWidget";

function Sites() {
  const Camp_name = "פארק נחל אכזיב";
  const [activePlace, setActivePlace] = useState([]);
  const [placesData, setPlacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState({
    startDate: pullTodayDate(),
    endDate: calculateTommorowDate(pullTodayDate()),
  });

  // We need to consider move this method to Place.js
  const handlePlaceClick = (placeObj) => {
    setActivePlace((prevActivePlace) => {
      if (prevActivePlace.includes(placeObj.id)) {
        return prevActivePlace.filter((placeId) => placeId !== placeObj.id);
      } else {
        return [...prevActivePlace, placeObj.id];
      }
    });
  };

  useEffect(() => {
    if (!dates.startDate || !dates.endDate) return;

    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/places?startDate=${dates.startDate}&endDate=${dates.endDate}&siteId=2`
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
  }, [dates]);

  return (
    <div className="sites" dir="rtl">
      <h1 className="title">{Camp_name}</h1>
      <FindSitesByDate setDates={setDates} />
      {activePlace.length > 0 && (
        <CheckfrontWidget activePlace={activePlace} dates={dates} />
      )}
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
