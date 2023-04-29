import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useSitesData = (siteId, dates, peoples) => {
  const [activePlaceIds, setActivePlaceIds] = useState([]);
  const [sessionPlace, setSessionPlace] = useState({});
  const [placesData, setPlacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
        setActivePlaceIds(itemIds);
        setSessionPlace(items);
      }
      console.log(`second session: ${localStorage.getItem('SessionId')}`);
    } catch (error) {
      console.error('Error fetching booking session:', error);
    }
  };

  const handlePlaceClick = (placeObj) => {
    setActivePlaceIds((prevActivePlace) => {
      if (prevActivePlace.includes(placeObj._id)) {
        const keyToRemove = Object.keys(sessionPlace).find(
          (key) => String(sessionPlace[key].item_id) === placeObj._id
        );

        const remove = {
          alter: {
            [keyToRemove]: 'remove',
          },
        };
        fetchBookingSession(remove);

        return prevActivePlace.filter((placeId) => placeId !== placeObj._id);
      } else {
        fetchBookingSession({
          slip: placeObj.slip,
        });
        return [...prevActivePlace, placeObj._id];
      }
    });
  };

  useEffect(() => {
    fetchBookingSession();
  }, []);

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
  // toDo in the end change the return of activePlaceIds to this
  const activePlaces = placesData.filter((obj) =>
    activePlaceIds.includes(obj._id)
  );
  return {
    activePlaceIds,
    setActivePlaceIds,
    sessionPlace,
    setSessionPlace,
    placesData,
    setPlacesData,
    isLoading,
    setIsLoading,
    fetchBookingSession,
    handlePlaceClick,
    activePlaces,
  };
};

export default useSitesData;
