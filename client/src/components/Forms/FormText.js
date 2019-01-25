import React from "react";
import { InputStyles } from "../../styles/Form";
import PropTypes from "prop-types";

const FormText = props => {
  const { name, placeholder, errors, type = "text", onChange, value } = props;
  return (
    <>
      <InputStyles
        formNoValidate
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        className="form-text__input"
      />
      <br />
      {/* {Object.keys(errors).length > 0 ? (
        <small className="form-text__errors">{errors.errors[name]}</small>
      ) : null} */}
    </>
  );
};

FormText.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default FormText;
