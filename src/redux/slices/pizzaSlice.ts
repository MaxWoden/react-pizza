import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { PizzaType } from '../../@types';

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface pizzaSliceState {
  status: Status;
  items: PizzaType[];
}

const initialState: pizzaSliceState = {
  status: Status.LOADING,
  items: [],
};

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (query: string) => {
  const { data } = await axios.get('https://react-pizza-db.onrender.com/items');
  console.log(data);

  return data as PizzaType[];
});

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaType[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaType[]>) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, error) => {
        state.status = Status.ERROR;
        state.items = [];
        alert('Произошла ошибка при отправке запроса');
        console.log('Произошла ошибка при отправке запроса', error);
      });
  },
});

export const selectPizza = (state: RootState) => state.persistedReducerPizza;

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
