import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
//header daki müşteri kısmı için
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { useFetchUsersQuery } from "src/features/UserApi";
import { useFetchReceiptsQuery } from "src/features/ReceiptApi";

const ReceiptPayment = () => {
  const navigate = useNavigate();
  //burada masterreceipt id olarak var, obje değil
  const masterReceipt = useSelector((state) => state.receipt.masterReceipt);
  const standAlonePaymentGroups = useSelector(
    (state) => state.receipt.standAlonePaymentGroups
  );
  console.log(standAlonePaymentGroups);
  const masterReceiptOwner = useSelector(
    (state) => state.receipt.masterReceiptOwner
  );
  const masterReceiptTable = useSelector(
    (state) => state.receipt.masterReceiptTable
  );

  //kullanıcıları al
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useFetchUsersQuery();

  //--------------Adisyonları çekmek için
  const { data: receiptsData, isLoading, isError } = useFetchReceiptsQuery();

  //receipt id yi alarak,ilgili receipt ten customer Id yi çıkaran, customet ID ile de tanımlı indirimi dönen fonksiyon
  const discountFinder = (receiptId) => {
    if (receiptsData && usersData) {
      const relatedReceipt = receiptsData.data.find(
        (item) => item.id === receiptId
      );
      const relatedUser = usersData.data.find(
        (item) => item.id === relatedReceipt.customerId
      );
      return relatedUser.campaignRate;
    }
  };

  //master Customer ınhesap birleştirmesi olup olmadığını kontrol eden fonksiyon
  const doesMasterHaveStandAlonePayment = () => {
    const [masterReceiptObject] = receiptsData.data.filter(
      (receipt) => receipt.id === masterReceipt
    );
    console.log(masterReceiptObject);
    const result = standAlonePaymentGroups.filter(
      (obj) => obj.masterReceipt.customerId === masterReceiptObject.customerId
    );

    if (result.length > 0) {
      return "Evet";
    } else {
      return "Hayır";
    }
  };

  return (
    <div>
      <Button onClick={() => navigate("/receipt")}>
        Adisyon Sayfasına Dön!
      </Button>
      <Stack direction="row" spacing={1}>
        <Chip icon={<FaceIcon />} label={masterReceiptOwner} />
        <Chip
          icon={<TableRestaurantIcon />}
          label={`Masa No:${masterReceiptTable}`}
        />
        <Chip label={`Tanımlı İndirim: %${discountFinder(masterReceipt)}`} />
      </Stack>
      <div>Müşteri indirim oranı %5</div>
      <div className="receiptConfigBoxes">
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
          <div>{doesMasterHaveStandAlonePayment()}</div>
          <div>Paylaşımlı Ödeme Var mı?</div>
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
    </div>
  );
};

export default ReceiptPayment;
