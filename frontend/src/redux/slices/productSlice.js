import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


// 🔥 API call (async)
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",

    async (_, {rejectWithValue}) =>{
     try {
         const res =  await axios.get("http://localhost:5000/api/products")
         return res.data.products;
     } catch (error) {

        console.log("error",error)
        return rejectWithValue(error.response?.data);
        
     }
    }
)

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null
    },

    reducers: {},

extraReducers : (builder)=>{
    builder
    .addCase(fetchProducts.pending, (state)=>{
        state.loading = true
    })
    .addCase(fetchProducts.fulfilled, (state,action)=>{
        state.loading = false;
        state.items = action.payload;
    })
    .addCase(fetchProducts.rejected, (state,action)=> {
        state.loading = false;
        state.error = action.error.message
    })
}
})

export default productSlice.reducer