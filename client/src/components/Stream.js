import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const uuidv1 = require('uuid/v1');

class Stream extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      sets: []
    }
  }

  componentDidMount(){
    this.updateUser();
  }

  updateUser = () =>{
    this.callApi()
      .then(res => {
        console.log('updating user');
        const user = res[0];
        const sets = this.props.sets.filter(set=>{
          return user.following.includes(set.username);
        });
        this.setState({sets, user});
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Change API endpoint back to /api/setlists for deployment
    // const response = await fetch('/api/setlists', headers);

    const response = await fetch(`http://localhost:5000/api/users/${this.props.currentUser}`, headers);
    const body = await response.json();

    if (response.status !== 200) {
      console.log('problem with response');
      throw Error(body.message);
    }else{
      console.log('user found');
      return body;
    }
  };

  render() {
    const {sets} = this.state;
    return (
      <div>
        <h1>Sets From User's You Follow</h1>
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

export default Stream;
