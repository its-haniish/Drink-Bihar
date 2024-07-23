import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import cartReducer from './reducers/counterReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    }
})

export default store;