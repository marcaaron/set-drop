import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import faMinusCircle from '@fortawesome/fontawesome-free-solid/faMinusCircle';
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle';

class Track extends Component {
  render() {
    const {err, handleChange, clearListItem, addListItem, removeListItem, list, index, title, artist, genre} = this.props;
    return (
          <div className="track-box">
            <input
              onChange={(e)=>handleChange(e, 'artist', index, 'name')}
              type="text"
              placeholder="Artist"
              value={artist && artist}
            />
            {err & err.listItem && err.listItem[index] && err.listItem[index].field==='artist' && <div>{err.listItem[index].message}</div>}
            <input
              onChange={(e)=>handleChange(e, 'title', index, 'name')}
              type="text"
              placeholder="Title"
              value={title && title}
            />
            {err & err.listItem && err.listItem[index] && err.listItem[index].field==='artist' && <div>{err.listItem[index].message}</div>}
            <input
              onChange={(e)=>handleChange(e, 'genre', index)}
              type="text"
              placeholder="Genre"
              value={genre && genre}
            />
            <FontAwesomeIcon
              onClick={(e)=>clearListItem(e,index)}
              icon={faTimesCircle}
              size="2x"
            />
            <FontAwesomeIcon
              onClick={(e)=>addListItem(e,index+1)}
              icon={faPlusCircle}
              size="2x"
            />
            {list.length > 1 &&
              <FontAwesomeIcon
                onClick={(e)=>removeListItem(e,index)}
                icon={faMinusCircle}
                size="2x"
              />
            }
          </div>
    );
  }
}

export default Track;
