import "./Sites.css";

function Place({ placeObj, onClick, active }) {
  const handleClick = () => {
    if (placeObj.status === "AVAILABLE") {
      onClick(placeObj);
    }
  };

  const placeClassNames = [
    "place",
    `place-${placeObj.id}`,
    active ? "active" : "",
    placeObj.status !== "AVAILABLE" ? "unavailable" : "",
  ]
    .join(" ")
    .trim();

  return (
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
  );
}
export default Place;
