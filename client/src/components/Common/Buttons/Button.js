import React from 'react'
import './Button.css'
import PropTypes from 'prop-types'

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
  )
}

Button.propTypes = {
  className: PropTypes.string,
  name: PropTypes.number,
  callback: PropTypes.func,
  text: PropTypes.string,
  id: PropTypes.string,
  active: PropTypes.bool
}

export default Button
