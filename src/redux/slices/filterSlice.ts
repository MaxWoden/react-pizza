import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type filterType = {
  activeCategory: number;
  activeSortType: 'rating' | '-price' | 'price';
};

interface filterSliceState {
  search: string;
  activeCategory: number;
  activeSortType: 'rating' | '-price' | 'price';
}

const initialState: filterSliceState = {
  search: '',
  activeCategory: 0,
  activeSortType: 'rating',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setSortType(state, action: PayloadAction<'rating' | '-price' | 'price'>) {
      state.activeSortType = action.payload;
    },
    setFilters(state, action) {
      state.activeCategory = Number(action.payload.activeCategory);
      state.activeSortType = action.payload.activeSortType;
    },
  },
});

export const selectFilter = (state: RootState) => state.persistedReducerFilter;

// Action creators are generated for each case reducer function
export const { setSearch, setCategory, setSortType, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
