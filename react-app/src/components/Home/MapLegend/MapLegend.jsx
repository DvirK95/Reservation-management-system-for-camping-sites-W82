import './MapLegend.css';
import IsraelMapItems from '../MapLegend/IsraelMapItems/IsraelMapItems';
import SearchCamp from '../MapLegend/SearchCamp/SearchCamp';
import useMapLegend from './useMapLegend';

function MapLegend({ sites, onClick, isLoading }) {
  const { handleSearch, filteredList } = useMapLegend(sites);
  return (
    <div className="background">
      <h5 className="top-legend"> מצאו את חניון הלילה עבורכם </h5>
      <SearchCamp sites={sites} onSearch={handleSearch} />
      <IsraelMapItems
        filteredList={filteredList}
        onClick={onClick}
        isLoading={isLoading}
      />
    </div>
  );
}

export default MapLegend;
