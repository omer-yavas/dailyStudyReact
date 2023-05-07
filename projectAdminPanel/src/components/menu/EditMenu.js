import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import AddNewMenu from './AddNewMenu';

const EditMenu = () => {
  const [itemEditing, setItemEditing] = useState(false);
  //hangi index teki category nin adının değiştirileceği için bu state tutulur.
  const [editIndex, setEditIndex] = useState(null);
  //edit edilen veri confirm edilmeden önce burada tutulur.
  const [editedDataBeforeConfirmation, setEditedDataBeforeConfirmation] =
    useState('');

  const currentCategories = ['cocuk', 'Şefin Menüsü', 'diğer'];

  const currentMenuItemsList = [
    {
      name: 'Patates-Kola-Hamburger',
      category: 'cocuk',
      price: 100,
      options: 'patatesli',
    },
  ];
  return (
    <div>
      <h4 className="center_text">Menü Düzenleme</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Menü İsmi</th>
            <th>Menü Kategorisi</th>
            <th>Fiyatı</th>
            <th>Opsiyonlar</th>
            <th>Düzenle</th>
          </tr>
        </thead>
        <tbody>
          {currentMenuItemsList.map((item, index) => (
            <tr key={index}>
              {/*edit işlemi active edildiğinde edit olacak olan index teki veriler input içine girer ki yeni hali aynı input içine yazılabilsin */}
              {itemEditing && editIndex === index ? (
                <>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      value={editedDataBeforeConfirmation.name}
                      onChange={(event) =>
                        setEditedDataBeforeConfirmation({
                          ...editedDataBeforeConfirmation,
                          name: event.target.value,
                        })
                      }
                    ></input>
                  </td>
                  <td>
                    <select
                      defaultValue={editedDataBeforeConfirmation.category}
                      onChange={(event) =>
                        setEditedDataBeforeConfirmation({
                          ...editedDataBeforeConfirmation,
                          category: event.target.value,
                        })
                      }
                    >
                      {/*Kategoriler ayrı bir component te belirlendiği için , burada belirlenmiş seçeneklerin yalnız biri seçilebilir */}
                      {currentCategories.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td>
                    <input
                      value={editedDataBeforeConfirmation.price}
                      onChange={(event) =>
                        setEditedDataBeforeConfirmation({
                          ...editedDataBeforeConfirmation,
                          price: event.target.value,
                        })
                      }
                    ></input>
                  </td>
                  <td>
                    <input
                      value={editedDataBeforeConfirmation.options}
                      onChange={(event) =>
                        setEditedDataBeforeConfirmation({
                          ...editedDataBeforeConfirmation,
                          options: event.target.value,
                        })
                      }
                    ></input>
                  </td>
                  <td>
                    <div className="buttons_box">
                      <Button variant="primary" onClick={() => {}}>
                        Onayla
                      </Button>
                      <Button variant="secondary" onClick={() => {}}>
                        İptal Et!
                      </Button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.options}</td>
                  <td>
                    <div className="buttons_box">
                      <Button variant="warning" onClick={() => {}}>
                        Düzenle
                      </Button>
                      <Button variant="danger" onClick={() => {}}>
                        Sil
                      </Button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <AddNewMenu />
    </div>
  );
};

export default EditMenu;
//menu adı, kategorisi, içeriği, opsiyonları, fiyatı ,ID si
