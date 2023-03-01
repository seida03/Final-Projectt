import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import cartSlice from './features/cartSlice'
import wishSlice from './features/wishSlice'
export const store = configureStore({
  reducer: {
    auth:authSlice,
    cart:cartSlice,
    wish:wishSlice,
  },
})