import "./Sites.css";

function Place({ placeObj, onClick, active }) {
  const handleClick = () => {
    if (placeObj.stock !== 0) {
      onClick(placeObj);
    }
  };

  return (
    <span
      style={{
        top: `${placeObj.top}%`,
        left: `${placeObj.left}%`,
      }}
      className={`place place-${placeObj.id} ${active ? "active" : ""} ${
        placeObj.stock === 0 ? "unavailable" : ""
      }`}
      onClick={handleClick}
    >
      {placeObj.number}
    </span>
  );
}
export default Place;
