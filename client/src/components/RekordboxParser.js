import React, { Component } from 'react';
import rekordboxParse from '../helpers/rekordbox-parse';
import rekordboxSVG from './rekordbox.svg';
class RekordboxParser extends Component {
  constructor(props){
    super(props);
    this.state = {
      style:{},
      dropSuccess:false
    }
  }

  dragenter = (e) => {
    const dropbox = document.getElementById("dropbox");
    e.stopPropagation();
    e.preventDefault();
    dropbox.style.border = 'solid black 5px';
  }

  dragover = (e) => {
    const dropbox = document.getElementById("dropbox");
    e.stopPropagation();
    e.preventDefault();
    // dropbox.style.border = 'solid black 5px';
  }

  dragleave = (e) => {
    const dropbox = document.getElementById("dropbox");
    e.stopPropagation();
    e.preventDefault();
    dropbox.style.border = '';
  }

  drop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const dropbox = document.getElementById("dropbox");
    dropbox.style.border = '2px solid red';
    e.dataTransfer.dropEffect = 'copy';
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const tracks = rekordboxParse(reader.result);
      this.props.handleFileDrop(tracks);
      const dropSuccess = true;
      this.setState({dropSuccess});
    }
    reader.readAsText(file, 'UTF-8');
  }

  render() {
    const {dropSuccess} = this.state;
    return (
      <div onDragOver={this.dragover} onDragLeave={this.dragleave} onDragExit={this.dragexit} onDragEnd={this.dragend} onDragEnter={this.dragenter} onDrop={this.drop} id="dropbox" className="rekordbox-dropbox">
        <span className="rekordbox-dropbox-text">
          {!dropSuccess ? 'Drop your rekordbox set history text file here...' : 'File Successfully Parsed!'}

        </span>
        <img className="rekordbox-logo" width={150} src={rekordboxSVG}/>
      </div>
    );
  }
};

export default RekordboxParser;
