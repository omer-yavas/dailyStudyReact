import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  addPersonel,
  deletePersonel,
} from '../features/personel/PersonelSlice';

const DefinePersonel = () => {
  const dispatch = useDispatch();
  const [addActive, setAddActive] = useState(false);
  const [personelName, setPersonelName] = useState('');
  const currentPersonelList = useSelector(
    (state) => state.personel.personelList
  );

  const addConfirmHandler = () => {
    dispatch(addPersonel(personelName));
    setAddActive(false);
    setPersonelName('');
  };

  const cancelClickHandler = () => {
    setAddActive(false);
    setPersonelName('');
  };

  return (
    <div>
      <h3 className="page_header">Personel Düzenle</h3>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>"Personel Adı"</th>
          </tr>
        </thead>
        <tbody>
          {currentPersonelList.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item}</td>

              <td>
                {
                  <Button
                    variant="secondary"
                    onClick={() => {
                      dispatch(deletePersonel(index));
                    }}
                  >
                    Sil
                  </Button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {addActive ? (
        <div className="addSectionTable">
          <Form.Group>
            <Form.Label>Personel Adı</Form.Label>
            <Form.Control
              type="text"
              name="SectionName"
              value={personelName}
              onChange={(e) => setPersonelName(e.target.value)}
            />
          </Form.Group>

          <div className="addSectionTableButtons">
            <Button variant="secondary" onClick={addConfirmHandler}>
              Onayla
            </Button>
            <Button variant="secondary" onClick={cancelClickHandler}>
              İptal
            </Button>
          </div>
        </div>
      ) : (
        <div className="defineSectionTableAddButton">
          <Button variant="secondary" onClick={() => setAddActive(true)}>
            Ekle
          </Button>
        </div>
      )}
    </div>
  );
};

export default DefinePersonel;
