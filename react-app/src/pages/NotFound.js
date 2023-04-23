import { useLocation } from "react-router-dom";
import { faFaceFrownOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NotFound() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const res = searchParams.get("res");
  console.log(res);
  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      <h1>
        Oops! something went wrong {<FontAwesomeIcon icon={faFaceFrownOpen} />}
      </h1>
    </div>
  );
}

export default NotFound;
