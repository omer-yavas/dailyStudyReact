import Table from 'react-bootstrap/Table';

const ValetServicepage = () => {
  const vehicleCallList = [{ vehicle: 'Ford', time: 1690212209934 }];

  function formatTime(time) {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div>
      <h3>Vale Yönetim</h3>
      <p>Çağırılan Araçlar</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Araç </th>
            <th>Çağırılma Zamanı</th>
          </tr>
        </thead>
        <tbody>
          {vehicleCallList.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.vehicle}</td>
                <td>{formatTime(item.time)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ValetServicepage;
