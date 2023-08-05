import { Container, Spinner } from 'react-bootstrap';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ProcessStep from '../../components/ProcessStep/ProcessStep';
import useConfirm from './useConfirm';

function Confirm() {
  const { isFirst, bookingDetails } = useConfirm();

  return (
    <Container className="cart-wrapper text-center">
      <ProcessStep currentStep={'3'} />
      {isFirst && (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      )}
      <br />
      <h3 style={{ fontWeight: '500' }}>
        היי {bookingDetails.customer_name}, הזמנתך התקבלה בהצלחה!
      </h3>
      <FontAwesomeIcon
        icon={faCircleCheck}
        bounce
        size="2xl"
        style={{ color: '#b3dd4f' }}
      />
      <p>
        <br />
        מזהה הזמנה: {bookingDetails.id}
      </p>
      <p>קבלה נשלחת למייל {bookingDetails.customer_email} ברגעים אלו</p>
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
      <br />
      <p>תודה שהזמנת אצלנו 😊</p>
      <br />
      <Link to="/" className="primary-button button-hover-white">
        <b> חזרה לדף הראשי</b>
      </Link>
    </Container>
  );
}
export default Confirm;
