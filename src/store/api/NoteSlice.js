import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL="http://localhost:9001";
export const NoteSlice = createApi({
    reducerPath:"notesApi",
    baseQuery: fetchBaseQuery({
        baseUrl :BASE_URL
    }),

    tagTypes : ["notes"],

    endpoints: (builder) => ({
        fetchNotes: builder.query({
            query: () => {
                return {
                    url: "notes",
                    method: "GET"
                }
            }
            ,
            providesTags : ["notesApi"]
        }),
        addNotes: builder.mutation({
            query : (newNote) => ({
                url : 'create_note',
                method : 'POST',
                body : newNote
            }),
            invalidatesTags : ["notes"]
        }),
        editNote: builder.mutation({  
            query : ({id , updateNote}) => ({
                url : `update_note/${id}`,
                method : 'PUT',
                body : updateNote
            }),
            invalidatesTags : ["notes"]
        }),
        deleteNote:builder.mutation({
            query :(id)=>({
                url: `delete_note/${id}`,
                method:"DELETE",
            }),
            invalidatesTags : ["notes"]

        })
    })
})
export const { useFetchNotesQuery , useAddNotesMutation, useEditNoteMutation, useDeleteNoteMutation} = NoteSlice;