import { useState, useEffect } from 'react';

function useBookingApi() {
  const [activePlaceIds, setActivePlaceIds] = useState([]);
  const [sessionPlace, setSessionPlace] = useState([]);
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
      const newSession_id = data.session.id;
      console.log(`session from checkfront: ${newSession_id}`);
      if (sessionId !== newSession_id) {
        localStorage.setItem('SessionId', newSession_id);
      }
      const items = data.session.items;
      /*if (Object.keys(items).length !== 0) {
        const itemIds = Object.keys(items).map((key) => {
          if (!key.includes('.')) {
            return String(items[key].item_id);
          } else {
            return null;
          }
        });
        setActivePlaceIds(itemIds);
        setSessionPlace(items);
      }*/
      if (items.length > 0) {
        const itemIds = items.map((item) => {
          return String(item.item_id);
        });
        setSessionPlace(items);
        setActivePlaceIds(itemIds);
      }
      console.log(`second session: ${localStorage.getItem('SessionId')}`);
    } catch (error) {
      console.error('Error fetching booking session:', error);
    }
  };

  // get place id and slip obj
  const handlePlaceClick = (placeObj) => {
    console.log(`handlePlaceClick: ${placeObj}`);
    setActivePlaceIds((prevActivePlace) => {
      if (prevActivePlace.includes(placeObj.id)) {
        const remove = {
          remove: placeObj.id,
        };
        fetchBookingSession(remove);

        return prevActivePlace.filter((placeId) => placeId !== placeObj.id);
      } else {
        fetchBookingSession({
          slip: placeObj.slip,
        });
        return [...prevActivePlace, placeObj.id];
      }
    });
  };

  useEffect(() => {
    fetchBookingSession();
  }, []);

  return {
    activePlaceIds,
    setActivePlaceIds,
    sessionPlace,
    setSessionPlace,
    fetchBookingSession,
    handlePlaceClick,
  };
}

export default useBookingApi;
