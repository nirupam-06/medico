// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import VerifyUid from './pages/VerifyUIDPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/DashboardPage';
import Patients from './pages/AddPatientsPage';
import Prescriptions from './pages/PrescriptionsPage';
import Reports from './pages/ReportsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

import DashboardUser from './pages/DashboardUser';
import ValidateLogin from './components/ValidateLogin';
import UserRoleSelection from './pages/UserRoleSelection';
import ReportsUser from './pages/ReportsUser';
import PrescriptionsUser from './pages/PrescriptionsUser';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/verify-uid" element={<VerifyUid />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard/:uid" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/prescriptions" element={<ProtectedRoute> <Prescriptions /> </ProtectedRoute> } />
          <Route path="/reports" element={<ProtectedRoute> <Reports /> </ProtectedRoute>} />


          <Route path="/" element={<UserRoleSelection />} />

          <Route path="/user-dashboard/:uid" element={<ValidateLogin element={<DashboardUser />} />} />
          <Route path="/user-reports/:uid" element={<ValidateLogin element={<ReportsUser />} />} />
          <Route path="/user-prescriptions/:uid" element={<ValidateLogin element={<PrescriptionsUser />} />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
