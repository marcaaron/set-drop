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
    date:'',
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
  oldJson:''
};

class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {...INIT_STATE};
  }

 callApi = async () => {
   const headers = new Headers();
   headers.append("Content-Type", "application/json");
   headers.append("Accept", "application/json");
   // Change API endpoint back to /api/setlists for deployment
   // const response = await fetch('/api/setlists', headers);
   const id = this.props.id;
   const response = await fetch(`http://localhost:5000/api/setlists/edit/${id}`, headers);
   const body = await response.json();

   if (response.status !== 200) throw Error(body.message);
   return body;
 };

 handleDayClick = (day) => {
  const json = {...this.state.json};
  json.date = day.toString();
  this.setState({json});
 }

  componentDidMount(){
      if(this.props.route.path !== '/add-set'){
        this.callApi()
          .then(res => {
            const oldJson = JSON.stringify(res);
            const json = {...res};
            this.setState({json, oldJson});
          })
          .catch(err => {
            console.log('Set not found', err);
          });
      } else {
        const json = {...this.state.json};
        this.setState({json});
      }
  }

   putApi = async (data) => {
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

  handleSubmit = (e) => {
    e.preventDefault();
    const json = {...this.state.json};
    json.username = this.props.currentUser;
    const dateString = json.date.split(' ');
    const string = `${dateString[0]} ${dateString[2]} ${dateString[3]} ${this.props.currentUser} ${json.location.venue}`;
    const slug = slugify(string);
    json.slug = slug;
    if(validate(json)){
      // IF WE ARE IN EDIT MODE CHECK FOR CHANGES THEN PUT
      if(this.props.route.path !== '/add-set'){
        if(this.hasChanged(json)){
          this.putApi(json);
        }else{
          alert('No Changes Have Been Made!');
        }
      }else{
        // OTHERWISE POST A NEW SET
        this.postApi(json);
      }
    }else{
      // Replace with modals or specific UI error components
      alert('all forms must be filled completely');
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
      this.props.history.push(`/sets/${this.props.currentUser}`);
      return body;
    }
  };

  hasChanged = (json) => {
    if(this.state.oldJson !== JSON.stringify(json)){
      return true;
    }else{
      return false;
    }
  }

  handleChange = (e, object, prop, ...args) => {
    const value = e.target.value;
    let json = {...this.state.json};
    let objectToMutate = {...json[object]};
    console.log('venue info change has taken place');
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
    console.log(JSON.stringify(json)===JSON.stringify(this.state.oldJson));
  }

  handleListChange = (e, prop, index, ...args) => {
    console.log('change has taken place');
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
    console.log(JSON.stringify(json)===JSON.stringify(this.state.oldJson));
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
                 json={this.state.json}
                 handleChange={this.handleChange}
               />
          }
          { this.state.json.list &&
            <TrackList
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
