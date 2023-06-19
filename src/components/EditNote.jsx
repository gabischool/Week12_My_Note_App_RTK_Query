import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUpdateNotesMutation, useFetchNotesQuery } from '../store/api/NoteSlice';

const EditNote = () => {

  const params = useParams();
  const navigate = useNavigate();
  const { data: notes = [] } = useFetchNotesQuery();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });



  const [updateNotes] = useUpdateNotesMutation();

  useEffect(() => {
    const noteInfo = notes.find(note => note.id === Number(params.id));
    if (noteInfo) {
      setNote({
        title: noteInfo.title,
        content: noteInfo.content,
      });
    }
  }, [params.id, notes])

  const initialValues = {
    title: note.title,
    content: note.content
  }
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

  const handleSubmit = (values) => {
    updateNotes({
      id: Number(params.id),
      updateNote: values
    }).unwrap().then(()=>{
      navigate("/")
    })
    .catch((err)=>{
      console.log(err)
    })
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow w-[95%]">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-5">
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="title" component="div" className="text-red-500" />
          </div>

          <div className="mb-5">
            <Field
              as="textarea"
              name="content"
              placeholder="Body"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="content" component="div" className="text-red-500" />
          </div>

          <button
            type="submit"
            className="block w-full bg-yellow-400 text-black font-bold p-4 rounded-lg hover:bg-yellow-500"
          >
            Update Note
          </button>
        </Form>
      </Formik>
    </div>
  );

  // useEffect(() => {
  //   const note = allNotes.find((note) => note.id === Number(params.id));
  //   if (note) {
  //     setInitialValues({
  //       title: note.title,
  //       content: note.content,
  //     });
  //   }
  // }, [allNotes, params.id]);
};

export default EditNote;
