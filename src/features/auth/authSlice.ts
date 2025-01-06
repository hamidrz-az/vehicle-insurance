import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserRegistrationData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
};

type AuthState = {
  userData: UserRegistrationData | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  userData: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserRegistrationData>) {
      state.userData = action.payload;
    },
    clearUserData(state) {
      state.userData = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setUserData,
  clearUserData,
  setLoading,
  setError,
  clearError,
} = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) => Boolean(state.auth.userData);

export default authSlice.reducer;
