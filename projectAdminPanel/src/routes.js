import React from "react";

const OrderTracking = React.lazy(() => import("./views/pages/OrderTracking"));
const Items = React.lazy(() => import("./views/pages/menu/Items"));
const Menu = React.lazy(() => import("./views/pages/menu/Menu"));
const Receipt = React.lazy(() => import("./views/pages/ReceiptManagement"));
const Valet = React.lazy(() => import("./views/pages/Valet"));
const UserManagement = React.lazy(() => import("./views/pages/UserManagement"));
const Reports = React.lazy(() => import("./views/pages/Reports"));
const Personel = React.lazy(() => import("./views/pages/Personel"));
const RestaurantLayout = React.lazy(() =>
  import("./views/pages/RestaurantLayout")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/orderTracking", name: "Sipariş Takip", element: OrderTracking },
  { path: "/items", name: "Ürünler", element: Items },
  { path: "/menu", name: "Menüler", element: Menu },
  { path: "/receipt", name: "Adisyon", element: Receipt },
  { path: "/valet", name: "Vale Servisi", element: Valet },
  {
    path: "/userManagement",
    name: "Kullanıcı Yetkilendirme",
    element: UserManagement,
  },
  { path: "/reports", name: "Raporlar", element: Reports },
  { path: "/personel", name: "Personel", element: Personel },
  {
    path: "/restaurantLayout",
    name: "Restoran Masa Düzeni",
    element: RestaurantLayout,
  },
];

export default routes;
