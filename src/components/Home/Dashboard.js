import React, { useState, useEffect } from 'react';
import AddExpense from '../Expenses/AddExpense';
import ExpenseList from '../Expenses/ExpenseList';
import classes from './Dashboard.module.css';
import Gchart from '../Gcharts/Gchart';

const Dashboard = (props) => {

  const [expenseData, setExpenseData] = useState([]);
  const [monthlyTypeData, setMonthlyTypeData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyTypeData, setYearlyTypeData] = useState([]);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const [date, setDate] = useState(new Date());
  const baseUrl = 'https://bmapp-api.jsealey.com';

  //////////////////////////////////////////////////////////
  // Expense list data
  const getExpenses = async () => {
    const myData = {
      username: props.username,
      password: props.password,
      expenseYear: date.getFullYear(),
      expenseMonth: date.getMonth() + 1
    }

    try {
      const url = `${baseUrl}/expenses/getexpense/`;
  
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

  const getAllChartData = async () => {
    setMonthlyTypeData(await getChartData('typeMonthData', ['Type', 'amount' ]));
    setMonthlyData(await getChartData('daysOfMonthData', ['Month', 'amount' ]));
    setYearlyTypeData(await getChartData('typeYearData', ['Type', 'amount' ]));
  }

  useEffect(() => {
    getExpenses();
    getAllChartData();
  }, [date]);

  const onDateChangeHandler = (expenseDate) => {
    setDate(expenseDate);
  }

  const updateExpenseListHandler = () => {
    getExpenses();
    getAllChartData();
  }

   //////////////////////////////////////////////////////////
  // Fetch for all chart data
  const getChartData = async (dataType, columnNames) => {
    const myData = {
      username: props.username,
      password: props.password,
      expenseYear: date.getFullYear(),
      expenseMonth: date.getMonth() + 1
    }

    const url = `${baseUrl}/expenses/${dataType}/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myData),
    });
    const data = await response.json(); 
    let chartData = [];

    if (data) {
      const columns = columnNames;
      for (let i = 0; i < data.length; i++) {
        data[i][1] = Number(data[i][1].toFixed(2));
      }
      chartData = [columns, ...data];
    } 
    return chartData;
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
      <Gchart 
        title={'Month expense types'}
        chartType={'PieChart'}
        data={monthlyTypeData}
        width={'100%'}
        height={'250px'}
        options={{
          legend: {textStyle: {color: 'ffffff'}},
          backgroundColor: 'rgb(10, 37, 37)',
        }}
      />
      <div></div>
      <Gchart 
        title={'Month overview'}
        chartType={'ColumnChart'}
        data={monthlyData}
        width={'100%'}
        height={'400px'}
        options={{
          backgroundColor: 'rgb(10, 37, 37)',
          legend: {textStyle: {color: '#ffffff'}},  
          bar: {groupWidth: "13%"},     
          hAxis: {
            title: 'Day of month',
            titleTextStyle : {
							color : "#ffffff"
						},
            textStyle: {
              color: 'ffffff',
            },
            showTextEvery: 1
          },
          vAxis: {
            title: 'Amount',
            titleTextStyle : {
							color : "#ffffff"
						},
            textStyle: {
              color: 'ffffff',
            }
          }
        }}
      />
       <Gchart 
        title={'Year expense types'}
        chartType={'PieChart'}
        data={yearlyTypeData}
        width={'100%'}
        height={'250px'}
        options={{
          legend: {textStyle: {color: '#ffffff'}},
          backgroundColor: 'rgb(10, 37, 37)',          
        }}
      />
    </div>
  )
}

export default Dashboard;