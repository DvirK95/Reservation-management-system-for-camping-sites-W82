import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faCircleRight,
  faCircleLeft,
  faCircleUp,
  faCircleDown,
} from '@fortawesome/free-solid-svg-icons';

function MapControllers({ scale, panZoomRef }) {
  // icons
  const upIcon = <FontAwesomeIcon icon={faCircleUp} />;
  const downIcon = <FontAwesomeIcon icon={faCircleDown} />;
  const leftIcon = <FontAwesomeIcon icon={faCircleLeft} />;
  const rightIcon = <FontAwesomeIcon icon={faCircleRight} />;

  const scaleToShow = `${Math.round(scale.toFixed(2) * 100)}%`;

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

  return (
    <div className="MapControllers">
      <button className="icon-btn" onClick={handleZoomReset}>
        איפוס
      </button>
      <div>
        <button onClick={handleZoomIn} className="icon-btn">
          <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
        </button>
        {scaleToShow}
        <button className="icon-btn" onClick={handleZoomOut}>
          <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <td />
            <td>
              <button onClick={handleUp} className="icon-btn">
                {upIcon}
              </button>
            </td>
            <td />
          </tr>
          <tr>
            <td>
              <button onClick={handleRight} className="icon-btn">
                {rightIcon}
              </button>
            </td>
            <td />
            <td>
              <button onClick={handleLeft} className="icon-btn">
                {leftIcon}
              </button>
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <button onClick={handleBottom} className="icon-btn">
                {downIcon}
              </button>
            </td>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MapControllers;
