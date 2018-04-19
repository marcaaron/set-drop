// Styles
import './App.css';

// Components
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
  // Page Components
import Nav from './Nav';
import Landing from './Landing';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Add from './Add';

import Set from './Set';

import Sets from './Sets';
import Home from './Home';
import Account from './Account';
import { firebase } from '../firebase';
import { db } from '../firebase';

// Variables
import * as routes from '../constants/routes';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      authUser: null,
      sets: [],
      currentUser: null
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if(authUser){
        console.log('authUser!');
        db.onceGetUsers().then(snapshot =>{
          // const snappyshot = snapshot.val();
          const currentUser = snapshot.val()[authUser.uid].username;
          this.setState(() => ({ authUser, currentUser }));
        });
      }else{
          this.setState(() => ({ authUser: null, currentUser:null }));
      }
    });

    this.callApi()
      .then(res => {
        // console.log('sets loaded');
        // console.log(res);
        this.setState({ sets: res })
      })
      .catch(err => console.log(err));

  }

  callApi = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    // Change API endpoint back to /api/setlists for deployment
    // const response = await fetch('/api/setlists', headers);

    const response = await fetch('http://localhost:5000/api/setlists/', headers);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const {authUser, sets, currentUser} = this.state;
    return (
      <Router>
        <div>
          <Nav authUser={authUser}/>
          <hr/>
          <Route
            exact path={routes.LANDING}
            component={() => <Landing />}
          />
          <Route
            exact path={routes.ADD}
            component={() => <Add currentUser={currentUser}/>}
          />
          <Route
            exact path={routes.SETS}
            component={() => <Sets sets={sets}  />}
          />
          <Route
            exact path={routes.SIGN_UP}
            component={() => <SignUp />}
          />
          <Route
            exact path={routes.LOG_IN}
            component={() => <LogIn />}
          />
          <Route
            exact path={routes.SET}
            component={({match}) => <Set id={match.params} sets={sets}/>}
          />
          <Route
            exact path={routes.HOME}
            component={() => <Home currentUser={currentUser}/>}
          />
          <Route
            exact path={routes.ACCOUNT}
            component={() => <Account />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
