import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  addList,
  deleteListItem,
} from '../features/SectionTable/SectionTableSlice';

const DefineSectionTable = () => {
  const dispatch = useDispatch();
  const [addActive, setAddActive] = useState(false);
  const [sectionName, setSectionName] = useState('');
  const [numberOfTable, setNumberOfTable] = useState(0);
  const currentSectionTableList = useSelector(
    (state) => state.sectionTable.sectionTableList
  );

  const cancelClickHandler = () => {
    setAddActive(false);
    setNumberOfTable(0);
    setSectionName('');
  };

  const addConfirmHandler = () => {
    const newData = {
      sectionName: sectionName,
      numberOfTables: numberOfTable,
    };
    dispatch(addList(newData));
    setAddActive(false);
    setNumberOfTable(0);
    setSectionName('');
  };

  return (
    <div>
      <h3 className="page_header">Bölüm-Masa Düzenle</h3>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Bölüm Adı</th>
            <th>Masa Sayısı</th>
            <th>Düzenle</th>
          </tr>
        </thead>
        <tbody>
          {currentSectionTableList.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.sectionName}</td>
              <td>{item.numberOfTables}</td>
              <td>
                {
                  <Button
                    variant="secondary"
                    onClick={() => {
                      dispatch(deleteListItem(index));
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
            <Form.Label>Bölüm Adı</Form.Label>
            <Form.Control
              type="text"
              name="SectionName"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Masa Sayısı </Form.Label>
            <Form.Control
              type="number"
              min="0"
              name="NumberOfTable"
              value={numberOfTable}
              onChange={(e) => setNumberOfTable(e.target.value)}
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

export default DefineSectionTable;
