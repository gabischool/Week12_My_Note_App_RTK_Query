import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {

  const locations = useLocation();

  return (
    <div className="bg-blue-600 min-h-screen flex">
      <div className="w-full">
        <div className="flex flex-col items-center bg-white lg:w-7/12 lg:mx-auto h-auto mt-10  rounded-md">
          <h3 className="text-3xl text-start text-blue-600 mb-5 mt-5">My Notes</h3>
          <Routes>
            {
            locations.pathname === "/" ? <Route path="/" element={<AddNote />} /> :
            <Route path="/edit/:id" element={<EditNote />} />
            }
          </Routes>
          <Notes />
        </div>
      </div>
    </div>
  );
}

export default App;