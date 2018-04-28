import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import SignOutButton from './SignOut';

const Nav = ({authUser, currentUser}) =>
  <ul className="nav">
    {authUser ? <NavAuth currentUser={currentUser}/> : <NavNonAuth/>}
  </ul>

const NavAuth = ({currentUser}) =>[
    <li><Link to={routes.HOME}>HOME</Link></li>,
    <li><Link to={routes.STREAM}>My Stream</Link></li>,
    <li><Link to={routes.ADD}>Add Set</Link></li>,
    <li><Link to={routes.SETS}>Browse All Sets</Link></li>,
    <li><Link to={routes.USER_LIST}>User List</Link></li>,
    <li><Link to={`/users/${currentUser}`}>Your Profile</Link></li>,
    <li><Link to={`/sets/${currentUser}`}>Your Sets</Link></li>,
    <li><SignOutButton /></li>
  ]

const NavNonAuth = () =>[
    <li><Link to={routes.LANDING}>HOME</Link></li>,
    <li><Link to={routes.SIGN_UP}>SIGN UP</Link></li>,
    <li><Link to={routes.LOG_IN}>LOG IN</Link></li>,
    <li><Link to={routes.SETS}>BROWSE</Link></li>
]
export default Nav;
