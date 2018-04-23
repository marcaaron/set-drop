import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Set extends Component {
  componentDidMount(){
    console.log('set component did mount');
  }

  deleteSet = (id) => {
    const message = 'Are you sure you want to delete this set?\nThis action can not be undone!';
    let confirm = window.confirm(message);
    if(confirm){
      this.callDelete(id);
    }else{
      return;
    }
  }

  callDelete = async (id) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Change API endpoint back to /api/setlists for deployment
    // const response = await fetch('/api/setlists', headers);

    const response = await fetch(`http://localhost:5000/api/setlists/delete/${id}`, headers);
    const body = await response.json();

    if (response.status !== 200) {
      console.log('problem with response');
      throw Error(body.message);
    }else{
      console.log('sets updated');
      return body;
    }
  };


  render() {
    const {sets, currentUser} = this.props;
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
                    {
                      set.username === currentUser &&
                      <div className="user-edit-controls">
                        <Link onClick={()=>this.props.handleSelectedSetID(set._id)}to={`/edit/${set.slug}`}>
                          <button>Edit</button>
                        </Link>
                        <button onClick={()=>this.deleteSet(set._id)}>Delete</button>
                      </div>
                    }
                  </div>
            }
        </div>
      </div>
    );
  }
}

export default Set;
