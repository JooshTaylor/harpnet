import React from 'react'
import './Button.css'
import IBtnMouseEvent from '../../../interfaces/IBtnMouseEvent'

interface Props {
  className?: string
  name?: string
  callback?: any
  text?: string
  id?: string
  active?: boolean
}

const Button: React.SFC<Props> = ({
  className,
  name,
  callback,
  text,
  id,
  active = true
}) => {
  return (
    <>
      {active ? (
        <button id={id} className={className} name={name} onClick={callback}>
          {text}
        </button>
      ) : (
        <button id={id} className={`${className}--inactive`} name={name}>
          Loading
        </button>
      )}
    </>
  )
}

export default Button
