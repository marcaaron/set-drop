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
import Edit from './Edit';
import Profile from './Profile';
import Set from './Set';
import Stream from './Stream';
import UserSets from './UserSets';
import Sets from './Sets';
import UserList from './UserList';
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
      currentUser: null,
      selectedSetID: null,
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if(authUser){
        console.log('user is authorized');
        db.onceGetUsers().then(snapshot =>{
          // const snappyshot = snapshot.val();
          const currentUser = snapshot.val()[authUser.uid].username;
          this.setState(() => ({ authUser, currentUser }));
        });
      }else{
          this.setState(() => ({ authUser: null, currentUser:null }));
      }
    });
    this.updateSets();
  }

  handleSelectedSetID = (id) => {
    const selectedSetID = id;
    this.setState({selectedSetID});
  }

  updateSets = () =>{
    this.callApi()
      .then(res => {
        console.log('updating set');
        this.setState({ sets: res })
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Change API endpoint back to /api/setlists for deployment
    // const response = await fetch('/api/setlists', headers);

    const response = await fetch('http://localhost:5000/api/setlists/', headers);
    const body = await response.json();

    if (response.status !== 200) {
      console.log('problem with response');
      throw Error(body.message);
    }else{
      console.log('sets updated');
      return body;
    }
  };

  render() {
    const {authUser, sets, selectedSetID, currentUser} = this.state;
    return (
      <Router>
        <div>
          <Nav authUser={authUser} currentUser={currentUser}/>
          <hr/>
          <Route
            exact path={routes.LANDING}
            component={() => <Landing />}
          />
          <Route
            exact path={routes.USER_LIST}
            component={() => <UserList currentUser={currentUser} />}
          />
          <Route
            exact path={routes.ADD}
            component={({match}) => <Edit updateSets={this.updateSets} currentUser={currentUser} route={match}/>}
          />
          <Route
            exact path={routes.SETS}
            component={() => <Sets updateSets={this.updateSets} sets={sets}  />}
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
            exact path={routes.PROFILE}
            component={({match}) => <Profile username={match.params} currentUser={currentUser}/>}
          />
          <Route
            exact path={routes.SET}
            component={({match}) => <Set currentUser={currentUser} handleSelectedSetID={this.handleSelectedSetID} slug={match.params} sets={sets}/>}
          />
          <Route
            exact path={routes.USER_SETS}
            component={({match}) => <UserSets username={match.params}/>}
          />
          <Route
            exact path={routes.STREAM}
            component={() => <Stream sets={sets} currentUser={currentUser}/>}
          />
          <Route
            exact path={routes.HOME}
            component={() => <Home currentUser={currentUser}/>}
          />
          <Route
            exact path={routes.ACCOUNT}
            component={() => <Account />}
          />
          <Route
            exact path={routes.EDIT}
            component={({match}) => <Edit route={match} id={selectedSetID} updateSets={this.updateSets} currentUser={currentUser} slug={match.params} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
