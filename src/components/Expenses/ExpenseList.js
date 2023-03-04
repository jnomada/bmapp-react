import classes from './ExpenseList.module.css';
import React, { useState } from 'react';
import Expense from './Expense';

const ExpenseList = (props) => {

  const [expenseData, setExpenseData] = useState([]);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);

  async function getExpenses() {
    const myData = {
      username: props.username,
      password: props.password,
      expenseYear: new Date('2022-05-01').getFullYear(),
      expenseMonth: new Date('2022-05-01').getMonth() + 1
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

  return (
    <div className={classes.expenseList}>
      <button onClick={getExpenses}></button>
      {hasDataLoaded && (
        <table>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
          {expenseData.map(expense => {
            return <Expense key={expense.expenseId} date={expense.expenseDate} amount={expense.amount} type={expense.type} description={expense.description} />
          })}
        </table>
      )}
    </div>
  )
}

export default ExpenseList;