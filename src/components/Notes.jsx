/* eslint-disable react/prop-types */

import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFetchNotesQuery, useDeleteNoteMutation } from "../store/api/NoteSlice";

function Notes() {

  const {data: notes = [], isLoading} = useFetchNotesQuery();
  // console.log(data);
  const [ deleteNote] = useDeleteNoteMutation()

  const deleteNoteHandler = (noteId) => {
    deleteNote(noteId).unwrap();
  };
  
  return (
    <>
    {isLoading ?  <> 
      <h1 className='text-white font-bold uppercase traccking-wide
         flex items-center justify-center text-4xl mt-4'>
           <span className="animate-spin w-8 h-8 border-4 border-white border-l-slate-300 mr-3 rounded-full"></span>
            Loading...
      </h1>
    </> :
    <div className="flex flex-wrap justify-center mt-5">
      {notes.map((note) =>  (
        <div
          className="relative bg-yellow-400 w-64 h-64 m-5 shadow-2xl overflow-hidden"
          key={note.id}
        >
          <div className="p-5">
            <h3 className="font-bold text-2xl mb-4">{note.title}</h3>
            <p>{note.content}</p>
          </div>
          <div className="absolute bg-yellow-400 w-12 h-12 rotate-45 -top-6 -left-6" />
          <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4">
          <Link to={`/edit_Note/${note.id}`}>
            <button className="mr-2">
              <FaEdit size={20} />
            </button>
            </Link>
            <button>
              <FaTrash size={20} onClick={() => deleteNoteHandler(note.id)} />
            </button>
          </div>
        </div>
      ))}
    </div> 
    }
    </>
  );
}

export default Notes;