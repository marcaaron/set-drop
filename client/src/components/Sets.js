import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import arrowSVG from './arrow-fwd.svg';
const FORMAT = 'M/D/YYYY';
const uuidv1 = require('uuid/v1');

class Sets extends Component {
  render() {
    const {sets, userList} = this.props;

    const getUserAvatar = (username) =>{
      const locateUser = userList.filter(user=>user.username===username)[0];
      return locateUser.avatar;
    }

    return (
      <div className="page-container">
        <h1>Recent Sets From All Users</h1>
          <div className="set">
            {
              sets && userList && sets.map(set =>
                <Link key={`linkTo_${set.slug}_${uuidv1()}`} to={`/set/${set.slug}`}>
                  <div className="set__item">
                    <img
                      alt={`Avater of ${set.username}`}
                      style={{width:60, height:60, backgroundColor:'white'}}
                      className="set__item__thumbnail-image"
                      src={getUserAvatar(set.username)}
                    />
                    <div className="set__item__info">
                      <div className="set__item__info__date-venue">
                        {format(set.date, FORMAT)} @ {set.location.venue}
                      </div>
                      <div className="set__item__info__user">{set.username}</div>
                      <div className="set__item__info__city-state">{set.location.address.city}, {set.location.address.state}</div>
                    </div>
                    <div className="set__item__arrow-box">
                      <img className="set__item__arrow-box__arrow-svg"
                        width={30}
                        alt="Forward Arrow"
                        src={arrowSVG}
                      />
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
