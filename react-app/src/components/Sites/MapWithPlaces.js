import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Place from './Place';

function MapWithPlaces({ placesData, handlePlaceClick, activePlace, mapName }) {
  const mapPath = `../../maps/${mapName}.png`;

  return (
    <>
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={1}
        defaultPositionY={1}
        maxScale={4}
        wheel={{ step: 0.5 }}
      >
        <TransformComponent>
          <img src={mapPath} alt="Campground Map" className="campground-map" />

          <div className="places">
            {placesData.map((placeObj) => (
              <Place
                key={placeObj['_id']}
                placeObj={placeObj}
                onClick={handlePlaceClick}
                active={activePlace.includes(placeObj['_id'])}
              />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </>
  );
}

export default MapWithPlaces;
