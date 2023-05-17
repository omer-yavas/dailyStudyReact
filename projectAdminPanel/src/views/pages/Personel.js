import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//grid için
import { alpha, styled } from "@mui/material/styles";
import {
  DataGrid,
  gridClasses,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
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
          fields: ["personelname", "mission"],
          hideToolbar: true,
          hideFooter: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const Personel = () => {
  const [addNewPersonel, setAddNewPersonel] = React.useState(false);
  const columns = [
    { field: "personelname", headerName: "İsim", minWidth: 250 },
    { field: "mission", headerName: "Görevi", minWidth: 180 },
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
      personelname: "Ricardo Quaresma",
      mission: "Garson",
    },
    {
      id: 2,
      personelname: "Cristiano Ronaldo",
      mission: "Garson",
    },
    {
      id: 3,
      personelname: "David Alaba",
      mission: "Aşçı",
    },
    {
      id: 4,
      personelname: "Xabi Alonso",
      mission: "Kasiyer",
    },
    {
      id: 5,
      personelname: "Holger Badstuber",
      mission: "Garson",
    },
    {
      id: 6,
      personelname: "Michael Ballack",
      mission: "Vale Görevlisi",
    },
  ];
  return (
    <div>
      <div className="flexbox margintop justifycenter addboxborder">
        {!addNewPersonel ? (
          <div>
            <ThemeProvider theme={theme}>
              <Button
                onClick={() => setAddNewPersonel(!addNewPersonel)}
                variant="contained"
              >
                Yeni Personel Ekle
              </Button>
            </ThemeProvider>
          </div>
        ) : (
          <Row>
            <Col xs={8}>
              <Row>
                <Col xs={8} sm={6} className="mb-1">
                  <Input placeholder="Personel Adı" />
                </Col>
                <Col xs={8} sm={6} cclassName="mt-1">
                  <Input placeholder="Görevi" />
                </Col>
              </Row>
            </Col>
            <Col xs={4}>
              <ThemeProvider theme={theme}>
                <Row>
                  <Col xs={8} sm={6} className="mb-1">
                    <Button variant="contained">Ekle</Button>
                  </Col>
                  <Col xs={8} sm={6} className="mt-1">
                    <Button
                      onClick={() => setAddNewPersonel(!addNewPersonel)}
                      variant="contained"
                    >
                      İptal
                    </Button>
                  </Col>
                </Row>
              </ThemeProvider>
            </Col>
          </Row>
        )}
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

export default Personel;
//toolbar: GridToolbar
