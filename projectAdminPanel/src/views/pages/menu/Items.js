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
            "itemName",
            "itemCategory",
            "itemPrice",
            "itemOptions",
            "itemPhoto",
            "itemStatus",
          ],
          hideToolbar: true,
          hideFooter: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const Items = () => {
  const [addNewPersonel, setAddNewPersonel] = React.useState(false);
  const columns = [
    { field: "itemName", headerName: "Ürün Adı", minWidth: 170 },
    { field: "itemCategory", headerName: "Kategorisi", minWidth: 150 },
    { field: "itemPrice", headerName: "Fiyatı", minWidth: 100 },
    { field: "itemOptions", headerName: "Opsiyonları", minWidth: 150 },
    {
      field: "itemPhoto",
      headerName: "Fotoğrafı",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.itemPhoto) {
          return (
            <div>
              <img className="item_photo" src={params.row.itemPhoto}></img>
            </div>
          );
        }
      },
      sortable: false,
      filterable: false,
    },
    { field: "itemStatus", headerName: "Servise Açık", minWidth: 150 },

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
      itemName: "Mercimek Çorba",
      itemCategory: "Çorbalar",
      itemPrice: 30,
      itemOptions: "-",
      itemPhoto:
        "https://cdn.yemek.com/mncrop/940/625/uploads/2014/06/mercimek-corbasi-yemekcom.jpg",
      itemStatus: "Evet",
    },
    {
      id: 2,
      itemName: "Tavuk Çorba",
      itemCategory: "Çorbalar",
      itemPrice: 30,
      itemOptions: "-",
      itemPhoto:
        "https://img.lezzetler.com/yuklenen6/terbiyeli-tavuk-corbasi-33390.jpg",
      itemStatus: "Evet",
    },
    {
      id: 3,
      itemName: "Ali Nazik",
      itemCategory: "Kebaplar",
      itemPrice: 130,
      itemOptions: "-",
      itemPhoto: "https://i.ytimg.com/vi/SSnuPYp0DkQ/maxresdefault.jpg",
      itemStatus: "Evet",
    },
    {
      id: 4,
      itemName: "Sütlaç",
      itemCategory: "Tatlılar",
      itemPrice: 40,
      itemOptions: "-",
      itemPhoto:
        "https://imgrosetta.mynet.com.tr/file/11838863/11838863-728xauto.jpg",
      itemStatus: "Evet",
    },
    {
      id: 5,
      itemName: "Akdeniz Salata",
      itemCategory: "Salatalar",
      itemPrice: 35,
      itemOptions: "-",
      itemPhoto:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDMaGA1UUWXEA76Sj6u_UwhYybmplyHfjAVA&usqp=CAU",
      itemStatus: "X",
    },
    {
      id: 6,
      itemName: "Ayran",
      itemCategory: "İçecekler",
      itemPrice: 20,
      itemOptions: "-",
      itemPhoto:
        "https://www.tokatgazetesi.com/wp-content/uploads/2023/01/Ayran-yogurt-drink-typical-cups-fullwidth.jpg",
      itemStatus: "Evet",
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

export default Items;
