import "./Place.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function Place({ placeObj, onClick, active }) {
  const handleClick = () => {
    if (placeObj.status === "AVAILABLE") {
      onClick(placeObj);
    }
  };

  const placeClassNames = [
    "place",
    placeObj.status !== "AVAILABLE" ? "unavailable" : "",
    placeObj.shape,
    active ? "active" : "",
  ]
    .join(" ")
    .trim();
  const renderTooltip = (props) => (
    <Tooltip id={`tooltip-${placeObj.id}`} {...props}>
      <h5>{placeObj.name}</h5>
      <h6>
        &rlm; {placeObj.available}
        {` מקומות פנויים`}
      </h6>
      <h6>
        &rlm;{placeObj.price.title}
        {` ללילה`}
      </h6>
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={renderTooltip}>
      <span
        style={{
          top: `${placeObj.top}%`,
          left: `${placeObj.left}%`,
        }}
        className={placeClassNames}
        onClick={handleClick}
      >
        {placeObj.number}
      </span>
    </OverlayTrigger>
  );
}

export default Place;
