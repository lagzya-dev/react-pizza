import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async (params, thunkAPI) => {
    const { currentPage, activeCategory, selectSort } = params;
    const { data } = await axios.get(
      `https://6551fa295c69a77903295da1.mockapi.io/api/pizzas?page=${currentPage}&limit=4&${
        activeCategory === 0
          ? `sortBy=${selectSort.sortProperty}&order=desc`
          : `category=${activeCategory}&sortBy=${selectSort.sortProperty}&order=desc`
      }`,
    );
    return data;
  },
);
const initialState = {
  items: [],
  status: 'pending', // pending, fulfilled, or rejected
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'pending';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'fulfilled';
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'rejected';
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
