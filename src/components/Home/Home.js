import React from 'react';
import ExpenseList from '../Expenses/ExpenseList';

const Home = (props) => {
  return (
    <div>
      <h1>Welcome home</h1>
      <ExpenseList 
        password={props.password}
        username={props.username}
      />
    </div>
  )
}

export default Home;