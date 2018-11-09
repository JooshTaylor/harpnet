import React, { Component } from 'react';
import './Landing.css';
import logo from '../../../img/Logo-3.png';

class Landing extends Component {
    render() {
        const count = 1;
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
                            <i class="feature-icon fas fa-scroll"></i>
                            <h3 className="feature-heading">Feed</h3>
                            <p className="feature-info">
                                View the latest posts made by your friends!
                            </p>
                        </li>
                        <li className="landing__feature">
                            <i class="feature-icon fas fa-comments"></i>
                            <h3 className="feature-heading">Messages</h3>
                            <p className="feature-info">
                                Send messages to anybody on your friends list!
                            </p>
                        </li>
                    </ul>

                    <h2 className="landing__heading-2">
                        What this actually is
                    </h2>
                    <p className="landing__paragraph">
                        This website is actually just a development playground. It functions as a normal social media website with the features listed above, but
                        its primary purpose is for practicing web development skills.
                    </p>
                    <p className="landing__paragraph">
                        There are 3 dummy accounts that you can access to interact with all of the features, or you can make your own account. If you use a public account, feel free to make or delete posts, comments, friends and messages.
                        We have a messenger bot called "Harpy" that sends a randomized response when you send it messages if you would like to test the messaging functionality.
                    </p>
                </div>



                {/* Right side - register */}
                <div className="landing__register">
                    Register
                </div>
            </section>
        );
    }
}

export default Landing;
