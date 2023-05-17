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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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
          fields: ["vehicle", "customer", "table", "time"],
          hideToolbar: true,
          hideFooter: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const Valet = () => {
  const columns = [
    { field: "vehicle", headerName: "Plaka", minWidth: 150 },
    { field: "customer", headerName: "Müşteri", minWidth: 180 },
    { field: "table", headerName: "Masa No", minWidth: 110 },
    { field: "time", headerName: "Çağırılma Zamanı", minWidth: 170 },
  ];

  const rows = [
    {
      id: 1,
      vehicle: "16 BRS 16",
      customer: "Ricardo Quaresma",
      table: "Bahçe-4",
      time: "17:11",
    },
    {
      id: 2,
      vehicle: "27 ANT 27",
      customer: "David Alaba",
      table: "Bahçe-8",
      time: "17:15",
    },
    {
      id: 3,
      vehicle: "35 IZM 35",
      customer: "Xabi Alonso",
      table: "Teras-8",
      time: "17:17",
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

export default Valet;
