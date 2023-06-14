import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  // other reducers...
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
