import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import { Button as BootstrapButton } from "react-bootstrap";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

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
            "orderID",
            "tableID",
            "customerID",
            "orderTime",
            "orderIngredients",
            "orderStatus",
            "orderPrice",
          ],
          hideToolbar: true,
          hideFooter: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const OrderTracking = () => {
  const navigate = useNavigate();

  const columns = [
    {
      field: "orderID",
      headerName: "Sipariş",
      headerClassName: "column-header-style",
      minWidth: 40,
    },
    {
      field: "tableID",
      headerName: "Masa No",
      headerClassName: "column-header-style",
      minWidth: 70,
    },
    {
      field: "customerID",
      headerName: "Müşteri",
      headerClassName: "column-header-style",
      minWidth: 160,
    },
    {
      field: "orderTime",
      headerName: "Zamanı",
      headerClassName: "column-header-style",
      minWidth: 120,
    },
    {
      field: "orderIngredients",
      headerName: "İçerik",
      headerClassName: "column-header-style",
      minWidth: 250,
    },
    {
      field: "orderStatus",
      headerName: "Durumu",
      headerClassName: "column-header-style",
      minWidth: 110,
    },
    {
      field: "orderPrice",
      headerName: "Tutar",
      headerClassName: "column-header-style",
      minWidth: 70,
    },
    {
      field: "cancel",
      headerName: "İptal Et",
      headerClassName: "column-header-style",
      minWidth: 80,
      renderCell: (params) => {
        return (
          <div>
            <CancelIcon />
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "edit",
      headerName: "Düzenle",
      headerClassName: "column-header-style",
      minWidth: 80,
      renderCell: (params) => {
        return (
          <div>
            <EditIcon />
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
  ];

  const rows = [
    {
      id: 1,
      orderID: 1,
      tableID: "Salon-35",
      customerID: "Ertuğrul Bey",
      orderTime: "18:36",
      orderIngredients: "Mercimek Çorba, İnegöl Köfte, Tulumba Tatlısı",
      orderStatus: "Hazırlanıyor",
      orderPrice: 250,
    },
    {
      id: 2,
      orderID: 2,
      tableID: "Salon-12",
      customerID: "Emre Bey",
      orderTime: "18:45",
      orderIngredients: "Tavuk Çorba, Kuru Fasulye, Şambali Tatlısı",
      orderStatus: "Hazırlanıyor",
      orderPrice: 150,
    },
    {
      id: 3,
      orderID: 3,
      tableID: "Salon-23",
      customerID: "Davud Bey",
      orderTime: "19:01",
      orderIngredients: " Biftek, Akdeniz Salata",
      orderStatus: "Servis Edildi",
      orderPrice: 300,
    },
    {
      id: 4,
      orderID: 4,
      tableID: "Bahçe-04",
      customerID: "Ahmet Bey",
      orderTime: "12:26",
      orderIngredients: "Kelle-paça, Ali Nazik, Künefe",
      orderStatus: "Ödeme yapıldı",
      orderPrice: 230,
    },
    {
      id: 5,
      orderID: 5,
      tableID: "Teras-07",
      customerID: "Vahide Hanım",
      orderTime: "20:23",
      orderIngredients: "Kuzu Güveç, İç Pilav, Baklava",
      orderStatus: "Hazırlanıyor",
      orderPrice: 400,
    },
  ];
  return (
    <div>
      <div className="add_newOrder_button">
        <BootstrapButton onClick={() => navigate("/addNewOrder")}>
          Yeni Sipariş Gir!
        </BootstrapButton>
      </div>

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
      </div>
    </div>
  );
};

export default OrderTracking;
