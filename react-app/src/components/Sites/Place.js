import "./Sites.css";

function Place(prop) {
  return (
    <span
      style={{
        top: `${prop.top}%`,
        left: `${prop.left}%`,
      }}
      className={`place place-${prop.number} ${prop.active ? "active" : ""}`}
      onClick={prop.onClick}
    >
      {prop.number}
    </span>
  );
}
export default Place;
