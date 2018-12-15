import React from "react";
import "./Button.css";

const Button = ({ className, name, callback, text, active = true }) => {
  return (
    <React.Fragment>
      {active ? (
        <button className={className} name={name} onClick={callback}>
          {text}
        </button>
      ) : (
        <button className={`${className}--inactive`} name={name}>
          Loading
        </button>
      )}
    </React.Fragment>
  );
};

export default Button;
