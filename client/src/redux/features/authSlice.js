import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
const initialState = {
    user: null,
    token: null,
    isLoading: false,
}
export const registerUser = createAsyncThunk("auth/registerUser", async ({ username, password, email }) => {
    try {
        const { data } = await axios.post("/register", { username, password, email })
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
})
export const loginUser = createAsyncThunk("auth/loginUser", async ({ username, password }) => {
    try {
        const { data } = await axios.post("/login", { username, password })
        console.log(data);
        if (data.token) {
            window.localStorage.setItem("token", data.token)
            window.localStorage.setItem("user", JSON.stringify(data))
        }
        return data;
    } catch (error) {
        console.log(error);
    }
})

export const getMe = createAsyncThunk("auth/getMe", async () => {
    try {
        const { data } = await axios.get("/me")
        return data;
    } catch (error) {
        console.log("gfg");
    }
})
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
        }
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.isLoading = true

        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
        },
        [registerUser.rejected]: (state, action) => {
            state.isLoading = false
        },
        [loginUser.pending]: (state) => {
            state.isLoading = true

        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false
        },

        [getMe.pending]: (state) => {
            state.isLoading = true
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = action.payload?.user
            state.token = action.payload?.token
        },
        [getMe.rejected]: (state, action) => {
            state.isLoading = false
        }
    },
})

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const { logout } = authSlice.actions

export default authSlice.reducer