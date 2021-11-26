import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        type: '',
        content: '',
        showNotification: false,
    },
    reducers: {
        showNotification(state, action) {
            state.showNotification = true;

            state.type = action.payload.type;
            state.content = action.payload.content;
        },
        hideNotification(state) {
            state.showNotification = false;
            state.type = '';
            state.content = '';
        },
    }
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;