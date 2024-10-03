import { createAsyncThunk } from "@reduxjs/toolkit";

 const apiUrl = import.meta.env.VITE_API_URL;
//const apiUrl = "http://localhost:5000";

export const getAllProduct = createAsyncThunk(
    "auth/getAllProduct",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${apiUrl}/product/allproduct`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Đảm bảo cookie được gửi kèm yêu cầu
          body: JSON.stringify(_),
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

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id, { rejectWithValue }) => {
      try {
        const response = await fetch(`${apiUrl}/admin/products/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Đảm bảo cookie được gửi kèm yêu cầu
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

  export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ id, payload }, { rejectWithValue }) => { // Sử dụng destructuring để lấy id và payload
      console.log(payload);
  
      try {
        const response = await fetch(`${apiUrl}/admin/updateproduct/${id}`, {
          method: "POST", // Thay đổi thành PUT để cập nhật sản phẩm
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
  