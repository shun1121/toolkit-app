import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EventNoteIcon from '@material-ui/icons/EventNote';
import styles from './TaskItem.module.scss';
import { selectTask, deleteTask, handleModalOpen, selectIsModalOpen, completeTask } from '../taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import TaskForm from '../taskForm/TaskForm'

interface PropTypes {
  task: {
    id:number;
    title:string;
    completed:boolean
  }
}

const TaskItem: React.FC<PropTypes> = ({ task }) => {
  // ↓これでreduxで管理しているisModalOpenを取り扱うことができる。
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen)
  // const completeTask = useSelector(completeTask)
  const handleOpen = () => {
    dispatch(selectTask(task))
    dispatch(handleModalOpen(true));
  }
  const handleClose = () => dispatch(handleModalOpen(false));
  const handleCheck = () => {
    dispatch(completeTask(task))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <EventNoteIcon />
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_item}>
        <Checkbox
          checked={task.completed}
          onClick={handleCheck}
          className={styles.checkbox}
        />
        <button onClick={handleOpen} className={styles.edit_button}>
          <EditIcon className={styles.icon} />
        </button>
        <button onClick={()=>dispatch(deleteTask(task.id))} className={styles.delete_button}>
        {/* <button onClick={(e)=>handleDelete(e, task.id)} className={styles.delete_button}> */}
          <DeleteIcon className={styles.icon} />
        </button>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}
      >
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit</div>
          <TaskForm edit />
        </div>
      </Modal>
    </div>
  )
}

export default TaskItem
