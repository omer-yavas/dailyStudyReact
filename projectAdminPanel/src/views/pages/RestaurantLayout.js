import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Button from "react-bootstrap/Button";
import AddIcon from "@mui/icons-material/Add";

const RestaurantLayout = () => {
  const [addNewSectionForm, setAddNewSectionForm] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [tableTotal, setTableTotal] = useState("");

  const restaurantLayout = [
    { section: "Salon", table: 45 },
    { section: "Bahçe", table: 22 },
    { section: "Teras", table: 17 },
  ];

  const closeAndResetInputs = () => {
    setSectionName("");
    setTableTotal("");
    setAddNewSectionForm(false);
  };
  const addNewSectionHandler = () => {
    //Buraya server a gidecek veriler işlenecek
    closeAndResetInputs();
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={6} sm={4} md={3} className="mb-3">
          <div className="sectionbox">
            <h4>Salon</h4>
            <p>Masa Sayısı : 45</p>
            <div className="sectionbox_toolbox">
              <div>
                <DeleteIcon />
              </div>
              <div>
                <EditIcon />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={6} sm={4} md={3} className="mb-3">
          <div className="sectionbox">
            <h4>Bahçe</h4>
            <p>Masa Sayısı : 21</p>
            <div className="sectionbox_toolbox">
              <div>
                <DeleteIcon />
              </div>
              <div>
                <EditIcon />
              </div>
            </div>
          </div>
        </Col>{" "}
        <Col xs={6} sm={4} md={3} className="mb-3">
          <div className="sectionbox">
            <h4>Teras</h4>
            <p>Masa Sayısı : 17</p>
            <div className="sectionbox_toolbox">
              <div>
                <DeleteIcon />
              </div>
              <div>
                <EditIcon />
              </div>
            </div>
          </div>
        </Col>
        {addNewSectionForm ? (
          <Col xs={6} sm={4} md={3} className="mb-3">
            <div className="sectionbox">
              <Form.Group className="mb-1" controlId="formBasicText">
                <Form.Control
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  type="text"
                  placeholder="Bölüm Adı"
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="formBasicText">
                <Form.Control
                  value={tableTotal}
                  onChange={(e) => setTableTotal(e.target.value)}
                  type="number"
                  min="1"
                  placeholder="Masa Sayısı"
                />
              </Form.Group>
              <div className="sectionbox_toolbox">
                <CheckIcon onClick={addNewSectionHandler} />
                <CancelOutlinedIcon onClick={closeAndResetInputs} />
              </div>
            </div>
          </Col>
        ) : (
          <Col xs={6} sm={4} md={3} className="mb-3">
            <div
              className="sectionbox"
              onClick={() => setAddNewSectionForm(true)}
            >
              <div style={{ fontSize: "66px" }}>+</div>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default RestaurantLayout;

{
  /* <Row className="justify-content-center">
        <Col xs={2}>
          <Button
            variant="primary"
            style={{ backgroundColor: "#cdaa6a", color: "#4f3a12" }}
          >
            Yeni Bölüm Ekle
          </Button>
        </Col>
      </Row> */
}
