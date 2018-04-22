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
    e.stopPropagation();
    e.preventDefault();
    const style = {border:'solid black 5px'};
    this.setState({style});
  }

  dragover = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const style = {border:'solid black 5px'};
    this.setState({style});
  }

  dragleave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const style = {};
    this.setState({style});
  }

  drop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const tracks = rekordboxParse(reader.result);
      this.props.handleFileDrop(tracks);
      const dropSuccess = true;
      const style = {border:'2px solid red'};
      this.setState({dropSuccess, style});
    }
    reader.readAsText(file, 'UTF-8');
  }

  render() {
    const {dropSuccess, style} = this.state;
    return (
      <div style={style} onDragOver={this.dragover} onDragLeave={this.dragleave} onDragExit={this.dragexit} onDragEnd={this.dragend} onDragEnter={this.dragenter} onDrop={this.drop} id="dropbox" className="rekordbox-dropbox">
        <span className="rekordbox-dropbox-text">
          {!dropSuccess ? 'Drop your rekordbox set history text file here...' : 'File Successfully Parsed!'}

        </span>
        <img alt="Pioneer rekordbox Logo" className="rekordbox-logo" width={150} src={rekordboxSVG}/>
      </div>
    );
  }
};

export default RekordboxParser;
