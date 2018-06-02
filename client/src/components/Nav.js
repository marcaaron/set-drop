import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import SignOutButton from './SignOut';

const Nav = ({authUser, currentUser, location}) =>
  <ul className="nav">
    {authUser ? <NavAuth route={location.pathname} currentUser={currentUser}/> : <NavNonAuth route={location.pathname}/>}
  </ul>

const NavAuth = ({currentUser, route}) =>{
  return [
    <li className="nav__item">
      <Link
        className="nav__link"
      style={setStyle(routes.HOME, route)}
      to={routes.HOME}>HOME</Link>
    </li>,
    <li className="nav__item">
      <Link
      className="nav__link"
      style={setStyle(routes.STREAM, route)}
      to={routes.STREAM}>My Stream</Link></li>,
    <li className="nav__item">
      <Link
      className="nav__link"
      style={setStyle(routes.ADD, route)}
      to={routes.ADD}>Add Set</Link></li>,
    <li className="nav__item">
      <Link
      className="nav__link"
      style={setStyle(routes.SETS, route)}
      to={routes.SETS}>Browse All Sets</Link></li>,
    <li className="nav__item">
      <Link
      className="nav__link"
      style={setStyle(routes.USER_LIST, route)}
      to={routes.USER_LIST}>User List</Link></li>,
    <li className="nav__item">
      <Link
      className="nav__link"
      style={setStyle(`/users/${currentUser}`, route)}
      to={`/users/${currentUser}`}>Your Profile</Link></li>,
    <li className="nav__item">
      <Link
      className="nav__link"
      style={setStyle(`/sets/${currentUser}`, route)}
      to={`/sets/${currentUser}`}>Your Sets</Link></li>,
    <li className="nav__item">
      <SignOutButton /></li>
  ];
};

const setStyle = (route, currentRoute) => {
  let style = {};
  if(route===currentRoute){
    style = {fontWeight:700, textDecoration:'underline'};
  }else{
   style = {};
  }
  return style;
};

const NavNonAuth = ({route}) =>{
  return [
    <li className="nav__item">
      <Link
        className="nav__link"
        style={setStyle(routes.LANDING, route)} to={routes.LANDING}>HOME</Link></li>,
    <li className="nav__item">
      <Link
        className="nav__link" style={setStyle(routes.SIGN_UP, route)} to={routes.SIGN_UP}>SIGN UP</Link></li>,
    <li className="nav__item"><Link
              className="nav__link" style={setStyle(routes.LOG_IN, route)} to={routes.LOG_IN}>LOG IN</Link></li>,
    <li className="nav__item"><Link
      className="nav__link" style={setStyle(routes.SETS, route)} to={routes.SETS}>BROWSE</Link></li>
  ];
};

export default withRouter(Nav);
