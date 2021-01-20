import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [], totalItems: 0 }

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
    } 
})

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;