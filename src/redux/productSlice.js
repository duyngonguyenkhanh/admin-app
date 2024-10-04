// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, getAllProduct, updateProduct } from "./thunk/product";

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
    errAddProduct: null,
    statusAddProduct: "idle",
  },
  reducers: {
    resetState: (state) => {
      state.err = null;
      state.status = null;
      state.errDelete = null;
      state.statusDelete = "idle";
      state.errUpdate = null;
      state.statusUpdate = "idle";
      state.errAddProduct = null;
      state.statusAddProduct = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
    //Action nhận tất cả product
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
      //Action xóa 1 product
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
      //Action cập nhật product
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
      })
      //Action cập nhật product
      .addCase(addProduct.pending, (state) => {
        state.statusAddProduct = "loading";
        state.errAddProduct = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.statusAddProduct = "successful";
        state.errAddProduct = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.statusAddProduct = "failed";
        state.errAddProduct = action.payload;
      })
  },
});

// Xuất reducer để kết hợp vào store
export const { resetState } = productSlice.actions;
export default productSlice.reducer;
