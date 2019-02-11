import React from 'react'
import './ProfileViewFollowing.css'
import PropTypes from 'prop-types'
import { navigate, Link } from '@reach/router'

import Button from '../../Common/Buttons/Button'
import UserSearchInfo from '../../Search/UserSearchInfo/UserSearchInfo'

const ProfileViewFollowing = ({
  followings,
  clientFollows,
  handleFollow,
  handleUnfollow,
  clientId,
  inactiveButtons
}) => {
  const followingsWidget = followings.map(following => {
    return (
      <li key={following.user_id} className='following__following'>
        <figure className='following__img-box'>
          <img
            className='following__img'
            src={`https://robohash.org/${following.username}/?200x200`}
            alt='profile'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(`/profile/${following.user_id}`)
            }}
          />
          <figcaption className='following__img-caption'>
            <Link
              style={{ textDecoration: 'none' }}
              className='following__username'
              to={`/profile/${following.user_id}`}
            >
              {following.username}
            </Link>
          </figcaption>
        </figure>
        <div className='following__info'>
          <UserSearchInfo
            fname={following.first_name}
            lname={following.last_name}
            bio={following.biography}
          />
        </div>
        <div className='following__options'>
          {clientFollows.includes(following.user_id) &&
          following.user_id !== clientId ? (
            inactiveButtons.includes(following.user_id) ? (
              <Button
                name={following.user_id}
                className='unfollow'
                active={false}
              />
            ) : (
              <Button
                name={following.user_id}
                text='Unfollow'
                callback={handleUnfollow}
                className='unfollow'
              />
            )
          ) : following.user_id !== clientId ? (
            inactiveButtons.includes(following.user_id) ? (
              <Button
                name={following.user_id}
                className='follow'
                active={false}
              />
            ) : (
              <Button
                name={following.user_id}
                text='Follow'
                callback={handleFollow}
                className='follow'
              />
            )
          ) : null}
          <Button
            text='View Profile'
            callback={() => {
              navigate(`/profile/${following.user_id}`)
            }}
            className='edit-profile-btn'
          />
        </div>
      </li>
    )
  })
  return <ul className='followings'>{followingsWidget}</ul>
}

ProfileViewFollowing.propTypes = {
  handleFollow: PropTypes.func.isRequired,
  handleUnfollow: PropTypes.func.isRequired,
  clientFollows: PropTypes.array.isRequired,
  clientId: PropTypes.number.isRequired,
  followings: PropTypes.array.isRequired,
  inactiveButtons: PropTypes.array.isRequired
}

export default ProfileViewFollowing
