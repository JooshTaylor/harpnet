import React, { Component } from 'react';
import './Landing.css';
import logo from '../../../img/Logo-3.png';

class Landing extends Component {
    render() {
        return (
            <section className="landing">
                <div className="flex">
                    <div className="left">
                        <div className="logo-box">
                            <img src={logo} alt="Logo" className="logo" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="login-box">
                        <h2 className="login-heading">Login</h2>
                            <form className="login-form" noValidate>
                                <input type="text" placeholder="Username Or Email Address" className="text-input" />
                                <input type="password" placeholder="Password" className="text-input" />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Landing;
