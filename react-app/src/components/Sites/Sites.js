// src/components/Sites/Sites.js
import { useState } from 'react';
import './Sites.css';
import FindSitesByDate from './FindSitesByDate/FindSitesByDate';
import MapWithPlaces from './Map/MapWithPlaces';
import { Spinner } from 'react-bootstrap';
import { calculateTommorowDate, pullTodayDate } from '../../utils/dateUtils';
import BookingSession from '../BookingSession/BookingSession';
//import useSitesData from '../../utils/useSitesData';
import fetchPlacesApi from '../../utils/fetchPlacesApi';
import { useParams } from 'react-router-dom';
import useBookingApi from '../../utils/bookingApi';

function Sites({ campName = 'פארק נחל אכזיב', mapName = 'Akhziv' }) {
  const { siteId } = useParams();
  const [dates, setDates] = useState({
    startDate: pullTodayDate(),
    endDate: calculateTommorowDate(pullTodayDate()),
  });

  const [peoples, setPeoples] = useState({
    adults: 1,
    children: 0,
    toddlers: 0,
  });

  const { activePlaceIds, handlePlaceClick } = useBookingApi();

  const { placesData, isLoading } = fetchPlacesApi(siteId, dates, peoples);
  const activePlaces = placesData.filter((obj) =>
    activePlaceIds.includes(obj._id)
  );
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
