import React from 'react';
import './PubAcc.css';

const PubAcc = () => {
    return (
        <div className="public">
            <div className="account">
                <img className="account-img" src="https://robohash.org/harper/?200x200" alt="user1" />
            </div>

            <div className="account">
                <img className="account-img" src="https://robohash.org/harpette/?200x200" alt="user2" />
            </div>

            <div className="account">
                <img className="account-img" src="https://robohash.org/jason/?200x200" alt="user3" />
            </div>
        </div>
    );
}

export default PubAcc;
