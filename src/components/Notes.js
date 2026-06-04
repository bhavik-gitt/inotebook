import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function Notes() {
  const context = useContext(noteContext);

   // eslint-disable-next-line
  const { notes , addNote } = context;

  return (
    <>
    <AddNote/>
    <div className="mx-5">
      <h2>Your Notes</h2>
      <div className="row">
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </div>
    </>
  );
}
