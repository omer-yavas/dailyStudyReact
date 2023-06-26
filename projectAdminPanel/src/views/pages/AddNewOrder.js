import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button as BootstrapButton } from "react-bootstrap";
import { Button as MuiButton } from "@mui/material";
import { useFetchItemCategoriesQuery } from "src/features/ItemApi";
import { useFetchMenuCategoriesQuery } from "src/features/MenuApi";
import { useFetchItemsQuery } from "src/features/ItemApi";
import { useFetchAllMenuQuery } from "src/features/MenuApi";
import { useFetchTablesQuery } from "src/features/RestaurantLayoutApi";
import { useFetchReceiptsQuery } from "src/features/ReceiptApi";

const AddNewOrder = () => {
  const [table, setTable] = useState();
  const [chosenItemCategory, setChosenItemCategory] = useState("");
  const [chosenMenuCategory, setChosenMenuCategory] = useState("");

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

  //--------Tables Fetch ediliyor
  const listTables = () => {
    let tables = [];
    tablesData.data.map((item) => {
      tables.push({ name: item.tableName, id: item.id });
    });
    return tables;
  };

  const currentTables = tablesData ? listTables() : [];

  //-------adisyonlar fetch edildikten sonra listeleniyor
  const listReceipts = () => {
    let receipts = [];
    receiptsData.data.map((item) => {
      receipts.push({
        customerId: item.customerId,
        id: item.id,
        tableId: item.tableId,
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
      });
    });
    return allMenu;
  };

  const currentMenu = menuData ? listAllMenu() : [];

  const filteredMenu = currentMenu.filter(
    (item) => item.categoryId === chosenMenuCategory
  );

  //------------------

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
            Masadaki Mevcut Müşteriler
          </div>
          <BootstrapButton>Yeni Müşteri Oluştur Butonu</BootstrapButton>
          <div>Yeni müşteri Giriş ekranı</div>
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
            <p>Yitecek-İçecek</p>
            {filteredItems.map((item) => {
              return <MuiButton onClick={() => {}}>{item.name}</MuiButton>;
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
              return <MuiButton onClick={() => {}}>{item.name}</MuiButton>;
            })}
          </div>
        </div>
      </div>

      <div>Seçim Tablosu</div>
    </div>
  );
};

export default AddNewOrder;

//--------yapılacaklar
//new guid ile yeni eklenecek müşteriye id atanacak
