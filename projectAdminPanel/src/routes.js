import React from "react";
const HomePage = React.lazy(() => import("./views/pages/HomePage"));
const OrderTracking = React.lazy(() => import("./views/pages/OrderTracking"));
const Items = React.lazy(() => import("./views/pages/menu/Items"));
const Menu = React.lazy(() => import("./views/pages/menu/Menu"));
const Receipt = React.lazy(() => import("./views/pages/ReceiptManagement"));
const ReceiptPayment = React.lazy(() => import("./views/pages/ReceiptPayment"));
const Valet = React.lazy(() => import("./views/pages/Valet"));
const UserManagement = React.lazy(() => import("./views/pages/UserManagement"));
const Reports = React.lazy(() => import("./views/pages/Reports"));
const Personel = React.lazy(() => import("./views/pages/Personel"));
const AddNewOrder = React.lazy(() => import("./views/pages/AddNewOrder"));
const RestaurantLayout = React.lazy(() =>
  import("./views/pages/RestaurantLayout")
);

const routes = [
  { path: "/", exact: true, name: "Ana Sayfa" },
  { path: "/homePage", name: "Ana Sayfa", element: HomePage },
  { path: "/orderTracking", name: "Sipariş Takip", element: OrderTracking },
  { path: "/items", name: "Ürünler", element: Items },
  { path: "/menu", name: "Menüler", element: Menu },
  { path: "/receipt", name: "Adisyon", element: Receipt },
  { path: "/receiptPayment", name: "Adisyon Ödeme", element: ReceiptPayment },
  { path: "/valet", name: "Vale Servisi", element: Valet },
  {
    path: "/userManagement",
    name: "Kullanıcı Yetkilendirme",
    element: UserManagement,
  },
  { path: "/reports", name: "Raporlar", element: Reports },
  { path: "/personel", name: "Personel", element: Personel },
  { path: "/addNewOrder", name: "Yeni Sipariş Girişi", element: AddNewOrder },
  {
    path: "/restaurantLayout",
    name: "Restoran Masa Düzeni",
    element: RestaurantLayout,
  },
];

export default routes;
