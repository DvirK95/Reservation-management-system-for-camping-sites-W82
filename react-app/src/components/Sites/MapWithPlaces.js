import React from "react";
import Place from "./Place";

function MapWithPlaces({ placesData, handlePlaceClick, activePlace, mapName }) {
  const mapPath = `../../maps/${mapName}.png`;
  return (
    <>
      <img
        src={/*todo*/ mapPath}
        alt="Campground Map"
        className="campground-map"
      />
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
