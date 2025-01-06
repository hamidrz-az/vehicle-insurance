import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
  baseQuery,
  endpoints: (builder) => ({
    getVehicleTypes: builder.query({
      query: () => '/vehicle/types',
    }),
  }),
});

export const { useGetVehicleTypesQuery } = vehicleApi;
