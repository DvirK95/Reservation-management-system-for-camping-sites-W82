import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Add this import
import './Sites.css';
import FindSitesByDate from './FindSitesByDate/FindSitesByDate';
import MapWithPlaces from './Map/MapWithPlaces';
import { Spinner } from 'react-bootstrap';
import { calculateTommorowDate, pullTodayDate } from '../../utils/dateUtils';
import BookingSession from '../BookingSession/BookingSession';

function Sites({
  campName = 'פארק נחל אכזיב',
  siteId = '2',
  mapName = 'Akhziv',
}) {
  const [activePlace, setActivePlace] = useState([]);
  const [sessionPlace, setSessionPlace] = useState({});

  const [placesData, setPlacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState({
    startDate: pullTodayDate(),
    endDate: calculateTommorowDate(pullTodayDate()),
  });

  const [peoples, setPeoples] = useState({
    adults: 1,
    children: 0,
    toddlers: 0,
  });

  const history = useHistory();

  const fetchBookingSession = async (body = null) => {
    const sessionId = localStorage.getItem('SessionId');
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/booking/session`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: sessionId,
            ...body,
          }),
        }
      );
      const data = await response.json();
      const newSession_id = data.booking.session.id;
      console.log(`session from checkfront: ${newSession_id}`);
      if (sessionId !== newSession_id) {
        localStorage.setItem('SessionId', newSession_id);
      }
      const items = data.booking.session.item;
      if (Object.keys(items).length !== 0) {
        const itemIds = Object.keys(items).map((key) => {
          if (!key.includes('.')) {
            return String(items[key].item_id);
          } else {
            return null;
          }
        });
        setActivePlace(itemIds);
        setSessionPlace(items);
      }
      console.log(`second session: ${localStorage.getItem('SessionId')}`);
    } catch (error) {
      console.error('Error fetching booking session:', error);
    }
  };

  useEffect(() => {
    fetchBookingSession();
  }, []);

  const handlePlaceClick = (placeObj) => {
    setActivePlace((prevActivePlace) => {
      if (prevActivePlace.includes(placeObj._id)) {
        // Find the key corresponding to the clicked item's _id in sessionPlace
        const keyToRemove = Object.keys(sessionPlace).find(
          (key) => String(sessionPlace[key].item_id) === placeObj._id
        );

        // Place is active and being deactivated, send the desired body values for this case
        const remove = {
          alter: {
            [keyToRemove]: 'remove',
          },
        };
        fetchBookingSession(remove);

        // Remove place from active places
        return prevActivePlace.filter((placeId) => placeId !== placeObj._id);
      } else {
        // Add place to active places
        fetchBookingSession({
          slip: placeObj.slip,
        });
        return [...prevActivePlace, placeObj._id];
      }
    });
  };

  useEffect(() => {
    if (!dates.startDate || !dates.endDate) return;

    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/places/${siteId}?startDate=${dates.startDate}&endDate=${dates.endDate}&adult=${peoples.adults}&child=${peoples.children}&toddler=${peoples.toddlers}`
        );
        const data = await response.json();
        if (data.length === 0) {
          throw new Error('No data found');
        } else {
          setPlacesData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        history.push(`/notfound?res=${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, [
    dates,
    siteId,
    history,
    peoples.adults,
    peoples.children,
    peoples.toddlers,
  ]);
  return (
    <div className="sites" dir="rtl">
      <h1 className="title">{campName}</h1>
      <FindSitesByDate
        setDates={setDates}
        peoplesProps={{ peoples, setPeoples }}
      />
      {activePlace.length > 0 && (
        <BookingSession
          places={placesData.filter((obj) => activePlace.includes(obj._id))}
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
          activePlace={activePlace}
        />
      </div>
    </div>
  );
}

export default Sites;
