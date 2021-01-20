import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cart.slice';

const rootReducer = combineReducers({
    cart: cartReducer,
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>