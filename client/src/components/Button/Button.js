import React from "react";
// import "./Button.css";
import { ButtonStyles } from "../../styles/Button";
import PropTypes from "prop-types";

const Button = ({ name, callback, type, text, id, active = true }) => {
  return (
    <>
      {/* {active ? (
        <ButtonStyles
          id={id}
          className={className}
          name={name}
          onClick={callback}
        >
          {text}
        </ButtonStyles>
      ) : (
        <ButtonStyles id={id} className={`${className}--inactive`} name={name}>
          Loading
        </ButtonStyles>
      )} */}
      <ButtonStyles
        id={id}
        type={type}
        name={name}
        onClick={callback}
        active={active}
      >
        {text}
      </ButtonStyles>
    </>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  name: PropTypes.number,
  callback: PropTypes.func,
  text: PropTypes.string,
  id: PropTypes.string,
  active: PropTypes.bool
};

export default Button;
