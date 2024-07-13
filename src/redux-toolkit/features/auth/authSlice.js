import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: false,
}

const authSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(())
    }
})