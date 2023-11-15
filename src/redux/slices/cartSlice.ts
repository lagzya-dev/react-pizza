import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type ItemCart = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: ItemCart[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemCart>) => {
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
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count -= 1;
        if (findItem.count === 0) {
          findItem.count = 1;
        }
      }
      state.totalPrice = state.items.reduce(
        (acc, cr) => acc + cr.price * cr.count,
        0,
      );
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
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

export const selectCart = (state: RootState) => state.cart;
export const selectByIdCart = (state: RootState, id: string) =>
  state.cart.items.find((item) => item.id === id);
export const { addItem, clearCart, removeItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
