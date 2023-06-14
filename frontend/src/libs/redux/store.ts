import { configureStore } from '@reduxjs/toolkit';
import { getEnv } from '~/utils/getEnv';
import cardReducer from './cardSlice';

const store = configureStore({
  reducer: {
    card: cardReducer
  },
  devTools: Boolean(getEnv('DEV'))
});

export default store;
