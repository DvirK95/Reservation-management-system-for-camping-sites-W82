import { useState } from 'react';
import { calculateTommorowDate, pullTodayDate } from '../../utils/dateUtils';
import fetchPlacesApi from '../../utils/fetchPlacesApi';
import { useParams, useSearchParams } from 'react-router-dom';
import useSiteDetails from '../../utils/useSitesApi';

function useCampSite() {
  const [searchParams] = useSearchParams();
  const { campingName, siteId } = useParams();
  const { siteDetails, isLoadingSiteDetails } = useSiteDetails(siteId);
  const [dates, setDates] = useState({
    startDate: searchParams.get('start_date') || pullTodayDate(),
    endDate:
      searchParams.get('end_date') || calculateTommorowDate(pullTodayDate()),
  });

  const [peoples, setPeoples] = useState({
    adults: Number(searchParams.get('adults')) || 1,
    children: Number(searchParams.get('children')) || 0,
    toddlers: Number(searchParams.get('toddlers')) || 0,
  });

  const { placesData, isLoading } = fetchPlacesApi(siteId, dates, peoples);
  return {
    siteDetails,
    setDates,
    peoples,
    setPeoples,
    isLoading,
    isLoadingSiteDetails,
    placesData,
    campingName,
  };
}
export default useCampSite;
