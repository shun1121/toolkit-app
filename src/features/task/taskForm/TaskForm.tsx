import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import styles from './TaskForm.module.scss'
import { createTask } from '../taskSlice' //reducer?

type Inputs = {
  taskTitle: string;
}

const TaskForm: React.FC = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm();
  const handleCreate = (data: Inputs) => {
    dispatch(createTask(data.taskTitle))
    reset()
  }

  return (
    <div className={styles.root}>
      {/* ↓ preventDefaultなどを書かなくても良くなる */}
      <form
        onSubmit={handleSubmit(handleCreate)}
        className={styles.form}
      >
        <TextField
          id="outlined-basic"
          label="New Task"
          variant="outlined"
          className={styles.text_field}
          inputRef={register}
          name="taskTitle"
        />
      </form>
    </div>
  );
}

export default TaskForm
