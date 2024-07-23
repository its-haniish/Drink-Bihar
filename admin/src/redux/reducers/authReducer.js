import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false, // Set isAuthenticated
    user: null, // Set user
    token: null, // Set token
}

const authReducer = createReducer(initialState, (builder) => {
    builder
        // Handle the login action
        .addCase("login", (state, action) => {
            state.isAuthenticated = true; // Set isAuthenticated to true
            state.user = action.payload.user; // Set user to the payload of the action
            state.token = action.payload.token; // Set user to the payload of the action

        })
        // Handle the logout action
        .addCase("logout", (state) => {
            state.isAuthenticated = false; // Set isAuthenticated to false
            state.user = null; // Clear the user information
            state.token = null; // Clear the token information
        });
});

// Export the Auth reducer
export default authReducer;
