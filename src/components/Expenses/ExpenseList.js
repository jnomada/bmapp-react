import classes from './ExpenseList.module.css';
import React, { useEffect, useState } from 'react';
import Expense from './Expense';
import ExpenseFilter from './ExpenseFilter';

const ExpenseList = (props) => {

  const [expenseData, setExpenseData] = useState([]);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const [date, setDate] = useState(new Date());

  async function getExpenses() {
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

  return (
    <React.Fragment>
        <div className={classes.expenseList}>
          <p className={classes['section-title']}>Expenses</p>
          <ExpenseFilter onDateChange={onDateChangeHandler} />
          {hasDataLoaded && (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenseData.map(expense => {
                  return <Expense key={expense.expenseId} date={expense.expenseDate} amount={expense.amount} type={expense.type} description={expense.description} />
                })}
              </tbody>
            </table>
          )}
        </div>
    </React.Fragment>
  )
}

export default ExpenseList;