import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import TableView from '../components/TableView';
import TableTransfer from '../components/bill/TableTransfer';

const OrderTrackingPage = () => {
  const currentSectionTableList = useSelector(
    (state) => state.sectionTable.sectionTableList
  );

  return (
    <div>
      <h3>Sipariş Takip</h3>
      <Container>
        {currentSectionTableList.map((item) => {
          const tableArray = Array.from(
            { length: item.numberOfTables },
            (_, index) => (
              <Col
                className="tablelayout"
                key={index}
                sm={6}
                md={4}
                lg={3}
                xl={2}
              >
                <TableView index={index} sectionName={item.sectionName} />
              </Col>
            )
          );
          return (
            <Row key={item.sectionName}>
              <h3>{item.sectionName}</h3>
              {tableArray}
            </Row>
          );
        })}
      </Container>
      <ol>Masaları/müşterileri/siparişleri görüntüle</ol>
      <TableTransfer />
    </div>
  );
};

export default OrderTrackingPage;
