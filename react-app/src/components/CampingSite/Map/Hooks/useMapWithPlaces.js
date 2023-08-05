import { useState, useRef } from 'react';

function useMapWithPlaces(mapName) {
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
  return { scale, panZoomRef, preventPanCondition, handleStateChange, mapPath };
}
export default useMapWithPlaces;
