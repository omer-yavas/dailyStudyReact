import * as React from "react";
//grid için
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

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
          fields: ["username", "userRole"],
          hideToolbar: true,
          hideFooter: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const UserManagement = () => {
  const [addNewPersonel, setAddNewPersonel] = React.useState(false);
  const columns = [
    { field: "username", headerName: "Kullanıcı Adı", minWidth: 170 },
    { field: "userRole", headerName: "Rolü", minWidth: 150 },
    {
      field: "edit",
      headerName: "Düzenle",
      minWidth: 60,
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
    {
      field: "delete",
      headerName: "Sil",
      minWidth: 50,
      renderCell: (params) => {
        return (
          <div>
            <DeleteOutlineOutlinedIcon />
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
      username: "Ricardo Quaresma",
      userRole: "Admin",
    },
    {
      id: 2,
      username: "Cristiano Ronaldo",
      userRole: "Admin",
    },
    {
      id: 3,
      username: "David Alaba",
      userRole: "User",
    },
    {
      id: 4,
      username: "Hami Mandıralı",
      userRole: "User",
    },
    {
      id: 5,
      username: "Holger Badstuber",
      userRole: "User",
    },
    {
      id: 6,
      username: "Sergen Yalçın",
      userRole: "Admin",
    },
  ];
  return (
    <div>
      <div className="flexbox margintop justifycenter gap2 ">
        <div>
          <ThemeProvider theme={theme}>
            <Button
              onClick={() => setAddNewPersonel(!addNewPersonel)}
              variant="contained"
            >
              Kullanıcı Ekle
            </Button>
          </ThemeProvider>
        </div>
      </div>
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

export default UserManagement;
