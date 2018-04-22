import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import * as routes from '../constants/routes';
import { auth, db } from '../firebase';

const SignUp = ({history}) =>
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history}/>
  </div>

  const INIT_STATE = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    error: null
  };

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...INIT_STATE};
  };

  onSubmit = (e) => {
    const {username, email, password1} = this.state;
    const {history} = this.props;
    auth.createUserEmail(email, password1)
      .then(authUser => {
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INIT_STATE }));
            history.push(routes.HOME);
          })
          .catch(err => {
            const error = err.message;
            console.log(error);
            this.setState({error});
          });
      })
      .catch(err => {
        const error = err.message;
        console.log(error);
        this.setState({error});
      });
      const user = {
        username:username
      }
      this.postApi(user);

    e.preventDefault();
  }

  postApi = async (data) => {
    console.log(JSON.stringify(data));

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method:"POST", headers:headers, body: JSON.stringify(data)
    }
    // Change API endpoint back to /api/setlists for deployment
    // const response = await fetch('/api/users/add', options);

    const response = await fetch('http://localhost:5000/api/users/add',
    options);
    const body = await response.json();

    if (response.status !== 200){
      throw Error(body.message);
    } else {
      return body;
    }
  };


  handleChange = (e, propName) => {
    this.setState({[propName]:e.target.value});
  }

  render() {
    const {username, email, password1, password2, error} = this.state;

    const disabled =
      password1 !== password2 ||
      password1 === '' ||
      email === '' ||
      username === '';

    return (
      <form className="sign-up-form" onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={(e)=>this.handleChange(e,'username')}
          type="text"
          placeholder="Username"
        />
        <input
          value={email}
          onChange={(e)=>this.handleChange(e,'email')}
          type="text"
          placeholder="E-Mail"
        />
        <input
          value={password1}
          onChange={(e)=>this.handleChange(e,'password1')}
          type="text"
          placeholder="Password"
        />
        <input
          value={password2}
          onChange={(e)=>this.handleChange(e,'password2')}
          type="text"
          placeholder="Confirm Password"
        />
        <button type="submit" disabled={disabled}>Sign Up</button>
        { error && <p>{error}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <div>
    <Link to={routes.SIGN_UP}>
      Sign Up to Use This Service
    </Link>
  </div>

export default withRouter(SignUp);

export {
  SignUpForm,
  SignUpLink
};
