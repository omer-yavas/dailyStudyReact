import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';

const TableTransfer = () => {
  //sistemdeki mevcut masaları al
  const currentSectionTableList = useSelector(
    (state) => state.sectionTable.sectionTableList
  );
  const currentTableIds = [];
  //mevcut masaları currentTableIds isimli bir array e aktar
  function tableNameGenerator(item, index) {
    for (let i = 0; i < item.numberOfTables; i++) {
      currentTableIds.push(`${item.sectionName + (i + 1)}`);
    }
  }

  currentSectionTableList.forEach(tableNameGenerator);

  return (
    <div>
      <p>Masa Transfer</p>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="2">
          <Accordion.Header>Masa Taşı</Accordion.Header>
          <Accordion.Body>
            <Container>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label> Masa Seç</Form.Label>
                    <Form.Select>
                      {currentTableIds.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label> Buraya Taşı</Form.Label>
                    <Form.Select>
                      {currentTableIds.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Container>

            <Button variant="primary">Taşı</Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default TableTransfer;
