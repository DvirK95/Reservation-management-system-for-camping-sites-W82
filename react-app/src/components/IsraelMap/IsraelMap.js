import React, { useEffect, useRef } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import marker from './marker.jpg';
import './IsraelMap.css';

const markerIcon = L.icon({
  iconUrl: marker,
  iconSize: [20, 20], // adjust the size as needed
});

function IsraelMap({ sites, isLoading }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      // Create the map instance and set the view
      const map = L.map(mapRef.current).setView(
        [31.811249938383863, 34.771514472163865],
        8
      );

      // Add the OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(map);

      // create an array to hold all markers
      const markers = [];

      // loop through the markerList array and create a marker for each item
      sites.forEach((site) => {
        const marker = L.marker([site.xAxis, site.yAxis], { icon: markerIcon })
          .addTo(map)
          .bindPopup(
            `<div className="title">${site.name} <br> <a href="${site._id}"> פרטים נוספים</a></div> `,
            {
              // offset: [300, -180],
              closeButton: false,
            }
          )
          .on('click', () => map.flyTo([site.xAxis, site.yAxis], 12));

        // push the marker to the markers array
        markers.push(marker);
      });

      console.log(markers);

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
    }
  }, [isLoading, sites]);

  return <div ref={mapRef} className="mapStyles-width" />;
}

export default IsraelMap;
