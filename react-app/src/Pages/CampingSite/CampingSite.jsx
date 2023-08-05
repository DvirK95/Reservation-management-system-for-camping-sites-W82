import './CampingSite.css';
import FindSitesByDate from '../../components/CampingSite/FindSitesByDate/FindSitesByDate';
import MapWithPlaces from '../../components/CampingSite/Map/MapWithPlaces';
import { Spinner } from 'react-bootstrap';
import MiniCartMobile from '../../components/Cart/MiniCart/MiniCartMobile';
import ProcessStep from '../../components/ProcessStep/ProcessStep';
import useCampSite from './Hooks/useCampSite';

function CampingSite() {
  const {
    siteDetails,
    setDates,
    peoples,
    setPeoples,
    isLoading,
    isLoadingSiteDetails,
    placesData,
    campingName,
  } = useCampSite();

  return (
    <div className="sites">
      <ProcessStep currentStep={'0'} />
      <div
        id="siteImg"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${siteDetails.image_url})`,
        }}
      >
        <h1 className="title">{siteDetails.title}</h1>
      </div>
      <FindSitesByDate
        setDates={setDates}
        peoplesProps={{ peoples, setPeoples }}
      />

      <div className={`innerWrap ${isLoading ? 'loading' : ''}`}>
        {isLoading && isLoadingSiteDetails && (
          <div className="spinner-container">
            <Spinner animation="border" />
          </div>
        )}

        <MapWithPlaces mapName={campingName} placesData={placesData} />
        <MiniCartMobile />
      </div>
    </div>
  );
}

export default CampingSite;
