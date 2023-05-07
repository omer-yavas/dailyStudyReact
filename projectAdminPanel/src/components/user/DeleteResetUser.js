import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { addUser, deleteUser, updateUser } from '../../features/user/UserSlice';
import { useState } from 'react';

const DeleteResetUser = () => {
  const dispatch = useDispatch();
  const [userEditing, setUserEditing] = useState(false);
  //hangi index teki user nin adının değiştirileceği için bu state tutulur.
  const [editIndex, setEditIndex] = useState(null);
  //edit edilen veri confirm edilmeden önce burada tutulur.
  const [editedDataBeforeConfirmation, setEditedDataBeforeConfirmation] =
    useState('');
  const currentUsersList = useSelector((state) => state.user.userList);

  const editUserDataHandle = (index) => {
    setEditedDataBeforeConfirmation(currentUsersList[index]);
    setUserEditing(true);
    setEditIndex(index);
  };

  //edit işlemi onaylandığında  yeni hali dispatch ile gönderilir.
  const editConfirmHandler = (index) => {
    dispatch(
      updateUser({
        index: index,
        body: { ...editedDataBeforeConfirmation },
      })
    );
    setUserEditing(false);
    setEditIndex('');
    setEditedDataBeforeConfirmation('');
  };

  //edit işlemi iptal edildiğinde bu fonk çağırılır.
  const cancelEditHandler = () => {
    setUserEditing(false);
    setEditIndex('');
    setEditedDataBeforeConfirmation('');
  };

  return (
    <div>
      <h4 className="center_text">Mevcut Kullanıcılar</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Kullanıcı Adı</th>
            <th>Rolü</th>
            <th>Düzenle</th>
          </tr>
        </thead>
        <tbody>
          {currentUsersList.map((item, index) => (
            <tr key={index}>
              {/*edit işlemi active edildiğinde edit olacak olan index teki veriler input içine girer ki yeni hali aynı input içine yazılabilsin */}
              {userEditing && editIndex === index ? (
                <>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      value={editedDataBeforeConfirmation.username}
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
                      defaultValue={editedDataBeforeConfirmation.role}
                      onChange={(event) =>
                        setEditedDataBeforeConfirmation({
                          ...editedDataBeforeConfirmation,
                          role: event.target.value,
                        })
                      }
                    >
                      <option value="admin">Yönetici</option>
                      <option value="user">Görevli</option>
                    </select>
                  </td>

                  <td>
                    <div className="buttons_box">
                      <Button
                        variant="primary"
                        onClick={() => {
                          editConfirmHandler(index);
                        }}
                      >
                        Değişikliği Onayla
                      </Button>
                      <Button variant="warning" onClick={cancelEditHandler}>
                        Değişikliği İptal Et!
                      </Button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>
                    <div className="buttons_box">
                      <Button
                        variant="warning"
                        onClick={() => editUserDataHandle(index)}
                      >
                        Düzenle
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => dispatch(deleteUser(index))}
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
    </div>
  );
};
export default DeleteResetUser;
