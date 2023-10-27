import { configureStore } from "@reduxjs/toolkit";

import ProductReducer from "./slices/productsSlice";
export const store = configureStore({
  reducer: {
    product: ProductReducer,
  },
});
