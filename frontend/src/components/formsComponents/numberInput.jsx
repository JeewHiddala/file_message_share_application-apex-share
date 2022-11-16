import React from 'react'
function NumberInput({label, value, onchange}) {
  return (
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">
        {label}
      </label>
      <input
        type="number"
        className="form-control"
        id="exampleFormControlInput1"
        placeholder={"Enter "+label}
        value={value}
        onChange={onchange}
      />
    </div>
  );
}
export default NumberInput;
