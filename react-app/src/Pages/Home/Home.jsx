import './Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import IsraelMap from '../../components/Home/IsraelMap/IsraelMap';
import MapLegend from '../../components/Home/MapLegend/MapLegend';
import nature from '../../Assets/images/nature.png';
import useHome from './useHome';
function Home() {
  const { sites, clickHandler, isLoading, mapRef } = useHome();
  return (
    <div className="Body">
      <img src={nature} alt="nature" />
      <h1 className="green-title">
        נשמח לארח אתכם ברשת חניוני הלילה של רשות הטבע והגנים !
      </h1>
      <h3>
        להזמנת לינה בחניוני הלילה - <b>לחצו על חניון הלילה המבוקש 👇🏼 </b>
      </h3>

      <div className="flex-container">
        <MapLegend sites={sites} onClick={clickHandler} isLoading={isLoading} />
        <IsraelMap sites={sites} isLoading={isLoading} ref={mapRef} />
      </div>
    </div>
  );
}

export default Home;
