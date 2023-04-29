import './BookingSession.css';
import { Container } from 'react-bootstrap';
import { strDate } from '../../utils/dateUtils';
import BookingCardMini from './BookingCard';
import '../UI/CustomButton.css';
import { Link } from 'react-router-dom';

function BookingSession({ places, dates, handlePlaceClick, placesData }) {
  if (places.length > 0) {
    return (
      <Container id="bookingWrapper">
        <h5>
          {'הזמנה חדשה: '}
          {strDate(dates.startDate)} - {strDate(dates.endDate)}
        </h5>

        {places.map((placeObj) => (
          <BookingCardMini
            placeObj={placeObj}
            handlePlaceClick={handlePlaceClick}
            placesData={placesData}
          />
        ))}
        <Link to={'/Cart'} className="custom-button-inverse">
          לביצוע הזמנה
        </Link>
      </Container>
    );
  }
}

export default BookingSession;
