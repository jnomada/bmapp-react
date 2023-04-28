import classes from './ExpenseActions.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ExpenseFilter from './ExpenseFilter';

const ExpenseActions = (props) => {
  return (
    <div className={classes['expense-actions']}>
      <ExpenseFilter onDateChange={props.onDateChange}/>
      <FontAwesomeIcon className={classes['trash-icon']} icon={faTrash} onClick={() => {props.onDeleteSubmission()}}/>
    </div>
  )
}

export default ExpenseActions;