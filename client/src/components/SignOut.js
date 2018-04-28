import React from 'react';
import { auth } from '../firebase';

const SignOutButton = () =>
  <a
    type="button"
    onClick={auth.signOut}
  >
    Sign Out
  </a>

export default SignOutButton;
