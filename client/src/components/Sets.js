import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sets extends Component {
  render() {
    const {sets} = this.props;
    return (
      <div>
        <h1>Sets</h1>
          <div className="set-container">
            {
              sets && sets.map(set =>
                <Link key={`linkTo_${set._id}`} to={`/set/${set._id}`}>
                  <div key={`keyFor_${set._id}`} className="set-item">
                    <div className="date">{new Date(Date.parse(set.date)).toDateString()}</div>
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
