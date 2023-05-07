import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

const SeeItems = () => {
  const currentMenuItemsList = useSelector((state) => state.menu.menuItemList);
  return (
    <div>
      <h3 className="page_header">Ürünler</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Ürün</th>
            <th>Ürün Kategorisi</th>
            <th>Fiyatı</th>
            <th>Opsiyonlar</th>
          </tr>
        </thead>
        <tbody>
          {currentMenuItemsList.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.options}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default SeeItems;

//kategoriler içinde itemlar, fotoları, fiyatları olacak
