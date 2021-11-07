import React from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import styles from './TaskForm.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { editTask, createTask, handleModalOpen, selectSelectedTask } from '../taskSlice' //reducer?

type Inputs = {
  taskTitle: string;
}

type PropTypes = {
  edit?: boolean;
}

const TaskForm: React.FC<PropTypes> = ( {edit} ) => {
  const dispatch = useDispatch()
  const selectedTask = useSelector(selectSelectedTask)
  // ↑ モーダルを開いた時にすでに選択したタスク情報が入っている。それをここで指定している。
  const { register, handleSubmit, reset } = useForm();
  // 引数dataにtextfieldの入力値が渡ってくる。
  const handleCreate = (data: Inputs) => {
    console.log(data)
    // ↑ オブジェクトの形式で帰ってくる。{taskTitle: 'llllllll'}
    //      actionのpayload   ↓
    dispatch(createTask(data.taskTitle))
    reset()
  }
  const handleEdit = (data: Inputs) => {
    // selectedTaskを展開して、id,title,completed の内、titleだけを編集する。
    const sendData = {...selectedTask, title: data.taskTitle}
    dispatch(editTask(sendData))
    console.log(data)
    dispatch(handleModalOpen(false))
  }

  return (
    <div className={styles.root}>
      {/* ↓ preventDefaultなどを書かなくても良くなる */}
      <form
        onSubmit={edit? handleSubmit(handleEdit): handleSubmit(handleCreate)}
        className={styles.form}
      >
        <TextField
          id="outlined-basic"
          label={edit? "Edit Task": "New Task"}
          defaultValue={edit? selectedTask.title: ""}
          variant="outlined"
          className={styles.text_field}
          inputRef={register}
          name="taskTitle"
        />
        {edit? (
          <div className={styles.button_wrapper}>
            <button type="submit" className={styles.submit_button}>Submit</button>
            <button type="button" onClick={() => dispatch(handleModalOpen(false))} className={styles.cancel_button}>Cancel</button>
          </div>
        ): null}
      </form>
    </div>
  );
}
// 編集の際、選択したtaskのtitleを入力欄に表示するために、まずreactのコンポーネントでreduxで管理する情報を使えるようにする。
// つまり、ますuseSelectorをインポートし、select~~をsliceからコンポーネント側にインポートする。

export default TaskForm
