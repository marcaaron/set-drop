import React, { Component } from 'react';
import SignOut from './SignOut';
import { db } from '../firebase';

class Home extends Component {
  render() {
    const {currentUser} = this.props;
    return (
      <div>
        <h1>Home</h1>
        <p>Welcome {currentUser}!</p>
        {currentUser &&
          <div className="wrong-user">
            <p>Not {currentUser}?</p><SignOut/>
          </div>
        }
      </div>
    );
  }
}

export default Home;
