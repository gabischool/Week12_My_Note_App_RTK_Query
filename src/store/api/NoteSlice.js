import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:9000';

export const NoteSlice = createApi({
    reducerPath: "noteApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ['notes'],

    endpoints: (builder) => ({

        fetchNotes: builder.query({
            query: () => {
                return {
                    url: "notes",
                    method: "GET"
                }
            },
            providesTags: ['notes']
            
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
            query: ({noteId, updateNote}) => ({
                url: `update_note/${noteId}`,
                method: "PUT",
                body: updateNote
            }),
            invalidatesTags: ['notes']
        }),

        deleteNote: builder.mutation({
            query: (noteId) => ({
                url: `delete_note/${noteId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['notes']
        })
    }),
});

export const {useFetchNotesQuery, useAddNoteMutation, useEditNoteMutation, useDeleteNoteMutation} = NoteSlice

export default NoteSlice.reducer