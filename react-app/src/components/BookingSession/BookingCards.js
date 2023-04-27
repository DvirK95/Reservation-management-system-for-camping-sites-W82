import './BookingSession.css';
import { Container, Col, Row, Image } from 'react-bootstrap';
import { strDate } from '../../utils/dateUtils';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BookingCards({ places, dates, handlePlaceClick, placesData }) {
  const isPlaces = places.length > 0;
  return (
    <Container id="bookingWrapper">
      {isPlaces ? (
        <h5>
          {'הזמנה חדשה: '}
          {strDate(dates.startDate)} - {strDate(dates.endDate)}
        </h5>
      ) : (
        <></>
      )}

      {places.map((placeObj) => (
        <Row key={placeObj._id} className="Card">
          <Col md={4} className="mx-auto text-center">
            {<Image src={placeObj.imgMedium} rounded />}
          </Col>
          <Col md={6}>
            <h5 id="title">{placeObj.title}</h5>
            <p className="par-light">
              {placeObj.localEndDate} - {placeObj.localStartDate}
            </p>
            <div dangerouslySetInnerHTML={{ __html: placeObj.summary }}></div>
          </Col>
          <Col md={2}>
            <Row className="justify-content-md-center">
              <Col
                md={{ span: '12', order: 'first' }}
                sm={{ span: '4', order: 'last' }}
                xs={{ span: '4', order: 'last' }}
                className="remove-item"
              >
                <button
                  className="x-button"
                  onClick={() => {
                    for (let place of placesData)
                      if (place._id === placeObj._id) handlePlaceClick(place);
                  }}
                >
                  <FontAwesomeIcon
                    className="icon"
                    icon={faCircleXmark}
                    size="xl"
                  />
                </button>
              </Col>
              <Col md={12} sm={4}>
                <p id="availability">
                  {'נותרו '}
                  {placeObj.available}
                  {' מקומות '}
                  <FontAwesomeIcon icon={faSquareCheck} />
                </p>
              </Col>
              <Col md={12} sm={4} className="price">
                <div className="bubble">{placeObj.price.title}</div>
                <p>ללילה</p>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default BookingCards;
