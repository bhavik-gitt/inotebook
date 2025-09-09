import React from "react";

export default function NoteItem({ note }) {
  return (
    <div className="col-md-4 my-2">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body">
          <h5 className="card-title text-primary fw-bold">{note.title}</h5>
          <p className="card-text text-muted">{note.description}</p>
          <span className="badge bg-secondary px-3 py-1">{note.tag}</span>
        </div>
        <div className="card-footer bg-transparent d-flex justify-content-between">
          <button className="btn btn-sm btn-primary d-flex align-items-center px-3">
            <i class="fa-solid fa-edit"></i>
          </button>
          <button className="btn btn-sm btn-danger d-flex align-items-center px-3">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
