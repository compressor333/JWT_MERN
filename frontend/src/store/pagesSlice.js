import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagesSlice',
  initialState: {
    currentPage: 1,
    itemsPerPage: 4,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;