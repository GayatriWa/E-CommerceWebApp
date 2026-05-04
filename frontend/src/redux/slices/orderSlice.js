import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",

    async ()=>{
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/orders",
            {
            headers:{
                Authorization : `Bearer ${token}`
            }
            }
        )

        return res.data.orders;
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState :{
        items:[],
        loading: false,

    },
    reducer :{},

    extraReducers : (builder) =>{
        builder
        .addCase(fetchOrders.pending, (state)=>{
            state.loading = true
        })
        .addCase(fetchOrders.fulfilled, (state, action)=>{
            state.loading = false,
            state.items = action.payload
        })
        .addCase(fetchOrders.rejected, (state,action)=>{
            state.loading = false
        })
    }
})

export default orderSlice.reducer