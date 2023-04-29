import './Place.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Col, Row } from 'react-bootstrap';
import { translateErrorStatus } from '../../../utils/hebrew';

function Place({ placeObj, onClick, active }) {
  const handleClick = () => {
    if (placeObj.status === 'AVAILABLE') {
      onClick(placeObj);
    }
  };

  const placeClassNames = [
    'place',
    placeObj.status !== 'AVAILABLE' ? 'unavailable' : '',
    placeObj.shape,
    active ? 'active' : '',
  ]
    .join(' ')
    .trim();

  const popover = (props) => (
    <Popover id={`tooltip-${placeObj.id}`} {...props}>
      <Popover.Body>
        <Row>
          <Col className="col" sm={7}>
            <h6 style={{ color: placeObj.available === 0 ? 'red' : '' }}>
              &rlm; {placeObj.available}
              {` מקומות פנויים`}
            </h6>
            <p>
              &rlm;{placeObj.price.title}
              {/*` ללילה`*/}
            </p>
          </Col>
          <Col className="col" sm={5}>
            <img src={placeObj.smallImg} alt="small" />
          </Col>
        </Row>
        {placeObj.error && (
          <span className="error-status">
            {translateErrorStatus(placeObj.error.title)}
          </span>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      placement={placeObj.label === 'חושות' ? 'top' : 'auto'}
      overlay={popover}
    >
      <span
        style={{
          top: `${placeObj.top}%`,
          left: `${placeObj.left}%`,
        }}
        className={placeClassNames}
        onClick={handleClick}
      >
        {placeObj.name}
      </span>
    </OverlayTrigger>
  );
}

export default Place;
