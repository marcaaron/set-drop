import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const uuidv1 = require('uuid/v1');

class Sets extends Component {

  componentDidUpdate(){
    this.props.updateSets();
  }

  render() {
    const {sets} = this.props;
    return (
      <div>
        <h1>Recent Sets From All Users</h1>
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

export default Sets;
