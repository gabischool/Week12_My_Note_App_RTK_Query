import { configureStore  } from '@reduxjs/toolkit'
import { NoteSlice  } from "./api/NoteSlice"
import { setupListeners } from '@reduxjs/toolkit/dist/query'
 

export const store = configureStore({
  reducer: {
     [NoteSlice.reducerPath ]: NoteSlice.reducer
    },
    /// midware prevention of copying states
    middleware:(getDefaultMiddleware)=> 
    getDefaultMiddleware().concat(NoteSlice.middleware) 
})

setupListeners(store.dispatch)