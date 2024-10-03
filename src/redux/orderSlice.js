// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllOrder } from "./thunk/order";
import { getAllRoom } from "./thunk/chat";


// Tạo một slice cho việc quản lý state auth
const productSlice = createSlice({
  name: "authAdmin",
  initialState: {
    err: null,
    order: [],
    status: "idle",
    errGetRoom: null,
    statusGetRoom: "idle",
    rooms: [],
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllOrder.pending, (state) => {
        state.status = "loading";
        state.err = null;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.status = "successful";
        state.order = action.payload;
        state.err = null;
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.status = "failed";
        state.err = action.payload;
      })
    .addCase(getAllRoom.pending, (state) => {
        state.statusGetRoom = "loading";
        state.errGetRoom = null;
      })
      .addCase(getAllRoom.fulfilled, (state, action) => {
        state.statusGetRoom = "successful";
        state.rooms = action.payload;
        state.errGetRoom = null;
      })
      .addCase(getAllRoom.rejected, (state, action) => {
        state.statusGetRoom = "failed";
        state.err = action.payload;
      })
      
  },
});

// Xuất reducer để kết hợp vào store
export default productSlice.reducer;
