import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import Spinner from "../Common/Spinner";

export default ChildComponent => {
  class Authenticate extends Component {
    // -1 = "unknown", 0 = "unauthorised", 1 = "authorised"
    state = {
      authorised: -1
    };

    componentDidMount() {
      if (!this.props.auth.isLoggedIn) {
        localStorage.removeItem("token");
        this.setState({ authorised: 0 });
        navigate("/login");
      } else {
        this.setState({ authorised: 1 });
      }
    }

    isAuthorised() {
      if (this.state.authorised === -1) {
        return <Spinner />;
      } else if (this.state.authorised === 0) {
        return <h1 style={{ paddingTop: "100px" }}>Failureee</h1>;
      } else if (this.state.authorised === 1) {
        return <ChildComponent {...this.props} />;
      }
    }

    render() {
      return <Fragment>{this.isAuthorised()}</Fragment>;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth
    };
  }

  return connect(mapStateToProps)(Authenticate);
};
