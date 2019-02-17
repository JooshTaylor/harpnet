import React, { Component } from 'react'
import './Settings.css'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'

import Modal from 'react-modal'
import modalStyles from '../Common/Modal/modalStyles'
import Button from '../Common/Buttons/Button'
import Spinner from '../Common/Spinner/Spinner'
import { deleteAccount, logoutUser } from '../../actions/authActions'
import {
  getProfile,
  changePrivacy,
  updateBio,
  updateFirstName,
  updateLastName
} from '../../actions/profileActions'
import ISettings from '../../interfaces/ISettings'
import IProfileProps from '../../interfaces/IProfileProps'
import IAuthProps from '../../interfaces/IAuthProps'
import IUser from '../../interfaces/IUser'

interface Props {
  auth: IAuthProps
  profile: IProfileProps
  getProfile(user: IUser | number, token: string): void
  changePrivacy(
    privacy: { state: number },
    user: IUser | Number,
    token: string
  ): void
  updateBio(bio: { bio: string }, user: IUser | number, token: string): void
  updateFirstName(
    fname: { fname: string },
    user: IUser | number,
    token: string
  ): void
  updateLastName(
    lname: { lname: string },
    user: IUser | number,
    token: string
  ): void
  deleteAccount(userData: IUser | number, token: string): void
  logoutUser(token: string): void
  path: string
}

class Settings extends Component<Props, ISettings> {
  // Privacy states: 1 = public, 2 = public to followers only, 3 = private to all.
  public state = {
    privacy: 1,
    bio: '',
    firstName: '',
    lastName: '',
    loading: false,
    showModal: false
  }

  public componentDidMount() {
    const { profile } = this.props.profile
    this.setState({
      privacy: profile.privacy,
      bio: profile.biography,
      firstName: profile.first_name,
      lastName: profile.last_name
    })
  }

  public componentDidUpdate(prevProps: Props) {
    const { profile }: IProfileProps = this.props.profile
    if (prevProps.profile.profile.privacy !== profile.privacy) {
      this.setState({
        privacy: profile.privacy
      })
    }
    if (prevProps.profile.profile.first_name !== profile.first_name) {
      this.setState({
        firstName: profile.first_name
      })
    }
    if (prevProps.profile.profile.last_name !== profile.last_name) {
      this.setState({
        lastName: profile.last_name
      })
    }
    if (prevProps.profile.profile.biography !== profile.biography) {
      this.setState({
        bio: profile.biography === null ? '' : profile.biography
      })
    }
  }

  private openModal = (): void => {
    this.setState({
      showModal: true
    })
  }

  private closeModal = (): void => {
    this.setState({
      showModal: false
    })
  }

