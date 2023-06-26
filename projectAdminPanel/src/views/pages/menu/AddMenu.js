import Form from "react-bootstrap/Form";
import { useState } from "react";
import foodSvg from "../../../assets/fork-knife-logo.png";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { FadeLoader } from "react-spinners";
import {
  useFetchMenuCategoriesQuery,
  usePostMenuMutation,
} from "src/features/MenuApi";

const AddMenu = ({ onCancelAdd }) => {
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuCategory, setMenuCategory] = useState("");
  const [menuOptions, setMenuOptions] = useState("");
  const [menuWeight, setMenuWeight] = useState(0);
  const [menuPrepareTime, setMenuPrepareTime] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  //const [menuCountry, setMenuCountry] = useState("TR");
  //const [menuReadyToService, setMenuReadyToService] = useState(true);

  const currentCountries = [
    { name: "Almanya", id: "DE" },
    { name: "Fransa", id: "FR" },
    { name: "Hollanda", id: "ND" },
  ];

  //kategori seçim listesi için kategorileri fetch yapacak
  //Redux toolkit state leri ve işlemleri
  const { data, isLoading, isError } = useFetchMenuCategoriesQuery();
  const [
    postMenu,
    {
      isLoading: postingNow,
      isSuccess: postingSuccesful,
      isError: postingError,
    },
  ] = usePostMenuMutation();

  const cancelAddNewMenuHandler = () => {
    setMenuName("");
    setMenuPrice("");
    setMenuCategory("");
    setMenuOptions("");
    setSelectedPhoto("");
    setSelectedVideo("");
    onCancelAdd();
  };

  const handleFileChange = (event) => {
    setSelectedPhoto(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.files[0]);
  };

  //Redux Toolkit query durumları
  if (isLoading) {
    return <div>İşlem Yapılıyor...</div>;
  }

  if (postingNow) {
    return <div>Menü Ekleniyor...</div>;
  }

  if (postingSuccesful) {
    return (
      <>
        <p>Menü Yükleme Başarılı</p>
        <Button onClick={() => cancelAddNewMenuHandler()}>Kapat</Button>
      </>
    );
  }

  if (isError) {
    return <div>Hata - Kategoriler Alınamadı</div>;
  }

  const listCurrentCategories = () => {
    let categories = [];
    data.data.map((item) => {
      categories.push({ name: item.name, id: item.id });
    });
    return categories;
  };

  const currentCategories = listCurrentCategories();

  async function confirmAddNewMenuHandler() {
    if (menuName.length < 2) {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Ürün ismi en az iki harften oluşmalıdır!",
      });
      return;
    }

    if (menuPrice === "") {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Ürün fiyatı belirleyiniz!",
      });
      return;
    }

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

    postMenu({
      name: menuName,
      price: menuPrice,
      weight: menuWeight,
      prepareTime: menuPrepareTime,
      additionalInfo: additionalInfo,
      ingredients: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "string",
        },
      ],
      menuCategoryId: menuCategory,
      //isActive: menuReadyToService,
      imageUrl: photoUrl,
      videoUrl: videoUrl,
      additionalInfo: "Not yet",
    });
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Menü Adı</Form.Label>
          <Form.Control
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            type="Text"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Kategorisi</Form.Label>
          <Form.Select
            value={menuCategory}
            onChange={(e) => setMenuCategory(e.target.value)}
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
            value={menuPrice}
            onChange={(e) => setMenuPrice(e.target.value)}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Menü Opsiyonları</Form.Label>
          <Form.Control
            type="Text"
            value={menuOptions}
            onChange={(e) => setMenuOptions(e.target.value)}
          />
          <Form.Text className="text-muted">
            Opsiyon aralarına "-" işareti koyun. Örn: Ekşili - Acılı
          </Form.Text>
        </Form.Group> */}

        <Form.Group className="mb-3">
          <Form.Label>Menü Fotoğrafı</Form.Label>
          <div className="menu_item_photo_box">
            {selectedPhoto ? (
              <img
                src={URL.createObjectURL(selectedPhoto)}
                alt="Menü Fotoğrafı"
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
            onChange={handleFileChange}
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
        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ülke</Form.Label>
          <Form.Select
            value={menuCountry}
            onChange={(e) => setMenuCountry(e.target.value)}
          >
            <option value="TR">Türkiye</option>
            {currentCountries.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group> */}
        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Menü Servis Edilmeye Hazır mı?</Form.Label>
          <Form.Check
            type="checkbox"
            label="Evet"
            checked={menuReadyToService}
            onChange={() => {
              setMenuReadyToService(!menuReadyToService);
            }}
          />
          <Form.Check
            type="checkbox"
            label="Hayır"
            checked={!menuReadyToService}
            onChange={() => {
              setMenuReadyToService(!menuReadyToService);
            }}
          />
        </Form.Group> */}
      </Form>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="secondary" onClick={() => cancelAddNewMenuHandler()}>
          İptal
        </Button>
        <div style={{ width: "1rem" }}></div>
        <Button variant="primary" onClick={() => confirmAddNewMenuHandler()}>
          Kaydet
        </Button>
      </div>
    </>
  );
};

export default AddMenu;
