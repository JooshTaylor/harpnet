import React, { Component } from 'react';
import './FormText.css';

class FormText extends Component {
    render() {
        const { name, placeholder, errors, type="text", onChange, value } = this.props;
        return (
            <div className="form-text">
                <input formNoValidate type={type} placeholder={placeholder} onChange={onChange} value={value} name={name} className="form-text__input" />
                {
                    errors ? (<small className="form-text__errors">{errors}</small>) : null
                }
            </div>
        )
    }
}

export default FormText;
