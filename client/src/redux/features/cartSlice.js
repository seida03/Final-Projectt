import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
const initialState = {
    cart: [],
    cartPreview: [],
    userCart: [],
    isLoading: false,
    count: 1,
}
export const addToCart = createAsyncThunk("cart/addToCart", async (params) => {
    try {
        // const { data } = await axios.post(`/cart/${id}`, id)
        // console.log(data);
        const { data } = await axios.post(`/cart/${params.id}`, {
            userId: params.userId
        }, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Accept": "application/json",
        })
        return data;
    } catch (error) {
        console.log(error);
    }
})
export const getUserCart = createAsyncThunk("cart/getUserCart", async (id) => {
    console.log(id)
    try {
        // const { data } = await axios.get(`/cart/${id}`, id)
        const { data } = await axios.get(`/cart/${id}`)
        return data;
    } catch (error) {
        console.log(error);
    }
})
export const deleteProduct = createAsyncThunk("cart/deleteProduct", async (id) => {
    try {
        const { data } = await axios.delete(`/cart/${id}`, id)
        return data;
    } catch (error) {
        console.log(error);
    }
})
export const getUserCartt = createAsyncThunk("cart/getusercart", async () => {
    try {
        const { data } = await axios.get("/cart")
        return data;
    } catch (error) {
        console.log(error);
    }
})
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
    },
    extraReducers: {
        [addToCart.pending]: (state) => {
            state.isLoading = true
            state.count = state.count + 1
        },
        [addToCart.fulfilled]: (state, action) => {
            state.isLoading = false
            // if (state.cart.find(x => x.productId == action.payload)) {
            //     state.cart.forEach(x => {
            //         if (x.productId == action.payload) {
            //             x.count += 1
            //         }
            //     })
            // } else {
            //     state.cart.push({ productId: action.payload, count: 1 })
            // }
            // console.log(state.cart)
            state.cart = action.payload.user.cart
        },
        [addToCart.rejected]: (state, action) => {
            state.isLoading = false
        },
        [getUserCart.pending]: (state) => {
            state.isLoading = true
        },
        [getUserCart.fulfilled]: (state, action) => {
            state.isLoading = false
            state.cart = action.payload.list
            state.userCart = action.payload.userCart

        },
        [getUserCart.rejected]: (state, action) => {
            state.isLoading = false
        },
        [deleteProduct.pending]: (state) => {
            state.isLoading = true
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.isLoading = false
            console.log(action.payload);
            state.cart = state.cart.filter(x => x.productId !== action.payload.Id)

        },
        [deleteProduct.rejected]: (state, action) => {
            state.isLoading = false
        },
        [getUserCartt.pending]: (state) => {
            state.isLoading = true
        },
        [getUserCartt.fulfilled]: (state, action) => {
            state.isLoading = false
            state.cart = action.payload
        },
        [getUserCartt.rejected]: (state, action) => {
            state.isLoading = false
        },
    },
})



export default cartSlice.reducer