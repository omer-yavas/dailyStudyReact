import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
//header daki müşteri kısmı için
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";

const ReceiptPayment = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/receipt")}>
        Adisyon Sayfasına Dön!
      </Button>
      <Stack direction="row" spacing={1}>
        <Chip icon={<FaceIcon />} label="Mehmet Bey" />
        <Chip icon={<TableRestaurantIcon />} label="Masa No: Salon-14" />
      </Stack>

      <div>
        <Table striped="columns">
          <thead>
            <tr>
              <th>#</th>
              <th>Ürün</th>
              <th>Fiyat</th>
              <th>Miktar</th>
              <th>Toplam</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Çorba</td>
              <td>27</td>
              <td>
                <RemoveCircleOutlineIcon />1<AddCircleOutlineIcon />
              </td>
              <td>27</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Kremalı Mantarlı Tavuk</td>
              <td>95</td>
              <td>
                <RemoveCircleOutlineIcon />1<AddCircleOutlineIcon />
              </td>
              <td>95</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Pilav</td>
              <td>25</td>

              <td>
                <RemoveCircleOutlineIcon />1<AddCircleOutlineIcon />
              </td>
              <td>25</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Ayran</td>
              <td>20</td>
              <td>
                <RemoveCircleOutlineIcon />2<AddCircleOutlineIcon />
              </td>
              <td>40</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div>
        <h4>Özet ve işlemler</h4>
        <p>Hesap Birleştirme Var mı?</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ödenecek Tutar</th>
              <th>Nakit</th>
              <th>Kredi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>200</td>
              <td>200</td>
              <td>0</td>
            </tr>
          </tbody>
        </Table>
        <Button onClick={() => {}}>Ödeme Planını Onayla</Button>
      </div>
    </div>
  );
};

export default ReceiptPayment;
