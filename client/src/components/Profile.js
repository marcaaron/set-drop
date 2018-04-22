import React, { Component } from 'react';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:{
        username: '',
        description:'',
        location: {
          city: '',
          state: '',
          country: ''
        },
        avatar: '',
        links: {
          twitter: '',
          soundcloud: '',
          instagram: ''
        },
        following:[]
      }
    }
  }

  componentDidMount(){
    this.updateUser();
  }

  updateUser = () =>{
    this.callApi()
      .then(res => {
        console.log('updating user');
        const user = res[0];
        this.setState({ user })
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Change API endpoint back to /api/setlists for deployment
    // const response = await fetch('/api/setlists', headers);

    const response = await fetch(`http://localhost:5000/api/users/${this.props.username.username}`, headers);
    const body = await response.json();

    if (response.status !== 200) {
      console.log('problem with response');
      throw Error(body.message);
    }else{
      console.log('user found');
      return body;
    }
  };

  render() {
    const {user} = this.state;
    const {currentUser} = this.props;
    return (
      <div>
        <h1>Profile</h1>
        <img src={`data:image/jpeg;base64, ${user.avatar}`}/>
        <p>Username: {user.username}</p>
        <p>Description: {user.description}</p>
        <p>Location: {user.location.city}, {user.location.state} – {user.location.country}</p>
        <p>Links:</p>
        <ul>
          <li>Twitter: <a href={user.links.twitter}>{user.links.twitter}</a></li>
          <li>Instagram: <a href={user.links.instagram}>{user.links.instagram}</a></li>
          <li>SoundCloud: <a href={user.links.soundcloud}>{user.links.soundcloud}</a></li>
        </ul>
        <p>Following:</p>
        <p>You are following {user.following.length} users.</p>
        <ul>
          {user.following.length>0 ?
            user.following.map((user,index)=>{
              <li>{user}</li>
            })
            :
            <li>List empty</li>
          }
        </ul>
        <div>
          {
            this.props.username.username === currentUser &&
            <button>Edit this profile</button>
          }
        </div>
      </div>
    );
  }
}

export default Profile;
