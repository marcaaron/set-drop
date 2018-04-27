import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
const FORMAT = 'M/D/YYYY';
const uuidv1 = require('uuid/v1');

class UserSets extends Component {
  render() {
    const {sets} = this.props;
    const username = this.props.username.username;
    let userSets = sets.filter(set=>set.username === this.props.username.username);
    return (
      <div>
        <h1>{`${username[username.length-1]==='s' ? username+"'" : username+"'s" }`} Sets</h1>
          <div className="set-container">
            {
              sets && userSets.length>0 && userSets.map(set =>
                <Link key={`linkTo_${set.slug}_${uuidv1()}`} to={`/set/${set.slug}`}>
                  <div className="set-item">
                    <div className="date">{format(set.date, FORMAT)}</div>
                    <div className="venue">{set.location.venue}</div>
                    <div className="city-state">{set.location.address.city}, {set.location.address.state}</div>
                    <div className="user">–posted by {set.username}</div>
                  </div>
                </Link>
            )}
            {
              sets && userSets.length===0 &&
                <div>
                  <Link to={`/add-set/`}>
                    Click Here to Create Your First Set
                  </Link>
                </div>
            }
        </div>
      </div>
    );
  }
}

export default UserSets;
