import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: { showForm: false, showCart: false },
    reducers: {
        toggleForm(state) {
            state.showForm = !state.showForm;
        },
        toggleCart(state) {
            state.showCart = !state.showCart;
        },
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice;