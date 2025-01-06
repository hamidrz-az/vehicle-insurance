import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
// import insuranceSlice from '../features/insurance/insuranceSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // insurance: insuranceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
