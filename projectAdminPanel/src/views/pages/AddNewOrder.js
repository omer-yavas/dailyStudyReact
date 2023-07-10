import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button as BootstrapButton } from "react-bootstrap";
import { Button as MuiButton } from "@mui/material";
import {
  useFetchItemCategoriesQuery,
  useFetchItemsQuery,
} from "src/features/ItemApi";
import { useFetchMenuCategoriesQuery } from "src/features/MenuApi";
import { useFetchAllMenuQuery } from "src/features/MenuApi";
import { useFetchTablesQuery } from "src/features/RestaurantLayoutApi";
import {
  useFetchReceiptsQuery,
  usePostReceiptMutation,
  useUpdateReceiptMutation,
} from "src/features/ReceiptApi";
import { useFetchUsersQuery, usePostUserMutation } from "src/features/UserApi";

import {
  usePostOrderMutation,
  useFetchOrdersQuery,
} from "src/features/OrderApi";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const AddNewOrder = () => {
  const navigate = useNavigate();
  const [table, setTable] = useState("");
  const [chosenItemCategory, setChosenItemCategory] = useState("");
  const [chosenMenuCategory, setChosenMenuCategory] = useState("");
  const [customerDefineModal, setCustomerDefineModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [registeredCustomer, setRegisteredCustomer] = useState("");
  const [orderContext, setOrderContext] = useState([]);

  //masaları seçebilmek için
  const {
    data: tablesData,
    isLoading: tablesLoading,
    isError: tablesError,
  } = useFetchTablesQuery();

  //seçilen masadaki müşteri/aadisyonları gösterebilmek için adisyonları fetch etmemiz gerekir
  const {
    data: receiptsData,
    isLoading: receiptsLoading,
    isError: receiptsError,
  } = useFetchReceiptsQuery();

  //yiyecek içecek kategorileri
  const {
    data: itemCategoriesData,
    isLoading: itemCategoriesLoading,
    isError: itemCategoriesError,
  } = useFetchItemCategoriesQuery();

  //yiyecek içecekleri al
  const {
    data: itemsData,
    isLoading: itemsLoading,
    isError: itemsError,
  } = useFetchItemsQuery();

  //menu kategorileri
  const {
    data: menuCategoriesData,
    isLoading: menuCategoriesLoading,
    isError: menuCategoriesError,
  } = useFetchMenuCategoriesQuery();

  //menüleri al
  const {
    data: menuData,
    isLoading: menuLoading,
    isError: menuError,
  } = useFetchAllMenuQuery();

  //kullanıcıları al
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
    refetch: usersRefetch,
  } = useFetchUsersQuery();

  //orders refetch için:
  const { refetch: ordersRefetch } = useFetchOrdersQuery();

  //-----------customer id yi isme çeviren fonksiyon
  function nameConverter(id) {
    if (usersData) {
      const result = usersData.data.find((element) => element.id === id);

      if (result) {
        const { name } = result;
        return name;
      }
    }

    return `not converted${id}`;
  }

  //--------yeni müşteri post ediliyor
  const [
    postUser,
    {
      data: postUserData,
      isLoading: postingUser,
      isSuccess: postingUserSuccesful,
      isError: postingUserError,
    },
  ] = usePostUserMutation();

  //--------adisyon post etmek için
  const [postReceipt] = usePostReceiptMutation();

  //-------adisyon update etmek için
  const [updateReceipt] = useUpdateReceiptMutation();

  //--------Tables Fetch ediliyor
  const listTables = () => {
    let tables = [];
    tablesData.data.map((item) => {
      tables.push({ name: item.tableName, id: item.id });
    });
    return tables;
  };

  const currentTables = tablesData ? listTables() : [];

  //------------Order post edilmesi
  const [
    postOrder,
    {
      isLoading: postingOrder,
      isSuccess: postingOrderSuccesful,
      isError: postingOrderError,
    },
  ] = usePostOrderMutation();

  //-------adisyonlar fetch edildikten sonra listeleniyor
  const listReceipts = () => {
    let receipts = [];
    receiptsData.data.map((item) => {
      receipts.push({
        customerId: item.customerId,
        id: item.id,
        tableId: item.tableId,
        amount: item.amount,
        orderedItems: item.orderedItems,
        orderIds: item.orderIds,
        combinedReceipts: item.combinedReceipts,
      });
    });
    return receipts;
  };

  const currentReceipts = receiptsData ? listReceipts() : [];

  const filteredReceipts = currentReceipts.filter(
    (item) => item.tableId === table
  );

  //--------Item Categories fetch ediliyor
  const listItemCategories = () => {
    let categories = [];
    itemCategoriesData.data.map((item) => {
      categories.push({ name: item.name, id: item.id });
    });
    return categories;
  };

  const currentItemCategories = itemCategoriesData ? listItemCategories() : [];

  //--------item lar fetch ediliyor
  const listItems = () => {
    let allItems = [];
    itemsData.data.map((item) => {
      allItems.push({
        name: item.name,
        id: item.id,
        categoryId: item.menuItemCategoryId,
        price: item.price,
      });
    });
    return allItems;
  };

  const currentItems = itemsData ? listItems() : [];

  const filteredItems = currentItems.filter(
    (item) => item.categoryId === chosenItemCategory
  );

  //---------Menu Categories Fetch Ediliyor
  const listMenuCategories = () => {
    let categories = [];
    menuCategoriesData.data.map((item) => {
      categories.push({ name: item.name, id: item.id });
    });
    return categories;
  };

  const currentMenuCategories = menuCategoriesData ? listMenuCategories() : [];

  //---------menüler fetch ediliyor
  const listAllMenu = () => {
    let allMenu = [];
    menuData.data.map((item) => {
      allMenu.push({
        name: item.name,
        id: item.id,
        categoryId: item.menuCategoryId,
        price: item.price,
      });
    });
    return allMenu;
  };

  const currentMenu = menuData ? listAllMenu() : [];

  const filteredMenu = currentMenu.filter(
    (item) => item.categoryId === chosenMenuCategory
  );

  //--------------müşteriler fetch ediliyor
  const customers = () => {
    let allCustomers = [];
    usersData.data.map((item) => {
      allCustomers.push({
        name: item.name,
        surname: item.surname,
        id: item.id,
      });
    });
    return allCustomers;
  };

  const currentCustomers = usersData ? customers() : [];

  //------------------Yeni müşteri ekleme butonu tıklandığında
  const addNewCustomerHandler = () => {
    //check table is selected
    if (table === "") {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Masa Seçiniz!",
      });
    } else {
      //if ok,open  modal
      setCustomerDefineModal(true);
    }
  };
  //------------------Yeni müşteri ekleme oonaylandığında
  async function approveNewCustomer() {
    if (customerName === "") {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Müşteri Adını Giriniz!",
      });
      return;
    }

    await fetch("http://194.62.40.78/api/admin/User/Create", {
      method: "POST",
      body: JSON.stringify({
        name: customerName,
        surname: "string",
        phoneNumber: "string",
        email: "string",
        password: "string",
        confirmPassword: "string",
        role: 1,
        profileImageUrl: "string",
        campaignRate: 0,
        accountCredit: 0,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Müşteri Yüklenemedi");
        }
      })
      .then((data) => {
        setRegisteredCustomer({ name: data.data.name, id: data.data.id });
        setSelectedCustomer(data.data.id);
      });

    usersRefetch();
    setCustomerName("");
    setCustomerDefineModal(false);
  }

  //--------order context update fonksiyonu
  const updateOrder = (item) => {
    setOrderContext([...orderContext, item]);
  };

  //-----------order contex i tekrarlı ürünlerden arındırıp listeleme şekline getirmek için:
  const transformedContext = () => {
    let transformedArray = [];

    orderContext.forEach((item) => {
      const existingItem = transformedArray.find(
        (transformedItem) => transformedItem.name === item.name
      );

      if (existingItem) {
        existingItem.count++;
      } else {
        transformedArray.push({
          name: item.name,
          id: item.id,
          count: 1,
          price: item.price,
        });
      }
    });

    return transformedArray;
  };

  const finalContext = transformedContext();

  //------------listelenen ürün sayısını azaltmak için :
  function decreaseOrderItem(id) {
    const beforeDecrease = [...orderContext];
    const ind = beforeDecrease.findIndex((el) => el.id === id);
    beforeDecrease.splice(ind, 1);
    setOrderContext(beforeDecrease);
  }

  //toplam tutarı hesaplamak için:
  function grandTotal() {
    let total = 0;
    orderContext.forEach((item) => (total = total + item.price));
    return total;
  }

  //--------sipariş onaylandığında
  async function approveOrder() {
    if (selectedCustomer === "") {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Müşteri Seçiniz!",
      });
      return;
    }
    if (orderContext.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Yiyecek/Menü Seçiniz!",
      });
      return;
    }

    let orderedItems = [];
    orderContext.forEach((element) =>
      orderedItems.push({ id: element.id, name: element.name })
    );

    let newOrderResponse;

    await fetch("http://194.62.40.78/api/admin/Order/Create", {
      method: "POST",
      body: JSON.stringify({
        customerId: selectedCustomer,
        tableId: table,
        waiterName: "string",
        amount: grandTotal(),
        orderedItems: orderedItems,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Sipariş Yüklenemedi");
        }
      })
      .then((data) => {
        newOrderResponse = data.data;
        setRegisteredCustomer("");
        setSelectedCustomer("");
        setOrderContext([]);
        Swal.fire("Harika!", "Ürün Başarıyla Yüklendi!", "success");

        ordersRefetch();
        //siparişin sahibi aynı ziyarette daha önce sipariş vermiş ise yeni sipariş var olan adisyona eklenir
        //ilk sipariş ise yeni bir adisyon oluşturulması gerekir. Bu fonksiyonda bu işlemleri yapacağız
      });

    //mevcut adisyonlarda aynı müşteriye ait bir sonuç var mı diye bakıyoruz
    const availableReceipt = currentReceipts.find(
      (receipt) => receipt.customerId === newOrderResponse.customerId
    );

    //aynı ziyarete ait daha önce oluşturulmuş bir adisyon varsa ona siparişi ekleyelim
    if (availableReceipt) {
      const previousOrders = availableReceipt.orderedItems;
      console.log("var");
      console.log(newOrderResponse);
      updateReceipt({
        id: availableReceipt.id,
        customerId: availableReceipt.customerId,
        //masa değişirse adisyon yeni masaya taşınsın diye böyle tanımlandı
        tableId: newOrderResponse.tableId,
        waiterName: "string",
        amount: availableReceipt.amount + newOrderResponse.amount,
        orderedItems: previousOrders.concat([...newOrderResponse.orderedItems]),
        orderIds: availableReceipt.orderIds.concat([newOrderResponse.id]),
        combinedReceipts: availableReceipt.combinedReceipts,
      });
    } else {
      console.log("yok");
      console.log(newOrderResponse);
      postReceipt({
        customerId: newOrderResponse.customerId,
        tableId: newOrderResponse.tableId,
        waiterName: "string",
        amount: newOrderResponse.amount,
        orderedItems: [...newOrderResponse.orderedItems],
        orderIds: [newOrderResponse.id],
        //combined receipts alanını boş bırakamadığımız için 0 değeriyle doldurduk
        combinedReceipts: [
          {
            receiptId: "00000000-0000-0000-0000-000000000000",
            sharedAmount: 0,
          },
        ],
      });
    }
  }

  const cancelOrder = () => {
    setTable("");
    setOrderContext([]);
    setSelectedCustomer("");
    setRegisteredCustomer("");
    setChosenItemCategory("");
    setChosenMenuCategory("");
    navigate("/orderTracking");
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="input">
        <div className="new_order_target">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Masa Seçiniz</Form.Label>
            <Form.Select
              value={table}
              onChange={(e) => setTable(e.target.value)}
            >
              <option>Masa Seçiniz!</option>
              {currentTables.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <div className="new_order_currentCustomers">
            <p style={{ "text-decoration": "underline" }}>
              Masadaki Mevcut Müşteriler
            </p>
            <div>
              <div>
                {filteredReceipts.map((item) => (
                  <div
                    className={
                      selectedCustomer === item.customerId
                        ? "selectedCustomer"
                        : null
                    }
                    onClick={() => setSelectedCustomer(item.customerId)}
                  >
                    {nameConverter(item.customerId)}
                  </div>
                ))}
              </div>
              <div
                className={
                  selectedCustomer === registeredCustomer.id
                    ? "selectedCustomer"
                    : null
                }
                onClick={() => setSelectedCustomer(registeredCustomer.id)}
              >
                {registeredCustomer.name}
              </div>
            </div>
            <BootstrapButton onClick={() => addNewCustomerHandler()}>
              Yeni Müşteri Oluştur
            </BootstrapButton>
          </div>
        </div>
        <div className="new_order_options">
          <div className="options_itemCategories">
            <p>Yiyecek/İçecek Kategorileri</p>
            {currentItemCategories.map((item) => {
              return (
                <MuiButton onClick={() => setChosenItemCategory(item.id)}>
                  {item.name}
                </MuiButton>
              );
            })}
          </div>
          <div className="options_items">
            <p>Yiyecek-İçecek</p>
            {filteredItems.map((item) => {
              return (
                <MuiButton
                  onClick={() => {
                    updateOrder(item);
                  }}
                >
                  {item.name}
                </MuiButton>
              );
            })}
          </div>
          <div className="options_menuCategories">
            <p>Menu Kategorileri</p>
            {currentMenuCategories.map((item) => {
              return (
                <MuiButton onClick={() => setChosenMenuCategory(item.id)}>
                  {item.name}
                </MuiButton>
              );
            })}
          </div>
          <div className="options_menu">
            <p>Menüler</p>{" "}
            {filteredMenu.map((item) => {
              return (
                <MuiButton
                  onClick={() => {
                    updateOrder(item);
                  }}
                >
                  {item.name}
                </MuiButton>
              );
            })}
          </div>
        </div>
      </div>

      <div className="orderContext">
        <p>Sipariş İçeriği</p>
        {finalContext.map((item) => {
          return (
            <div className="orderContext_element">
              <div>{item.name}</div>
              <div className="orderContext_element_icons">
                <RemoveIcon onClick={() => decreaseOrderItem(item.id)} />
                <div>{item.count}</div>
                <AddIcon
                  onClick={() => setOrderContext([...orderContext, item])}
                />
              </div>
            </div>
          );
        })}
        <p>Toplam Tutar:{grandTotal()}</p>
        <BootstrapButton
          onClick={() => {
            approveOrder();
          }}
        >
          Onayla
        </BootstrapButton>
        <BootstrapButton
          variant="danger"
          onClick={() => {
            cancelOrder();
          }}
        >
          İptal Et
        </BootstrapButton>
      </div>
      <Modal
        show={customerDefineModal}
        onHide={() => setCustomerDefineModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Masaya Müşteri Tanımla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Müşteri Adı</Form.Label>
            <Form.Control
              type="Text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Form.Group>
          <BootstrapButton onClick={() => approveNewCustomer()}>
            Onayla
          </BootstrapButton>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddNewOrder;

//--------yapılacaklar
//new guid ile yeni eklenecek müşteriye id atanacak
