import { Outlet } from 'react-router-dom';
import NavMaster from '../components/NavMaster';
import Header from '../components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SharedLayout = () => {
  return (
    <Container>
      <Row>
        <Header />
      </Row>
      <Row>
        <Col md="2">
          <NavMaster></NavMaster>
        </Col>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};
export default SharedLayout;
