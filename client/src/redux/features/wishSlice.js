import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
const initialState = {
    wish: [],
    isLoading: false,
}
export const addToWish = createAsyncThunk("wish/addToWish", async (id) => {
    try {
        const { data } = await axios.post(`/wish/${id}`, id)
        return data;
    } catch (error) {
        console.log(error);
    }
})
export const getUserWish = createAsyncThunk("wish/getUserWish", async (id) => {
    try {
        const { data } = await axios.get(`/wish/${id}`, id)
        return data;
    } catch (error) {
        console.log(error);
    }
})
export const deleteFromWish = createAsyncThunk("wish/deleteFromWish", async (id) => {
    try {
        const { data } = await axios.delete(`/wish/${id}`, id)
        return data;
    } catch (error) {
        console.log(error);
    }
})
export const wishSlice = createSlice({
    name: 'wish',
    initialState,
    reducers: {
    },
    extraReducers: {
        [addToWish.pending]: (state) => {
            state.isLoading = true
        },
        [addToWish.fulfilled]: (state, action) => {
            state.isLoading = false
            state.wish.push(action.payload)
        },
        [addToWish.rejected]: (state, action) => {
            state.isLoading = false
        },
        [getUserWish.pending]: (state) => {
            state.isLoading = true
        },
        [getUserWish.fulfilled]: (state, action) => {
            state.isLoading = false
            state.wish = action.payload.list
        },
        [getUserWish.rejected]: (state, action) => {
            state.isLoading = false
        },
        [deleteFromWish.pending]: (state) => {
            state.isLoading = true
        },
        [deleteFromWish.fulfilled]: (state, action) => {
            state.isLoading = false
            console.log(action.payload);
        },
        [deleteFromWish.rejected]: (state, action) => {
            state.isLoading = false
        },
    },
})

export default wishSlice.reducer