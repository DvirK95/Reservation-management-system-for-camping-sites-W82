import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getBookingDetails } from '../../utils/useBookingApi';
import { useNavigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

function Confirm() {
  const [isFirst, setIsFirst] = useState(true);
  let { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState({});
  const navigate = useNavigate();

  const getDetils = useCallback(async () => {
    const dataDetails = await getBookingDetails(bookingId);
    if (dataDetails) {
      setBookingDetails(dataDetails);
    } else {
      navigate('/cart');
    }
  }, [bookingId, navigate]);

  useEffect(() => {
    if (isFirst) {
      getDetils();
      setIsFirst(false);
    }
  }, [getDetils, isFirst]);

  console.log('print it');

  return (
    <Container className="cart-wrapper">
      {isFirst && (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      )}
      <h3>הזמנתך {bookingDetails.id} התקבלה ואושרה בהצלחה!</h3>
      <p>
        היי {bookingDetails.customer_name}, קבלה נשלחת למייל{' '}
        {bookingDetails.customer_email} ברגעים אלה
      </p>
      <p>
        לצפייה בפרטי ההזמנה{' '}
        <a
          href={`https://workshop-82-dvir.checkfront.com/reserve/booking/${bookingDetails.id}?token=${bookingDetails.token}&view=pdf`}
          target="_blank"
          rel="noreferrer"
        >
          {'לחץ כאן'}
        </a>
      </p>
    </Container>
  );
}
export default Confirm;
