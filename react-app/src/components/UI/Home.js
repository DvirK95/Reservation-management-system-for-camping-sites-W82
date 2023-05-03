import React from 'react';

import './Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import IsraelMap from '../IsraelMap/IsraelMap';
import Legend from '../IsraelMap/Legend';
import marker from '../IsraelMap/marker.jpg';
// import nature from "./nature.png";

function Body() {
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
        <IsraelMap />
      </div>
    </div>
  );
}

export default Body;
