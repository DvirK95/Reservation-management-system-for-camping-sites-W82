import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CustomButton from "../UI/CustomButton";
import "./FindSitesByDate.css";

function FindSitesByDate({
  onDateSubmit,
  initialArrivalDate,
  initialDepartureDate,
}) {
  const [arrivalDate, setArrivalDate] = useState(initialArrivalDate);
  const [departureDate, setDepartureDate] = useState(initialDepartureDate);
  const [endDateMin, setEndDateMin] = useState(
    calculateTommorowDate(initialArrivalDate)
  );

  function calculateTommorowDate(dateStr) {
    let date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  }

  const handleSubmit = () => {
    onDateSubmit(arrivalDate, departureDate);
  };

  const handleReset = () => {
    setArrivalDate(initialArrivalDate);
    setDepartureDate(initialDepartureDate);
  };

  const startDateChangeHandler = (e) => {
    setArrivalDate(e.target.value);
    setDepartureDate(calculateTommorowDate(e.target.value));
    setEndDateMin(calculateTommorowDate(e.target.value));
  };
  return (
    <Container className="wrapper">
      <Row>
        <Col className="find-sites-label" xl="auto" md="12">
          <strong>מצא תאריכים</strong>
        </Col>
        <Col xs="12" md="auto" id="datesLabelCol">
          <div className="datesLabel">
            <label htmlFor="arrival">הגעה:</label>
            <input
              className="datePicker"
              type="date"
              id="arrival"
              value={arrivalDate}
              min={initialArrivalDate}
              onChange={startDateChangeHandler}
            />
          </div>
          <div className="datesLabel">
            <label htmlFor="departure">עזיבה:</label>
            <input
              className="datePicker"
              type="date"
              id="departure"
              value={departureDate}
              min={endDateMin}
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
