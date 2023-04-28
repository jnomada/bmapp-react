import React from 'react';
import classes from './Home.module.css';
import Dashboard from './Dashboard';

const Home = (props) => {
  return (
    <div className={classes.home}>
      <h1 className={classes.title}>Welcome <span>{props.username}</span></h1>
      <Dashboard 
        password={props.password}
        username={props.username}
        userId={props.userId}
      />
    </div>
  )
}

export default Home;