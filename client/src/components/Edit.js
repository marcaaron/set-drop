import React, { Component } from 'react';
import TrackList from './TrackList';
import VenueInfo from './VenueInfo';
import validate from '../helpers/validate';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import './DayPickerStyles.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import RekordboxParser from './RekordboxParser';
import Autocomplete from './Autocomplete';
import { withRouter } from 'react-router'

const slugify = require('slugify');
const INIT_STATE = {
  json:{
    username: null,
    date:new Date(),
    location:{
      venue: '',
      address: {
        address_line: '',
        city: '',
        state: '',
        country: '',
        postal_code: ''
      },
      coords: {
        lng: '',
        lat: ''
      }
    },
    list: [{
      artist:{
        name:''
      },
      title:{
        name:''
      },
      genre:''
    }],
    slug:''
  },
  oldJson:'',
  err:{}
};

class Edit extends Component {

  // INITIALIZE THE STATE OF OUR COMPONENT
  state = {...INIT_STATE};

  // WHEN COMPONENT MOUNTS CHECK TO SEE WHETHER OUR ROUTE PATH IS EDIT OR ADD-SET
  componentDidMount(){
    // IF WE HIT EDIT...
    if(this.props.route.path !== '/add-set'){
      console.log('HELLO FROM EDIT');
      console.log(this.props);
      // IF SETS ARE GREATER THAN 0 THEY HAVE BEEN LOADED
      if(this.props.sets.length > 0){
        // WE MUST FIND THE ID BY LOOKING FOR OUR SLUG WITHIN SETS
        let id = this.props.sets.filter(set=>set.slug===this.props.slug.slug)[0];
        id = id._id;
        console.log(id);
        // WE CALL OUR API GET BY ID FUNCTION
        this.getById(id)
          .then(res => {
            // CREATE A COPY AS AN IMMUTABLE STRING
            const oldJson = JSON.stringify(res);
            // AND SET TO STATE
            const json = {...res};
            this.setState({json, oldJson});
          })
          .catch(err => {
            console.log('Set not found', err);
          });
      }
    } else {
      // DO NOTHING BECAUSE WE ARE GOING TO ADD A SET
      console.log('HELLO FROM ADD-SET');
      console.log(this.props);
    }
  }

  // FUNCTION TO RETRIEVE A SPECIFIC SET BY ID
  getById = async (id) => {
   const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    // Change API endpoint back to /api/setlists for deployment
    // const response = await fetch('/api/setlists', headers);
    const response = await fetch(`http://localhost:5000/api/setlists/edit/${id}`, headers);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
      return body;
  };

  // FUNCTION TO UPDATE OUR SET
  updateSet = async (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
      const options = {
      method:"PUT", headers:headers, body: JSON.stringify(data)
    }
    // Change API endpoint back to /api/setlists for deployment
    // const response = await fetch('/api/setlists/add', options);

    const response = await fetch(`http://localhost:5000/api/setlists/update/${data._id}`,
    options);
    const body = await response.json();

    if (response.status !== 200){
      throw Error(body.message);
    } else {
      this.props.history.push(`/sets/${this.props.currentUser}`);
      this.props.updateSets();
      return body;
    }
  };

