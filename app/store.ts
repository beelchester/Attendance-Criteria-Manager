'use client'

import {configureStore} from '@reduxjs/toolkit'
// import signupModalReducer from './features/signupModalSlice'
// import loginModalReducer from './features/loginModalSlice'
// import rentModalReducer from './features/rentModalSlice'
// import searchModalReducer from './features/searchModalSlice'

export const store = configureStore({
    reducer: {
        // signupModal: signupModalReducer,
        // loginModal : loginModalReducer,
        // rentModal : rentModalReducer,
        // searchModal : searchModalReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

