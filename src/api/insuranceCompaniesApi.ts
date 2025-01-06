import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export const insuranceCompaniesApi = createApi({
  reducerPath: 'insuranceCompaniesApi',
  baseQuery,
  endpoints: (builder) => ({
    getInsuranceCompanies: builder.query({
      query: () => '/third/companies',
    }),
  }),
});

export const { useGetInsuranceCompaniesQuery } = insuranceCompaniesApi;
