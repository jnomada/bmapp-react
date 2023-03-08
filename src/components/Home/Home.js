import React from 'react';
import ExpenseList from '../Expenses/ExpenseList';
import Dashboard from './Dashboard';

const Home = (props) => {
  return (
    <div>
      <h1>Welcome home</h1>
      <Dashboard 
        password={props.password}
        username={props.username}
        userId={props.userId}
      />
    </div>
  )
}

export default Home;