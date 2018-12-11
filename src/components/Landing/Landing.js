import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Landing.css';
import FormText from '../Forms/FormText/FormText';
import FormDate from '../Forms/FormDate/FormDate';
import PubAcc from '../Common/PubAcc/PubAcc';
import { withRouter, Redirect } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';

import { connect } from 'react-redux';

class Landing extends Component {
    constructor(props) {
        super(props);
        //This component as well as the official register page allows for registration. The state tracks input values.
        this.state = {
            email: "",
            username: "",
            password1: "",
            password2: "",
            day: "",
            month: "",
            year: ""
        }
    }

    //Tracking input value changes
    onChange = (e) => {
        this.setState({
            //For cases where the input is not password, it will be converted to lowercase for DB storing. This makes input fields case insensitive (except for the passwords)
            [e.target.name]: e.target.value
        })
    }

    //Runs on form submission
    onSubmit = (e) => {
        e.preventDefault();

        const { email, username, password1, password2 } = this.state;

        //If a date dropdown field was not entered, its value is converted to an empty string to be detected invalid by the backend form validation. Otherwise, converted to DD-MM-YYYY format
        const dob = this.state.day === "" || this.state.month === "" || this.state.year === "" ?
            "" :
            `${this.state.day}-${this.state.month}-${this.state.year}`;

        const userData = {
            email: email.toLowerCase(),
            username,
            password1,
            password2,
            dob
        }

        //Redux action for registering users. Takes form data and browser history.
        this.props.registerUser(userData, this.props.history);
    }

    render() {
        const count = 1; //temporary
        //If a users is logged in, they cannot access this page and are redirected to their feed.
        if (this.props.auth.isLoggedIn) {
            return (<Redirect to='/feed' />)
        } else {
            return (
                <section className="landing">
                    {/* Left side - information */}
                    <div className="landing__info">
                        <h1 className="landing__heading-1">
                            Welcome to Harpnet
                        </h1>
                        <h2 className="landing__heading-2">
                            The hottest social networking website of 2019
                        </h2>
                        <p className="landing__paragraph">
                            Boasting a total of {count} accounts as of today, Harpnet is a fast growing social networking website where you can connect with anybody from your friends and family to your colleagues.
                            We offer the following features:
                        </p>
                        <ul className="landing__features">
                            <li className="landing__feature">
                                <i className="feature-icon fas fa-users"></i>
                                <h3 className="feature-heading">Profiles</h3>
                                <p className="feature-info">
                                    Create your own profile and view other user profiles!
                                </p>
                            </li>
                            <li className="landing__feature">
                                <i className="feature-icon fas fa-scroll"></i>
                                <h3 className="feature-heading">Feed</h3>
                                <p className="feature-info">
                                    Follow or other people to see their posts and gain followers who can view yours!
                                </p>
                            </li>
                            <li className="landing__feature">
                                <i className="feature-icon fas fa-comments"></i>
                                <h3 className="feature-heading">Messages</h3>
                                <p className="feature-info">
                                    Send instant messages to anybody that you want to talk to!
                                </p>
                            </li>
                        </ul>

                        <h2 className="landing__heading-2">
                            What this actually is
                        </h2>
                        <p className="landing__paragraph">
                            This website is actually just a development playground. It functions as a normal social media website with the features listed above and can be used for that purpose, but its primary purpose is for practicing web development skills.
                        </p>
                        <p className="landing__paragraph">
                            There are 3 dummy accounts that you can access to interact with all of the features, or you can make your own account. If you use a public account, feel free to make or delete posts and comments, follow/unfollow accounts, and send messages.
                            We have a messenger bot called "Harpy" that sends a randomized response when you send it messages if you would like to test the messaging functionality.
                        </p>
                    </div>



                    {/* Right side - register */}
                    <div className="landing__register">
                        <h1 className="landing__heading-1 landing__heading-1--reverse">
                            Sign up for an account
                        </h1>
                        <form noValidate onSubmit={this.onSubmit} className="landing__form">
                            <FormText type="email" name="email" placeholder="Email Address" onChange={this.onChange} value={this.state.email} errors={this.props.errors} />
                            <FormText type="text" name="username" placeholder="Username" onChange={this.onChange} value={this.state.username} errors={this.props.errors} />
                            <FormText type="password" name="password1" placeholder="Password" onChange={this.onChange} value={this.state.password1} errors={this.props.errors} />
                            <FormText type="password" name="password2" placeholder="Password" onChange={this.onChange} value={this.state.password2} errors={this.props.errors} />
                            <FormDate name="dob" onChange={this.onChange} errors={this.props.errors} />
                            <input type="submit" className="landing__form-btn" value="Register" />
                        </form>
                        <h2 className="landing__heading-2">
                            Or use one of our public accounts
                        </h2>
                        <PubAcc />
                    </div>
                </section>
            );
        }
    }
}

Landing.propTypes = {
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        errors: state.errors,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { registerUser })(withRouter(Landing));
