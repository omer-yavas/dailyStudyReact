import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const MenuCategories = () => {
  const [categoryName, setCategoryName] = useState('');
  //"Adını değiştir" butonuna tıklandığında bu state i aktif yaparız, böylelikle rename yapılacak category adı input içine girer
  const [renameIsActive, setRenameIsActive] = useState(false);
  //hangi index teki category nin adının değiştirileceği için bu state tutulur.
  const [renameIndex, setRenameIndex] = useState(null);
  //yeni bir kategori adı ekleneceği zaman bu state true hale getirilir.
  const [addNewCategoryActive, setAddNewCategoryActive] = useState(false);
  //yeni bir category ekleneceği zaman category ismi bu state te tutulur.
  const [newCategoryName, setNewCategoryName] = useState('');

  const currentMenuCategories = ['Şefin Menüsü', 'Ana Menüler', 'Çocuk Menüsü'];

  //rename yapılacak category index i buraya gelir
  const renameHandler = (index) => {
    setRenameIsActive(true);
    setRenameIndex(index);
  };

  //rename işlemi onaylandığında kategorinin yeni adı dispatch ile gönderilir.
  const renameConfirmHandler = (index) => {
    // dispatch(updateCategoryItem({ index, categoryName }));
    setRenameIsActive(false);
    setRenameIndex('');
    setCategoryName('');
  };

  //rename işlemi iptal edildiğinde bu fonk çağırılır.
  const cancelRenameHandler = () => {
    setRenameIsActive(false);
    setRenameIndex('');
    setCategoryName('');
  };

  //yeni bir kategori ekleme işlemi iptal edildiğinde bu fonk çağırılır.
  const cancelAddNewCategoryHandler = () => {
    setAddNewCategoryActive(false);
    setNewCategoryName('');
  };

  //yeni bir kategori ekleme işlemi onaylandığında bu fonk çağırılır.
  const confirmAddNewCategoryHandler = () => {
    // dispatch(addCategoryItem(newCategoryName));
    setAddNewCategoryActive(false);
    setNewCategoryName('');
  };

  return (
    <div>
      <h4 className="center_text">Menü Kategorileri</h4>
      <Table>
        <thead>
          <tr>
            <th>Menü Kategorileri</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {currentMenuCategories.map((item, index) => (
            <tr key={index}>
              {/*rename işlemi active edildiğinde rename olacak olan index teki category adı input içine girer ki yeni adı aynı input içine yazılabilsin */}
              {renameIsActive && renameIndex === index ? (
                <>
                  <td>
                    <input
                      value={categoryName}
                      onChange={(event) => setCategoryName(event.target.value)}
                    ></input>
                  </td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        renameConfirmHandler(index);
                      }}
                    >
                      Onayla
                    </Button>
                    <Button variant="secondary" onClick={cancelRenameHandler}>
                      İptal Et!
                    </Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item}</td>
                  <td>
                    {
                      <div className="buttons_box">
                        <Button
                          variant="warning"
                          onClick={() => {
                            renameHandler(index);
                          }}
                        >
                          Adını Değiştir
                        </Button>{' '}
                        <Button
                          variant="danger"
                          onClick={() => {
                            // dispatch(deleteCategoryItem(index));
                          }}
                        >
                          Sil
                        </Button>
                      </div>
                    }
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      {addNewCategoryActive ? (
        <div className="addSectionTable">
          <Form.Group>
            <Form.Label>Kategori Adı</Form.Label>
            <Form.Control
              type="text"
              name="SectionName"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </Form.Group>

          <div className="addSectionTableButtons">
            <Button variant="secondary" onClick={confirmAddNewCategoryHandler}>
              Onayla
            </Button>
            <Button variant="secondary" onClick={cancelAddNewCategoryHandler}>
              İptal
            </Button>
          </div>
        </div>
      ) : (
        <div className="defineSectionTableAddButton">
          <Button
            variant="primary"
            onClick={() => setAddNewCategoryActive(true)}
          >
            Yeni Kategori Ekle
          </Button>
        </div>
      )}
    </div>
  );
};

export default MenuCategories;
