import { configureStore } from '@reduxjs/toolkit';
import { getEnv } from '~/utils/getEnv';

const store = configureStore({
  reducer: {},
  devTools: Boolean(getEnv('DEV'))
});

export default store;
