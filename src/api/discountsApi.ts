import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export const thirdDiscountApi = createApi({
  reducerPath: 'thirdDiscountApi',
  baseQuery,
  endpoints: (builder) => ({
    getThirdDiscounts: builder.query({
      query: () => '/third/third-discounts',
    }),
  }),
});

export const { useGetThirdDiscountsQuery } = thirdDiscountApi;
