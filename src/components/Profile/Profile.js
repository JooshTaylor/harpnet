import React, { Component } from 'react';
import './Profile.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Common/Spinner';
import { getProfileById, clearViewProfile } from '../../actions/profileActions';

class Profile extends Component {

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id, localStorage.getItem('token'));
    } else {
      this.props.getProfileById(this.props.auth.user.user_id, localStorage.getItem('token'));
    }
  }

  componentWillUnmount() {
    this.props.clearViewProfile();
  }

  render() {
    const { profile } = this.props;


    if (profile.loading && Object.keys(profile.viewProfile).length === 0) {
      return (<div className="profile-spinner"><Spinner /></div>)
    } else {
      return (
        <div className="profile">
          {profile.viewProfile.username}
        </div>
      )
    }
  }
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  clearViewProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { getProfileById, clearViewProfile })(Profile);
