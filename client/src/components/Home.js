import React, { Component } from "react";
import Form from "./Forms/Form";
import HomeStyles from "../styles/Home";
import { H1, H2 } from "../styles/headings";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { navigate } from "@reach/router";

// import FormText from "./Forms/FormText/FormText";
import PubAcc from "./Common/PubAcc/PubAcc";
import { registerUser } from "./../actions/authActions";

class Home extends Component {
  //Runs on form submission
  onSubmit = e => {
    e.preventDefault();

    const { email, username, password1, password2 } = this.state;
    const userData = {
      email: email.toLowerCase(),
      username,
      password1,
      password2
    };

    //Redux action for registering users. Takes form data and browser history.
    this.props.registerUser(userData);
  };

  render() {
    //If a users is logged in, they cannot access this page and are redirected to their feed.
    if (this.props.auth.isLoggedIn) {
      navigate("/feed");
      return null;
    } else {
      return (
        <HomeStyles>
          {/* Left side - information */}
          <div className="landing__info">
            <H1>Welcome to Harpnet</H1>
            <H2>The hottest social networking website of 2019</H2>
            <p className="landing__paragraph">
              Harpnet is a fast growing social networking website where you can
              connect with anybody from your friends and family to your
              colleagues. We offer the following features:
            </p>
            <ul className="landing__features">
              <li className="landing__feature">
                <i className="feature-icon fas fa-users" />
                <h3 className="feature-heading">Profiles</h3>
                <p className="feature-info">
                  Create your own profile and view other user profiles!
                </p>
              </li>
              <li className="landing__feature">
                <i className="feature-icon fas fa-scroll" />
                <h3 className="feature-heading">Feed</h3>
                <p className="feature-info">
                  Follow or other people to see their posts and gain followers
                  who can view yours!
                </p>
              </li>
              <li className="landing__feature">
                <i className="feature-icon fas fa-comments" />
                <h3 className="feature-heading">Messages</h3>
                <p className="feature-info">
                  Send instant messages to anybody that you want to talk to!
                </p>
              </li>
            </ul>

            <H2>What this actually is</H2>
            <p className="landing__paragraph">
              This website is actually just a development playground. I'm
              continuously developing this to practice creating larger scale
              applications using React.js, Redux, Node.js, Postgres and Redis.
            </p>
            <p className="landing__paragraph">
              There are 3 dummy accounts that you can access to interact with
              all of the features, or you can make your own account. If you use
              a public account, feel free to make or delete posts and comments,
              follow/unfollow accounts or edit the basic profile data (some of
              this is protected for the public accounts). If you make your own
              account, you will be able to delete it from the settings later if
              you wish.
              {/* We have a messenger
              bot called "Harpy" that sends a randomized response when you send
              it messages if you would like to test the messaging functionality. */}
            </p>
          </div>

          {/* Right side - register */}
          <div className="landing__register">
            <H1 reverse>Sign up for an account</H1>
            <Form register />
            <H2>Or use one of our public accounts</H2>
            <PubAcc />
          </div>
        </HomeStyles>
      );
    }
  }
}

Home.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(Home);
