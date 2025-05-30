import { HashRouter as BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useAppStore } from "./stores/UseAppStore";
import Menu from "./components/Menu/Menu";
import Maintenance from "./Pages/Maintenance/Maintenance";
import FinancialMovements from "./Pages/FinancialMovements/FinancialMovements";
import Report from "./Pages/Report/Report";


// Layout que incluye el menú y el contenido dinámico
const DashboardLayout = () => (
  <>
    <Menu />
    <div className="p-4">
      <Outlet />
    </div>
  </>
);

export default function AppRouter() {
  const { isAuthenticated } = useAppStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} index />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="mantenimientos" element={<Maintenance />} />
          <Route path="transactions" element={<FinancialMovements />} />
          <Route path="reportes" element={<Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}