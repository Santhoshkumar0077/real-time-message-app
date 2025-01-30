import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/userSlice";
import socketReducer from '../features/socketSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
  },
});
export default store
