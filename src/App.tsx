import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import MainLayout from './components/Layout/MainLayout';
import RegistrationPage from './pages/RegistrationPage';
import InsuranceTypePage from './pages/InsuranceTypePage';
import VehiclePage from './pages/VehiclePage';
import InsuranceCompaniesPage from './pages/InsuranceCompaniesPage';
import DiscountPage from './pages/DiscountPage';


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
            <Route
              path="/vehicle"
              element={
                <PrivateRoute>
                  <VehiclePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/companies"
              element={
                <PrivateRoute>
                  <InsuranceCompaniesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/discounts"
              element={
                <PrivateRoute>
                  <DiscountPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
};

export default App;
