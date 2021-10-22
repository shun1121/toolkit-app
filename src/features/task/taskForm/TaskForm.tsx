import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import styles from './TaskForm.module.scss'
// import { register } from '../../../serviceWorker';

type Inputs = {
  taskTitle: string;
}

const TaskForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const [text, setText] = useState("")
  const handleCreate = (data: Inputs) => {
    console.log("aaaa")
    console.log(data)
    setText("aaaa")
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
      <p>{text}</p>
    </div>
  );
}

export default TaskForm
