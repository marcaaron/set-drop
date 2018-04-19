import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TrackList from './TrackList';
import VenueInfo from './VenueInfo';

class Add extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: null,
      date:'',
      location:{},
      list: []
    }
  }

  componentDidMount(){
    // Replace with date picker eventually
    let date = new Date();
    date.toLocaleTimeString('en-US');
    this.setState({date});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const stateToJson = {...this.state};
    stateToJson.username = this.props.currentUser;
    console.log(stateToJson);
    // this.setState({username, location, list});
  }

  updateJSON = (key, value) => {
    this.setState({[key]:value});
  }

  render() {
    return (
      <div>
        <h1>Add a New Set List</h1>
        <form>
          <VenueInfo/>
          <TrackList updateJSON={this.updateJSON}/>
          <button onClick={this.handleSubmit} type="submit">Submit Set</button>
        </form>
      </div>
    );
  }
}

export default Add;
