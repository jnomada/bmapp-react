import React, { useState } from 'react';
import AddExpense from '../Expenses/AddExpense';
import ExpenseList from '../Expenses/ExpenseList';
import classes from './Dashboard.module.css';

const Dashboard = (props) => {

  return (
    <div className={classes.dashboard}>
      <AddExpense 
        userId={props.userId}
      />
      <ExpenseList 
        password={props.password}
        username={props.username}
      />
    </div>
  )
}

export default Dashboard;