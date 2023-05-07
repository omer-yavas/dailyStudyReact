import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'react-calendar/dist/Calendar.css';

const ReportsPage = () => {
  const [startValue, onChangeStart] = useState(new Date());
  const [endValue, onChangeEnd] = useState(new Date());
  const [period, setPeriod] = useState(false);
  return (
    <div>
      <h3 className="page_header">Raporlar Sayfası</h3>
      <Container>
        <Row>
          <p>Tarih Seç</p>
          <Form.Check
            type="checkbox"
            id="calendar"
            label="Aralık Seç"
            onChange={() => setPeriod(!period)}
          />
        </Row>

        <Row>
          <Col md={5}>
            {period ? <p>Başlangıç</p> : <div className="empty_div"></div>}
            <Calendar onChange={onChangeStart} value={startValue} />
          </Col>
          {period ? (
            <Col md={5}>
              <p>Bitiş</p>
              <Calendar onChange={onChangeEnd} value={endValue} />
            </Col>
          ) : null}
        </Row>
      </Container>
      <div className="center_button">
        <Button variant="success">Satış Raporu</Button>
      </div>
    </div>
  );
};

export default ReportsPage;
