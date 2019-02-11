import React from 'react'
import './UserSearchInfo.css'
import PropTypes from 'prop-types'

const UserSearchInfo = props => {
  const { fname, lname, bio } = props

  // This component simply handles all cases for whether a user being searched has provided information or not.
  let info

  if (!fname && !lname && !bio) {
    info = (
      <h3 className='search__info-noinfo'>
        This user has not provided any personal information
      </h3>
    )
  } else if (!bio && fname) {
    info = lname ? (
      <h3>
        {fname} {lname}
      </h3>
    ) : (
      <h3>{fname}</h3>
    )
  } else if (bio && !fname) {
    info = <p>{bio}</p>
  } else if (bio && fname) {
    info = lname ? (
      <div>
        <h3>
          {fname} {lname}
        </h3>{' '}
        <p>{bio}</p>{' '}
      </div>
    ) : (
      <div>
        <h3>{fname}</h3> <p>{bio}</p>{' '}
      </div>
    )
  }

  return <div className='info'>{info}</div>
}

UserSearchInfo.propTypes = {
  fname: PropTypes.string,
  lname: PropTypes.string,
  bio: PropTypes.string
}

export default UserSearchInfo
