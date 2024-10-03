// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { LoginAdmin, logoutAdmin, SignupAdmin } from "./thunk/auth";
import { decodeToken } from "../utils/decodeToken";


// Tạo một slice cho việc quản lý state auth
const authAdminSlice = createSlice({
  name: "authAdmin",
  initialState: {
    adminUser: localStorage.getItem('adminUser') ? JSON.parse(localStorage.getItem('adminUser')) : null, // Trạng thái ban đầu là chưa có người dùng nào đăng nhập
    err: null,
    res: null,
    status: "idle",
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    // Hàm xử lý hành động đăng nhập
    onLogin: (state, action) => {
      state.adminUser = action.payload; // Cập nhật trạng thái người dùng hiện tại
    },
    // Hàm xử lý hành động đăng xuất
    onLogout: (state) => {
      state.token = null;
      state.adminUser = null;
      localStorage.removeItem('token');
      localStorage.removeItem('adminUser');
    },
    resetState: (state) => {
      state.err = null;
      state.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignupAdmin.pending, (state) => {
        state.status = "loading";
        state.err = null;
      })
      .addCase(SignupAdmin.fulfilled, (state, action) => {
        state.status = "successful";
        state.res = action.payload;
        state.err = null;
      })
      .addCase(SignupAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.err = action.payload;
      })
      .addCase(LoginAdmin.pending, (state) => {
        state.status = "loading";
        state.err = null;
      })
      .addCase(LoginAdmin.fulfilled, (state, action) => {
        state.status = "successful";
        state.res = action.payload;
        state.err = null
        // Lưu token vào localStorage
        const token = action.payload.token;
        localStorage.setItem("token", token);
        state.adminUser = decodeToken(token); console.log(decodeToken(token));
        
        localStorage.setItem('adminUser', JSON.stringify(decodeToken(token))); // Lưu thông tin người dùng vào localStorage
      })
      .addCase(LoginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.err = action.payload;
        state.res = null;
      })
      .addCase(logoutAdmin.pending, (state) => {
        state.status = "loading";
        state.err = null;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.status = "successful";
        state.err = null
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.err = action.payload;
      })
  },
});
// Xuất các hành động để sử dụng trong các component
export const { onLogin, onLogout, resetState } = authAdminSlice.actions;

// Xuất reducer để kết hợp vào store
export default authAdminSlice.reducer;
