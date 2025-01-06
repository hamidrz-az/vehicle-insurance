// File: App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store'; // Redux store
// import HomePage from './pages/HomePage';
// import VehiclePage from './pages/VehiclePage';
// import InsuranceCompaniesPage from './pages/InsuranceCompaniesPage';
// import ThirdDiscountPage from './pages/ThirdDiscountPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import MainLayout from './components/Layout/MainLayout';
import RegistrationPage from './pages/RegistrationPage';
import InsuranceTypePage from './pages/InsuranceTypePage';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/register" element={<RegistrationPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <InsuranceTypePage />
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/vehicles"
              element={
                <PrivateRoute>
                  <VehiclePage />
                </PrivateRoute>
              }
            /> */}
            {/* <Route
              path="/insurance-companies"
              element={
                <PrivateRoute>
                  <InsuranceCompaniesPage />
                </PrivateRoute>
              }
            /> */}
            {/* <Route
              path="/third-discounts"
              element={
                <PrivateRoute>
                  <ThirdDiscountPage />
                </PrivateRoute>
              }
            /> */}
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
};

export default App;
