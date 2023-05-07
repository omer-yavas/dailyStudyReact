import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';

import Bill from '../components/bill/Bill';

const BillManagementPage = () => {
  return (
    <div>
      <Bill />
    </div>
  );
};

export default BillManagementPage;
