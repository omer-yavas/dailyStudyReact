import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

export default function TableView(props) {
  //mevcut siparişi olan masaları farklı renge boyamak için burada siparişleri çekiyoruz.
  const currentOrders = useSelector((state) => state.orders.orderList);
  let activeTableList = [];
  currentOrders.map((item) => {
    activeTableList.push(item.tableID);
  });

  let tableStyle = '';
  if (activeTableList.includes(`${props.sectionName}${props.index + 1}`)) {
    tableStyle = 'tablecard';
  }

  return (
    <Card>
      <CardContent className={tableStyle}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Masa No {props.index + 1}
        </Typography>
      </CardContent>
    </Card>
  );
}
