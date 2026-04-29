import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",

    async () =>{
        const token = localStorage.getItem("token")

        const res = await axios.get("http://localhost:5000/api/cart", {
            headers:{
                Authorization : `Bearer ${token}`
            }
        })

        return res.data.cartItems
    },

    
)
const cartSlice = createSlice({
    name: "cart",
    initialState:{
        items:[],
        loading: false
    },
    reducer: {},

    extraReducers : (builder)=>{
        builder
        .addCase(fetchCart.pending, (state)=>{
            state.loading = true
        })
        .addCase(fetchCart.fulfilled, (state,action)=>{
            state.loading = false;
            state.items = action.payload
        })
    }
})

export default cartSlice.reducer;