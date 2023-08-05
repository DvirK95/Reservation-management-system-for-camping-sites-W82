import { Container, Row, Col } from 'react-bootstrap';
import FindSitesPeopleCount from './FindSitesPeopleCount';
import './Style.css';
import useFindSitesByDate from './Hooks/useFindSitesByDate';

function FindSitesByDate(props) {
  const {
    arrivalDate,
    today,
    startDateOnChange,
    departureDate,
    tomorrow,
    setDepartureDate,
    peoples,
    setPeoples,
    handleReset,
    handleSubmit,
  } = useFindSitesByDate(props);
  return (
    <Container className="wrapper">
      <Row>
        <Col xs="12" md="auto" id="datesLabelCol">
          <div className="datesLabel">
            <label htmlFor="arrival">הגעה: &nbsp; </label>
            <input
              className="datePicker"
              type="date"
              id="arrival"
              value={arrivalDate}
              min={today}
              onChange={startDateOnChange}
            />
          </div>
          <div className="datesLabel">
            <label htmlFor="departure">עזיבה: &nbsp; </label>
            <input
              className="datePicker"
              type="date"
              id="departure"
              value={departureDate}
              min={tomorrow}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
        </Col>
        <Col>
          <FindSitesPeopleCount peoplesProps={{ peoples, setPeoples }} />
        </Col>
        <Col sm="12" md="auto" className="center-button">
          <button className="primary-button" onClick={handleSubmit}>
            מצא זמינות
          </button>
          <button className="primary-button" onClick={handleReset}>
            איפוס
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default FindSitesByDate;
