import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        items: [],
    },
    reducers: {
        fetchBooks(state, action) {
            state.items = action.payload.items;
        }
    }
});

export const booksActions = booksSlice.actions;
export default booksSlice;