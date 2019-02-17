import React from 'react'
import './Search.css'
import Spinner from '../../Common/Spinner/Spinner'
import { connect } from 'react-redux'

import Button from '../../Common/Buttons/Button'
import UserSearchInfo from '../UserSearchInfo/UserSearchInfo'
import { resetSearch, searchUsers } from '../../../actions/searchActions'
import {
  followUser,
  unfollowUser,
  getFollowData
} from '../../../actions/followsActions'
import { navigate, Link } from '@reach/router'
import ISearchProps from '../../../interfaces/ISearchProps'
import IAuthProps from '../../../interfaces/IAuthProps'
import IFollowsProps from '../../../interfaces/IFollowsProps'
import IUser from '../../../interfaces/IProfile'
import IBtnMouseEvent from '../../../interfaces/IBtnMouseEvent'

interface Props {
  followUser(
    follower: { follower_id: IUser | number },
    following: number,
    token: string,
    location: string
  ): void
  unfollowUser(
    unfollower: IUser | number,
    unfollowing: number,
    token: string,
    location: string
  ): void
  getFollowData(userData: IUser | number, token: string): void
  resetSearch(): void
  searchUsers(searchField: string, token: string): void
  search: ISearchProps
  auth: IAuthProps
  follows: IFollowsProps
  path: string
}

interface State {
  searchField: string
  inactiveButtons: number[]
}

class Search extends React.Component<Props, State> {
  public state = {
    searchField: '',
    inactiveButtons: [] as number[]
  }

  public componentDidUpdate(prevProps: Props) {
    if (
      prevProps.search.reload !== this.props.search.reload &&
      this.props.search.reload === true
    ) {
      const token = localStorage.getItem('token')
      if (token) {
        this.props.getFollowData(this.props.auth.user, token)
        this.props.searchUsers(this.props.search.searchField, token)
      }
    }
  }

  public componentDidMount() {
    const searchParams: string = window.location.pathname
      .split('/')
      .slice(2)
      .join('')
    const token = localStorage.getItem('token')
    this.setState({ searchField: searchParams }, () => {
      if (token) {
        this.props.searchUsers(this.state.searchField, token)
      }
    })
  }

  public componentWillUnmount() {
    this.props.resetSearch()
  }

  private handleFollow = (e: IBtnMouseEvent): void => {
    // Logic to handle buttons being disabled after click
    const btn: number = Number([e.target.name])
    this.setState({
      inactiveButtons: [...this.state.inactiveButtons, btn]
    })
    const self: this = this
    setTimeout(function(): void {
      const target: number = self.state.inactiveButtons.indexOf(btn)
      self.setState({
        inactiveButtons: self.state.inactiveButtons.filter(
          (btn: number) => self.state.inactiveButtons.indexOf(btn) !== target
        )
      })
    }, 1000)

    const arg1: { follower_id: number | IUser } = {
      follower_id: this.props.auth.user
    } // Follower ID
    const arg2: string[] = [e.target.name] // Following ID

    const token = localStorage.getItem('token')
    if (token) {
      this.props.followUser(arg1, Number(arg2[0]), token, 'search')
    }
  }

  private handleUnfollow = (e: IBtnMouseEvent): void => {
    // Logic to handle buttons being disabled after click
    const btn: number = Number([e.target.name])
    this.setState({
      inactiveButtons: [...this.state.inactiveButtons, btn]
    })
    const self: this = this
    setTimeout(function(): void {
      const target: number = self.state.inactiveButtons.indexOf(btn)
      self.setState({
        inactiveButtons: self.state.inactiveButtons.filter(
          btn => self.state.inactiveButtons.indexOf(btn) !== target
        )
      })
    }, 1500)

    const arg1: number | IUser = this.props.auth.user // Unfollower ID
    const arg2: string[] = [e.target.name] // Unfollowee ID

    const token = localStorage.getItem('token')
    if (token) {
      this.props.unfollowUser(arg1, Number(arg2[0]), token, 'search')
    }
  }

  public render(): JSX.Element {
    const { search, auth, follows } = this.props

    if (!localStorage.getItem('token')) {
      navigate('/')
    }

    if (search.loading && search.searchResults.length === 0) {
      return <Spinner />
    }

    const searchResults: JSX.Element[] = search.searchResults
      .filter(user => user.user_id !== auth.user)
      .map(result => {
        return (
          <li key={result.user_id} className='search__result'>
            <figure className='search__img-box'>
              <img
                className='search__img'
                src={`https://robohash.org/${result.username}/?200x200`}
                alt='profile'
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate(`/profile/${result.user_id}`)
                }}
              />
              <figcaption className='search__img-caption'>
                <Link
                  style={{ textDecoration: 'none' }}
                  className='search__username'
                  to={`/profile/${result.user_id}`}
                >
                  {result.username}
                </Link>
              </figcaption>
            </figure>
            <div className='search__info'>
              <UserSearchInfo
                fname={result.first_name}
                lname={result.last_name}
                bio={result.biography}
              />
            </div>
            <div className='search__options'>
              {follows.following.includes(result.user_id) ? (
                this.state.inactiveButtons.includes(result.user_id) ? (
                  <Button
                    name={result.user_id.toString()}
                    className='unfollow'
                    active={false}
                  />
                ) : (
                  <Button
                    name={result.user_id.toString()}
                    text='Unfollow'
                    callback={this.handleUnfollow}
                    className='unfollow'
                  />
                )
              ) : this.state.inactiveButtons.includes(result.user_id) ? (
                <Button
                  name={result.user_id.toString()}
                  className='follow'
                  active={false}
                />
              ) : (
                <Button
                  name={result.user_id.toString()}
                  text='Follow'
                  callback={this.handleFollow}
                  className='follow'
                />
              )}
              <Button
                text='View Profile'
                callback={() => {
                  navigate(`/profile/${result.user_id}`)
                }}
                className='edit-profile-btn'
              />
            </div>
          </li>
        )
      })

    return (
      <div className='search'>
        <div className='search__for-box'>
          <h1 className='search__for'>
            Showing {searchResults.length} search results for:{' '}
            <span>{search.searchField}</span>
          </h1>
        </div>
        <ul className='search__results'>{searchResults}</ul>
      </div>
    )
  }
}

const mapStateToProps = (state: Props) => {
  return {
    search: state.search,
    auth: state.auth,
    follows: state.follows
  }
}

export default connect(
  mapStateToProps,
  { getFollowData, searchUsers, followUser, unfollowUser, resetSearch }
)(Search)
