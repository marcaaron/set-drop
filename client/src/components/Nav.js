import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import SignOutButton from './SignOut';

const Nav = ({authUser}) =>
  <div>
    {authUser ? <NavAuth/> : <NavNonAuth/>}
  </div>

const NavAuth = () =>
  <ul className="nav">
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ADD}>Add Set</Link></li>
    <li><Link to={routes.SETS}>Sets</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Home</Link></li>
    <li><Link to={routes.SIGN_UP}>Sign Up</Link></li>
    <li><Link to={routes.LOG_IN}>Log In</Link></li>
    <li><Link to={routes.SETS}>Sets</Link></li>
  </ul>

export default Nav;
