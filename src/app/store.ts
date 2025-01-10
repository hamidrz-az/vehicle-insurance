import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import insuranceReducer from "../features/insurance/InsuranceSlice";
import { vehicleApi } from "../api/vehicleApi";
import { insuranceCompaniesApi } from "../api/insuranceCompaniesApi";
import { thirdDiscountApi } from "../api/discountsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    insurance: insuranceReducer,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
    [insuranceCompaniesApi.reducerPath]: insuranceCompaniesApi.reducer,
    [thirdDiscountApi.reducerPath]: thirdDiscountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      vehicleApi.middleware,
      insuranceCompaniesApi.middleware,
      thirdDiscountApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
