import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
        "_id": "68bd43af162dab6a00c70ef3",
        "user": "68bbef57055caca971b980a7",
        "title": "My Tittle",
        "description": "My Description",
        "tag": "Personal",
        "date": "2025-09-07T08:34:55.833Z",
        "__v": 0
    },
    {
        "_id": "68bdca80ccd580eca7d5f98f",
        "user": "68bbef57055caca971b980a7",
        "title": "New Note2",
        "description": "New Note description2",
        "tag": "Personal",
        "date": "2025-09-07T18:10:08.348Z",
        "__v": 0
    },
    {
        "_id": "68bdcb799ac39eaedc4aae81",
        "user": "68bbef57055caca971b980a7",
        "title": "Finding",
        "description": "Finding Someone 💕",
        "tag": "Personal",
        "date": "2025-09-07T18:14:17.524Z",
        "__v": 0
    }
]
const [state, setState] = useState(notesInitial);
  return (
    <noteContext.Provider value={{state,setState}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
