import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Set extends Component {
  componentDidMount(){
    console.log('set component did mount');
  }

  render() {
    const {sets} = this.props;
    let set, address;
    const slug = this.props.slug.slug;
    set = sets.find( set => set.slug===slug);
    if(set){
      address = set.location.address;
    }
    return (
      <div>
        <h1>Set</h1>
          <div className="set-container">
            {
              set && address &&
                  <div key={`keyFor_${set.slug}`} className="set-item">
                    <div className="date">{set.date}</div>
                    <div className="venue">{set.location.venue}</div>
                    <div className="address">{address.address_line}</div>
                    <div className="city-state">{address.city}, {address.state} {address.postal_code}</div>
                    <div className="user">–posted by {set.username}</div>
                    <br/>
                    <div className="track-list-label"><strong>SET LIST:</strong></div>
                    <ul className="track-list">
                      {
                        set.list.map((track, index)=>[
                          <div key={`${index}_${set.slug}`} className="track">
                            <div>{track.artist.name}</div>
                            <div>{track.title.name}</div>
                          </div>
                        ]
                        )
                      }

                    </ul>
                    <Link onClick={()=>this.props.handleSelectedSetID(set._id)}to={`/edit/${set.slug}`}><button>Edit</button></Link>
                  </div>
            }
        </div>
      </div>
    );
  }
}

export default Set;
