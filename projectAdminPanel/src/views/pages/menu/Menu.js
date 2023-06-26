import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ReactPlayer from "react-player";
import AddMenu from "./AddMenu";
import MenuCategories from "./MenuCategories";
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
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import {
  useFetchAllMenuQuery,
  useDeleteMenuMutation,
  useFetchMenuCategoriesQuery,
} from "src/features/MenuApi";

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

const videoPlayer = (url) => {
  return <ReactPlayer url={url} controls={true} width="100%" height="auto" />;
};

const Menu = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);

  //editing row states
  const [editingMenuId, setEditingMenuId] = useState("");
  const [editedMenuName, setEditedMenuName] = useState("");
  const [editedMenuCategory, setEditedMenuCategory] = useState("");
  const [editedMenuPrice, setEditedMenuPrice] = useState("");
  const [editedMenuOptions, setEditedMenuOptions] = useState("");

  //Redux Toolkit Queries
  const { data, isLoading, isError } = useFetchAllMenuQuery();
  const {
    data: fetchedMenuCategories,
    isLoading: fetchingMenuCategories,
    isError: fetcingMenuCategoriesError,
  } = useFetchMenuCategoriesQuery();
  const [
    deleteMenu,
    {
      data: deletedData,
      isLoading: isDeleting,
      isError: isDeletingError,
      isSuccess: isDeletingSuccess,
    },
  ] = useDeleteMenuMutation();

  if (isLoading) {
    return <p>Menüler Yükleniyor...</p>;
  }

  if (isError) {
    return <p>Ürünlerin Yüklenmesinde Hata Oluştu!</p>;
  }

  if (fetchingMenuCategories) {
    return <p>Menü Kategorileri Yükleniyor...</p>;
  }

  const listCurrentCategories = () => {
    let categories = [];
    console.log(fetchedMenuCategories);
    fetchedMenuCategories.data.map((item) => {
      categories.push({ name: item.name, id: item.id });
    });
    return categories;
  };

  const currentCategories = listCurrentCategories();

  const categoryFinder = (id) => {
    const relatedItem = currentCategories.find((item) => item.id === id);
    if (relatedItem) {
      const { name } = relatedItem;
      return name;
    } else {
      return "Tanımlı Değil!";
    }
  };

  function cancelEditHandler() {
    setEditingMenuId("");
  }

  const deleteMenuHandler = (id) => {
    deleteMenu([`${id}`]);
  };

  const columns = [
    {
      field: "menuName",
      headerName: "Menü Adı",
      headerClassName: "column-header-style",
      minWidth: 170,
      renderCell: (params) => {
        if (params.row.id === editingMenuId) {
          return (
            <Form.Control
              type="text"
              placeholder={params.row.menuName}
              value={editedMenuName}
              onChange={(e) => setEditedMenuName(e.target.value)}
            />
          );
        }
      },
    },
    {
      field: "menuCategory",
      headerName: "Kategorisi",
      headerClassName: "column-header-style",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.id === editingMenuId) {
          //ilk başta edited category olarak satırın categorisini atıyoruz, kullanıcı değişiklik yapmazsa aynı değer gitsin diye
          setEditedMenuCategory(params.row.menuCategoryId);
          return (
            <Form.Select
              onChange={(e) => setEditedMenuCategory(e.target.value)}
            >
              {currentCategories.map((item, index) => {
                //status u tanımlamaktaki amacımız edit öncesi geçerli olan kategori seçeneğini edit sırasında selected olarak kullanıcıya sunmak
                let status = false;
                if (params.row.menuCategoryId === item.id) status = true;
                return (
                  <option
                    key={index}
                    value={item.id}
                    //status true ise selected attribute unu ekler.
                    selected={status === true}
                  >
                    {item.name}
                  </option>
                );
              })}
            </Form.Select>
          );
        }
      },
    },
    {
      field: "menuPrice",
      headerName: "Fiyatı",
      headerClassName: "column-header-style",
      minWidth: 100,
      renderCell: (params) => {
        if (params.row.id === editingMenuId) {
          return (
            <Form.Control
              type="number"
              min="0"
              placeholder={params.row.menuPrice}
              value={editedMenuPrice}
              onChange={(e) => setEditedMenuPrice(e.target.value)}
            />
          );
        }
      },
    },

    {
      field: "menuPhoto",
      headerName: "Fotoğrafı",
      headerClassName: "column-header-style",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.menuPhoto) {
          return (
            <div>
              <img className="item_photo" src={params.row.menuPhoto}></img>
            </div>
          );
        } else {
          return <>-</>;
        }
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "menuVideo",
      headerName: "Video",
      headerClassName: "column-header-style",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.menuVideo) {
          return (
            <SmartDisplayIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCurrentVideoUrl(params.row.menuVideo);
                setShowVideoModal(true);
              }}
            />
          );
        } else {
          return <>-</>;
        }
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "menuStatus",
      headerName: "Servise Açık",
      headerClassName: "column-header-style",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.id === editingMenuId) {
          let status;
          if (params.row.menuStatus === false) {
            status = "selected";
          }

          return (
            <Form.Select>
              <option value={true}>Evet</option>
              <option status value={false}>
                Hayır
              </option>
            </Form.Select>
          );
        }
      },
    },
    // {
    //   field: "menuCountry",
    //   headerName: "Ülke",
    //   headerClassName: "column-header-style",
    //   minWidth: 130,
    //   renderCell: (params) => {
    //     if (params.row.id === editingMenuId) {
    //       return (
    //         <Form.Select>
    //           <option value="TR">Türkiye</option>
    //           <option status value="FR">
    //             Fransa
    //           </option>
    //         </Form.Select>
    //       );
    //     }
    //     if (params.row.itemCountry) {
    //       return <div>{params.row.itemCountry}</div>;
    //     }
    //   },
    // },
    {
      field: "edit",
      headerName: "Düzenle",
      headerClassName: "column-header-style",
      minWidth: 60,
      renderCell: (params) => {
        if (params.row.id === editingMenuId) {
          return (
            <>
              <div style={{ cursor: "pointer" }} onClick={() => {}}>
                <DoneIcon />
              </div>
              <div style={{ width: "0.5rem" }}></div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => cancelEditHandler()}
              >
                <ClearIcon />
              </div>
            </>
          );
        } else {
          return (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setEditingMenuId(params.row.id)}
            >
              <EditIcon />
            </div>
          );
        }
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "delete",
      headerName: "Sil",
      headerClassName: "column-header-style",
      minWidth: 50,
      renderCell: (params) => {
        if (params.row.id === editingMenuId) {
          return;
        }
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => deleteMenuHandler([params.row.id])}
          >
            <DeleteOutlineOutlinedIcon />
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
  ];

  const rows = data.data.map((singleMenu) => {
    return {
      id: singleMenu.id,
      menuName: singleMenu.name,
      menuCategory: categoryFinder(singleMenu.menuCategoryId),
      menuCategoryId: singleMenu.menuCategoryId,
      menuPrice: singleMenu.price,
      menuPhoto: singleMenu.imageUrl,
      menuVideo: singleMenu.videoUrl,
      menuStatus: singleMenu.isActive ? "Evet" : "Hayır",
      // menuCountry: singleMenu.menuCategoryId,
    };
  });

  return (
    <div>
      <div className="flexbox margintop justifycenter gap2 ">
        <div>
          <ThemeProvider theme={theme}>
            <Button
              onClick={() => setShowAddModal(!showAddModal)}
              variant="contained"
            >
              Menü Ekle
            </Button>
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Button
              onClick={() => setShowEditCategoryModal(!showEditCategoryModal)}
              variant="contained"
            >
              Kategorileri Düzenle
            </Button>
          </ThemeProvider>
        </div>
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
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Menü Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMenu onCancelAdd={() => setShowAddModal(false)} />
        </Modal.Body>
      </Modal>
      <Modal
        show={showEditCategoryModal}
        onHide={() => setShowEditCategoryModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kategori Düzenle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MenuCategories />
        </Modal.Body>
      </Modal>
      <Modal show={showVideoModal} onHide={() => setShowVideoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Menü Videosu</Modal.Title>
        </Modal.Header>
        <Modal.Body>{videoPlayer(currentVideoUrl)}</Modal.Body>
      </Modal>
    </div>
  );
};

export default Menu;
