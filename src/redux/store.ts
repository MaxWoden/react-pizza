import { configureStore, Tuple } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';

const persistConfigPizza = {
  key: 'pizza',
  storage,
};
const persistConfigCart = {
  key: 'cart',
  storage,
};
const persistConfigFilter = {
  key: 'filter',
  storage,
};

const persistedReducerPizza = persistReducer(persistConfigPizza, pizza);
const persistedReducerCart = persistReducer(persistConfigCart, cart);
const persistedReducerFilter = persistReducer(persistConfigFilter, filter);

export const store = configureStore({
  reducer: { persistedReducerPizza, persistedReducerCart, persistedReducerFilter },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: () => new Tuple(thunk),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
