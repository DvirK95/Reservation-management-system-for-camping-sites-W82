import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import React from 'react';

import './Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import IsraelMap from '../IsraelMap/IsraelMap';
import Legend from '../IsraelMap/Legend';


function Home() {
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSites = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/sites`);

      const data = await response.json();
      setSites(data);
    } 
    catch (error) {
      console.error('Error fetching data:', error);
      navigate(`/notfound?res=${error.message}`);
    }
    finally {setIsLoading(false)};
  }, [navigate]);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  return (
    <div className="Body">
      <div className="nature-img" />
      <h1 className="green-title">
        נשמח לארח אתכם ברשת חניוני הלילה של רשות הטבע והגנים !
      </h1>
      <h3>
        <b> לחצו על חניון הלילה המבוקש - </b>להזמנת לינה בחניוני הלילה👇🏼
      </h3>
      <div className="flex-container">
        <Legend sites={sites} />
        <IsraelMap sites={sites} isLoading={isLoading}/>
      </div>
    </div>
  );
}

export default Home;