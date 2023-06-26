import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Fragment, useState, useEffect } from "react";
import foodSvg from "../../../assets/fork-knife-logo.png";
import Swal from "sweetalert2";
import { FadeLoader } from "react-spinners";
import {
  useFetchItemCategoriesQuery,
  useFetchItemCountriesQuery,
  usePostItemMutation,
} from "src/features/ItemApi";

const AddItem = ({ onCancelAdd }) => {
  const [loading, setLoading] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemOptions, setItemOptions] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [itemCountry, setItemCountry] = useState("");
  //const [itemReadyToService, setItemReadyToService] = useState(true);

  //kategori seçim listesi için kategorileri fetch yapacak
  //Redux toolkit state leri ve işlemleri
  const { data, isLoading, isError } = useFetchItemCategoriesQuery();
  const [
    postItem,
    {
      isLoading: postingNow,
      isSuccess: postingSuccesful,
      isError: postingError,
    },
  ] = usePostItemMutation();

  const {
    data: fetchedItemCountries,
    isLoading: fetchingItemCountries,
    isError: fetcingItemCountriesError,
  } = useFetchItemCountriesQuery();

  const cancelAddNewItemHandler = () => {
    setItemName("");
    setItemPrice("");
    setItemCategory("");
    setItemOptions("");
    setSelectedPhoto("");
    setSelectedVideo("");
    onCancelAdd();
  };

  const handlePhotoChange = (event) => {
    setSelectedPhoto(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.files[0]);
  };

  //Redux Toolkit query durumları
  // if (isLoading) {
  //   return <div>Kategoriler Yükleniyor...</div>;
  // }

  // if (postingNow) {
  //   return <div>Ürün Ekleniyor...</div>;
  // }

  // useEffect(() => {
  //   if (postingSuccesful) {
  //     Swal.fire("Harika!", "Ürün Başarıyla Yüklendi!", "success");
  //   }
  // }, [postingSuccesful]);

  // if (isError) {
  //   return <div>Hata - Kategoriler Alınamadı</div>;
  // }

  const listCurrentCategories = () => {
    let categories = [];
    data.data.map((item) => {
      categories.push({ name: item.name, id: item.id });
    });
    return categories;
  };

  const currentCategories = listCurrentCategories();

  /////////////////////////////////////////////////////////////////////
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

  ////////////////////////////////////////////////////////////////////

  async function confirmAddNewItemHandler() {
    //yapılacak input ckeck ler burada yapılır, boş veri varsa doldurulması istenir
    if (itemName.length < 2) {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Ürün ismi en az iki harften oluşmalıdır!",
      });

      return;
    }
    if (itemPrice === "") {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Ürün fiyatı belirleyiniz!",
      });
      return;
    }

    setLoading(true);

    let photoUrl = "";
    let videoUrl = "";

    //post photo get their urls
    if (selectedPhoto) {
      const formData = new FormData();
      formData.append("files", selectedPhoto);

      try {
        await fetch("http://194.62.40.78/api/admin/File/Create", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.log(response);
              throw new Error("Fotoğraf Yüklenemedi");
            }
          })
          .then((data) => {
            console.log("Server response:", data.data);
            photoUrl = data.data.url;
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }

    //post video get their urls
    if (selectedVideo) {
      const formData = new FormData();
      formData.append("files", selectedVideo);

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

    postItem({
      name: itemName,
      price: itemPrice,
      menuItemCategoryId: itemCategory,
      //isActive: itemReadyToService,
      imageUrl: photoUrl,
      videoUrl: videoUrl,
      countryId: itemCountry || "5a127e90-23a6-49e8-86e7-29e1e303f5e0",
      additionalInfo: "Not yet",
    });
    setLoading(false);
  }

  return (
    <Fragment>
      {loading ? (
        <FadeLoader />
      ) : (
        <>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ürün Adı</Form.Label>
              <Form.Control
                type="Text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kategorisi</Form.Label>
              <Form.Select
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value)}
              >
                <option>Kategori Seçiniz!</option>
                {currentCategories.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Fiyatı</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ürün Opsiyonları</Form.Label>
              <Form.Control
                type="Text"
                value={itemOptions}
                onChange={(e) => setItemOptions(e.target.value)}
              />
              <Form.Text className="text-muted">
                Opsiyon aralarına "-" işareti koyun. Örn: Ekşili - Acılı
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Ürün Fotoğrafı</Form.Label>
              <div className="menu_item_photo_box">
                {selectedPhoto ? (
                  <img
                    src={URL.createObjectURL(selectedPhoto)}
                    alt="Selected Photo"
                    style={{ width: "200px", height: "200px" }}
                  />
                ) : (
                  <img
                    src={foodSvg}
                    alt="Default Avatar"
                    style={{ width: "200px", height: "200px" }}
                  />
                )}
              </div>
              <input
                type="file"
                value={selectedPhoto === "" ? "" : null}
                onChange={handlePhotoChange}
                className="displayBlockElements"
                accept="image/*"
              ></input>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Menü Videosu</Form.Label>
              <div className="add_menu_item_video_box">
                {selectedVideo ? (
                  <div>Video Yüklendi</div>
                ) : (
                  <img
                    src={foodSvg}
                    alt="Default Avatar"
                    style={{ width: "200px", height: "200px" }}
                  />
                )}
              </div>
              <input
                type="file"
                value={selectedVideo === "" ? "" : null}
                onChange={handleVideoChange}
                className="displayBlockElements"
                accept="image/*"
              ></input>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ülke</Form.Label>
              <Form.Select
                value={itemCountry}
                onChange={(e) => setItemCountry(e.target.value)}
              >
                {currentCountries.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={item.name === "Türkiye"} //status true ise selected attribute unu ekler.
                    >
                      {item.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Ürün Servise Hazır mı?</Form.Label>
              <Form.Check
                type="checkbox"
                label="Evet"
                checked={itemReadyToService}
                onChange={() => {
                  setItemReadyToService(!itemReadyToService);
                }}
              />
              <Form.Check
                type="checkbox"
                label="Hayır"
                checked={!itemReadyToService}
                onChange={() => {
                  setItemReadyToService(!itemReadyToService);
                }}
              />
            </Form.Group> */}
          </Form>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="secondary"
              onClick={() => cancelAddNewItemHandler()}
            >
              İptal
            </Button>
            <div style={{ width: "1rem" }}></div>
            <Button
              variant="primary"
              onClick={() => confirmAddNewItemHandler()}
            >
              Kaydet
            </Button>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default AddItem;
