import React, { Component } from 'react';
import Track from './Track';
const uuidv1 = require('uuid/v1');

class TrackList extends Component {
  render() {
    const {json, addListItem, removeListItem, handleListChange} = this.props;
    const list = json.list;
    return (
          <div className="Set List">
            <h2>Set List</h2>
            {list && list.map((track, index)=>{
              return <Track
                      key={index}
                      artist={list[index].artist.name}
                      title={list[index].title.name}
                      genre={list[index].genre}
                      addListItem={addListItem}
                      handleChange={handleListChange}
                      removeListItem={removeListItem}
                      list={list}
                      index={index}
                    />
            })}
          </div>
    );
  }
}

export default TrackList;
