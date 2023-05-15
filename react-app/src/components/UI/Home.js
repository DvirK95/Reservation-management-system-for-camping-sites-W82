import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import IsraelMap from '../IsraelMap/IsraelMap';
import Legend from '../IsraelMap/Legend';
import marker from '../IsraelMap/marker.jpg';
// import nature from "./nature.png";

function Body() {
  const [sites, setSites] = useState([]);
  const navigate = useNavigate();

  const fetchSites = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/sites`);

      const data = await response.json();
      setSites(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      navigate(`/notfound?res=${error.message}`);
    }
  }, [navigate]);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  const list = [
    {
      title: 'חניון לילה גן לאומי מעיין חרוד',
      link: '#',
      text: 'קמפינג פלוס טבילה: לינת שטח מפנקת למרגלות הגלבוע',
      image: marker,
    },
    {
      title: 'חניון לילה גן לאומי חורשת טל',
      link: '#',
      text: 'שלווה גלילית: גיבוש משפחתי בלתי נשכח לצד פלגי המים',
      image: marker,
    },
    {
      title: 'חניון לילה לאומי תל אשקלון',
      link: '#',
      text: 'סתלבט מעוצב: לינה מול הים במרחב גדוש הפתעות שיש בו הכל',
      image: marker,
    },
    {
      title: 'חניון לילה גן לאומי מצדה מערב - מחנה מצדה',
      link: '#',
      text: 'בדרך למעלה: מבלים לילה במתחם הקמפינג המאובזר ובבוקר מטפסים אל הזריחה. חוויה של פעם בחיים',
      image: marker,
    },
    {
      title: 'חניון לילה גן לאומי אכזיב וחוף אכזיב',
      link: '#',
      text: 'חוויה ים תיכונית: קמפינג במרחק נגיעה מהמפרצים הציוריים',
      image: marker,
    },
  ];
  // toREMOVE
  for (let i of sites) {
    console.log(i);
  }
  return (
    <div className="Body">
      <div className="nature-img" />
      <h1 className="green-title">
        {' '}
        נשמח לארח אתכם ברשת חניוני הלילה של רשות הטבע והגנים !
      </h1>
      <h3>
        <b> לחצו על חניון הלילה המבוקש - </b>להזמנת לינה בחניוני הלילה👇🏼{' '}
      </h3>
      <div className="flex-container">
        <Legend list={list} />
        <IsraelMap sites={sites} />
      </div>
    </div>
  );
}

export default Body;
