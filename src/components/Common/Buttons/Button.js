import React from "react";
import "./Button.css";

const Button = ({ className, name, callback, text, id, active = true }) => {
  return (
    <React.Fragment>
      {active ? (
        <button id={id} className={className} name={name} onClick={callback}>
          {text}
        </button>
      ) : (
        <button id={id} className={`${className}--inactive`} name={name}>
          Loading
        </button>
      )}
    </React.Fragment>
  );
};

export default Button;
