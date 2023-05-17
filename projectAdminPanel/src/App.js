import React, { Component, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SharedLayout from "./components/SharedLayout";
import OrderTracking from "./views/pages/OrderTracking";
import ReceiptManagement from "./views/pages/ReceiptManagement";
import Valet from "./views/pages/Valet";
import Menu from "./views/pages/menu/Menu";
import Items from "./views/pages/menu/Items";
import UserManagement from "./views/pages/UserManagement";
import Reports from "./views/pages/Reports";
import RestaurantLayout from "./views/pages/RestaurantLayout";
import Personel from "./views/pages/Personel";
import "./scss/style.scss";

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

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <SharedLayout />
                </ProtectedRoute>
              }
            >
              <Route path="orderTracking" element={<OrderTracking />} />
              <Route path="receipt" element={<ReceiptManagement />} />
              <Route path="valet" element={<Valet />} />
              <Route path="items" element={<Items />} />
              <Route path="menu" element={<Menu />} />
              <Route path="userManagement" element={<UserManagement />} />
              <Route path="reports" element={<Reports />} />
              <Route path="restaurantLayout" element={<RestaurantLayout />} />
              <Route path="personel" element={<Personel />} />
            </Route>
            <Route path="/login" name="Login Page" element={<Login />} />
            <Route path="*" name="Login Page" element={<Page404 />} />
          </Routes>
        </Suspense>
      </HashRouter>
    );
  }
}

export default App;
