import React, { useState } from 'react'
import FormText from './FormText'
import Button from '../Button/Button'
import { FormStyles } from '../../styles/Form'

const initialInputState = {
  username: '',
  email: '',
  userOrEmail: '',
  password: '',
  passwordConfirm: ''
}

export default function Form(props) {
  const [inputs, setInputs] = useState(initialInputState)

  const buttonText = () => {
    if (props.register) {
      return 'Register'
    }
    if (props.login) {
      return 'Login'
    }
  }

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // redux actions
  }

  return (
    <FormStyles noValidate onSubmit={handleSubmit}>
      {props.register && (
        <FormText
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          value={inputs.email}
          // errors={null}
        />
      )}
      {props.register && (
        <FormText
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={inputs.username}
          // errors={null}
        />
      )}
      {props.login && (
        <FormText
          type="text"
          name="userOrEmail"
          placeholder="Email Address or Username"
          onChange={handleChange}
          value={inputs.userOrEmail}
          // errors={this.props.errors}
        />
      )}
      {(props.register || props.login) && (
        <FormText
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={inputs.password}
          // errors={null}
        />
      )}
      {props.register && (
        <FormText
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={inputs.passwordConfirm}
          // errors={null}
        />
      )}
      {(props.register || props.login) && (
        <Button type="form" text={buttonText()} callback={handleSubmit} />
      )}
    </FormStyles>
  )
}
