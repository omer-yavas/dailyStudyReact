import * as React from "react";
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
    backgroundColor: alpha(theme.palette.success.main, 0.3),
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
  const [addNewPersonel, setAddNewPersonel] = React.useState(false);
  const columns = [
    { field: "receiptID", headerName: "Adisyon", minWidth: 65 },
    { field: "tableID", headerName: "Masa", minWidth: 100 },
    { field: "customerID", headerName: "Müşteri", minWidth: 170 },
    {
      field: "showReceipt",
      headerName: "Görüntüle",
      minWidth: 70,
      renderCell: (params) => {
        return (
          <div>
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
      headerName: "Diğerlerini Ekle",
      minWidth: 120,
      renderCell: (params) => {
        return (
          <div>
            <Button variant="contained" onClick={() => freeClick()}>
              <AddOutlinedIcon />
            </Button>
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
    { field: "receiptPrice", headerName: "Adisyon Tutarı", minWidth: 120 },
    { field: "allPrice", headerName: "Toplam Tutar", minWidth: 110 },
    { field: "paymentStatus", headerName: "Ödeme Al", minWidth: 170 },
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
      <div>
        <StripedDataGrid
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
      </div>
    </div>
  );
};
export default ReceiptManagement;
