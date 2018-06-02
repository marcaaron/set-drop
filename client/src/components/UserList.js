import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserList extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser:{}
    };
  };

  componentDidMount(){
    this.updateUser();
  }


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
    this.putApi(currentUser)
    .then(res=>
      console.log(res)
    ).catch(err=>{
      console.log(err)
    });
  };

  handleUnfollow = (e, username) => {
    const currentUser = {...this.state.currentUser};
    currentUser.following.splice(currentUser.following.indexOf(username),1);
    this.setState({currentUser});
    this.putApi(currentUser)
    .then(res=>
      console.log(res)
    ).catch(err=>{
      console.log(err)
    });
  };

  render() {
    const {currentUser} = this.state;
    const {userList} = this.props;
    console.log(currentUser && currentUser.following);
    return (
      <div className="user-list">
        {userList && userList.map((user,index)=>{
          if(this.props.currentUser !== user.username){
            return (
              <div key={`link_${user.username}_${index}`} className="user-list__item">
                <Link to={`/users/${user.username}`}>
                  <div>{user.username}</div>
                </Link>
                {currentUser && currentUser.following && currentUser.following.includes(user.username) ?
                  <button
                    onClick={(e)=>this.handleUnfollow(e, user.username)} className="user-list__follow-btn user-list__follow-btn--unfollow">Unfollow</button>
                  :
                  <button
                    onClick={(e)=>this.handleFollow(e, user.username)} className="user-list__follow-btn">Follow</button>
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
