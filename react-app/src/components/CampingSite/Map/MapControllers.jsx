import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareCaretUp,
  faSquareCaretDown,
  faSquareCaretLeft,
  faSquareCaretRight,
  faSquareMinus,
  faSquarePlus,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import './Styles/MapControllers.css';
import useMapControllers from './Hooks/useMapControllers';

function MapControllers(props) {
  const {
    handleZoomReset,
    handleZoomIn,
    handleZoomOut,
    handleLeft,
    handleRight,
    handleUp,
    handleBottom,
  } = useMapControllers(props);

  // icons
  const upIcon = (
    <FontAwesomeIcon icon={faSquareCaretUp} size="2xl" className="arrow" />
  );
  const downIcon = (
    <FontAwesomeIcon icon={faSquareCaretDown} size="2xl" className="arrow" />
  );
  const leftIcon = (
    <FontAwesomeIcon icon={faSquareCaretLeft} size="2xl" className="arrow" />
  );
  const rightIcon = (
    <FontAwesomeIcon icon={faSquareCaretRight} size="2xl" className="arrow" />
  );
  return (
    <div className="MapControllers control">
      <div>
        <button className="icon-btn" onClick={handleZoomReset}>
          {/* איפוס */}
          <FontAwesomeIcon icon={faLocationCrosshairs} className="reset" />
        </button>
        &nbsp;
        <button onClick={handleZoomIn} className="icon-btn">
          <FontAwesomeIcon icon={faSquarePlus} className="zoom" />
        </button>
        &nbsp;
        {/* {scaleToShow} */}
        {/* &nbsp; */}
        <button className="icon-btn" onClick={handleZoomOut}>
          <FontAwesomeIcon icon={faSquareMinus} className="zoom" />
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
