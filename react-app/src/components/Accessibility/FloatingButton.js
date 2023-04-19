import React, { useState } from "react";
import "./FloatingButton.css";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Offcanvas from "react-bootstrap/Offcanvas";

const FloatingButton = () => {
  const [textSize, setTextSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [theme, setTheme] = useState("default");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleIncreaseTextSize = () => {
    setTextSize((prevSize) => Math.min(prevSize + 10, 200));
  };

  const handleDecreaseTextSize = () => {
    setTextSize((prevSize) => Math.max(prevSize - 10, 50));
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
  };

  // Update the styles based on the selected options
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--text-size", `${textSize}%`);

    if (highContrast) {
      root.style.setProperty("--text-color", "white");
      root.style.setProperty("--background-color", "black");
    } else {
      root.style.setProperty("--text-color", "");
      root.style.setProperty("--background-color", "");
    }

    if (theme === "light") {
      root.style.setProperty("--theme-text-color", "black");
      root.style.setProperty("--theme-background-color", "white");
    } else if (theme === "dark") {
      root.style.setProperty("--theme-text-color", "white");
      root.style.setProperty("--theme-background-color", "black");
    } else {
      root.style.setProperty("--theme-text-color", "");
      root.style.setProperty("--theme-background-color", "");
    }
  }, [textSize, highContrast, theme]);
  /*
  return (
    <div className={`floating-button-container ${isOpen ? "open" : ""}`}>
      <button
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="floating-button"
      >
        <FontAwesomeIcon icon={faWheelchair} />
        <br />
        {"נגישות"}
      </button>
      {isOpen && (
        <div className="floating-menu">
          <button onClick={handleIncreaseTextSize}>Increase Text Size</button>
          <button onClick={handleDecreaseTextSize}>Decrease Text Size</button>
          <select value={theme} onChange={handleThemeChange}>
            <option value="default">Default Theme</option>
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
          </select>
          <label>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={toggleHighContrast}
            />
            High Contrast Mode
          </label>
        </div>
      )}
    </div>
  );*/
  return (
    <div className="floating-button-container">
      <button onClick={handleShow} className="floating-button">
        <FontAwesomeIcon icon={faWheelchair} />
        <br />
        {"נגישות"}
      </button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>נגישות</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="floating-menu">
            <p>
              <button onClick={handleIncreaseTextSize}>הגדל גודל טקסט</button>
            </p>
            <p>
              <button onClick={handleDecreaseTextSize}>הקטן גודל טקסט</button>
            </p>
            <p>
              <select value={theme} onChange={handleThemeChange}>
                <option value="default">מצב רגיל</option>
                <option value="light">ניגודיות בהירה</option>
                <option value="dark">ניגודיות כהה</option>
              </select>
            </p>
            <label>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={toggleHighContrast}
              />
              מצב ניגודיות גבוהה
            </label>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default FloatingButton;
