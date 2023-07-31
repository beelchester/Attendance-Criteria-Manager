'use client'

import {configureStore} from '@reduxjs/toolkit'
// import signupModalReducer from './features/signupModalSlice'
// import loginModalReducer from './features/loginModalSlice'
// import rentModalReducer from './features/rentModalSlice'
// import searchModalReducer from './features/searchModalSlice'
import currentUserModalReducer from '../features/currentUserSlice'

export const store = configureStore({
    reducer: {
        currentUser: currentUserModalReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

