import React from 'react';
import SignOut from './SignOut';

const Home = (props) => {
  const {currentUser} = props;
  return (
    <div className="content-container">
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

export default Home;
