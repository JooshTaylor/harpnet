import React from 'react'
import './Login.css'
import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import FormText from '../Forms/FormText/FormText'
import PubAcc from '../Common/PubAcc/PubAcc'
import { loginUser } from '../../actions/authActions'
import ILoginUser from '../../interfaces/ILoginUser'
import IFormSubmitEvent from '../../interfaces/IFormSubmitEvent'
import IAuthProps from '../../interfaces/IAuthProps'
import IErrorProps from '../../interfaces/IErrorProps'

interface Props {
  loginUser(userData: ILoginUser): void
  auth: IAuthProps
  errors: IErrorProps
  path: string
}

class Login extends React.Component<Props, ILoginUser> {
  public state = {
    // Tracking input values
    userOrEmail: '',
    password: ''
  }

  // Updating input value states
  private onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      // For cases where the input is not password, it will be converted to lowercase for DB storing. This makes input fields case insensitive (except for the passwords)
      [e.target.name]: e.target.value
    } as Pick<ILoginUser, keyof ILoginUser>)
  }

  // Runs on form submission
  private onSubmit = (e: IFormSubmitEvent): void => {
    e.preventDefault()

    const loginData = {
      userOrEmail: this.state.userOrEmail,
      password: this.state.password
    }

    // Redux action for logging users in. Takes form data and browser history.
    this.props.loginUser(loginData)
  }

  public render(): JSX.Element {
    const { auth } = this.props
    // If a users is logged in, they cannot access this page and are redirected to their feed.
    if (auth.isLoggedIn) {
      navigate('/feed')
      return null
    }

    return (
      <section className='login'>
        <h1 className='login__heading-1' data-testid='login-heading'>
          Login To Your account
        </h1>
        <form noValidate onSubmit={this.onSubmit} className='login__form'>
          <FormText
            type='text'
            name='userOrEmail'
            placeholder='Email Address or Username'
            onChange={this.onChange}
            value={this.state.userOrEmail}
            errors={this.props.errors}
          />
          <FormText
            type='password'
            name='password'
            placeholder='Password'
            onChange={this.onChange}
            value={this.state.password}
            errors={this.props.errors}
          />
          <input type='submit' className='login__form-btn' value='Login' />
        </form>
        <h2 className='login__heading-2'>
          Or login to one of our public accounts
        </h2>
        <PubAcc />
      </section>
    )
  }
}

const mapStateToProps = (state: Props) => {
  return {
    errors: state.errors,
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { loginUser }
)(Login)
