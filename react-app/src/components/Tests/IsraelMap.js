import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import marker from "./marker.jpg";

import "./IsraelMap.css";

const markerIcon = L.icon({
  iconUrl: marker,
  iconSize: [20, 20], // adjust the size as needed
});

function IsraelMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Create the map instance and set the view
    const map = L.map(mapRef.current).setView(
      [31.811249938383863, 34.771514472163865],
      7.45
    );

    // Add the OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add the markers
    const akhziv = L.marker([33.048389982995154, 35.10218061433166], {
      icon: markerIcon,
    })
      .addTo(map)
      .bindPopup(
        '<div><b> גן לאומי אכזיב </b> <br> <a href="/sites/2"> פרטים נוספים</a></div> '
      );
    const horshatTal = L.marker([31.95241067223935, 35.23398196582406], {
      icon: markerIcon,
    })
      .addTo(map)
      .bindPopup("חורשת טל");
    const maayanHarod = L.marker([32.551642197662204, 35.3580790895354], {
      icon: markerIcon,
    })
      .addTo(map)
      .bindPopup("גן לאומי מעיין חרוד");
    const masada = L.marker([31.3108835632776, 35.363791494431055], {
      icon: markerIcon,
    })
      .addTo(map)
      .bindPopup("גן לאומי מצדה");
    const ashkelon = L.marker([31.662610619304587, 34.54792041062232], {
      icon: markerIcon,
    })
      .addTo(map)
      .bindPopup("גן לאומי תל אשקלון");
    console.log(akhziv, horshatTal, ashkelon, maayanHarod, masada);
    // Add click event listener to popup content elements
    const popupContentElements = document.querySelectorAll(
      ".leaflet-popup-content"
    );

    popupContentElements.forEach((popupContentElement) => {
      popupContentElement.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior
        const link = popupContentElement.querySelector("a");
        if (link) {
          window.location.href = link.href; // Redirect to link URL
        }
      });
    });
  }, []);

  return <div ref={mapRef} style={{ height: "500px", width: "70%" }} />;
}

export default IsraelMap;
