import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BillPreview from './BillPreview';

const Bill = () => {
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
      <p>Adisyon işlemleri</p>
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
              <Form.Label> Müşteri Seç</Form.Label>
              <Form.Select>
                {' '}
                <option value={'option'}>"Tamamı"</option>
                <option value={'option'}>"Müşteri 1"</option>
                <option value={'option'}>"Müşteri 2"</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <p>Adisyonlar</p>
            <div className="billbox"></div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Adisyon Önizleme</p>
            <div className="billpreviewbox">
              <BillPreview></BillPreview>
            </div>
          </Col>
        </Row>
      </Container>

      <Button variant="primary">Cariden Öde</Button>
      <Button variant="primary">Hesap Ödendi</Button>
    </div>
  );
};

export default Bill;
