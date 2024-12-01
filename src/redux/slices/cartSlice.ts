import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type CartItem = {
  title: string;
  price: number;
  imgUrl: string;
  id: number;
  type: number;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  pizzasCount: number;
  length: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  pizzasCount: 0,
  length: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.totalPrice += action.payload.price;
      state.pizzasCount += 1;
      const findItem = state.items.find(
        (item) =>
          item.title === action.payload.title &&
          item.size === action.payload.size &&
          item.type === action.payload.type,
      );
      findItem ? findItem.count++ : state.items.push(action.payload);
    },

    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (item) =>
          item.title === action.payload.title &&
          item.size === action.payload.size &&
          item.type === action.payload.type,
      );
      findItem && findItem.count--;
      state.totalPrice -= action.payload.price;
      state.pizzasCount -= 1;
    },

    clearCart(state) {
      state.items = [];
      state.pizzasCount = 0;
      state.totalPrice = 0;
      state.length = 0;
    },

    removeItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (item) =>
          item.title === action.payload.title &&
          item.size === action.payload.size &&
          item.type === action.payload.type,
      );
      state.items = state.items.filter((item) => {
        return item !== findItem;
      });
      state.totalPrice -= action.payload.count * action.payload.price;
      state.pizzasCount -= action.payload.count;
    },
  },
});

export const selectCart = (state: RootState) => state.persistedReducerCart;

// Action creators are generated for each case reducer function
export const { addItem, minusItem, clearCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
