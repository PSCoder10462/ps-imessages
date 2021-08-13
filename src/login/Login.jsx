import { Button } from "@material-ui/core";
import React from "react";
import iMessage from "./iMessage.png";
import "./Login.css";
import firebase from "../firebase";

const provider = new firebase.auth.GoogleAuthProvider(),
  auth = firebase.auth();

function Login() {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // let token = result.credential.accessToken,
        //   user = result.user;
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <img src={iMessage} alt="logo" />
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