  private togglePrivacy = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ privacy: Number([e.target.name]) })
  }

  private handleFNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.setState({ firstName: e.target.value })
  }

  private handleLNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.setState({ lastName: e.target.value })
  }

  private handleBioChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    this.setState({ bio: e.target.value })
  }

  private deleteAccount = () => {
    const token = localStorage.getItem('token')
    if (token) {
      this.props.deleteAccount(this.props.auth.user, token)
      this.props.logoutUser(token)
    }
  }

  private saveChanges = (): void => {
    const { auth, profile } = this.props
    const token = localStorage.getItem('token')

    if (token) {
      if (this.state.privacy !== profile.profile.privacy) {
        this.props.changePrivacy(
          { state: this.state.privacy },
          auth.user,
          token
        )
      }

      if (this.state.bio !== profile.profile.biography) {
        this.props.updateBio({ bio: this.state.bio }, auth.user, token)
      }

      if (this.state.firstName !== profile.profile.first_name) {
        this.props.updateFirstName(
          { fname: this.state.firstName },
          auth.user,
          token
        )
      }

      if (this.state.lastName !== profile.profile.last_name) {
        this.props.updateLastName(
          { lname: this.state.lastName },
          auth.user,
          token
        )
      }

      this.setState({
        loading: true
      })
      const self = this
      setTimeout(function() {
        self.setState({ loading: false })
        self.props.getProfile(self.props.auth.user, token)
        navigate(`/profile/${auth.user}`)
      }, 3000)
    }
  }

  public render(): JSX.Element {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }

    if (this.props.auth.user !== -1 && !this.props.auth.isLoggedIn) {
      localStorage.removeItem('token')
      navigate('/login')
    }

    let settingsWidget: JSX.Element

    if (
      Object.keys(this.props.profile.profile).length === 0 ||
      this.state.loading
    ) {
      return <Spinner />
    } else if (
      ['Harper', 'Harphene', 'Bailey'].includes(
        this.props.profile.profile.username
      )
    ) {
      settingsWidget = (
        <div className='settings__settings'>
          <h1 className='settings__heading-1'>Account Settings</h1>
          <h2>
            Sorry! You cannot edit the account settings for a public account.
            Please make your own account to test these out (your account may be
            deleted from this same page later).
          </h2>
        </div>
      )
    } else {
      if (this.props.profile.reload) {
        const token = localStorage.getItem('token')
        if (token) {
          this.props.getProfile(this.props.auth.user, token)
        }
      }

      settingsWidget = (
        <div className='settings__settings'>
          <h1 className='settings__heading-1'>Account Settings</h1>
          <div className='settings__borders'>
            <div className='settings__set'>
              <h2 className='settings__heading-2'>
                Make your profile completely public:
              </h2>
              <Button
                text='Public'
                name='1'
                className={
                  this.state.privacy === 1 ? 'follow' : 'edit-profile-btn'
                }
                callback={this.togglePrivacy}
              />
            </div>
            <div className='settings__set'>
              <h2 className='settings__heading-2'>
                Make your profile only public to followers:
              </h2>
              <Button
                text='Semi-Private'
                name='2'
                className={
                  this.state.privacy === 2 ? 'follow' : 'edit-profile-btn'
                }
                callback={this.togglePrivacy}
              />
            </div>
            <div className='settings__set'>
              <h2 className='settings__heading-2'>
                Make your profile private to everybody
              </h2>
              <Button
                text='Private'
                name='3'
                className={
                  this.state.privacy === 3 ? 'follow' : 'edit-profile-btn'
                }
                callback={this.togglePrivacy}
              />
            </div>
          </div>
          <div className='settings__set'>
            <h2 className='settings__heading-2'>Delete your account?</h2>
            <Button
              text='Delete'
              className='unfollow'
              callback={this.openModal}
            />
          </div>
        </div>
      )
    }
    return (
      <>
        <div className='settings'>
          {settingsWidget}
          <div className='settings__profile'>
            <h1 className='settings__heading-1'>Profile Settings</h1>
            <div className='settings__borders'>
              <div className='settings__set'>
                <h2 className='settings__heading-2'>Change first name:</h2>
                <input
                  className='settings__input'
                  onChange={this.handleFNameChange}
                  value={this.state.firstName}
                />
              </div>
              <div className='settings__set'>
                <h2 className='settings__heading-2'>Change last name:</h2>
                <input
                  className='settings__input'
                  onChange={this.handleLNameChange}
                  value={this.state.lastName}
                />
              </div>
              <div className='settings__set'>
                <h2 className='settings__heading-2'>Change biography:</h2>
                <textarea
                  className='settings__input-large'
                  onChange={this.handleBioChange}
                  value={this.state.bio}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='save-changes'>
          <div className='settings__set'>
            <h2 className='settings__heading-2'>Save Changes:</h2>
            <Button
              text='Save'
              className='follow'
              callback={this.saveChanges}
            />
          </div>
        </div>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
          contentLabel='Delete Account Warning Modal'
          style={modalStyles}
        >
          <h2 className='modal__heading'>
            Are you sure you want to delete your account?
          </h2>
          <p className='modal__paragraph'>
            Once an account is deleted, its data can never be recovered.
          </p>
          <div className='modal__btns'>
            <Button
              text='Go Back'
              callback={this.closeModal}
              className='modal-go-back'
            />
            <Button
              text='Delete'
              callback={this.deleteAccount}
              className='modal-delete'
            />
          </div>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state: Props) => {
  return {
    auth: state.auth,
    profile: state.profile
  }
}

export default connect(
  mapStateToProps,
  {
    deleteAccount,
    logoutUser,
    getProfile,
    changePrivacy,
    updateBio,
    updateFirstName,
    updateLastName
  }
)(Settings)
