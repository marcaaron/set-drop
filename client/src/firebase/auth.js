import {auth} from './firebase';

export const createUserEmail = (email,password) =>
  auth.createUserWithEmailAndPassword(email,password);

export const LogInEmail = (email,password) =>
  auth.signInWithEmailAndPassword(email,password);

export const signOut = () =>
  auth.signOut();

export const passwordReset = (email) =>
  auth.sendPasswordResetEmail(email);

export const passwordUpdate = (password) =>
  auth.currentUser.updatePassword(password);
