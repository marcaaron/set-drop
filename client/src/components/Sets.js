import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import arrowSVG from './arrow-fwd.svg';
const FORMAT = 'M/D/YYYY';
const uuidv1 = require('uuid/v1');

class Sets extends Component {
  render() {
    const {sets} = this.props;

    return (
      <div clasName="content-container">
        <h1>Recent Sets From All Users</h1>
          <div className="set-container">
            {
              sets && sets.map(set =>
                <Link key={`linkTo_${set.slug}_${uuidv1()}`} to={`/set/${set.slug}`}>
                  <div className="set-item">
                    <div style={{width:60, height:60, backgroundColor:'white'}} className="thumbnail-image"/>
                    <div className="set-item-info">
                      <div className="date-venue">
                        {format(set.date, FORMAT)} @ {set.location.venue}
                      </div>
                      <div className="user">{set.username}</div>
                      <div className="city-state">{set.location.address.city}, {set.location.address.state}</div>
                    </div>
                    <div className="arrow-box">
                      <img className="arrow-svg" width={30} alt="Forward Arrow" src={arrowSVG}/>
                    </div>

                  </div>
                </Link>
            )}
        </div>
      </div>
    );
  }
}

export default Sets;
