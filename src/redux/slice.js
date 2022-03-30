import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "taskStatus",
  initialState: {
    currentTaskName: "",
    taskList: [],
  },
  reducers: {
    setCurrentTaskName: (state, action) => {
      state.currentTaskName = action.payload;
    },
    setTaskList: (state, action) => {
      state.taskList = action.payload;
    },
  },
});

export const { setCurrentTaskName, setTaskList } = taskSlice.actions;

export default taskSlice.reducer;
