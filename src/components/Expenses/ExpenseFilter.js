import classes from './ExpenseFilter.module.css';

const ExpenseFilter = (props) => {

  const today = new Date().toISOString().substring(0,7);

  const onDateChange = (e) => {
    props.onDateChange(new Date(e.target.value));
  }

  return (
    <div className={classes['expense-filter']}>
      <input type="month" id="date" name="date" defaultValue={today} onChange={onDateChange}/>
    </div>
  )
}

export default ExpenseFilter;