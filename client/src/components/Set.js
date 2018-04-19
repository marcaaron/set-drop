import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Set extends Component {
  render() {
    const {sets} = this.props;
    let set, address;
    const id = this.props.id.id;
    set = sets.find( set => set._id===id);
    console.log(set);
    if(set){
      address = set.location.address;
    }
    return (
      <div>
        <h1>Set</h1>
          <div className="set-container">
            {
              set && address &&
                  <div key={`keyFor_${set._id}`} className="set-item">
                    <div className="date">{new Date(Date.parse(set.date)).toDateString()}</div>
                    <div className="venue">{set.location.venue}</div>
                    <div className="address">{address.address_line}</div>
                    <div className="city-state">{address.city}, {address.state} {address.postal_code}</div>
                    <div className="user">–posted by {set.username}</div>
                    <br/>
                    <div className="track-list-label"><strong>SET LIST:</strong></div>
                    <ul className="track-list">
                      {
                        set.list.map(track=>[
                          <div key={`${parseInt(id,10) * Math.random()}`} className="track">
                            <div>{track.artist.name}</div>
                            <div>{track.title.name}</div>
                          </div>
                        ]
                        )
                      }

                    </ul>
                  </div>
            }
        </div>
      </div>
    );
  }
}

export default Set;
