import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchData = createAsyncThunk('fetchData', async () => {
    const res = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/categories');
    return res.data;  
});


const initialState = {
    value: [],
    isLoading: false,
    isError: false,
};


const dataSlice = createSlice({
    name: 'data',  
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.isLoading = true;
                state.isError = false; 
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.value = action.payload;  
            })
            .addCase(fetchData.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default dataSlice.reducer;
