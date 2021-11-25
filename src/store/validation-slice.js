import { createSlice } from "@reduxjs/toolkit";

const validationSlice = createSlice({
    name: 'validation',
    initialState: {
        validEmail: null,
        validPassword: null,
        emailTouched: false,
        passwordTouched: false,
    },
    reducers: {
        isEmailValid(state, action) {
            state.validEmail = action.payload.isValid;
        },
        isPasswordValid(state, action) {
            state.validPassword = action.payload.isValid;
        },
        isEmailTouched(state, action) {
            state.emailTouched = action.payload.isTouched;
        },
        isPasswordTouched(state, action) {
            state.passwordTouched = action.payload.isTouched;
        },
    }
});
export const validationActions = validationSlice.actions;
export default validationSlice;