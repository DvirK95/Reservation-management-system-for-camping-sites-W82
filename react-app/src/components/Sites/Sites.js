import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Add this import
import "./Sites.css";
import FindSitesByDate from "./FindSitesByDate.js";
import MapWithPlaces from "./MapWithPlaces";
import { Spinner } from "react-bootstrap";
import { calculateTommorowDate, pullTodayDate } from "../utils/dateUtils";
import CheckfrontWidget from "../../pages/CheckfrontWidget";

function Sites({
  campName = "פארק נחל אכזיב",
  siteId = "2",
  mapName = "Akhziv",
}) {
  const [activePlace, setActivePlace] = useState([]);
  const [placesData, setPlacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState({
    startDate: pullTodayDate(),
    endDate: calculateTommorowDate(pullTodayDate()),
  });

  const history = useHistory();

  const handlePlaceClick = (placeObj) => {
    setActivePlace((prevActivePlace) => {
      if (prevActivePlace.includes(placeObj._id)) {
        return prevActivePlace.filter((placeId) => placeId !== placeObj._id);
      } else {
        return [...prevActivePlace, placeObj._id];
      }
    });
  };

  useEffect(() => {
    if (!dates.startDate || !dates.endDate) return;

    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/places/${siteId}?startDate=${dates.startDate}&endDate=${dates.endDate}`
        );
        const data = await response.json();
        if (data.length === 0) {
          throw new Error("No data found");
        } else {
          setPlacesData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        history.push(`/notfound?res=${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, [dates, siteId, history]);

  return (
    <div className="sites" dir="rtl">
      <h1 className="title">{campName}</h1>
      <FindSitesByDate setDates={setDates} />
      {activePlace.length > 0 && (
        <CheckfrontWidget
          activePlace={activePlace}
          dates={dates}
          siteId={siteId}
        />
      )}
      <div className={`innerWrap ${isLoading ? "loading" : ""}`}>
        {isLoading && (
          <div className="spinner-container">
            <Spinner animation="border" />
          </div>
        )}
        <MapWithPlaces
          mapName={mapName}
          placesData={placesData}
          handlePlaceClick={handlePlaceClick}
          activePlace={activePlace}
        />
      </div>
    </div>
  );
}

export default Sites;
