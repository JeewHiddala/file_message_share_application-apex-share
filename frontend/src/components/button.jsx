import React from "react";
function Button({ type, className, tag, onClick }) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {tag}
    </button>
  );
}

export default Button;
