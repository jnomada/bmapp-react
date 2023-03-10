import React, { useState, useEffect } from 'react';
import AddExpense from '../Expenses/AddExpense';
import ExpenseList from '../Expenses/ExpenseList';
import classes from './Dashboard.module.css';

const Dashboard = (props) => {

  const [expenseData, setExpenseData] = useState([]);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const [date, setDate] = useState(new Date());

  const getExpenses = async () => {
    const myData = {
      username: props.username,
      password: props.password,
      expenseYear: date.getFullYear(),
      expenseMonth: date.getMonth() + 1
    }

    try {
      const url = 'https://bmapp-api.jsealey.com/expenses/getexpense/';
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myData),
      });
  
      setExpenseData(await response.json());
      setHasDataLoaded(true);
    
    } catch (error) {
      console.log(error);
    }  
  }

  useEffect(() => {
    getExpenses();
  }, [date])

  const onDateChangeHandler = (expenseDate) => {
    setDate(expenseDate);
  }

  const updateExpenseListHandler = () => {
    getExpenses();
  }

  return (
    <div className={classes.dashboard}>
      <AddExpense 
        userId={props.userId}
        onExpenseSubmit={updateExpenseListHandler}
      />
      <ExpenseList 
        expenseData={expenseData}
        hasDataLoaded={hasDataLoaded}
        onDateChange={onDateChangeHandler}
        userId={props.userId}
        updateExpenseList={updateExpenseListHandler}
      />
    </div>
  )
}

export default Dashboard;