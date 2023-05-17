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
          fields: [
            "menuName",
            "menuCategory",
            "menuPrice",
            "menuOptions",
            "menuPhoto",
            "menuStatus",
          ],
          hideToolbar: true,
          hideFooter: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const Menu = () => {
  const [addNewPersonel, setAddNewPersonel] = React.useState(false);
  const columns = [
    { field: "menuName", headerName: "Menü Adı", minWidth: 170 },
    { field: "menuCategory", headerName: "Kategorisi", minWidth: 150 },
    { field: "menuPrice", headerName: "Fiyatı", minWidth: 100 },
    { field: "menuOptions", headerName: "Opsiyonları", minWidth: 150 },
    {
      field: "menuPhoto",
      headerName: "Fotoğrafı",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.menuPhoto) {
          return (
            <div>
              <img className="item_photo" src={params.row.menuPhoto}></img>
            </div>
          );
        }
      },
      sortable: false,
      filterable: false,
    },
    { field: "menuStatus", headerName: "Servise Açık", minWidth: 150 },

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
      menuName: "Whopper Menü",
      menuCategory: "Hamburgerler",
      menuPrice: 130,
      menuOptions: "-",
      menuPhoto:
        "https://www.burgerking.com.tr/cmsfiles/products/whopper-menu.png?v=239",
      menuStatus: "Evet",
    },
    {
      id: 2,
      menuName: "Steakhause",
      menuCategory: "Biftekler",
      menuPrice: 430,
      menuOptions: "-",
      menuPhoto:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Beef_fillet_steak_with_mushrooms.jpg/640px-Beef_fillet_steak_with_mushrooms.jpg",
      menuStatus: "Evet",
    },
    {
      id: 3,
      menuName: "Burgovitto Alpins",
      menuCategory: "Şefin Menüsü",
      menuPrice: 30,
      menuOptions: "-",
      menuPhoto:
        "https://images.squarespace-cdn.com/content/v1/53b839afe4b07ea978436183/1570476898124-0M39QAQU7KSECUJO7UOZ/lasagne-bolognese.jpg",
      menuStatus: "Evet",
    },
    {
      id: 4,
      menuName: "Taç Kebap",
      menuCategory: "Şefin Menüsü",
      menuPrice: 490,
      menuOptions: "-",
      menuPhoto:
        "https://i.lezzet.com.tr/images-xxlarge-recipe/ic_pilavli_tac_kebabi-12986ae8-54c6-4949-b959-51c0fb667065.jpg",
      menuStatus: "Evet",
    },
    {
      id: 5,
      menuName: "Diyarbakır Kebap",
      menuCategory: "Şefin Menüsü",
      menuPrice: 430,
      menuOptions: "-",
      menuPhoto:
        "https://www.foodmoodmagazine.com/wp-content/uploads/2022/02/DI%CC%87YARBAKIR-KEBABI.jpg",
      menuStatus: "Evet",
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
              Ürün Ekle
            </Button>
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Button
              onClick={() => setAddNewPersonel(!addNewPersonel)}
              variant="contained"
            >
              Kategorileri Düzenle
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

export default Menu;
