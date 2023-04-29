// src/components/Sites/Sites.js
import { useState } from 'react';
import './Sites.css';
import FindSitesByDate from './FindSitesByDate/FindSitesByDate';
import MapWithPlaces from './Map/MapWithPlaces';
import { Spinner } from 'react-bootstrap';
import { calculateTommorowDate, pullTodayDate } from '../../utils/dateUtils';
import BookingSession from '../BookingSession/BookingSession';
import useSitesData from '../../utils/useSitesData'; // Update the import path

function Sites({
  campName = 'פארק נחל אכזיב',
  siteId = '2',
  mapName = 'Akhziv',
}) {
  const [dates, setDates] = useState({
    startDate: pullTodayDate(),
    endDate: calculateTommorowDate(pullTodayDate()),
  });

  const [peoples, setPeoples] = useState({
    adults: 1,
    children: 0,
    toddlers: 0,
  });

  const {
    activePlaceIds,
    placesData,
    isLoading,
    handlePlaceClick,
    activePlaces,
  } = useSitesData(siteId, dates, peoples);

  return (
    <div className="sites" dir="rtl">
      <h1 className="title">{campName}</h1>
      <FindSitesByDate
        setDates={setDates}
        peoplesProps={{ peoples, setPeoples }}
      />
      {activePlaceIds.length > 0 && (
        <BookingSession
          places={activePlaces}
          dates={dates}
          handlePlaceClick={handlePlaceClick}
          placesData={placesData}
        />
      )}
      <div className={`innerWrap ${isLoading ? 'loading' : ''}`}>
        {isLoading && (
          <div className="spinner-container">
            <Spinner animation="border" />
          </div>
        )}
        <MapWithPlaces
          mapName={mapName}
          placesData={placesData}
          handlePlaceClick={handlePlaceClick}
          activePlaceIds={activePlaceIds}
        />
      </div>
    </div>
  );
}

export default Sites;
