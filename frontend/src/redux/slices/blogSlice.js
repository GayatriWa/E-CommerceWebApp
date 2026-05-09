import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",

  async (_, { rejectWithValue }) => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs`
      );

      console.log("BLOG API:", res.data);

      return res.data.blogs;

    } catch (error) {

      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const blogSlice = createSlice({

  name: "blogs",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(fetchBlogs.pending, (state) => {

        state.loading = true;
      })

      .addCase(fetchBlogs.fulfilled, (state, action) => {

        state.loading = false;

        state.items = action.payload;
      })

      .addCase(fetchBlogs.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;