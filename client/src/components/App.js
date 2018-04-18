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
import Home from './Home';
import Account from './Account';
import { firebase } from '../firebase';

// Variables
import * as routes from '../constants/routes';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      authUser: null,
      response: ''
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
    
    // this.callApi()
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));

  }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //
  //   if (response.status !== 200) throw Error(body.message);
  //
  //   return body;
  // };

  render() {
    const {authUser} = this.state;
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
            exact path={routes.SIGN_UP}
            component={() => <SignUp />}
          />
          <Route
            exact path={routes.LOG_IN}
            component={() => <LogIn />}
          />
          <Route
            exact path={routes.HOME}
            component={() => <Home />}
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
