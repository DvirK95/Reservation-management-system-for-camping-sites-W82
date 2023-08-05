import { useState } from 'react';
function useMapLegend(sites) {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredList = sites.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return { handleSearch, filteredList };
}
export default useMapLegend;
