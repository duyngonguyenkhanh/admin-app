import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllRoom = createAsyncThunk(
    "chat/getAllRoom",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:5000/chat/getrooms`, {
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