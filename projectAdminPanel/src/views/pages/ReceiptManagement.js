import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
//grid için
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

const ODD_OPACITY = 0.2;

const theme = createTheme({
  palette: {
    primary: {
      main: "#5f9ea0",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: alpha("#796a51", 0.3),
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton></GridToolbarColumnsButton>
      <GridToolbarFilterButton></GridToolbarFilterButton>
      <GridToolbarDensitySelector></GridToolbarDensitySelector>
      <GridToolbarExport
        csvOptions={{ disableToolbarButton: true }}
        printOptions={{
          fields: [
            "receiptID",
            "tableID",
            "customerID",
            "receiptPrice",
            "allPrice",
            "paymentStatus",
          ],
          hideToolbar: true,
          hideFooter: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const ReceiptManagement = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showSharePayment, setShowSharePayment] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleClickSharePayment = () => {
    setShowModal(false);
    setShowSharePayment(true);
  };

  const handleCancelAllProcess = () => {
    setShowModal(false);
    setShowSharePayment(false);
  };

  const columns = [
    {
      field: "receiptID",
      headerName: "Adisyon",
      headerClassName: "column-header-style",
      minWidth: 65,
    },
    {
      field: "tableID",
      headerName: "Masa",
      headerClassName: "column-header-style",
      minWidth: 100,
    },
    {
      field: "customerID",
      headerName: "Müşteri",
      headerClassName: "column-header-style",
      minWidth: 170,
    },
    {
      field: "showReceipt",
      headerName: "Görüntüle",
      headerClassName: "column-header-style",
      minWidth: 70,
      renderCell: (params) => {
        return (
          <div onClick={() => navigate("/receiptPayment")}>
            <ReceiptLongOutlinedIcon />
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "writeReceipt",
      headerName: "Yazdır",
      headerClassName: "column-header-style",
      minWidth: 70,
      renderCell: (params) => {
        return (
          <div>
            <LocalPrintshopOutlinedIcon />
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "addReceipt",
      headerName: "Birleştir",
      headerClassName: "column-header-style",
      minWidth: 120,
      renderCell: (params) => {
        return (
          <div>
            <Button variant="contained" onClick={() => setShowModal(true)}>
              <AddOutlinedIcon />
            </Button>
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "receiptPrice",
      headerName: "Adisyon Tutarı",
      headerClassName: "column-header-style",
      minWidth: 120,
    },
    {
      field: "allPrice",
      headerName: "Toplam Tutar",
      headerClassName: "column-header-style",
      minWidth: 110,
    },
    {
      field: "paymentStatus",
      headerName: "Ödeme Al",
      headerClassName: "column-header-style",
      minWidth: 170,
    },
  ];

  const rows = [
    {
      id: 1,
      receiptID: 22,
      tableID: "Bahçe-2",
      customerID: "Ahmet Bey",
      orders: 211,
      receiptPrice: 500,
      paymentStatus: "Ödendi",
      allPrice: 500,
    },
    {
      id: 2,
      receiptID: 23,
      tableID: "Salon-04",
      customerID: "Mehmet Bey",
      orders: 114,
      receiptPrice: 200,
      paymentStatus: "Bekliyor",
      allPrice: 200,
    },
    {
      id: 3,
      receiptID: 24,
      tableID: "Salon-12",
      customerID: "Harun Bey",
      orders: 181,
      receiptPrice: 600,
      paymentStatus: "Ödendi",
      allPrice: 900,
    },
    {
      id: 4,
      receiptID: 25,
      tableID: "Teras-5",
      customerID: "Mustafa Bey",
      orders: 288,
      receiptPrice: 100,
      paymentStatus: "Bekliyor",
      allPrice: 100,
    },
  ];
  return (
    <div>
      <StripedDataGrid
        sx={{
          ".MuiDataGrid-cell": {
            border: "1px solid #000",
          },
          ".MuiDataGrid-columnHeader": {
            border: "1px solid #000",
          },
          ".MuiDataGrid-main": {
            border: "1px solid #000",
          },
        }}
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        localeText={{
          toolbarColumns: "Tablo Başlıkları",
          toolbarFilters: "Filtrele",
          toolbarDensity: "Satır Aralığı",
          toolbarDensityCompact: "Dar",
          toolbarDensityStandard: "Orta",
          toolbarDensityComfortable: "Geniş",
          toolbarExport: "Yazdır",
          toolbarExportCSV: "CSV olarak İndir",
          toolbarExportPrint: "Yazdır",
        }}
        slots={{ toolbar: CustomToolbar }}
      />
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ödeme Ekleme / Birleştirme </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Müşteri : Mehmet Bey</h4>
          <fieldset>
            <legend>Masadaki Diğer Adisyonları Ekle</legend>

            <div>
              <input type="checkbox" id="scales" name="scales" />
              <label for="scales">Ahmet Bey</label>
            </div>

            <div>
              <input type="checkbox" id="horns" name="horns" />
              <label for="horns">Harun Bey</label>
            </div>
          </fieldset>
          <fieldset>
            <legend> Diğer Masaları Ekle</legend>

            <label for="pet-select">Masa Seçiniz:</label>

            <select id="pet-select">
              <option value="">--Lütfen Masa Seçiniz--</option>
              <option value="dog">Salon-01</option>
              <option value="cat">Salon-01</option>
              <option value="hamster">Salon-01</option>
              <option value="parrot">Salon-01</option>
              <option value="spider">Salon-01</option>
              <option value="goldfish">Salon-01</option>
            </select>
            <div>
              <p>Eklenen Masalar</p>
              <div></div>
            </div>
          </fieldset>
        </Modal.Body>

        <Modal.Footer>
          <Button>Tek Başına Öde</Button>
          <Button onClick={handleClickSharePayment}>Paylaştırarak Öde</Button>
          <Button onClick={handleCancelAllProcess}>İptal</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSharePayment} onHide={() => setShowSharePayment(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Paylaşımlı Ödeme Planı </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Toplam Ödeme Tutarı: 2000 TL</p>
          <Button>Eşit Paylaştır</Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Müşteri</th>
                <th>Ödenecek Tutar</th>
                <th>Nakit</th>
                <th>Kredi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>200</td>
                <td>200</td>
                <td></td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>300</td>
                <td>300</td>
                <td>{null}</td>
              </tr>
              <tr>
                <td>Larry</td>
                <td>800</td>
                <td>400</td>
                <td>400</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => {}}>Ödeme Planını Onayla</Button>
          <Button onClick={handleCancelAllProcess}>İptal</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ReceiptManagement;
