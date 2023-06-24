import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:9000";

export const noteSlice = createApi({

   reducerPath: "noteApi",
   baseQuery: fetchBaseQuery({
       baseUrl: BASE_URL
   }),

   tagTypes : ["notesApi"],

   endpoints: (builder) => ({
       fetchNotes: builder.query({
           query: () => {
               return{
                   url: "notes",
                   method: "GET"
               }
           },
           providesTags : ["notesApi"]
       }),
       addNote: builder.mutation({
           query: (newNote) => ({
               url: "create_note",
               method: "POST",
               body: newNote
           }),
           invalidatesTags: ['notes']
       }),
       editNote: builder.mutation({
           query: (noteId, updatedNote) => ({
               url: `updated_note/${noteId}`,
               method: "PUT",
               body: updatedNote
           }),
           invalidatesTags: ['notes']
       }),
       deleteNote: builder.mutation({
           query: (id) => ({
               url: `delete_note/${id}`,
               method: "DELETE"
           }),
           invalidatesTags: ['notes']
       })
   })
})



export const {useFetchNotesQuery, useAddNoteMutation, useEditNoteMutation, useDeleteNoteMutation} = noteSlice

export default noteSlice.reducer;