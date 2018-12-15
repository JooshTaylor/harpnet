import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileViewFollowing.css';

class ProfileViewFollowing extends Component {
  render() {
    const { follows, profile } = this.props;
    // const following = follows.profile.following.map(user => {
    //   let profileInstance = profile.profile.
    //     return(
    //       <li>
    //         {user.following}
    //       </li>
    //     )
    // })

    return (
      <div className="profile__following">
        following
        {/* {following} */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    follows: state.follows,
    profile: state.profile
  }
}

export default connect(mapStateToProps)(ProfileViewFollowing)
