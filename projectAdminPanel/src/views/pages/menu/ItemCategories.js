import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
//Redux Toolkit Queries Imports
import {
  useFetchItemCategoriesQuery,
  usePostItemCategoryMutation,
  useDeleteItemCategoryMutation,
  useEditItemCategoryMutation,
} from "src/features/ItemApi";

import Swal from "sweetalert2";
import { FadeLoader } from "react-spinners";
import { usePostFileMutation } from "src/features/FileApi";

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

const videoPlayer = (url) => {
  return <ReactPlayer url={url} controls={true} width="100%" height="auto" />;
};

const ItemCategories = () => {
  const [addNewCategory, setAddNewCategory] = useState(false);
  //Redux Toolkit Query States
  const {
    data,
    isLoading: isFetchingItemCategories,
    isError: isFetchingItemCategoriesError,
  } = useFetchItemCategoriesQuery();
  const [
    postItemCategory,
    {
      isLoading: isPostingNewCategory,
      isError: isPostingNewCategoryError,
      isSuccess: isPostingNewCategorySuccess,
    },
  ] = usePostItemCategoryMutation();

  const [
    deleteItemCategory,
    {
      isLoading: isDeletingCategory,
      isError: isDeletingCategoryError,
      isSuccess: isDeletingCategorySuccess,
    },
  ] = useDeleteItemCategoryMutation();

  const [editItemCategory] = useEditItemCategoryMutation();

  //UI ile ilgili bölümlerin state lari

  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategoryPhoto, setSelectedCategoryPhoto] = useState("");
  const [selectedCategoryVideo, setSelectedCategoryVideo] = useState("");
  const [categoryNameEditing, setCategoryNameEditing] = useState("");
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [editedCategoryPhoto, setEditedCategoryPhoto] = useState("");
  const [editedCategoryVideo, setEditedCategoryVideo] = useState("");
  const [showVideoContainer, setShowVideoContainer] = useState(false);
  const [watchVideoUrl, setWatchVideoUrl] = useState("");
  //Redux Toolkit query durumları

  useEffect(() => {
    if (isFetchingItemCategories) {
      return <FadeLoader color="#36d7b7" height={20} radius={34} width={7} />;
    }
  }, [isFetchingItemCategories]);

  // useEffect(() => {
  //   if (isDeletingCategory) {
  //     return <FadeLoader color="#36d7b7" height={20} radius={34} width={7} />;
  //   }
  // }, [isDeletingCategory]);

  useEffect(() => {
    if (isFetchingItemCategoriesError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Kategoriler Server'dan alınamadı!",
      });
    }
  }, [isFetchingItemCategoriesError]);

  useEffect(() => {
    if (isPostingNewCategorySuccess) {
      Swal.fire("Harika!", "Kategori Başarıyla Yüklendi!", "success");
    }
  }, [isPostingNewCategorySuccess]);

  useEffect(() => {
    if (isPostingNewCategoryError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Kategori Yüklenemedi!",
      });
    }
  }, [isPostingNewCategoryError]);

  useEffect(() => {
    if (isDeletingCategorySuccess) {
      Swal.fire("Harika!", "Başarıyla Silindi!", "success");
    }
  }, [isDeletingCategorySuccess]);

  useEffect(() => {
    if (isDeletingCategoryError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ilme işlemi başarısız!",
      });
    }
  }, [isDeletingCategoryError]);

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
    let videoUrl = "";

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
    //post video get their urls
    if (selectedCategoryVideo) {
      const formData = new FormData();
      formData.append("files", selectedCategoryVideo);

      try {
        await fetch("http://194.62.40.78/api/admin/File/Create", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Video Yüklenemedi");
            }
          })
          .then((data) => {
            videoUrl = data.data.url;
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }

    postItemCategory({
      name: newCategoryName,
      imageUrl: photoUrl,
      videoUrl: videoUrl,
      additionalInfo: "Not Yet!",
    });
    // cancelAddOrEditCategoryHandler();

    setAddNewCategory(false);
  }

  const deleteCategoryHandler = (id) => {
    deleteItemCategory([id]);
  };

  const clickEditCategoryNameHandler = (id) => {
    setEditedCategoryName("");
    setCategoryNameEditing(id);
  };

  async function approveEditCategoryHandler(id) {
    let photoUrl = "";
    let videoUrl = "";
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
    if (editedCategoryVideo) {
      const formData = new FormData();
      formData.append("files", editedCategoryVideo);

      try {
        await fetch("http://194.62.40.78/api/admin/File/Create", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              console.log(">>response okey");
              return response.json();
            } else {
              console.log(">>response not okey");
              console.log(response);
              throw new Error("Video Yüklenemedi");
            }
          })
          .then((data) => {
            console.log("Server response:", data.data);
            videoUrl = data.data.url;
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }
    editItemCategory({
      id: id,
      name: editedCategoryName,
      imageUrl: photoUrl,
      videoUrl: videoUrl,
      additionalInfo: "Not Yet!",
    });

    setEditedCategoryName("");
    setEditedCategoryPhoto("");
    setEditedCategoryVideo("");
    setCategoryNameEditing("");
    setSelectedCategoryPhoto("");
    setSelectedCategoryVideo("");
  }

  const cancelAddOrEditCategoryHandler = () => {
    setNewCategoryName("");
    setAddNewCategory(false);
    setSelectedCategoryPhoto("");
    setSelectedCategoryVideo("");
    setEditedCategoryName("");
    setEditedCategoryPhoto("");
    setEditedCategoryVideo("");
    setCategoryNameEditing("");
  };

  const handleChangeOnCategoryName = (e) => {
    e.preventDefault();
    setEditedCategoryName(e.target.value);
  };

  const handleCategoryPhotoChange = (event) => {
    setSelectedCategoryPhoto(event.target.files[0]);
  };
  const handleCategoryVideoChange = (event) => {
    setSelectedCategoryVideo(event.target.files[0]);
  };

  //Datagrid için başlıklar
  const columns = [
    {
      field: "categoryName",
      headerName: "Kategoriler",
      // editable: columnIsEditable,
      minWidth: 230,
      renderCell: (params) => {
        if (params.row.categoryId === categoryNameEditing) {
          return (
            <Container>
              <Row className="mb-2">
                <p style={{ margin: 0, padding: 0 }}>Kategori İsmi</p>

                <input
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
              <Row>
                <Form.Group>
                  <Form.Label>Video</Form.Label>
                  <Form.Control
                    type="file"
                    size="sm"
                    onChange={(e) => setEditedCategoryVideo(e.target.files[0])}
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
      field: "categoryVideo",
      headerName: "Video",
      headerClassName: "column-header-style",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.categoryId === categoryNameEditing) {
          return <></>;
        } else if (params.row.categoryVideo) {
          return (
            <SmartDisplayIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowVideoContainer(true);
                setWatchVideoUrl(params.row.categoryVideo);
              }}
            />
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
      minWidth: 80,
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
      categoryVideo: item.videoUrl,
    };
  });

  return (
    <div className="itemCategoryBox">
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
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Video Yükle!</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleCategoryVideoChange}
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
      <div className="margintop">
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

      {showVideoContainer && (
        <div className="categoryVideoBox">
          <div
            style={{ cursor: "pointer", "text-align": "end" }}
            onClick={() => setShowVideoContainer(false)}
          >
            <ClearIcon />
          </div>
          <div>{videoPlayer(watchVideoUrl)}</div>
        </div>
      )}
    </div>
  );
};

export default ItemCategories;
