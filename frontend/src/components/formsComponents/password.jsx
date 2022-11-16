import React from "react";

export function Password({ label }) {
  return (
    <div className="mb-3">
      <label htmlFor="inputPassword" className="form-label">
        {label}
      </label>
      <input
        type="password"
        className="form-control"
        id="inputPassword"
        placeholder="name@example.com"
      />
    </div>
  );
}
