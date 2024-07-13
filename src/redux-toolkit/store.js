import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./features/category/category.Slice";
import productSlice from "./features/product/productSlice";

export const store = configureStore({
    reducer: {
        category: dataSlice,
        product: productSlice,
    },
})