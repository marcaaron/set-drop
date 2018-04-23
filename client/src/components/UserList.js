import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserList extends Component {
  constructor(props){
    super(props);
    this.state = {
      users:[],
      currentUser:{}
    };
  };

  componentDidMount(){
    this.updateUsers();
    this.updateUser();
  }

  updateUsers = () =>{
    this.callApi()
      .then(res => {
        console.log('updating users');
        const users = res;
        this.setState({ users })
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Change API endpoint back to /api/setlists for deployment
    // const response = await fetch('/api/setlists', headers);

    const response = await fetch(`http://localhost:5000/api/users/`, headers);
    const body = await response.json();

    if (response.status !== 200) {
      console.log('problem with response');
      throw Error(body.message);
    }else{
      console.log('users found');
      return body;
    }
  };

  updateUser = () =>{
    this.getCurrentUser()
      .then(res => {
        console.log('updating user');
        const currentUser = res[0];
        this.setState({ currentUser })
      })
      .catch(err => console.log(err));
  }

  getCurrentUser = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Change API endpoint back to /api/setlists for deployment
    // const response = await fetch('/api/setlists', headers);

    const response = await fetch(`http://localhost:5000/api/users/${this.props.currentUser}`, headers);
    const body = await response.json();

    if (response.status !== 200) {
      console.log('problem with response');
      throw Error(body.message);
    }else{
      console.log('user found');
      return body;
    }
  };

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

  handleFollow = (e, username) => {
    const currentUser = {...this.state.currentUser};
    currentUser.following.push(username);
    this.setState({currentUser});
    this.putApi(currentUser);
  };

  handleUnfollow = (e, username) => {
    const currentUser = {...this.state.currentUser};
    currentUser.following.splice(currentUser.following.indexOf(username),1);
    this.setState({currentUser});
    this.putApi(currentUser);
  };

  render() {
    const {users, currentUser} = this.state;
    console.log(currentUser && currentUser.following);
    return (
      <div className="user-list">
        {users.map((user,index)=>{
          if(this.props.currentUser !== user.username){
            return (
              <div className="user-item">
                <Link key={`link_${user.username}_${index}`} to={`/users/${user.username}`}>
                  <div>{user.username}</div>
                </Link>
                {currentUser && currentUser.following && currentUser.following.includes(user.username) ?
                  <button
                    onClick={(e)=>this.handleUnfollow(e, user.username)} className="follow-button unfollow">Unfollow</button>
                  :
                  <button
                    onClick={(e)=>this.handleFollow(e, user.username)} className="follow-button">Follow</button>
                }
              </div>
            );
          }
          return ''
        })}
      </div>
    );
  };
};
export default UserList;
