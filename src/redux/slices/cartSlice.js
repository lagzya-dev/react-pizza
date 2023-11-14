import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce(
        (acc, cr) => acc + cr.price * cr.count,
        0,
      );
    },
    minusItem: (state, action) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (findItem) {
        findItem.count -= 1;
      }
      if (findItem.count === 0) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      }
      state.totalPrice = state.items.reduce(
        (acc, cr) => acc + cr.price * cr.count,
        0,
      );
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalPrice = state.items.reduce(
        (acc, cr) => acc + cr.price * cr.count,
        0,
      );
    },
    clearCart: (state, action) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const { addItem, clearCart, removeItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
