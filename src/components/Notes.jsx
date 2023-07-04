/* eslint-disable react/prop-types */
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDeleteNotesMutation, useFetchNotesQuery } from "../store/api/NoteSlice";

function Notes() {

  const { data : notes = [] , isLoading , errors} = useFetchNotesQuery();
  const [ deleteNotes] = useDeleteNotesMutation ();
  console.log("miirshe",notes);

  const deleteNoteHandler = (id) => {
    deleteNotes(id)
  };
  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-5">
      {isLoading === "loading" && <div className="relative p-5 bg-yellow-400 w-64 h-64 m-5 shadow-2xl overflow-hidden">Loading...</div>}
      {errors === "failed" && <div className="relative p-5 bg-yellow-400 w-64 h-64 m-5 shadow-2xl overflow-hidden">Sorry, {errors}</div>}
      {notes.map((note) =>  (
        <div
          className="relative bg-slate-50 lg:w-56  h-64 m-5 shadow-2xl overflow-hidden"
          key={note.id}
        >
          <div className="p-5">
            <h3 className="font-bold text-2xl mb-4 text-blue-600">{note.title}</h3>
            <p>{note.content}</p>
          </div>
          <div className="absolute bg-yellow-400 w-12 h-12 rotate-45 -top-6 -left-6" />
          <div className="absolute bottom-0 left-0 right-0 flex justify-start items-center p-4">
          <Link to={`/edit/${note.id}`}>
            <button className="mr-2">
              <FaEdit className="text-blue-600" size={25} />
            </button>
            </Link>
            <button>
              <FaTrash className="text-red-500" size={20} onClick={() => deleteNoteHandler(note.id)} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;