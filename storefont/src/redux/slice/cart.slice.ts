import { createSlice } from '@reduxjs/toolkit';
import { fetchDataAPI } from './thunk';

const initialState = { items: [], totalItems: 0, shop: null }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            state.items.push(action.payload)
        },
        removeItemFromCart: (state, action) => {
            state.items = action.payload;
            state.totalItems = action.payload.length;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchDataAPI.fulfilled, (state, action) => {
            state.shop = action.payload
        })
    }
})
export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;