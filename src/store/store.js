import { configureStore } from '@reduxjs/toolkit';
import booksSlice from './books-slice';
import cartSlice from './cart-slice';
import loginSlice from './login-slice';
import notificationSlice from './notification-slice';
import uiSlice from './ui-slice';
import validationSlice from './validation-slice';

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        login: loginSlice.reducer,
        validation: validationSlice.reducer,
        books: booksSlice.reducer,
        cart: cartSlice.reducer,
        notification: notificationSlice.reducer,
    },
});

export default store;