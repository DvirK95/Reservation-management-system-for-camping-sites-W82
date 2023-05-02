import './BookingSession.css';
import { Container } from 'react-bootstrap';
import { strDate } from '../../utils/dateUtils';
import BookingCardMini from './BookingCardMini';
import '../UI/CustomButton.css';
import { Link, Outlet } from 'react-router-dom';

function BookingSession({ places, dates, handlePlaceClick }) {
  if (places.length > 0) {
    return (
      <Container id="bookingWrapper">
        <h5>
          {'הזמנה חדשה: '}
          {strDate(dates.startDate)} - {strDate(dates.endDate)}
        </h5>
        {places.map((placeObj) => (
          <BookingCardMini
            key={placeObj._id}
            placeObj={placeObj}
            handlePlaceClick={handlePlaceClick}
          />
        ))}
        <Link to="/cart" className="custom-button-inverse">
          לביצוע הזמנה
        </Link>
        <Outlet />
      </Container>
    );
  }
}

export default BookingSession;
