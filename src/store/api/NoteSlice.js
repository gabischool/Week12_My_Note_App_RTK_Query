/// in this RTK version we dont need any axios
/// sidookale waa cache naga caawinaaya wax xoogaa speed dheeri ah maadaam data dii ay taalo localka
///step1 waxaan soo import garaysanj doonaa RTK query from redux
// import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NoteUrl = "http://localhost:9002";

export const NoteSlice = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({
   baseUrl: NoteUrl,
  }),
  tagTypes: ["notes"],
  endpoints: (builder) => ({
    fechNotes: builder.query({
      query: () => {
        return {
          url: "/notes",
          method: "GET",
        };
      },
      providesTags: ["notes"],
    }),

    addNotes: builder.mutation({
      query: (newNote) => {
        return {
          url: "/create_note",
          method: "POST",
          body: newNote,
        };
      },
      invalidatesTags: ["notes"],
    }),

    editNotes: builder.mutation({
      query: ({ noteId, updatedNote }) => {
        return {
          url: `/update_note/${noteId}`,
          method: "PUT",
          body: updatedNote,
        };
      },
      invalidatesTags: ["notes"],
    }),
    deleteNotes: builder.mutation({
      query: ( noteId ) => {
        return {
          url: `/delete_note/${noteId}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["notes"],
    }),
  }),
});
export const {
  useFechNotesQuery,
  useAddNotesMutation,
  useEditNotesMutation,
  useDeleteNotesMutation,
} = NoteSlice;

 export default NoteSlice.reducer ;
