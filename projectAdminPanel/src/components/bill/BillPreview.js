import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Table from 'react-bootstrap/Table';

const BillPreview = () => {
  const componentRef = useRef();

  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Adet</th>
            <th>Birim Fiyatı</th>
            <th>Tutarı</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mercimek Çorba</td>
            <td>1</td>
            <td>20</td>
            <td>20</td>
          </tr>
          <tr>
            <td>Köfte</td>
            <td>1</td>
            <td>50</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Tulumba</td>
            <td>1</td>
            <td>20</td>
            <td>20</td>
          </tr>
        </tbody>
      </Table>
      <div className="totalBillBox">
        <p>Toplam Tutar : 90 TL</p>
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => componentRef.current}
        />
        <ComponentToPrint ref={componentRef} />
      </div>
    </div>
  );
};

export default BillPreview;

export const ComponentToPrint = React.forwardRef((props, ref) => {
  return <div ref={ref}>My cool content here!</div>;
});

/* <button
          type="button"
          class="btn btn-primary"
          onClick={() => window.print('aa')}
        >
          Yazdır
        </button> */
