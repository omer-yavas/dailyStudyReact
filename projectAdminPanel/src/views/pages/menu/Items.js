import * as React from "react";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AddItem from "./AddItem";
import ItemCategories from "./ItemCategories";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
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
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
//Efektler için
import { FadeLoader } from "react-spinners";
import Swal from "sweetalert2";
//Redux Toolkit Queries
import {
  useFetchItemsQuery,
  useDeleteItemMutation,
  useFetchItemCategoriesQuery,
  useFetchItemCountriesQuery,
  useEditItemMutation,
} from "src/features/ItemApi";

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

const videoPlayer = (url) => {
  return <ReactPlayer url={url} controls={true} width="100%" height="auto" />;
};

const Items = () => {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showVideoModal, setShowVideoModal] = React.useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = React.useState("");
  const [showEditCategoryModal, setShowEditCategoryModal] =
    React.useState(false);
  const [editingItemId, setEditingItemId] = React.useState("");

  //Redux Toolkit Queries
  const { data, isLoading, isError } = useFetchItemsQuery();
  const {
    data: fetchedItemCategories,
    isLoading: fetchingItemCategories,
    isError: fetcingItemCategoriesError,
  } = useFetchItemCategoriesQuery();

  const {
    data: fetchedItemCountries,
    isLoading: fetchingItemCountries,
    isError: fetcingItemCountriesError,
  } = useFetchItemCountriesQuery();

  const [
    deleteItem,
    {
      isLoading: isDeleting,
      isError: isDeletingError,
      isSuccess: isDeletingSuccess,
    },
  ] = useDeleteItemMutation();

  const [editItem] = useEditItemMutation();

  //editing row states
  const [editedItemName, setEditedItemName] = React.useState("");
  const [editedItemCategory, setEditedItemCategory] = React.useState("");
  const [editedItemPrice, setEditedItemPrice] = React.useState("");
  const [editedItemOptions, setEditedItemOptions] = React.useState("");
  const [editedItemPhoto, setEditedItemPhoto] = React.useState("");
  const [editedItemVideo, setEditedItemVideo] = React.useState("");
  const [editedItemStatus, setEditedItemStatus] = React.useState("");
  const [editedItemCountry, setEditedItemCountry] = React.useState("");

  if (isLoading) {
    return (
      <div className="spinnerContainer">
        <div className="childSpinner">
          <FadeLoader color="#36d7b7" height={20} radius={34} width={7} />
        </div>
      </div>
    );
  }

  if (fetchingItemCategories) {
    return (
      <div className="spinnerContainer">
        <div className="childSpinner">
          <FadeLoader color="#36d7b7" height={20} radius={34} width={7} />
        </div>
      </div>
    );
  }

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="">Why do I have this issue?</a>',
    });
  }
  if (fetcingItemCategoriesError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Kategoriler Yüklenemedi!",
      footer: '<a href="">Why do I have this issue?</a>',
    });
  }

  // useEffect(() => {
  //   if (isDeletingSuccess) {
  //     Swal.fire({
  //       position: "center",
  //       icon: "success",
  //       title: "Silme İşlemi Başarılı!",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   }
  // }, [isDeletingSuccess]);

  //items API sinde itemların categorileri ID olarak kayıtlı
  //ancak datagrid de kullanıcıya text olarak sunmalıyız. onun için
  //ilgili id ye ait categorinin ismini çıkaracak converting işlemi burada yapılıyor.
  const listCurrentCategories = () => {
    let categories = [];
    if (fetchedItemCategories) {
      fetchedItemCategories.data.map((item) => {
        categories.push({ name: item.name, id: item.id });
      });
    }
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

  //items API sinde itemların ülkeleri ID olarak kayıtlı
  //ancak datagrid de kullanıcıya text olarak sunmalıyız. onun için
  //ilgili id ye ait ülkenin ismini çıkaracak converting işlemi burada yapılıyor.

  const listCurrentCountries = () => {
    let countries = [];
    if (fetchedItemCountries) {
      fetchedItemCountries.data.map((item) => {
        countries.push({
          name: item.countryName,
          code: item.countryCode,
          id: item.id,
        });
      });
    }

    return countries;
  };

  const currentCountries = listCurrentCountries();

  const countryFinder = (id) => {
    const relatedCountry = currentCountries.find((item) => item.id === id);
    if (relatedCountry) {
      const { name } = relatedCountry;
      return name;
    } else {
      return "";
    }
  };

  //state handlers-----------------------------------------------------------------

  const cancelEditHandler = () => {
    setEditingItemId("");
  };

  const deleteItemHandler = (id) => {
    deleteItem([`${id}`]);
  };

  async function approveEditItemHandler(id) {
    let photoUrl = "";
    let videoUrl = "";

    if (editedItemPhoto) {
      const formData = new FormData();
      formData.append("files", editedItemPhoto);

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

    if (editedItemVideo) {
      const formData = new FormData();
      formData.append("files", editedItemVideo);

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

    editItem({
      id: id,
      name: editedItemName,
      price: editedItemPrice,
      imageUrl: "",
      videoUrl: "",
      additionalInfo: "Not Yet",
      menuItemCategoryId: editedItemCategory,
    });
  }

  const columns = [
    {
      field: "itemName",
      headerName: "Ürün Adı",
      headerClassName: "column-header-style",
      minWidth: 170,
      renderCell: (params) => {
        if (params.row.id === editingItemId) {
          return (
            <Form.Control
              placeholder={params.row.itemName}
              value={editedItemName}
              onChange={(e) => setEditedItemName(e.target.value)}
            ></Form.Control>
          );
        }
      },
    },
    {
      field: "itemCategory",
      headerName: "Kategorisi",
      headerClassName: "column-header-style",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.id === editingItemId) {
          //ilk başta edited category olarak satırın categorisini atıyoruz, kullanıcı değişiklik yapmazsa aynı değer gitsin diye
          setEditedItemCategory(params.row.itemCategoryId);
          return (
            <Form.Select
              onChange={(e) => setEditedItemCategory(e.target.value)}
            >
              {currentCategories.map((item, index) => {
                let status = false;

                if (params.row.itemCategoryId === item.id) {
                  status = true;
                }
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
      field: "itemPrice",
      headerName: "Fiyatı",
      headerClassName: "column-header-style",
      minWidth: 100,
      renderCell: (params) => {
        if (params.row.id === editingItemId) {
          return (
            <Form.Control
              type="number"
              min="0"
              placeholder={params.row.itemPrice}
              value={editedItemPrice}
              onChange={(e) => setEditedItemPrice(e.target.value)}
            ></Form.Control>
          );
        }
      },
    },
    {
      field: "itemOptions",
      headerName: "Opsiyonları",
      headerClassName: "column-header-style",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.id === editingItemId) {
          return (
            <Form.Control
              placeholder={params.row.itemOptions}
              value={editedItemOptions}
              onChange={(e) => setEditedItemOptions(e.target.value)}
            ></Form.Control>
          );
        }
      },
    },
    {
      field: "itemPhoto",
      headerName: "Fotoğrafı",
      headerClassName: "column-header-style",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.id === editingItemId) {
          return <Form.Control type="file" size="sm" onChange={(e) => {}} />;
        }
        return (
          <div className="item_row_editing_photo">
            {params.row.itemPhoto ? (
              <div>
                <img className="item_photo" src={params.row.itemPhoto}></img>
              </div>
            ) : (
              <>-</>
            )}
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "itemVideo",
      headerName: "Video",
      headerClassName: "column-header-style",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.id === editingItemId) {
          return <Form.Control type="file" size="sm" onChange={(e) => {}} />;
        }
        if (params.row.itemVideo) {
          return (
            <SmartDisplayIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCurrentVideoUrl(params.row.itemVideo);
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
      field: "itemStatus",
      headerName: "Servise Açık",
      headerClassName: "column-header-style",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.id === editingItemId) {
          let status;
          if (params.row.itemStatus === false) {
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
    {
      field: "itemCountry",
      headerName: "Ülke",
      headerClassName: "column-header-style",
      minWidth: 130,
      renderCell: (params) => {
        if (params.row.id === editingItemId) {
          return (
            <Form.Select>
              <option value="TR">Türkiye</option>
              <option status value="FR">
                Fransa
              </option>
            </Form.Select>
          );
        } else {
          return <p>{params.row.itemCountry}</p>;
        }
      },
    },
    {
      field: "edit",
      headerName: "Düzenle",
      headerClassName: "column-header-style",
      minWidth: 60,
      renderCell: (params) => {
        if (params.row.id === editingItemId) {
          return (
            <>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => approveEditItemHandler(params.row.id)}
              >
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
              onClick={() => setEditingItemId(params.row.id)}
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
        if (params.row.id === editingItemId) {
          return;
        }
        return (
          <div
            style={{ cursor: "pointer" }}
            //onClick={() => console.log(params.row.itemCategoryId)}
            onClick={() => deleteItemHandler([params.row.id])}
          >
            <DeleteOutlineOutlinedIcon />
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
  ];

  let rows = [];
  if (data) {
    rows = data.data.map((item) => {
      return {
        id: item.id,
        itemName: item.name,
        itemCategory: categoryFinder(item.menuItemCategoryId),
        itemCategoryId: item.menuItemCategoryId,
        itemPrice: item.price,
        itemOptions: "-",
        itemPhoto: item.imageUrl,
        itemVideo: item.videoUrl,
        itemStatus: item.isActive ? "Evet" : "Hayır",
        itemCountry: countryFinder(item.countryId),
        itemCountryId: item.countryId,
      };
    });
  }

  return (
    <div>
      <div className="flexbox margintop justifycenter gap2 ">
        <div>
          <ThemeProvider theme={theme}>
            <Button onClick={() => setShowAddModal(true)} variant="contained">
              Ürün Ekle
            </Button>
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Button
              onClick={() => setShowEditCategoryModal(true)}
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
          //*getRowHeight , edit etmek istediğimiz satırın yüksekliğini ayarlamak için kullanırız. Auto dediğimizde satır içindeki tüm elementleri alacal şekilde genişler
          getRowHeight={() => "auto"}
          //getEstimatedRowHeight ise genişleyecek olan satırı -lazy load sözkonusu olduğundan- belirtilen miktar kadar default açar, sonra elementlerin kapsadığı yere kadar tam açar, böylelikle görselde sapma olmaz
          getEstimatedRowHeight={() => 208}
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
          <Modal.Title>Ürün Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddItem onCancelAdd={() => setShowAddModal(false)} />
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
          <ItemCategories />
        </Modal.Body>
      </Modal>
      <Modal show={showVideoModal} onHide={() => setShowVideoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ürün Videosu</Modal.Title>
        </Modal.Header>
        <Modal.Body>{videoPlayer(currentVideoUrl)}</Modal.Body>
      </Modal>
    </div>
  );
};

export default Items;
