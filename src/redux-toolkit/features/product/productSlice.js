import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProductData = createAsyncThunk('fetchData', async () => {
    const res = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/products');
    return res.data;  
});


const initialState = {
    value: [],
    isLoading: false,
    isError: false,
};


const productSlice = createSlice({
    name: 'data',  
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductData.pending, (state) => {
                state.isLoading = true;
                state.isError = false; 
            })
            .addCase(fetchProductData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.value = action.payload;  
            })
            .addCase(fetchProductData.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default productSlice.reducer;
