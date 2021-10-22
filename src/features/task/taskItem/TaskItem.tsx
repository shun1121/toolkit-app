import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EventNoteIcon from '@material-ui/icons/EventNote';
import styles from './TaskItem.module.scss'

interface PropTypes {
  task: {
    id:number;
    title:string;
    completed:boolean
  }
}

const TaskItem:React.FC<PropTypes> = ({task}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <EventNoteIcon />
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_item}>
        <Checkbox
          checked={task.completed}
          onClick={()=>console.log(`check ${task.id}`)}
          className={styles.checkbox}
        />
        <button onClick={()=>console.log(`edit ${task.id}`)} className={styles.edit_button}>
          <EditIcon className={styles.icon} />
        </button>
        <button onClick={()=>console.log(`edit ${task.id}`)} className={styles.delete_button}>
          <DeleteIcon className={styles.icon} />
        </button>
      </div>
    </div>
  )
}

export default TaskItem
