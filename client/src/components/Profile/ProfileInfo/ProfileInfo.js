import React from 'react'
import './ProfileInfo.css'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'

import Button from '../../Button/Button'

const ProfileInfo = ({
  profile,
  follows,
  handleFollow,
  handleUnfollow,
  inactiveButtons
}) => {
  const infoCheck =
    !profile.viewProfile.profile.biography &&
    !profile.viewProfile.profile.first_name &&
    !profile.viewProfile.profile.last_name ? (
      <p>This user has not provided any personal information</p>
    ) : null
  return (
    <div className="info__top">
      <div className="info__img-box">
        <img
          src={`https://robohash.org/${
            profile.viewProfile.profile.username
          }/?200x200`}
          alt="profile"
          className="info__img"
        />
        <h1 className="info__username">
          {profile.viewProfile.profile.username}
        </h1>
      </div>
      <div className="info__info">
        {profile.viewProfile.profile.first_name &&
        profile.viewProfile.profile.last_name ? (
          <p className="info__name">
            <strong>Name:</strong> {profile.viewProfile.profile.first_name}{' '}
            {profile.viewProfile.profile.last_name}
          </p>
        ) : null}
        {profile.viewProfile.profile.first_name &&
        !profile.viewProfile.profile.last_name ? (
          <p className="info__name">
            <strong>Name:</strong> {profile.viewProfile.profile.first_name}
          </p>
        ) : null}
        {profile.viewProfile.profile.biography ? (
          <p className="info__bio">
            <strong>Bio:</strong> {profile.viewProfile.profile.biography}
          </p>
        ) : null}
        {infoCheck}
      </div>
      <div className="info__actions">
        {profile.viewProfile.profile.username === profile.profile.username ? (
          <button onClick={() => navigate('/settings')} className="info__btn">
            Edit Profile
          </button>
        ) : null}
        {profile.viewProfile.profile.username !== profile.profile.username ? (
          !follows.following.includes(profile.viewProfile.profile.user_id) ? (
            inactiveButtons.includes(profile.viewProfile.profile.user_id) ? (
              <Button
                name={profile.viewProfile.profile.user_id}
                className="follow"
                active={false}
              />
            ) : (
              <Button
                name={profile.viewProfile.profile.user_id}
                text="Follow"
                callback={handleFollow}
                className="follow"
              />
            )
          ) : inactiveButtons.includes(profile.viewProfile.profile.user_id) ? (
            <Button
              name={profile.viewProfile.profile.user_id}
              className="unfollow"
              active={false}
            />
          ) : (
            <Button
              name={profile.viewProfile.profile.user_id}
              text="Unfollow"
              callback={handleUnfollow}
              className="unfollow"
            />
          )
        ) : null}
      </div>
    </div>
  )
}

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  follows: PropTypes.object.isRequired,
  handleFollow: PropTypes.func.isRequired,
  handleUnfollow: PropTypes.func.isRequired,
  inactiveButtons: PropTypes.array.isRequired
}

export default ProfileInfo
