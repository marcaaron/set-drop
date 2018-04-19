import React, { Component } from 'react';
import Track from './Track';
const uuidv1 = require('uuid/v1');

const INIT_TRACK =
  {
    artist:{
      name:''
    },
    title:{
      name:''
    },
    genre:''
  };

class TrackList extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:[INIT_TRACK]
    }
  }

  addInitTrack = (e) => {
    e.preventDefault();
    const list = [...this.state.list];
    const track = {
      artist:{
        name:''
      },
      title:{
        name:''
      },
      genre:''
    };
    console.log(track);
    list.push(track);
    console.log(list);
    this.setState({list});
  }

  removeTrack = (e, index) => {
    e.preventDefault();
    if(this.state.list.length > 1){
      console.log(index);
      const list = [...this.state.list];
      console.log(list);
      list.splice(index,1);
      console.log(list);
      this.setState({list});
    }
  }

  handleChange = (e, prop, index) => {
    console.log(e.target.value, prop, index);
    const list = [...this.state.list];
    const value = e.target.value;
    console.log(index);
    console.log(list[index]);
    const listItem = list[index];
    if(typeof listItem[prop] === 'string'){
      listItem[prop] = value;
    }else{
      listItem[prop].name = value;
    }
    this.setState({list});
    this.props.updateJSON('list', list);
  }

  render() {
    const {list} = this.state;
    return (
          <div className="Set List">
            <h2>Set List</h2>
            {list.map((track, index)=>{
              return <Track
                      key={index}
                      artist={list[index].artist.name}
                      title={list[index].title.name}
                      genre={list[index].genre}
                      updateList={this.updateList}
                      addInitTrack={this.addInitTrack}
                      handleChange={this.handleChange}
                      removeTrack={this.removeTrack}
                      list={list}
                      index={index}
                    />
            })}
          </div>
    );
  }
}

export default TrackList;
