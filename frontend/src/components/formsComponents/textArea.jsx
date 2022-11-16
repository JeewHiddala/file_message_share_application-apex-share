import React from "react";

export function TextArea({label}) {
  return (
    <div className="mb-3">
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
        {label}
      </label>
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
    </div>
  );
}
