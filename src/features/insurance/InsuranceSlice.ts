import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SelectData } from '../../types/dropdownOptions';
import { InsuranceType } from '../../types/insuranceType';

type EntityModel = SelectData | null;

type InsuranceState = {
  insuranceType: InsuranceType;
  vehicleType: EntityModel;
  vehicleModel: EntityModel;
  insuranceCompany: EntityModel;
  thirdPersonDiscount: EntityModel;
  driverDiscount: EntityModel;
};

const initialState: InsuranceState = {
  insuranceType: null,
  vehicleType: null,
  vehicleModel: null,
  insuranceCompany: null,
  thirdPersonDiscount: null,
  driverDiscount: null,
};

const insuranceSlice = createSlice({
  name: 'insurance',
  initialState,
  reducers: {
    setInsuranceType: (state, action: PayloadAction<InsuranceType>) => {
      state.insuranceType = action.payload;
    },

    setVehicleData: (
      state,
      action: PayloadAction<{
        vehicleType: EntityModel;
        vehicleModel: EntityModel;
      }>
    ) => {
      state.vehicleType = action.payload.vehicleType;
      state.vehicleModel = action.payload.vehicleModel;
    },

    setInsuranceCompany: (state, action: PayloadAction<EntityModel>) => {
      state.insuranceCompany = action.payload;
    },

    setDiscounts: (
      state,
      action: PayloadAction<{
        thirdPersonDiscount: EntityModel;
        driverDiscount: EntityModel;
      }>
    ) => {
      state.thirdPersonDiscount = action.payload.thirdPersonDiscount;
      state.driverDiscount = action.payload.driverDiscount;
    },
  },
});

export const {
  setInsuranceType,
  setVehicleData,
  setInsuranceCompany,
  setDiscounts,
} = insuranceSlice.actions;

export const selectInsurance = (state: RootState) => state.insurance;

export default insuranceSlice.reducer;
