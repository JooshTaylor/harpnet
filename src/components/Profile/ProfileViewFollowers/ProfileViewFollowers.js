import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileViewFollowers extends Component {
  render() {
    return (
      <div className="profile__followers">
        Followers
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    follows: state.follows
  }
}

export default connect(mapStateToProps)(ProfileViewFollowers)
