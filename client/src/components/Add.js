import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TrackList from './TrackList';
import VenueInfo from './VenueInfo';

class Add extends Component {
  constructor(props){
    super(props);
    this.state = {
      json:{
        username: null,
        date:'',
        location:{},
        list: []
      },
      submitSuccess:[false, false]
    }
  }

  postApi = async (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method:"POST", headers:headers, body: JSON.stringify(data)
    }
    // Change API endpoint back to /api/setlists for deployment
    // const response = await fetch('/api/setlists/add', options);

    const response = await fetch('http://localhost:5000/api/setlists/add',
    options);
    const body = await response.json();

    if (response.status !== 200){
      throw Error(body.message);
    } else {
      this.setState({date:'', location:{}, list:[], submitSuccess:[true, true]});
      return body;
    }
  };

  resetChildren = (index) => {
    const submitSuccess = [...this.state.submitSuccess];
    submitSuccess[index] = false;
    this.setState({submitSuccess});
  }

  componentWillMount(){
    // Replace with date picker eventually
    let date = new Date();
    date.toLocaleTimeString('en-US');
    let json = {...this.state.json};
    json.date = date;
    this.setState({json});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const json = {...this.state.json};
    json.username = this.props.currentUser;
    this.postApi(json);
  }

  updateJSON = (key, value) => {
    const json = {...this.state.json};
    json[key] = value;
    this.setState({json});
  }

  render() {
    return (
      <div>
        <h1>Add a New Set List</h1>
        <form>
          <VenueInfo
            resetChildren={this.resetChildren}
            submitSuccess={this.state.submitSuccess}
            updateJSON={this.updateJSON}
          />
          <TrackList
            resetChildren={this.resetChildren}
            submitSuccess={this.state.submitSuccess}
            updateJSON={this.updateJSON}
          />
          <button onClick={this.handleSubmit} type="submit">Submit Set</button>
        </form>
      </div>
    );
  }
}

export default Add;
