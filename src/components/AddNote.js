import React, { useState,useContext } from "react";
import Notes from "./Notes";
import noteContext from "../context/notes/noteContext";
export default function AddNote() {
     const context = useContext(noteContext);
  const {addNote } = context;
  const [note, setNote] = useState({title : "", description : "", tag: ""})
  const handleAddNote = (e)=>
  {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  }
  const onChange = (e) =>
  {
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
      <div>
        <div className="container my-5 mx-5">
          <h2>Add a Note</h2>
          <form>
            {/* Title Input */}
            <div className="mb-3">
              <label htmlFor="noteTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="noteTitle"
                placeholder="Enter note title"
                onChange={onChange}
                name="title"
              />
            </div>

            {/* Description Input */}
            <div className="mb-3">
              <label htmlFor="noteDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="noteDescription"
                rows="3"
                placeholder="Enter note description"
                onChange={onChange}
                name="description"
              ></textarea>
            </div>

            {/* Tag Input */}
            <div className="mb-3">
              <label htmlFor="noteTag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="noteTag"
                placeholder="Enter note tag (e.g. personal, work)"
                onChange={onChange}
                name="tag"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary" onClick={handleAddNote}>
              Add Note
            </button>
          </form>
        </div>
        <Notes />
      </div>
    </>
  );
}
