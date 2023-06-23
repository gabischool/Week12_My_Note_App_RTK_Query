import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// SET UP 
const BASE_URL  = 'http://localhost:9000';

export const noteSlice = createApi({
       
    reducerPath: 'noteApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),

    tagTypes: ['notes'],


    // ENDPOINTS

    endpoints: (builder) => ({


        // FETCH ALL NOTES
        fetchNotes: builder.query({
            query: () => {

                return {
                    url: 'notes',
                    method: 'GET',
                }
            },
            providesTags: ['notes'],
        }),

        // add note
        addNote: builder.mutation({
            query: (newNote) => ({
                url: "create_note",
                method: 'POST',
                body: newNote,
            }),
             invalidatesTags: ['notes'],
        }),

        // delete note

        deleteNote: builder.mutation({
            query: (noteId) => ({
                url: `delete_note/${noteId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['notes'],
        }),

        editeNote: builder.mutation({
            query: ({noteId, updatedNote}) => ({
                url: `update_note/${noteId}`,
                method: 'PUT ',
                body: updatedNote,
                
            }),
            invalidatesTags: ['notes'],
        }),
    })
})


export const { useFetchNotesQuery, useAddNoteMutation, useEditeNoteMutation, useDeleteNoteMutation} = noteSlice;

 export default noteSlice.reducer;
