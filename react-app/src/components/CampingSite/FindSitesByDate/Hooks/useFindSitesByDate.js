import { useState } from 'react';
import {
  calculateTommorowDate,
  pullTodayDate,
} from '../../../../utils/dateUtils';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

function useFindSitesByDate({ setDates, peoplesProps }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const today = pullTodayDate();
  const tomorrow = calculateTommorowDate(today);

  const [arrivalDate, setArrivalDate] = useState(
    searchParams.get('start_date') || today
  );
  const [departureDate, setDepartureDate] = useState(
    searchParams.get('end_date') || tomorrow
  );
  const [peoples, setPeoples] = useState(peoplesProps.peoples);

  const handleSubmit = () => {
    setDates({ startDate: arrivalDate, endDate: departureDate });
    peoplesProps.setPeoples({
      adults: peoples.adults,
      children: peoples.children,
      toddlers: peoples.toddlers,
    });

    // Update the URL
    navigate(
      `${location.pathname}?start_date=${arrivalDate}&end_date=${departureDate}&adults=${peoples.adults}&children=${peoples.children}&toddlers=${peoples.toddlers}`
    );
  };

  const handleReset = () => {
    setArrivalDate(today);
    setDepartureDate(tomorrow);
    setPeoples({
      adults: 1,
      children: 0,
      toddlers: 0,
    });
    peoplesProps.setPeoples(peoples);
    navigate(`${location.pathname}`, { replace: true });
  };
  const startDateOnChange = (e) => {
    setArrivalDate(e.target.value);
    setDepartureDate(calculateTommorowDate(e.target.value));
  };
  return {
    arrivalDate,
    today,
    startDateOnChange,
    departureDate,
    tomorrow,
    setDepartureDate,
    peoples,
    setPeoples,
    handleReset,
    handleSubmit,
  };
}
export default useFindSitesByDate;
