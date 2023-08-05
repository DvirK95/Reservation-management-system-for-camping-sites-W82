import './SearchCamp.css';
import useSearchCamp from './useSearchCamp';

function SearchCamp({ onSearch }) {
  const { searchTerm, handleInputChange } = useSearchCamp(onSearch);
  return (
    <div className="side-menu-search">
      <div>
        <input
          type="text"
          className="search"
          placeholder="הקלד שם חניון"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default SearchCamp;
