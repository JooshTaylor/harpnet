import React from 'react'
import './SuggestedFollowsUser.css'
import Button from '../../Common/Buttons/Button'
import { navigate } from '@reach/router'

const SuggestedFollowsUser = ({ user, handleFollow }) => {
  return (
    <div className='suggestion'>
      <div className='suggestion__img-box'>
        <img
          className='suggestion__img'
          src={`https://robohash.org/${user.username}/?200x200`}
          alt={user.username}
          onClick={() => navigate(`/profile/${user.user_id}`)}
        />
      </div>
      <div className='suggestion__rhs'>
        <h5
          className='suggestion__username'
          onClick={() => navigate(`/profile/${user.user_id}`)}
        >
          {user.username}
        </h5>
        <Button
          className='sugg-follow'
          name={user.user_id}
          callback={handleFollow}
          text='Follow'
        />
      </div>
    </div>
  )
}

export default SuggestedFollowsUser
