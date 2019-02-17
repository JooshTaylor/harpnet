import React from 'react'
import './Home.css'
import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import FormText from '../Forms/FormText/FormText'
import PubAcc from '../Common/PubAcc/PubAcc'
import { registerUser } from '../../actions/authActions'
import IFormSubmitEvent from '../../interfaces/IFormSubmitEvent'
import IRegisterUser from '../../interfaces/IRegisterUser'
import IAuthProps from '../../interfaces/IAuthProps'
import IErrorProps from '../../interfaces/IErrorProps'

interface Props {
  registerUser(userData: IRegisterUser): void
  auth: IAuthProps
  errors: IErrorProps
  path: string
}

class Home extends React.Component<Props, IRegisterUser> {
  public state = {
    email: '',
    username: '',
    password1: '',
    password2: ''
  }

  // Tracking input value changes
  private onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      [e.target.name]: e.target.value
    } as Pick<IRegisterUser, keyof IRegisterUser>)
  }

  // Runs on form submission
  private onSubmit = (e: IFormSubmitEvent): void => {
    e.preventDefault()

    const { email, username, password1, password2 } = this.state
    const userData = {
      email: email.toLowerCase(),
      username,
      password1,
      password2
    }

    // Redux action for registering users. Takes form data and browser history.
    this.props.registerUser(userData)
  }

  public render(): JSX.Element {
    // If a users is logged in, they cannot access this page and are redirected to their feed.
    if (this.props.auth.isLoggedIn) {
      navigate('/feed')
      return null
    } else {
      return (
        <section className='landing' data-testid='home'>
          {/* Left side - information */}
          <div className='landing__info'>
            <h1 className='landing__heading-1'>Welcome to Harpnet</h1>
            <h2 className='landing__heading-2'>
              The hottest social networking website of 2019
            </h2>
            <p className='landing__paragraph'>
              Harpnet is a fast growing social networking website where you can
              connect with anybody from your friends and family to your
              colleagues. We offer the following features:
            </p>
            <ul className='landing__features'>
              <li className='landing__feature'>
                <i className='feature-icon fas fa-users' />
                <h3 className='feature-heading'>Profiles</h3>
                <p className='feature-info'>
                  Create your own profile and view other user profiles!
                </p>
              </li>
              <li className='landing__feature'>
                <i className='feature-icon fas fa-scroll' />
                <h3 className='feature-heading'>Feed</h3>
                <p className='feature-info'>
                  Follow or other people to see their posts and gain followers
                  who can view yours!
                </p>
              </li>
              <li className='landing__feature'>
                <i className='feature-icon fas fa-comments' />
                <h3 className='feature-heading'>Messages</h3>
                <p className='feature-info'>
                  Send instant messages to anybody that you want to talk to!
                </p>
              </li>
            </ul>

            <h2 className='landing__heading-2'>What this actually is</h2>
            <p className='landing__paragraph'>
              This website is actually just a development playground. I'm
              continuously developing this to practice creating larger scale
              applications using React.js, Redux, Node.js, Postgres and Redis.
            </p>
            <p className='landing__paragraph'>
              There are 3 dummy accounts that you can access to interact with
              all of the features, or you can make your own account. If you use
              a public account, feel free to make or delete posts and comments,
              follow/unfollow accounts or edit the basic profile data (some of
              this is protected for the public accounts). If you make your own
              account, you will be able to delete it from the settings later if
              you wish.
              {/* We have a messenger
              bot called "Harpy" that sends a randomized response when you send
              it messages if you would like to test the messaging functionality. */}
            </p>
          </div>

          {/* Right side - register */}
          <div className='landing__register'>
            <h1 className='landing__heading-1 landing__heading-1--reverse'>
              Sign up for an account
            </h1>
            <form noValidate onSubmit={this.onSubmit} className='landing__form'>
              <FormText
                type='email'
                name='email'
                placeholder='Email Address'
                onChange={this.onChange}
                value={this.state.email}
                errors={this.props.errors}
              />
              <FormText
                type='text'
                name='username'
                placeholder='Username'
                onChange={this.onChange}
                value={this.state.username}
                errors={this.props.errors}
              />
              <FormText
                type='password'
                name='password1'
                placeholder='Password'
                onChange={this.onChange}
                value={this.state.password1}
                errors={this.props.errors}
              />
              <FormText
                type='password'
                name='password2'
                placeholder='Password'
                onChange={this.onChange}
                value={this.state.password2}
                errors={this.props.errors}
              />
              <input
                type='submit'
                className='landing__form-btn'
                value='Register'
              />
            </form>
            <h2 className='landing__heading-2'>
              Or use one of our public accounts
            </h2>
            <PubAcc />
          </div>
        </section>
      )
    }
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
  { registerUser }
)(Home)
