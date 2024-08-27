import { configureStore } from '@reduxjs/toolkit'

import counterReducer from "./features/counter/counterSlice";
import productReducer from '../products/productsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    products: productReducer,
  },
})