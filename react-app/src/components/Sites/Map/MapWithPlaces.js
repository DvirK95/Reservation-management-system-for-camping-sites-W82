import { PanZoom } from 'react-easy-panzoom';
import Place from './Place';
import { useState, useRef } from 'react';
import MapControllers from './MapControllers';

function MapWithPlaces({ placesData, mapName }) {
  const mapPath = `../../maps/${mapName}.png`;
  const [canPan, setCanPan] = useState(true);
  const [scale, setScale] = useState(1);
  const panZoomRef = useRef();

  const handleStateChange = ({ scale }) => {
    setScale(scale);
    setCanPan(scale > 1);
    if (scale < 1.1) {
      panZoomRef.current.autoCenter(1.001);
    }
  };

  const preventPanCondition = () => !canPan;

  return (
    <>
      <MapControllers scale={scale} panZoomRef={panZoomRef} />
      <PanZoom
        style={{ overflow: 'hidden' }}
        ref={panZoomRef}
        enableBoundingBox
        zoomSpeed={2}
        minZoom={1}
        maxZoom={2}
        boundaryRatioVertical={0.8}
        boundaryRatioHorizontal={0.8}
        preventPan={preventPanCondition}
        onStateChange={handleStateChange}
      >
        <div style={{ cursor: 'drag' }}>
          <img src={mapPath} alt="Campground Map" className="campground-map" />

          <div className="places">
            {placesData.map((placeObj) => (
              <Place key={placeObj['_id']} placeObj={placeObj} />
            ))}
          </div>
        </div>
      </PanZoom>
    </>
  );
}

export default MapWithPlaces;
