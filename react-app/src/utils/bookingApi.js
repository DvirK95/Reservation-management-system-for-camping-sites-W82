import { useState, useEffect } from 'react';

function useBookingApi() {
  const [activePlaceIds, setActivePlaceIds] = useState([]);
  const [sessionPlace, setSessionPlace] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchBookingSession = async (body = null) => {
    setIsLoading(true);
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

      // set session from checkfront if its not valid
      if (sessionId !== newSession_id) {
        localStorage.setItem('SessionId', newSession_id);
      }

      // map the current items session
      const items = data.session.items;
      if (items.length > 0) {
        const itemIds = items.map((item) => {
          return String(item.item_id);
        });
        setSessionPlace(items);
        setActivePlaceIds(itemIds);
      }

      // set totalprice
      setTotalPrice(data.session.total);
    } catch (error) {
      console.error('Error fetching booking session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // get place id and slip obj
  const handlePlaceClick = (placeObj) => {
    setActivePlaceIds((prevActivePlace) => {
      if (prevActivePlace.includes(placeObj.id)) {
        const remove = {
          remove: placeObj.id,
        };
        fetchBookingSession(remove);

        setSessionPlace((prevSessionPlace) => {
          return prevSessionPlace.filter(
            (place) => String(place.item_id) !== placeObj.id
          );
        });

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
    isLoading,
    totalPrice,
  };
}

export default useBookingApi;
