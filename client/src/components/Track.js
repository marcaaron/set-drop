import React, { Component } from 'react';

class Track extends Component {

  tempFunc = (e) =>{
    e.preventDefault();
  }

  render() {
    const {handleChange, addInitTrack, removeTrack, list, index, title, artist, genre} = this.props;
    return (
          <div className="track-box">
            <input
              onChange={(e)=>handleChange(e, 'artist', index)}
              type="text"
              placeholder={artist !== '' ? artist : "Artist"}
              value={artist && artist}
            />
            <input
              onChange={(e)=>handleChange(e, 'title', index)}
              type="text"
              placeholder={title !== '' ? title : "Title"}
              value={title && title}
            />
            <input
              onChange={(e)=>handleChange(e, 'genre', index)}
              type="text"
              placeholder={genre !== '' ? genre : "Genre"}
              value={genre && genre}
            />
            <div>{index}</div>
            {list.length-1 === index && <button onClick={addInitTrack}>Add Track</button>}
            {list.length > 1 && <button onClick={(e)=>removeTrack(e,index)}>Remove Track</button>}

          </div>
    );
  }
}

export default Track;
