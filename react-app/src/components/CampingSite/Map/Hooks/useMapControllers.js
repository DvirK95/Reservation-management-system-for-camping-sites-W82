function useMapControllers({ scale, panZoomRef }) {
  // const scaleToShow = `${Math.round(scale.toFixed(2) * 100)}%`;

  const handleZoomReset = () => {
    if (panZoomRef.current) {
      panZoomRef.current.autoCenter(1.001);
    }
  };

  const handleZoomIn = () => {
    if (panZoomRef.current) {
      const newScale = scale + 0.2;
      panZoomRef.current.autoCenter(newScale);
    }
  };

  const handleZoomOut = () => {
    if (panZoomRef.current) {
      const newScale = scale - 0.2;
      panZoomRef.current.autoCenter(newScale);
    }
  };

  const handleLeft = () => {
    if (panZoomRef.current) {
      panZoomRef.current.moveByRatio(1, 0);
    }
  };
  const handleRight = () => {
    if (panZoomRef.current) {
      panZoomRef.current.moveByRatio(-1, 0);
    }
  };
  const handleUp = () => {
    if (panZoomRef.current) {
      panZoomRef.current.moveByRatio(0, 0.5);
    }
  };
  const handleBottom = () => {
    if (panZoomRef.current) {
      panZoomRef.current.moveByRatio(0, -0.5);
    }
  };
  return {
    handleZoomReset,
    handleZoomIn,
    handleZoomOut,
    handleLeft,
    handleRight,
    handleUp,
    handleBottom,
  };
}
export default useMapControllers;
