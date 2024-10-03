// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, getAllProduct, updateProduct } from "./thunk/product";

// Tạo một slice cho việc quản lý state auth
const productSlice = createSlice({
  name: "authAdmin",
  initialState: {
    err: null,
    products: [],
    status: "idle",
    errDelete: null,
    statusDelete: "idle",
    errUpdate: null,
    statusUpdate: "idle",
  },
  reducers: {
    resetState: (state) => {
      state.err = null;
      state.status = null;
      state.errDelete = null;
      state.statusDelete = "idle";
      state.errUpdate = null;
      state.statusUpdate = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.status = "loading";
        state.err = null;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.status = "successful";
        state.products = action.payload;
        state.err = null;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.status = "failed";
        state.err = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.statusDelete = "loading";
        state.errDelete = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.statusDelete = "successful";
        state.errDelete = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.statusDelete = "failed";
        state.errDelete = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.statusUpdate = "loading";
        state.errUpdate = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.statusUpdate = "successful";
        state.errUpdate = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.statusUpdate = "failed";
        state.errUpdate = action.payload;
      });
  },
});

// Xuất reducer để kết hợp vào store
export const { resetState } = productSlice.actions;
export default productSlice.reducer;
