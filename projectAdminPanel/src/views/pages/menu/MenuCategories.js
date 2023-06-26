import { useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from "sweetalert2";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  useFetchMenuCategoriesQuery,
  useDeleteMenuCategoryMutation,
  useEditMenuCategoryMutation,
  usePostMenuCategoryMutation,
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
      <GridToolbarExport
        csvOptions={{ disableToolbarButton: true }}
        printOptions={{
          fields: ["categoryName"],
          hideToolbar: true,
          hideFooter: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const MenuCategories = () => {
  const [addNewCategory, setAddNewCategory] = useState(false);

  //Redux Toolkit Query States
  const { data, isLoading, isError } = useFetchMenuCategoriesQuery();
  const [postMenuCategory] = usePostMenuCategoryMutation();
  const [deleteMenuCategory] = useDeleteMenuCategoryMutation();
  const [editMenuCategory] = useEditMenuCategoryMutation();

  //UI ile ilgili bölümlerin state lari
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategoryPhoto, setSelectedCategoryPhoto] = useState("");
  const [categoryNameEditing, setCategoryNameEditing] = useState("");
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [editedCategoryPhoto, setEditedCategoryPhoto] = useState("");

  //Redux Toolkit query durumları
  if (isLoading) {
    return <div>İşlem Yapılıyor...</div>;
  }

  if (isError) {
    return <div>Hata Oluştu</div>;
  }

  //RTK queries işlemleri
  async function addNewCategoryClickHandler() {
    if (newCategoryName.length < 2) {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Kategori ismi en az iki harften oluşmalıdır!",
      });
      return;
    }

    let photoUrl = "";

    //post photo get their urls
    if (selectedCategoryPhoto) {
      const formData = new FormData();
      formData.append("files", selectedCategoryPhoto);

      try {
        await fetch("http://194.62.40.78/api/admin/File/Create", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Fotoğraf Yüklenemedi");
            }
          })
          .then((data) => {
            photoUrl = data.data.url;
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }

    postMenuCategory({
      name: newCategoryName,
      imageUrl: photoUrl,
    });
    cancelAddOrEditCategoryHandler();
  }

  const handleChangeOnCategoryName = (e) => {
    e.preventDefault();
    setEditedCategoryName(e.target.value);
  };

  async function approveEditCategoryHandler(id) {
    let photoUrl = "";

    if (editedCategoryPhoto) {
      const formData = new FormData();
      formData.append("files", editedCategoryPhoto);

      try {
        await fetch("http://194.62.40.78/api/admin/File/Create", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Fotoğraf Yüklenemedi");
            }
          })
          .then((data) => {
            photoUrl = data.data.url;
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }

    editMenuCategory({
      id: id,
      name: editedCategoryName,
      imageUrl: photoUrl,
    });
    setEditedCategoryName("");
    setCategoryNameEditing("");
    setEditedCategoryPhoto("");
    setCategoryNameEditing("");
    setSelectedCategoryPhoto("");
  }

  const cancelAddOrEditCategoryHandler = () => {
    setNewCategoryName("");
    setSelectedCategoryPhoto("");
    setEditedCategoryName("");
    setCategoryNameEditing("");
    setAddNewCategory(false);
  };

  const deleteCategoryHandler = (id) => {
    deleteMenuCategory([id]);
  };

  const clickEditCategoryNameHandler = (id) => {
    setEditedCategoryName("");
    setCategoryNameEditing(id);
  };

  const handleCategoryPhotoChange = (event) => {
    setSelectedCategoryPhoto(event.target.files[0]);
  };

  const columns = [
    {
      field: "categoryName",
      headerName: "Kategoriler",
      minWidth: 190,
      renderCell: (params) => {
        if (params.row.categoryId === categoryNameEditing) {
          return (
            <Container>
              <Row className="mb-2">
                <p style={{ margin: 0, padding: 0 }}>Kategori İsmi</p>

                <input
                  placeholder={params.row.categoryName}
                  value={editedCategoryName}
                  onChange={(e) => handleChangeOnCategoryName(e)}
                ></input>
              </Row>
              <Row className="mb-2">
                <Form.Group>
                  <Form.Label>Fotoğraf</Form.Label>
                  <Form.Control
                    type="file"
                    size="sm"
                    onChange={(e) => setEditedCategoryPhoto(e.target.files[0])}
                  />
                </Form.Group>
              </Row>
            </Container>
          );
        }
      },
    },
    {
      field: "categoryPhoto",
      headerName: "Fotoğrafı",
      //headerClassName: "column-header-style",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.categoryId === categoryNameEditing) {
          return <></>;
        }
        if (params.row.categoryPhoto) {
          return (
            <div>
              <img className="item_photo" src={params.row.categoryPhoto}></img>
            </div>
          );
        } else {
          return <div>-</div>;
        }
      },
      sortable: false,
      filterable: false,
    },

    {
      field: "edit",
      headerName: "Düzenle",
      minWidth: 60,
      renderCell: (params) => {
        if (params.row.categoryId === categoryNameEditing) {
          return (
            <>
              <div
                style={{ cursor: "pointer" }}
                onClick={() =>
                  approveEditCategoryHandler(params.row.categoryId)
                }
              >
                <DoneIcon />
              </div>
              <div style={{ width: "0.5rem" }}></div>
              <div
                style={{ cursor: "pointer" }}
                onClick={cancelAddOrEditCategoryHandler}
              >
                <ClearIcon />
              </div>
            </>
          );
        }
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => clickEditCategoryNameHandler(params.row.categoryId)}
          >
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
        if (params.row.categoryId === categoryNameEditing) {
          return;
        }
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => deleteCategoryHandler(params.row.categoryId)}
          >
            <DeleteOutlineOutlinedIcon />
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "categoryId",
      headerName: "ID",
      minWidth: 50,
    },
  ];

  const rows = data.data.map((item) => {
    return {
      categoryId: item.id,
      categoryName: item.name,
      id: item.id,
      categoryPhoto: item.imageUrl,
    };
  });

  return (
    <div>
      <div className="flexbox margintop justifycenter addboxborder">
        {!addNewCategory ? (
          <div>
            <ThemeProvider theme={theme}>
              <Button
                onClick={() => setAddNewCategory(!addNewCategory)}
                variant="contained"
              >
                Yeni Kategori Ekle
              </Button>
            </ThemeProvider>
          </div>
        ) : (
          // <div className="flexbox gap2">
          //   <Input
          //     value={newCategoryName}
          //     onChange={(e) => setNewCategoryName(e.target.value)}
          //     placeholder="Kategori Adı"
          //   />
          //   <ThemeProvider theme={theme}>
          //     <div className="flexbox gap1">
          //       <Button
          //         variant="contained"
          //         onClick={addNewCategoryClickHandler}
          //       >
          //         Ekle
          //       </Button>
          //       <Button
          //         onClick={cancelAddOrEditCategoryHandler}
          //         variant="contained"
          //       >
          //         İptal
          //       </Button>
          //     </div>
          //   </ThemeProvider>
          // </div>
          <Container>
            <Row className="justify-content-center">
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Kategori Adı"
              />
              <div className="horizontal-line"></div>
            </Row>
            <Row>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Fotoğraf Yükle!</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleCategoryPhotoChange}
                />
              </Form.Group>
              <div className="horizontal-line"></div>
            </Row>

            <Row>
              <Col>
                <ThemeProvider theme={theme}>
                  <div className="flexbox gap1 justify-content-center">
                    <Button
                      variant="contained"
                      onClick={addNewCategoryClickHandler}
                    >
                      Ekle
                    </Button>
                    <Button
                      onClick={cancelAddOrEditCategoryHandler}
                      variant="contained"
                    >
                      İptal
                    </Button>
                  </div>
                </ThemeProvider>
              </Col>
            </Row>
          </Container>
        )}
      </div>
      <div>
        <StripedDataGrid
          sx={{
            "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
              py: "8px",
            },
            "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
              py: "15px",
            },
            "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
              py: "22px",
            },
          }}
          rows={rows}
          columns={columns}
          //*getRowHeight , edit etmek istediğimiz satırın yüksekliğini ayarlamak için kullanırız. Auto dediğimizde satır içindeki tüm elementleri alacal şekilde genişler
          getRowHeight={() => "auto"}
          //getEstimatedRowHeight ise genişleyecek olan satırı -lazy load sözkonusu olduğundan- belirtilen miktar kadar default açar, sonra elementlerin kapsadığı yere kadar tam açar, böylelikle görselde sapma olmaz
          getEstimatedRowHeight={() => 108}
          editMode="row"
          columnVisibilityModel={{
            categoryId: false,
          }}
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

export default MenuCategories;
