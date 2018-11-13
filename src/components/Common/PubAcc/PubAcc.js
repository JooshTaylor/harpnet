import React, { Component } from 'react';
import './PubAcc.css';
import { loginUser } from '../../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class PubAcc extends Component {
    publicAccount = (e) => {
        const botInfo = {};

        switch (e) {
            default:
                return null;
                break;
            case "account-1":
                botInfo.userOrEmail = "Harper";
                botInfo.password = "harperpassword";
                break;
            case "account-2":
                botInfo.userOrEmail = "Harphene";
                botInfo.password = "harphenepassword";
                break;
            case "account-3":
                botInfo.userOrEmail = "Bailey";
                botInfo.password = "baileypassword";
                break;
        }

        this.props.loginUser(botInfo, this.props.history);
    }

    render() {
        return (
            <div className="public" >
                <div className="account">
                    <button onClick={() => this.publicAccount("account-1")} type="button" className="account-link">
                        <img className="account-img" src="https://robohash.org/Harper/?200x200" alt="user1" />
                    </button>
                </div>

                <div className="account">
                    <button onClick={() => this.publicAccount("account-2")} type="button" className="account-link">
                        <img className="account-img" src="https://robohash.org/Harphene/?200x200" alt="user2" />
                    </button>
                </div>

                <div className="account">
                    <button onClick={() => this.publicAccount("account-3")} type="button" className="account-link">
                        <img className="account-img" src="https://robohash.org/Bailey/?200x200" alt="user3" />
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(null, { loginUser })(withRouter(PubAcc));
