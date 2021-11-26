import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        type: '',
        content: '',
    },
    reducers: {
        showNotification(state, action) {
            state.type = action.payload.type;
            state.content = action.payload.content;
        },
    }
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;