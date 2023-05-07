import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMenuItem } from '../../features/menu/MenuSlice';
import foodSvg from '../../assets/fork-knife-logo.png';

const AddItem = () => {
  const dispatch = useDispatch();
  const currentCategories = useSelector((state) => state.menu.categories);

  const [addItemOpen, setAddItemOpen] = useState(false);
  const [menuItemCategory, setMenuItemCategory] = useState(null);
  const [menuItemName, setMenuItemName] = useState('');
  const [menuItemPrice, setMenuItemPrice] = useState('');
  const [menuItemOptions, setMenuItemOptions] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleMenuItemUpload = () => {
    // Burada dosyanızı sunucuya yüklemek için işlemleri gerçekleştirebilirsiniz.
    dispatch(
      addMenuItem({
        name: menuItemName,
        price: menuItemPrice,
        category: menuItemCategory,
        photo: selectedFile,
        options: menuItemOptions,
      })
    );
    setMenuItemName('');
    setMenuItemPrice('');
    setMenuItemCategory(null);
    setMenuItemOptions('');
    setSelectedFile(null);
  };

  const handleCancelClick = () => {
    setMenuItemName('');
    setMenuItemPrice('');
    setMenuItemCategory(null);
    setMenuItemOptions('');
    setSelectedFile('');
    setAddItemOpen(!addItemOpen);
  };

  return (
    <div className="add_new_item">
      <Button
        variant="primary"
        style={{ marginBottom: '1rem' }}
        onClick={() => setAddItemOpen(!addItemOpen)}
      >
        Yeni Ürün Ekle
      </Button>
      {addItemOpen ? (
        <Container>
          <h4 className="center_text">Ürün Ekle</h4>
          <Row className="justify-content-center align-items-center ">
            <Col md={8} lg={5}>
              <Form.Group>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setMenuItemCategory(e.target.value)}
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
                  value={menuItemName}
                  onChange={(e) => setMenuItemName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fiyatı</Form.Label>
                <Form.Control
                  type="text"
                  name="menuItemPrice"
                  value={menuItemPrice}
                  onChange={(e) => setMenuItemPrice(e.target.value)}
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
                  value={menuItemOptions}
                  onChange={(e) => setMenuItemOptions(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ürün Fotoğrafı</Form.Label>
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
                  onChange={handleFileChange}
                  className="displayBlockElements"
                  accept="image/*"
                ></input>
              </Form.Group>
              <div className="buttons_box">
                <Button variant="primary" onClick={handleMenuItemUpload}>
                  Kaydet
                </Button>
                <Button variant="warning" onClick={handleCancelClick}>
                  İptal
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      ) : null}
    </div>
  );
};

export default AddItem;
