import { useState } from 'react';

function useSearchCamp(onSearch) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };
  return { searchTerm, handleInputChange };
}
export default useSearchCamp;
