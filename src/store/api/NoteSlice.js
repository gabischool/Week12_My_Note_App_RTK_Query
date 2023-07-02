import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://localhost:9000'

export const noteSlice = createApi({
    // SetUp
    reducerPath: 'note',
    baseQuery:   fetchBaseQuery ({
    baseUrl: BASE_URL
    }),

    tagTypes: ['notes'],

    //Endpoint CRUD create, read, update, delete
    // query = get , mutation = update/change,

    // fetch notes
     endpoints: (builder) => ({
        
        fetchNotes: builder.query({
            query: () => {
                return {
                    url: 'notes',
                    method: 'GET'
                }
            },
            providesTags: ['notes']
        }),

        // add notes
        addNote: builder.mutation({
            query: (newNote) => ({
                url: 'create_note',
                method: "POST",
                body: newNote
            }),
           
            invalidatesTags: ['notes']
          }),


          // edit note
          editNote: builder.mutation({
           query: ({noteId, upadatedNote}) => ({
            url: `update_note/${noteId}`,
            method: 'PUT',
            body: upadatedNote
           }),

           invalidatesTags: ['notes']

    }),

    // delet note
    deleteNote: builder.mutation({
        query: (noteId) => ({
            url: `delete_note/${noteId}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['notes']
    })
    })

})

export const { useFetchNotesQuery, useAddNoteMutation, useEditNoteMutation, useDeleteNoteMutation} = noteSlice


export default noteSlice.reducer