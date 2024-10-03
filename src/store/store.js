// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authAdminSlice';
import productReducer from '../redux/productSlice';
import orderReducer from '../redux/orderSlice';


// Cấu hình store với reducer từ cartSlice
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
  },
});

export default store;