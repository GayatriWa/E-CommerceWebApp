import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: "favorite",

  initialState,

  reducers: {

    addToFavorite: (state, action) => {

      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromFavorite: (state, action) => {

      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  addToFavorite,
  removeFromFavorite,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;