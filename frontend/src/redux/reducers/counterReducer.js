import { createReducer } from '@reduxjs/toolkit';


const initialState = [];


const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("add-cart", (state, action) => {
            const item = action.payload;
            const existingItem = state.find((i) => i.id === item.id);
            if (existingItem) {
                return;
            } else {
                state.push({ ...item, quantity: item.quantity || 1 });
            }
        })

        .addCase("remove-cart", (state, action) => {
            const item = action.payload;
            const existingItem = state.find((i) => i.id === item.id);
            if (existingItem) {
                return state.filter((i) => i.id !== item.id);
            }
        })

        .addCase("clear-cart", (state, action) => {
            state = [];

        })

});

export default cartReducer;


