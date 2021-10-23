import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
// import { fetchCount } from './counterAPI';

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
  tasks: [{ id: 1, title: "taskA", completed: false }],
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
    },
  },
});

export const { createTask } = taskSlice.actions;

export const selectTask = (state: RootState): TaskState["tasks"] => state.task.tasks;

export default taskSlice.reducer;
