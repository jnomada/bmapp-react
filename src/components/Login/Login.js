import React, { useState } from 'react';
import classes from './Login.module.css';

const Login = (props) => {

  async function onSubmitHandler(e) {
    e.preventDefault();

    try {
      const response = await fetch('https://bmapp-api.jsealey.com/users/userlogin/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": props.username,
          "password": props.password
        }),
      });
  
      const data = await response.json();
      props.onUserIdChange(data.userId);
      props.onLoggedIn(true);
    
    } catch (error) {
      console.log(error);
    }
  }

  const onUsernameChangeHandler = (e) => {
    props.onUsernameChange(e.target.value);
  }

  const onPasswordChangeHandler = (e) => {
    props.onPasswordChange(e.target.value);
  }

  return (
    <div className={classes.login}>
      <form onSubmit={onSubmitHandler}>
        <h1>Login</h1>
        <label htmlFor="email">Username:</label>
        <input id="username" type="text" onChange={onUsernameChangeHandler}></input>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" onChange={onPasswordChangeHandler}></input>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login;