import { useCallback, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function useHome() {
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const mapRef = useRef();

  const fetchSites = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/sites`);

      const data = await response.json();
      setSites(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      navigate(`/notfound?res=${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  const clickHandler = (x, y, id) => {
    mapRef.current.zoomIn(x, y, id);
  };
  return { sites, clickHandler, isLoading, mapRef };
}
export default useHome;
