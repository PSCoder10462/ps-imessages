import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import IMessage from './imessage/IMessage';
import {selectUser, login, logout} from './features/userSlice';
import Login from './login/Login'
import firebase from './firebase'

const auth = firebase.auth();

function App() {
  const user = useSelector(selectUser),
    dispatch = useDispatch()
  useEffect(()=> {
    auth.onAuthStateChanged(user => {
      if (user) {
        // user is logged in ...
        dispatch(login({
          // passing payload i.e, object
          uid: user.uid,
          email: user.email,
          photo: user.photoURL,
          displayName: user.displayName
        }))
      } else {
        // no user is logged in ...
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      {user ? <IMessage /> : <Login />}
    </div>
  );
}

export default App;
