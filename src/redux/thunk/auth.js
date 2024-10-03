import { createAsyncThunk } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_API_URL;

export const SignupAdmin = createAsyncThunk(
  "auth/signupAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/admin/signupadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Đảm bảo cookie được gửi kèm yêu cầu
        body: JSON.stringify(payload),
      });

      // Kiểm tra nếu response không thành công
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Bắt lỗi bất ngờ (network errors, etc.)
      return rejectWithValue(error.message);
    }
  }
);

export const LoginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/admin/loginadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Đảm bảo cookie được gửi kèm yêu cầu
        body: JSON.stringify(payload),
      });

      // Kiểm tra nếu response không thành công
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Bắt lỗi bất ngờ (network errors, etc.)
      return rejectWithValue(error.message);
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  "auth/logoutAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/logoutadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Đảm bảo cookie được gửi kèm yêu cầu
        body: JSON.stringify(payload),
      });

      // Kiểm tra nếu response không thành công
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Bắt lỗi bất ngờ (network errors, etc.)
      return rejectWithValue(error.message);
    }
  }
);