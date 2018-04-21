import React, { Component } from 'react';

class Track extends Component {
  render() {
    const {handleChange, addListItem, removeListItem, list, index, title, artist, genre} = this.props;
    return (
          <div className="track-box">
            <input
              onChange={(e)=>handleChange(e, 'artist', index, 'name')}
              type="text"
              placeholder="Artist"
              value={artist && artist}
            />
            <input
              onChange={(e)=>handleChange(e, 'title', index, 'name')}
              type="text"
              placeholder="Title"
              value={title && title}
            />
            <input
              onChange={(e)=>handleChange(e, 'genre', index)}
              type="text"
              placeholder="Genre"
              value={genre && genre}
            />
            <button onClick={(e)=>addListItem(e,index+1)}>Add Track</button>
            {list.length > 1 && <button onClick={(e)=>removeListItem(e,index)}>Remove Track</button>}
          </div>
    );
  }
}

export default Track;
