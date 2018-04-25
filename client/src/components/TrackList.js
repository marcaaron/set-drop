import React, { Component } from 'react';
import Track from './Track';

class TrackList extends Component {
  render() {
    const {json, err, addListItem, clearListItem, removeListItem, handleListChange} = this.props;
    const list = json.list;
    return (
          <div className="Set List">
            <h2>Set List</h2>
            {list.length > 0 && list.map((track, index)=>{
              return <Track
                      err={err}
                      key={index}
                      artist={list[index].artist.name}
                      title={list[index].title.name}
                      genre={list[index].genre}
                      addListItem={addListItem}
                      handleChange={handleListChange}
                      removeListItem={removeListItem}
                      clearListItem={clearListItem}
                      list={list}
                      index={index}
                    />
            })}
          </div>
    );
  }
}

export default TrackList;
