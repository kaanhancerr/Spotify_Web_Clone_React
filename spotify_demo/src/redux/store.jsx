import { configureStore } from '@reduxjs/toolkit'
import musicCoverReducer from './slices/musicSlice';


export const store = configureStore({
    reducer: {
        music: musicCoverReducer,
    }
})