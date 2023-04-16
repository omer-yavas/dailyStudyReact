import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './pages/ProtectedRoute';
import SharedLayout from './pages/SharedLayout';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import BillManagementPage from './pages/BillManegementPage';
import ValetServicepage from './pages/ValetServicePage';
import PaymentTrackingPage from './pages/PaymentTrackingPage';
import MenuManagementPage from './pages/MenuManagementPage';
import SystemAdministrationPage from './pages/SystemAdministrationPage';
import ReportsPage from './pages/ReportsPage';
import DefinementPage from './pages/DefinementPage';

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
            <Route path="definement" element={<DefinementPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
