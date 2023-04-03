import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CustomButton from "../UI/CustomButton";
import "./FindSitesByDate.css";

function FindSitesByDate() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const [arrivalDate, setArrivalDate] = useState(
    today.toISOString().substr(0, 10)
  );
  const [departureDate, setDepartureDate] = useState(
    tomorrow.toISOString().substr(0, 10)
  );

  const handleSubmit = () => {
    // Perform necessary actions with arrivalDate and departureDate
  };

  const handleReset = () => {
    setArrivalDate(today.toISOString().substr(0, 10));
    setDepartureDate(tomorrow.toISOString().substr(0, 10));
  };

  return (
    <Container className="wrapper">
      <Row>
        <Col className="find-sites-label" xl="auto" md="12">
          <strong>מצא תאריכים</strong>
        </Col>
        <Col xs="12" md="auto">
          <div className="datesLabel">
            <label htmlFor="arrival">הגעה:</label>
            <input
              className="datePicker"
              type="date"
              id="arrival"
              value={arrivalDate}
              min={today.toISOString().substr(0, 10)}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
          </div>
          <div className="datesLabel">
            <label htmlFor="departure">עזיבה:</label>
            <input
              className="datePicker"
              type="date"
              id="departure"
              value={departureDate}
              max={nextWeek.toISOString().substr(0, 10)}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
        </Col>
        <Col sm="12" md="auto">
          <CustomButton onClick={handleSubmit}>מצא זמינות</CustomButton>
          <CustomButton onClick={handleReset}>איפוס</CustomButton>
        </Col>
      </Row>
    </Container>
  );
}

export default FindSitesByDate;
