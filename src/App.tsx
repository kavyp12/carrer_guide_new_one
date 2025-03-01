// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Questionnaire from './Pages/Questionnaire';
import AdminPanel from './Pages/AdminPanel';
import Dashboard from './Pages/Dashboard';
import { useAuth } from './context/AuthContext';
import AddMarks from './Pages/AddMarks';
import Landingpage from './lanidingpage/Landingpage';

// Protected Route wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Show loading state while verifying token
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Set Landingpage as the default route */}
          <Route path="/" element={<Landingpage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/questionnaire"
            element={
              <ProtectedRoute>
                <Questionnaire />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/add-marks"
            element={
              <ProtectedRoute>
                <AddMarks />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/landingpage"
            element={<Landingpage />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;