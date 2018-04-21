import React, { Component } from 'react';
import TrackList from './TrackList';
import VenueInfo from './VenueInfo';
import validate from '../helpers/validate';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import './DayPickerStyles.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

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
  oldJson:{}
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
  console.log(day);
  this.setState({json});
 }

  componentDidMount(){
      if(this.props.route.path !== '/add-set'){
        this.callApi()
          .then(res => {
            const oldJson = {...res};
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
       this.props.updateSets();
       return body;
     }
   };



  handleSubmit = (e) => {
    e.preventDefault();
    const json = {...this.state.json};
    json.username = this.props.currentUser;
    const dateString = json.date.split(' ');
    const string = `${dateString[0]} ${dateString[2]} ${dateString[3]} ${this.props.currentUser} ${json.location.venue}`;
    const slug = slugify(string);
    console.log(slug)
    console.log(typeof date);
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
    console.log(JSON.stringify(data));

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
        oldJson:{}
      };
      this.setState(state);
      return body;
    }
  };

  hasChanged = (json) => {
    if(JSON.stringify(this.state.oldJson)!==JSON.stringify(json)){
      return true;
    }else{
      return false;
    }
  }

  handleChange = (e, object, prop, ...args) => {
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

  render() {
    const FORMAT = 'M/D/YYYY';
    return (
      <div>
        {this.props.route.path !== '/add-set' ?
          <h1>Edit Existing Set List</h1> :
          <h1>Create A Set List</h1>
        }
        <form>
          <DayPickerInput
            formatDate={format}
            format={FORMAT}
            parseDate={parse}
            placeholder={`${format(new Date(), FORMAT)}`}
            onDayChange ={this.handleDayClick}
            selectedDays={this.state.json.date}
          />
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

export default Edit;
