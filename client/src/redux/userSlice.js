import { createSlice } from "@reduxjs/toolkit";
import userApi from "../services/UserApi";

const userSlice = createSlice({
    name: "User",
    initialState: null,
    reducers: {
        addNotifications: (state, action) => {
            if(state.newMessages[action.payload]) {
                state.newMessages[action.payload] = state.newMessages[action.payload] + 1;
            } else {
                state.newMessages[action.payload] = 1;
            }
        },
        resetNotifications: (state, action) => {
            delete state.newMessages[action.payload];
        },
    },

    extraReducers: (builder) => {
        //save user after singUp
        builder.addMatcher(userApi.endpoints.signupUser.matchFulfilled, (state, action) => action.payload);
        //user after login
        builder.addMatcher(userApi.endpoints.signInUser.matchFulfilled, (state, action) => action.payload);
        //destroy user session
        builder.addMatcher(userApi.endpoints.signOut.matchFulfilled, () => null);
    },
})

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;