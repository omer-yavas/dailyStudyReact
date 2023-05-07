import AddItem from './AddItem';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { deleteMenuItem, updateMenuItem } from '../../features/menu/MenuSlice';
import { useState } from 'react';

const EditItems = () => {
  const dispatch = useDispatch();
  const [itemEditing, setItemEditing] = useState(false);
  //hangi index teki category nin adının değiştirileceği için bu state tutulur.
  const [editIndex, setEditIndex] = useState(null);
  //edit edilen veri confirm edilmeden önce burada tutulur.
  const [editedDataBeforeConfirmation, setEditedDataBeforeConfirmation] =
    useState('');
  const currentMenuItemsList = useSelector((state) => state.menu.menuItemList);
  const currentCategories = useSelector((state) => state.menu.categories);

  const editMenuItemHandle = (index) => {
    setEditedDataBeforeConfirmation(currentMenuItemsList[index]);
    setItemEditing(true);
    setEditIndex(index);
  };

  //edit işlemi onaylandığında  yeni hali dispatch ile gönderilir.
  const editConfirmHandler = (index) => {
    dispatch(
      updateMenuItem({
        index: index,
        body: { ...editedDataBeforeConfirmation },
      })
    );
    setItemEditing(false);
    setEditIndex('');
    setEditedDataBeforeConfirmation('');
  };

  //edit işlemi iptal edildiğinde bu fonk çağırılır.
  const cancelEditHandler = () => {
    setItemEditing(false);
    setEditIndex('');
    setEditedDataBeforeConfirmation('');
  };

  return (
    <div>
      <h4 className="center_text">Ürün Düzenleme</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Ürün</th>
            <th>Ürün Kategorisi</th>
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
                      <Button
                        variant="primary"
                        onClick={() => {
                          editConfirmHandler(index);
                        }}
                      >
                        Onayla
                      </Button>
                      <Button variant="secondary" onClick={cancelEditHandler}>
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
                      <Button
                        variant="warning"
                        onClick={() => editMenuItemHandle(index)}
                      >
                        Düzenle
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => dispatch(deleteMenuItem(index))}
                      >
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

      <AddItem></AddItem>
    </div>
  );
};
export default EditItems;
