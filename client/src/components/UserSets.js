import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const uuidv1 = require('uuid/v1');

class UserSets extends Component {

  constructor(props){
    super(props);
    this.state = {
      sets:[],
      username:''
    }
  }

  componentDidMount(){
    console.log('UserSets component mounted')
    this.updateSets();
  }

  updateSets = () => {
    const username = this.props.username.username;
    this.callApi(username)
      .then(res => {
        this.setState({ sets: res, username })
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(){
    if(this.state.username !== this.props.username.username){
      this.updateSets();
    }
    console.log(this.props.username.username);
  }

  callApi = async (username) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    // Change API endpoint back to /api/setlists for deployment
    // const response = await fetch(`/api/setlists/${username}`, headers);

    const response = await fetch(`http://localhost:5000/api/setlists/${username}`, headers);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const {sets} = this.state;
    const username = this.props.username.username;
    return (
      <div>
        <h1>{`${username[username.length-1]==='s' ? username+"'" : username+"'s" }`} Sets</h1>
          <div className="set-container">
            {
              sets && sets.map(set =>
                <Link key={`linkTo_${set.slug}_${uuidv1()}`} to={`/set/${set.slug}`}>
                  <div className="set-item">
                    <div className="date">{set.date}</div>
                    <div className="venue">{set.location.venue}</div>
                    <div className="city-state">{set.location.address.city}, {set.location.address.state}</div>
                    <div className="user">–posted by {set.username}</div>
                  </div>
                </Link>
            )}
        </div>
      </div>
    );
  }
}

export default UserSets;
