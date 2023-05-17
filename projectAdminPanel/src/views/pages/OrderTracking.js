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
  const columns = [
    { field: "orderID", headerName: "Sipariş No", minWidth: 40 },
    { field: "tableID", headerName: "Masa No", minWidth: 70 },
    { field: "customerID", headerName: "Müşteri", minWidth: 160 },
    { field: "orderTime", headerName: "Sipariş Zamanı", minWidth: 120 },
    { field: "orderIngredients", headerName: "İçerik", minWidth: 250 },
    { field: "orderStatus", headerName: "Servis Durumu", minWidth: 110 },
    { field: "orderPrice", headerName: "Tutar", minWidth: 70 },
    {
      field: "cancel",
      headerName: "İptal Et",
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

export default OrderTracking;
