<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import marker from './marker.jpg';

import './IsraelMap.css';
=======
import React, { useEffect, useRef } from "react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import marker from "./marker.jpg";
import "./IsraelMap.css";
>>>>>>> origin/legend


const markerIcon = L.icon({
  iconUrl: marker,
  iconSize: [20, 20], // adjust the size as needed
});

<<<<<<< HEAD
function IsraelMap({ sites }) {
  const mapRef = useRef(null);

  useEffect(
    () => {
=======
function IsraelMap({sites, isLoading}) {
  const mapRef = useRef(null);

  useEffect(() => {
    if(!isLoading){
      
>>>>>>> origin/legend
      // Create the map instance and set the view
      const map = L.map(mapRef.current).setView(
        [31.811249938383863, 34.771514472163865],
        8
      );

      // Add the OpenStreetMap tile layer
<<<<<<< HEAD
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
=======
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
>>>>>>> origin/legend
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(map);

<<<<<<< HEAD
      // Add the markers
      /*
    for (let site of sites) {
      L.marker([site.xAxis, site.yAxis], {
        icon: markerIcon,
      })
        .addTo(map)
        .bindPopup(
          `<div className="title"> ${site.name} <br> <a href="/sites/${site._id}"> פרטים נוספים</a></div> `,
          { offset: [300, -180], closeButton: false }
        )
        .on('click', () => map.flyTo([site.xAxis, site.yAxis], 12));
    }
    */

      const akhziv = L.marker([33.048389982995154, 35.10218061433166], {
        icon: markerIcon,
      })
        .addTo(map)
        .bindPopup(
          '<div className="title"> גן לאומי אכזיב <br> <a href="/sites/2"> פרטים נוספים</a></div> ',
          { offset: [300, -180], closeButton: false }
        )
        .on('click', () =>
          map.flyTo([33.048389982995154, 35.10218061433166], 12)
        );
      const horshatTal = L.marker([31.95241067223935, 35.23398196582406], {
        icon: markerIcon,
      })
        .addTo(map)
        .bindPopup('חורשת טל');

      const maayanHarod = L.marker([32.551642197662204, 35.3580790895354], {
        icon: markerIcon,
      })
        .addTo(map)
        .bindPopup('גן לאומי מעיין חרוד');

      const masada = L.marker([31.3108835632776, 35.363791494431055], {
        icon: markerIcon,
      })
        .addTo(map)
        .bindPopup('גן לאומי מצדה');

      const ashkelon = L.marker([31.662610619304587, 34.54792041062232], {
        icon: markerIcon,
      })
        .addTo(map)
        .bindPopup('גן לאומי תל אשקלון');

      console.log(akhziv, horshatTal, ashkelon, maayanHarod, masada);

      // Add click event listener to popup content elements
      const popupContentElements = document.querySelectorAll(
        '.leaflet-popup-content'
      );

      popupContentElements.forEach((popupContentElement) => {
        popupContentElement.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default link behavior
          const link = popupContentElement.querySelector('a');
          if (link) {
            window.location.href = link.href; // Redirect to link URL
          }
        });
      });
    },
    [
      /*sites*/
    ]
  );
=======
      // create an array to hold all markers
      const markers = [];

      // loop through the markerList array and create a marker for each item
      sites.forEach((site) => {
        const marker = L.marker([site.xAxis, site.yAxis], { icon: markerIcon })
          .addTo(map)
          .bindPopup(`<div className="title">${site.name} <br> <a href="${site._id}"> פרטים נוספים</a></div> `, {
            // offset: [300, -180],
            closeButton: false,
          })
          .on('click', () => map.flyTo([site.xAxis, site.yAxis], 12));
          
        // push the marker to the markers array
        markers.push(marker);
      });

      console.log(markers);

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
          
  }}, [isLoading, sites]);
>>>>>>> origin/legend

  return <div ref={mapRef} className="mapStyles-width" />;
}

export default IsraelMap;