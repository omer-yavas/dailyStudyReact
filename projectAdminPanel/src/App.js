import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SharedLayout from "./components/SharedLayout";
import HomePage from "./views/pages/HomePage";
import OrderTracking from "./views/pages/OrderTracking";
import ReceiptManagement from "./views/pages/ReceiptManagement";
import ReceiptPayment from "./views/pages/ReceiptPayment";
import Valet from "./views/pages/Valet";
import Menu from "./views/pages/menu/Menu";
import Items from "./views/pages/menu/Items";
import UserManagement from "./views/pages/UserManagement";
import Reports from "./views/pages/Reports";
import RestaurantLayout from "./views/pages/RestaurantLayout";
import Personel from "./views/pages/Personel";
import "./scss/style.scss";
import AddNewOrder from "./views/pages/AddNewOrder";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="homePage" element={<HomePage />} />
          <Route path="orderTracking" element={<OrderTracking />} />
          <Route path="receipt" element={<ReceiptManagement />} />
          <Route path="receiptPayment" element={<ReceiptPayment />} />
          <Route path="valet" element={<Valet />} />
          <Route path="items" element={<Items />} />
          <Route path="menu" element={<Menu />} />
          <Route path="userManagement" element={<UserManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="restaurantLayout" element={<RestaurantLayout />} />
          <Route path="personel" element={<Personel />} />
          <Route path="addNewOrder" element={<AddNewOrder />} />
        </Route>
        <Route path="/login" name="Login Page" element={<Login />} />
        <Route path="*" name="Login Page" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
