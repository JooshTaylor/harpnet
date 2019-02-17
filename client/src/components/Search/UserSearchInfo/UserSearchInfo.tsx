import React from 'react'
import './UserSearchInfo.css'

interface Props {
  fname: string
  lname: string
  bio: string
}

// Displays user profile information based on what they have provided
const UserSearchInfo: React.SFC<Props> = ({
  fname,
  lname,
  bio
}): JSX.Element => {
  function getInfo(): JSX.Element {
    if (!fname && !lname && !bio) {
      return (
        <h3 className='search__info-noinfo'>
          This user has not provided any personal information
        </h3>
      )
    } else if (!bio && fname) {
      return lname ? (
        <h3>
          {fname} {lname}
        </h3>
      ) : (
        <h3>{fname}</h3>
      )
    } else if (bio && !fname) {
      return <p>{bio}</p>
    } else if (bio && fname) {
      return lname ? (
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
    } else {
      return <></>
    }
  }

  return <div className='info'>{getInfo()}</div>
}

export default UserSearchInfo
