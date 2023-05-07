import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import foodSvg from '../../assets/fork-knife-logo.png';

const AddNewMenu = () => {
  //serverdan cekilecek
  const currentCategories = ['cocuk', 'Şefin Menüsü', 'diğer'];
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');

  return (
    <div>
      <Button
        variant="primary"
        style={{ marginBottom: '1rem' }}
        onClick={() => setAddMenuOpen(!addMenuOpen)}
      >
        Yeni Menü Ekle
      </Button>
      {addMenuOpen ? (
        <div>
          <Container>
            <h4 className="center_text">Ürün Ekle</h4>
            <Row className="justify-content-center align-items-center ">
              <Col md={8} lg={5}>
                <Form.Group>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {}}
                  >
                    <option>Kategori Seç</option>
                    {currentCategories.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>İsmi</Form.Label>
                  <Form.Control
                    type="text"
                    name="menuItemName"
                    value={'menuItemName'}
                    onChange={(e) => {}}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Fiyatı</Form.Label>
                  <Form.Control
                    type="text"
                    name="menuItemPrice"
                    value={'menuItemPrice'}
                    onChange={(e) => {}}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Opsiyonları ( Aralarına - işareti koyunuz: Örneğin
                    Acılı-Acısız)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="menuItemOptions"
                    value={'menuItemOptions'}
                    onChange={(e) => {}}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Menü Fotoğrafı</Form.Label>
                  <div className="menu_item_photo_box">
                    {selectedFile ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected File"
                        style={{ width: '200px', height: '200px' }}
                      />
                    ) : (
                      <img
                        src={foodSvg}
                        alt="Default Avatar"
                        style={{ width: '200px', height: '200px' }}
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    value={selectedFile === '' ? '' : null}
                    onChange={() => {}}
                    className="displayBlockElements"
                    accept="image/*"
                  ></input>
                </Form.Group>
                <div className="buttons_box">
                  <Button variant="primary" onClick={() => {}}>
                    Kaydet
                  </Button>
                  <Button variant="warning" onClick={() => {}}>
                    İptal
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : null}
    </div>
  );
};

export default AddNewMenu;
