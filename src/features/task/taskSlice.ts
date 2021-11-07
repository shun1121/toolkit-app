import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TaskState {
  // taskの数を管理
  idCount: number;
  // storeに保存するtaskの一覧
  tasks: { id: number; title: string; completed: boolean }[];
  // taskのtitleを編集する際にどのtaskが選択されているか
  selectTask: { id: number; title: string; completed: boolean };
  // モーダルのフラグ
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [{ id: 1, title: "taskA", completed: false }], //39行目、stateのtasksで指定される
  selectTask: { id: 0, title: "", completed: false },
  isModalOpen: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // taskの作成
    createTask: (state, action) => {
      // 第一引数は現在（更新前）のState
      // 第二引数は渡されたaction
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload, //taskFormのdata.taskTitleの内容が入ってくる
        completed: false,
      };
      // スプレッド構文のところは配列が展開された状態だから、オブジェクトの中身   newTaskが入って更新される
      state.tasks = [newTask, ...state.tasks];
      // ↑ スプレッド構文を[...state.tasks, newTask]にすると、newTaskが最後尾に追加される。
    },
    // modalの開閉
    handleModalOpen: (state, action) => {
      // action.payloadの中身は？
      state.isModalOpen = action.payload 
    },
    editTask: (state, action) => {
      // どこの処理でこのaction.payloadに値が入ってくる？
      // TaskformのhandleEdit関数内で、titleを変更したタスクをselectedTaskに代入したsendDataを引数に持たせてdispatchした瞬間
      // 編集ボタンを押した段階で dispatch(selectTask(task)) が走り、selectTaskの中身、id,title,completedを扱えるようになる。
      const task = state.tasks.find((t) => t.id === action.payload.id)
      console.log("editTask "+action.payload)
      if (task) {
        console.log(action.payload)
        // 抜き出したtaskのtitleを置き換える。
        task.title = action.payload.title
        // task.title = action.payload.title
      }
    },
    selectTask: (state, action) => {
      // const handleOpen = () => {
      //   dispatch(selectTask(task))
      //   dispatch(handleModalOpen(true));
      // }
      // ↑ の dispatch(selectTask(task)) の段階で引数がpayloadに渡ってくる。
      console.log("selectedTask "+action.payload.id)
      state.selectTask = action.payload
    },

    completeTask: (state, action) => {
      // const task = state.tasks.find((t) => t.id === action.payload.id)
      // console.log(task)
      state.tasks.forEach((t) => {
        if (t.id === action.payload.id) {
          console.log(!action.payload.completed)
          t.completed = !action.payload.completed
        }
      })
      // state.selectTask.completed = action.payload.completed
      // console.log(state.selectTask.completed)
    },

    deleteTask: (state, action) => {
      console.log('state.task = '+state.tasks)
      console.log('action.payload.id = '+action.payload)
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    }
  },
});

export const { editTask, createTask, deleteTask, handleModalOpen, selectTask, completeTask } = taskSlice.actions;

// ↓ reactとreduxで管理している情報を結びつけるための処理
// TaskStateのどの値の型か指定。
export const selectTasks = (state: RootState): TaskState["tasks"] => state.task.tasks;
// useSelectorに引数としてselectIsModalOpenを用いると、reduxの中で管理しているisModalOpenが変数として代入される。
export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] => state.task.isModalOpen;
export const selectSelectedTask = (state: RootState): TaskState["selectTask"] => state.task.selectTask;
export const completeTasks = (state: RootState): TaskState["selectTask"] => state.task.selectTask;
export default taskSlice.reducer;






// import { createSlice } from '@reduxjs/toolkit';
// import { RootState } from '../../app/store';
// import { createTask } from '../taskSlice';
// // import { useDispatch } from 'react-redux';

// export interface TaskState {
//   // taskの数を管理
//   idCount: number;
//   // storeに保存するtaskの一覧
//   tasks: { id: number; title: string; completed: boolean }[];
//   // taskのtitleを編集する際にどのtaskが選択されているか
//   selectTask: { id: number; title: string; completed: boolean };
//   // モーダルのフラグ
//   isModalOpen: boolean;
// }

// const initialState: TaskState = {
//   idCount: 1,
//   tasks: [{ id: 1, title: "taskA", completed: false }], //39行目、stateのtasksで指定される
//   selectTask: { id: 0, title: "", completed: false },
//   isModalOpen: false,
// };

// export const taskSlice = createSlice({
//   name: 'task',
//   initialState,
//   // The `reducers` field lets us define reducers and generate associated actions
//   reducers: {
//     // taskの作成
//     createTask: (state, action) => {
//       // 第一引数は現在（更新前）のState
//       // 第二引数は渡されたaction
//       state.idCount++;
//       const newTask = {
//         id: state.idCount,
//         title: action.payload, //taskFormのdata.taskTitleの内容が入ってくる
//         completed: false,
//       };
//       // スプレッド構文のところは配列が展開された状態だから、オブジェクトの中身   newTaskが入って更新される
//       state.tasks = [newTask, ...state.tasks];
//     }
//     // deleteTask: (state, action) => {
//     //   // const dispatch = useDispatch();
//     //   // const task = state.find(task => task.id === action.payload)
//     //   // if (task) {
//     //   //   task.completed = !task.completed // 見つけた task の　complete　を更新する
//     //   // }
//     //   const deleteTask = {
//     //     id: state.idCount,
//     //     title: action.payload,
//     //     completed: false,
//     //   };
//     //   state.tasks = [deleteTask, ...state.tasks]
//     // }
//   },
// });

// export const { createTask } = taskSlice.actions;

// export const selectTask = (state: RootState): TaskState["tasks"] => state.task.tasks;

// export default taskSlice.reducer;
