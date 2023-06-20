import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:9000";

export const noteSlice = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    // fetch notes
    getNotes: builder.query({
      query: () => {
        return {
          url: "notes",
          method: "GET",
        };
      },
      providesTags: ["Notes"],
    }),

    // addNote
    addNote: builder.mutation({
      query: (newNote) => ({
        url: "/create_note",
        method: "POST",
        body: newNote,
      }),

      invalidatesTags: ["Notes"],
    }),

    // deleteNote
    deleteNote: builder.mutation({
      query: (noteId) => ({
        url: `/delete_note/${noteId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Notes"],
    }),

    // editNote
    editNote: builder.mutation({
      query: ({ noteId, updatedNote }) => ({
        url: `/update_note/${noteId}`,
        method: "PUT",
        body: updatedNote,
      }),

      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useEditNoteMutation,
} = noteSlice;

console.log("noteSlice", noteSlice);

export default noteSlice.reducer;
