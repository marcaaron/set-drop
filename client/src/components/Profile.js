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
      },
      edit: false
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

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  enableEdit = (e) => {
    e.preventDefault();
    this.setState({edit:true});
  }

  saveChanges = (e) => {
    e.preventDefault();
    const user = {...this.state.user}
    this.putApi(user);
    this.setState({edit:false});
  }

  handleChange = (e, prop, ...args) => {
    const user = {...this.state.user};
    if(args.length===0){
      user[prop] = e.target.value;
    }else{
      const userprop = {...user[prop]};
      userprop[args[0]] = e.target.value;
      user[prop] = userprop;
    }
    this.setState({user});
  }

  putApi = async (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method:"PUT", headers:headers, body: JSON.stringify(data)
    }
    // Change API endpoint back to /api/setlists for deployment
    // const response = await fetch('/api/setlists/add', options);

    const response = await fetch(`http://localhost:5000/api/users/update/${data._id}`,
    options);
    const body = await response.json();

    if (response.status !== 200){
      throw Error(body.message);
    } else {
      return body;
    }
  };

  render() {
    const {user, edit} = this.state;
    const {currentUser} = this.props;
    let editStyle;
    if(edit){
      editStyle = {
        border:'solid 2px red',
        outline:'',
        fontSize: '1em'
      };

    }else{
      editStyle = {
        border:'none',
        outline:'none',
        fontSize: '1em'
      };
    }

    return (
      <div>
        <h1>Profile</h1>
        {/* <img src={`data:image/jpeg;base64, ${user.avatar}`}/> */}
        <div>Username: {user.username}</div>

        <div>Description:
          <input
            onClick={this.handleClick}
            onChange={(e)=>this.handleChange(e, 'description')}
            style={editStyle}
            readOnly={!edit ? true : false}
            contentEditable={!edit ? false : true}
            type="text"
            value={user.description}/>
        </div>

        <div>Location:
          <input
            onClick={this.handleClick}
            onChange={(e)=>this.handleChange(e, 'location', 'city')}
            style={editStyle}
            readOnly={!edit ? true : false}
            contentEditable={!edit ? false : true}
            type="text"
            value={user.location.city}/>
          <input
            onClick={this.handleClick}
            onChange={(e)=>this.handleChange(e, 'location', 'state')}
            style={editStyle}
            readOnly={!edit ? true : false}
            contentEditable={!edit ? false : true}
            type="text"
            value={user.location.state}/>
          <input
            onClick={this.handleClick}
            onChange={(e)=>this.handleChange(e, 'location', 'country')}
            style={editStyle}
            readOnly={!edit ? true : false}
            contentEditable={!edit ? false : true}
            type="text"
            value={user.location.country}/>
        </div>
        <p>Links:</p>
        { !edit ?
          <ul>
            <li>Twitter:
              <a href={user.links.twitter}>
                {user.links.twitter}
              </a>
            </li>
            <li>Instagram:
              <a href={user.links.instagram}>
                {user.links.instagram}
              </a>
            </li>
            <li>SoundCloud:
              <a href={user.links.soundcloud}>
                {user.links.soundcloud}
              </a>
            </li>
          </ul>
        :
          <ul>
            <li>Twitter:
              <input
                onClick={this.handleClick}
                onChange={(e)=>this.handleChange(e, 'links', 'twitter')}
                style={editStyle}
                readOnly={!edit ? true : false}
                contentEditable={!edit ? false : true}
                type="text"
                value={user.links.twitter}/>
            </li>
            <li>Instagram:
              <input
                onClick={this.handleClick}
                onChange={(e)=>this.handleChange(e, 'links', 'instagram')}
                style={editStyle}
                readOnly={!edit ? true : false}
                contentEditable={!edit ? false : true}
                type="text"
                value={user.links.instagram}/>
            </li>
            <li>SoundCloud:
              <input
                onClick={this.handleClick}
                onChange={(e)=>this.handleChange(e, 'links', 'soundcloud')}
                style={editStyle}
                readOnly={!edit ? true : false}
                contentEditable={!edit ? false : true}
                type="text"
                value={user.links.soundcloud}/>
            </li>
          </ul>
        }

        <p>Following:</p>
        <p>You are following {user.following.length} users.</p>
        <ul>
          {user.following.length>0 ?
            user.following.map((user,index)=>{
              return <li>{user}</li>
            })
            :
            <li>List empty</li>
          }
        </ul>
        <div>
          {
            this.props.username.username === currentUser && !this.state.edit &&
            <button onClick={this.enableEdit}>Edit this profile</button>
          }
          {
            this.props.username.username === currentUser && this.state.edit &&
            <button onClick={this.saveChanges}>Save Changes</button>
          }
        </div>
      </div>
    );
  }
}

export default Profile;
