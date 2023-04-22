import React from "react";
import map from "../../maps/2.png";
import Place from "./Place";

function MapWithPlaces({ placesData, handlePlaceClick, activePlace }) {
  return (
    <>
      <img src={map} alt="Campground Map" className="campground-map" />
      <div className="places">
        {placesData.map((placeObj) => (
          <Place
            key={placeObj["_id"]}
            placeObj={placeObj}
            onClick={handlePlaceClick}
            active={activePlace.includes(placeObj["_id"])}
          />
        ))}
      </div>
    </>
  );
}

export default MapWithPlaces;