  // CREATE SET PASSING IN DATA
  createSet = async (data) => {
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
      // If Successful Reset the state back to our initial state so a new set can be entered.
      const state = {
        json:{
          username: null,
          date:'',
          location:{
            venue: '',
            address: {
              street_number: '',
              street: '',
              city: '',
              state: '',
              country: '',
              postal_code: ''
            },
            coords: {
              lng: '',
              lat: ''
            },
            phone:'',
            website:'',
            placeId:''
          },
          list: [{
            artist:{
              name:''
            },
            title:{
              name:''
            },
            genre:''
          }],
          slug:''
        },
        oldJson:{}
      };
      this.setState(state);
      this.props.updateSets();
      this.props.history.push(`/sets/${this.props.currentUser}`);
      return body;
    }
  };

  // SUBMIT BUTTON
  handleSubmit = (e) => {
    e.preventDefault();
    const json = {...this.state.json};
    const FORMAT = 'M/D/YYYY';
    json.username = this.props.currentUser;
    const dateString = format(json.date, FORMAT).split('/').join('-');
    const string = `${dateString} ${this.props.currentUser} ${json.location.venue}`;
    const slug = slugify(string);
    json.slug = slug;
    // PASS THROUGH VALIDATOR TO CHECK FOR ERROR OBJECT RETURNED
    if(validate(json)){
      // RETURN ERR OBJECT FROM VALIDATE FUNCTION AND SET STATE
      alert('Please Fix Errors');
      const err = validate(json);
      this.setState({err});
    }else{
      // CLEAR ANY ERRORS SINCE NONE EXIST
      const err = {};
      this.setState({err});
      // IF WE ARE IN EDIT MODE CHECK FOR CHANGES THEN ALLOW PUT REQ
      if(this.props.route.path !== '/add-set'){
        if(this.hasChanged(json)){
          this.updateSet(json);
        }else{
          alert('No Changes Have Been Made!');
        }
      }else{
        // OTHERWISE PERMIT THE CREATION OF A NEW SET
        this.createSet(json);
      }
    }
  }

  // CALENDAR DAY CHANGE HANDLER
  handleDayClick = (day) => {
    const json = {...this.state.json};
    json.date = day.toString();
    this.setState({json});
  }

  // FILE DROP HANDLER
  handleFileDrop = (data) => {
    const json = {...this.state.json};
    const tracks = data.map(track=>{
      const trackObj = {
        artist: {
          name:track.artist
        },
        title:{
          name: track.title
        },
        genre: track.genre
      }
      return trackObj;
    });
    json.list = [...tracks];
    this.setState({json});
  }

  // HELPER FUNCTION RETURNS BOOL ON IMMUTABLE STATE COMPARISON
  hasChanged = (json) => {
    if(this.state.oldJson !== JSON.stringify(json)){
      return true;
    }else{
      return false;
    }
  }

  // PASSED TO VENUEINFO TO TRACK ITS CHANGES AND UPDATE STATE
  handleVenueChange = (e, object, prop, ...args) => {
    const value = e.target.value;
    let json = {...this.state.json};
    let objectToMutate = {...json[object]};
    if(args.length===0){
      objectToMutate[prop] = value;
    }else{
      const argument = args[0];
      let secondLevelObjectToMutate = {...objectToMutate[prop]};
      secondLevelObjectToMutate[argument] = value;
      objectToMutate[prop] = secondLevelObjectToMutate;
    }
    json[object] = objectToMutate;
    this.setState({json})
  }

  // LIST CHANGE HANDLERS FOR ADDING AND REMOVING TRACK ITEMS >> SEE TRACK COMPONENT
  handleListChange = (e, prop, index, ...args) => {
    const value = e.target.value;
    let json = {...this.state.json};
    let list = [...json.list];
    let listObject = {...list[index]};
    if(args.length===0){
      listObject[prop] = value;
    }else{
      const listProp = listObject[prop];
      const prop2 = args[0];
      listProp[prop2] = value;
      listObject[prop] = listProp;
    }
    list[index] = listObject;
    json.list = list;
    this.setState({json});
  }

  addListItem = (e, index) => {
    e.preventDefault();
    let json = {...this.state.json};
    let list = [...json.list];
    const newItem = {
      artist:{
        name:''
      },
      title:{
        name:''
      },
      genre:''
    };
    list.splice(index, 0, newItem);
    json.list = list;
    this.setState({json});
  }

  removeListItem = (e, index) => {
    e.preventDefault();
    let json = {...this.state.json};
    let list = [...json.list];
    list.splice(index, 1);
    json.list = list;
    this.setState({json});
  }

  clearListItem = (e, index) => {
    e.preventDefault();
    let json = {...this.state.json};
    let list = [...json.list];
    list[index].artist.name='';
    list[index].title.name='';
    list[index].genre = '';
    json.list = list;
    this.setState({json});
  }

  // GOOGLE AUTOCOMPLETE HANDLER RETRIEVES DATA FROM AUTOCOMPLETE AND POPULATES FORM
  populateFromAutocomplete = (location) => {
    let json = {...this.state.json};
    json.location = location;
    this.setState({json});
  }

  render() {
    const FORMAT = 'M/D/YYYY';
    return (
      <div>
        {this.props.route.path !== '/add-set' ?
          <h1>Edit Existing Set List</h1> :
          <h1>Create A Set List</h1>
        }
        <RekordboxParser handleFileDrop={this.handleFileDrop}/>
        <form>
          <DayPickerInput
            formatDate={format}
            format={FORMAT}
            parseDate={parse}
            placeholder={`${format(new Date(), FORMAT)}`}
            onDayChange ={this.handleDayClick}
            selectedDays={this.state.json.date}
          />
          <Autocomplete populate={this.populateFromAutocomplete}/>
          {
            this.state.json.location &&
               <VenueInfo
                 err={this.state.err}
                 json={this.state.json}
                 handleVenueChange={this.handleVenueChange}
               />
          }
          { this.state.json.list &&
            <TrackList
              err={this.state.err}
              json={this.state.json}
              handleListChange={this.handleListChange}
              addListItem={this.addListItem}
              removeListItem={this.removeListItem}
              clearListItem={this.clearListItem}
            />
          }
          {this.props.route.path !== '/add-set' ?
            <button onClick={this.handleSubmit} type="submit">Save Changes</button> :
            <button onClick={this.handleSubmit} type="submit">Save New Set</button>
          }
        </form>
      </div>
    );
  }
}

export default withRouter(Edit);
