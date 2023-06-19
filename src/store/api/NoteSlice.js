import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const Base_Url = 'http://localhost:9000';
export const NoteSlice = createApi({
    reducerPath: "notesApi",
    baseQuery: fetchBaseQuery({
        baseUrl : 'http://localhost:9002'
    }),

    tagTypes : ["notesApi"],

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
        })
        ,
        addNotes: builder.mutation({
            query : (newBook) => ({
                url : 'create_note',
                method : 'POST',
                body : newBook
            }),
            invalidatesTags : ["notesApi"]
        })
        ,
        deleteNotes: builder.mutation({
            query : (id)=>({
                url : `delete_note/${id}`,
                method : 'DELETE',
            }),
            invalidatesTags : ["notesApi"]
        }),
        updateNotes: builder.mutation({
            query : ({id , updateNote}) => ({
                url : `update_note/${id}`,
                method : 'PUT',
                body : updateNote
            }),
            invalidatesTags : ["notesApi"]
        })
    })
})
// export { useFetchNotesQuery} from NoteSlice;
export const { useFetchNotesQuery , useAddNotesMutation , useDeleteNotesMutation , useUpdateNotesMutation} = NoteSlice;