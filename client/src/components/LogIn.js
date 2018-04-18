import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {SignUpLink} from './SignUp';
import * as routes from '../constants/routes';
import { auth } from '../firebase';

const LogIn = ({history}) =>
  <div>
    <h1>Log In</h1>
    <LogInForm history={history}/>
    <SignUpLink />
  </div>

  const INIT_STATE = {
    email: '',
    password1: '',
    error: null
  };

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...INIT_STATE};
  };

  onSubmit = (e) => {
    const {username, email, password1} = this.state;
    const {history} = this.props;
    console.log(auth);
    console.log(auth.doCreateUserWithEmailAndPassword);
    console.log(email, password1);
    auth.LogInEmail(email, password1)
      .then(authUser => {
        console.log(authUser);
        this.setState(() => ({ ...INIT_STATE }));
        history.push(routes.HOME);
      })
      .catch(err => {
        const error = err.message;
        console.log(error);
        this.setState({error});
      });
    e.preventDefault();
  }

  handleChange = (e, propName) => {
    this.setState({[propName]:e.target.value});
  }

  render() {
    const {email, password1, error} = this.state;

    const disabled =
      password1 === '' ||
      email === '';

    return (
      <form className="log-in-form" onSubmit={this.onSubmit}>
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
        <button type="submit" disabled={disabled}>Sign In</button>
        { error && <p>{error}</p> }
      </form>
    );
  }
}

export default withRouter(LogIn);

export {
  LogInForm
};
