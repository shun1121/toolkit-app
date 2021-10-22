import React from 'react'
import styles from './App.module.scss'
import Header from './Components/Header'
import TaskList from './features/task/taskList/TaskList'
import TaskForm from './features/task/taskForm/TaskForm'

const App: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Header />
        <TaskForm />
        <TaskList />
      </div>
    </div>
  )
}

export default App
