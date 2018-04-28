// STYLES
import '../styles/css/App.css';

// DEV COMPONENTS
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { firebase } from '../firebase';
import { db } from '../firebase';

// SITE COMPONENTS
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

// ROUTE VARIABLES
import * as routes from '../constants/routes';

// Logo

import setDropWhite from './set-drop-white.svg';
// MAIN APP COMPONENT
class App extends Component {

  state = {
    // AUTH OBJECT RETURNED FROM FIREBASE
    authUser: null,
    // OUR ENTIRE DB OF SETS TO RENDER ON ANY GIVEN PAGE
    sets: [],
    // THE CURRENTLY LOGGED IN USER'S USERNAME
    currentUser: null,
    // STORES THE ID OF A SET PASSED UP FROM SET SO WE CAN ACCESS IT VIA THE EDIT PANEL
    selectedSetID: null
  }

  // SET EVENT FIREBASE EVENT LISTENER TO LISTEN FOR LOG IN AND OUT
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
    // MAKE INITIAL CALL TO UPDATESETS
    this.updateSets();
  }

  // CALLS OUR API GET FUNCTION AND SETS THE RETURNED VALUE TO STATE
  updateSets = () =>{
    this.callApi()
      .then(res => {
        console.log('updating set');
        this.setState({ sets: res })
      })
      .catch(err => console.log(err));
  }

  // GET FUNCTION TO RETRIEVE THE ENTIRE COLLECTION OF SETS
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

  // RETRIVE AN ID FROM THE SET COMPONENT AND EXPOSE IT TO THE EDIT COMPONENT
  handleSelectedSetID = (id) => {
    const selectedSetID = id;
    this.setState({selectedSetID});
  }

  render() {
    const {authUser, sets, selectedSetID, currentUser} = this.state;
    return (
      <Router>
        <div className="app-container">
          <header>
            <img className="app-logo" alt="Set Drop Logo" src={setDropWhite}/>
            <Nav authUser={authUser} currentUser={currentUser}/>
          </header>

          <Route
            exact path={routes.LANDING}
            component={() =>
              <Landing />}
          />
          <Route
            exact path={routes.USER_LIST}
            component={() =>
              <UserList
                currentUser={currentUser}
              />}
          />
          <Route
            exact path={routes.ADD}
            component={({match}) =>
            <Edit
              updateSets={this.updateSets}
              currentUser={currentUser}
              route={match}
            />}
          />

          <Route
            exact path={routes.SETS}
            component={() =>
              <Sets
                updateSets={this.updateSets}
                sets={sets}
              />}
          />

          <Route
            exact path={routes.SIGN_UP}
            component={() =>
              <SignUp
              />}
          />

          <Route
            exact path={routes.LOG_IN}
            component={() => <LogIn />}
          />

          <Route
            exact path={routes.PROFILE}
            component={({match}) =>
            <Profile
              username={match.params}
              currentUser={currentUser}/>}
          />

          <Route
            exact path={routes.SET}
            component={({match}) =>
            <Set
              currentUser={currentUser}
              handleSelectedSetID={this.handleSelectedSetID}
              slug={match.params}
              updateSets={this.updateSets}
              sets={sets}/>}
          />

          {/* USERSETS ROUTE */}

          <Route
            exact path={routes.USER_SETS}
            component={({match}) =>
            <UserSets
              sets={sets}
              username={match.params}/>}
          />

          <Route
            exact path={routes.STREAM}
            component={() =>
              <Stream
                sets={sets}
                currentUser={currentUser}/>}
          />

          <Route
            exact path={routes.HOME}
            component={() =>
              <Home
                currentUser={currentUser}/>}
          />

          <Route
            exact path={routes.EDIT}
            component={({match}) =>
            <Edit
              sets={sets}
              authUser={authUser}
              route={match}
              id={selectedSetID}
              updateSets={this.updateSets}
              currentUser={currentUser}
              slug={match.params} />}
          />

        </div>
      </Router>
    );
  }
}

export default App;
