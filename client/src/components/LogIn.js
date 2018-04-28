import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {SignUpLink} from './SignUp';
import * as routes from '../constants/routes';
import { auth } from '../firebase';

const LogIn = ({history}) =>
  <div className="content-container">
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
    // const {username} = this.state;
    const {email, password1} = this.state;
    const {history} = this.props;
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
          suggested = "current-password"
          onChange={(e)=>this.handleChange(e,'password1')}
          type="password"
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
