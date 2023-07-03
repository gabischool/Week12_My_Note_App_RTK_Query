import { configureStore } from '@reduxjs/toolkit'
import { noteSlice } from './api/NoteSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { useActionData } from 'react-router-dom'

export const store = configureStore({
  reducer: {
        [noteSlice.reducerPath]: noteSlice.reducer
    },

    // middleWare = is a fuction in the middle who taking care about the mutation/change
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteSlice.middleware)
})

setupListeners(store.dispatch)