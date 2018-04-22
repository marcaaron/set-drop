import React, { Component } from 'react';
import rekordboxParse from '../helpers/rekordbox-parse';

class RekordboxParser extends Component {
  constructor(props){
    super(props);
    this.state = {
      tracks: []
    }
  }
  handleFiles = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.nativeEvent.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const tracks = rekordboxParse(reader.result);
      console.log(tracks);
      this.setState({tracks});
    }
    reader.readAsText(file, 'UTF-8');
  }

  render() {
    return (
      <input type="file" id="input" onChange={this.handleFiles}/>
    );
  }
};

export default RekordboxParser;
