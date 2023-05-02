//import Img from './Test.png';
import { useLocation } from 'react-router-dom';

function Test({ test }) {
  const value = useLocation();
  // רכיב ניסיוני
  return (
    <div>
      <h1>{test}</h1>
      <h2>{value}</h2>
    </div>
  );
}
export default Test;
