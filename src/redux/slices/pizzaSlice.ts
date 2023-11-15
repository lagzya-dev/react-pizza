import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Sort } from './filterSlice';

export const fetchPizzas = createAsyncThunk<
  PizzaItem[],
  {
    currentPage: number;
    categoryId: number;
    sort: Sort;
  }
>('pizza/fetchPizzas', async (params, thunkAPI) => {
  const { currentPage, categoryId, sort } = params;
  console.log(params);
  const { data } = await axios.get<PizzaItem[]>(
    `https://6551fa295c69a77903295da1.mockapi.io/api/pizzas?page=${currentPage}&limit=4&${
      categoryId === 0
        ? `sortBy=${sort.sortProperty}&order=desc`
        : `category=${categoryId}&sortBy=${sort.sortProperty}&order=desc`
    }`,
  );
  if (data.length === 0) {
    return thunkAPI.rejectWithValue(`Нет товаров для запроса`);
  }
  return thunkAPI.fulfillWithValue(data);
});
export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  sizes: Array<number>;
  category: number;
  imageUrl: string;
  types: Array<number>;
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<PizzaItem[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      },
    );

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
