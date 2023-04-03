// Sites.js
import { useState, useEffect } from "react";
import map from "./maps/2.png";
import "./Sites.css";
import FindSitesByDate from "./FindSitesByDate.js";
import Place from "./Place";

function Sites() {
  const Camp_name = "פארק נחל אכזיב";
  const [activePlace, setActivePlace] = useState(null);
  const [placesData, setPlacesData] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/places/2`
        );
        // Log the response text to see what the server returns
        //const responseText = await response.text();
        //console.log("Server response:", responseText);
        const data = await response.json();
        setPlacesData(data);
        console.log("Fetched data:", data);

        /*const data = JSON.parse(responseText);
        setPlacesData(data);
        console.log("Fetched data:", data);*/
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlaces();
  }, []);

  const handlePlaceClick = (number) => {
    setActivePlace(number);
  };

  return (
    <div className="sites" dir="rtl">
      <h1 className="title">{Camp_name}</h1>
      <FindSitesByDate />
      <div className="innerWrap">
        <img src={map} alt="Campground Map" className="campground-map" />
        <div className="places">
          {placesData.map((placeObj) => (
            <Place
              key={placeObj["id"]}
              top={placeObj["top"]}
              left={placeObj["left"]}
              number={placeObj["id"]}
              onClick={() => handlePlaceClick(placeObj["id"])}
              active={activePlace === placeObj["id"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sites;
