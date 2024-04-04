import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Mảng chứa các mặt hàng trong giỏ hàng
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.productCode === newItem.productCode); // Thay đổi điều kiện kiểm tra thành productCode
      if (existingItemIndex !== -1) {
        // If item already exists, update quantity
        state.items[existingItemIndex].quantity += 1;
      } else {
        // If item does not exist, add it to the cart with quantity = 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.productCode !== action.payload.productCode); // Thay đổi điều kiện kiểm tra thành productCode
    },
    clearCart: (state) => {
      state.items = []; // Xóa toàn bộ các mặt hàng trong giỏ hàng
    },
    
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
