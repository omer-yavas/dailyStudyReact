import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import SharedLayout from './pages/SharedLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import BillManagementPage from './pages/BillManagementPage';
import ValetServicepage from './pages/ValetServicePage';
import PaymentTrackingPage from './pages/PaymentTrackingPage';
import MenuManagementPage from './pages/MenuManagementPage';
import SystemAdministrationPage from './pages/SystemAdministrationPage';
import ReportsPage from './pages/ReportsPage';
import DefineSectionTable from './components/DefineSectionTable';
import DefinePersonel from './components/DefinePersonel';
import SeeItems from './components/menu/SeeItems';
import EditItems from './components/menu/EditItems';
import EditMenu from './components/menu/EditMenu';
import ItemCategories from './components/menu/ItemCategories';
import MenuCategories from './components/menu/MenuCategories';
import TestMenu from './components/menu/TestMenu';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/*Aşağıda Sharedelayout componentinde Outlet kullandığım için diğer tüm route ları tek bir route içine topladım */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="homepage" element={<HomePage />} />
            <Route path="order" element={<OrderTrackingPage />} />
            <Route path="bill" element={<BillManagementPage />} />
            <Route path="valet" element={<ValetServicepage />} />
            <Route path="payment" element={<PaymentTrackingPage />} />
            <Route path="menu" element={<MenuManagementPage />} />
            <Route path="system" element={<SystemAdministrationPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="defineSectionTable" element={<DefineSectionTable />} />
            <Route path="definePersonel" element={<DefinePersonel />} />
            <Route path="seeItems" element={<SeeItems />} />
            <Route path="editItems" element={<EditItems />} />
            <Route path="editMenu" element={<EditMenu />} />
            <Route path="editItemCategories" element={<ItemCategories />} />
            <Route path="editMenuCategories" element={<MenuCategories />} />
            <Route path="test" element={<TestMenu />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
